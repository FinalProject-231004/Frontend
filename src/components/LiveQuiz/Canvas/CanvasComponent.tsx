import React, { useRef, useState, useEffect } from 'react';
import { BsEraserFill, BsFillTrashFill } from 'react-icons/bs';
import { Client } from '@stomp/stompjs';

// CanvasComponent 컴포넌트의 props 타입 정의
type CanvasComponentProps = {
  stompClient: Client | null;
};

type DrawData = {
  type: string;
  offsetX?: number;
  offsetY?: number;
  color?: string;
  lineWidth?: number;
};

const CanvasComponent: React.FC<CanvasComponentProps> = ({ stompClient }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState<string>('#000000');
  const [lineWidth, setLineWidth] = useState<number>(3); // 선 두께의 초기값
  const eraserColor = '#FFFFFF';

  const drawOnCanvas = (data: DrawData) => {
    const context = getCanvasContext();
    switch (data.type) {
      case 'start':
        if (
          typeof data.offsetX === 'number' &&
          typeof data.offsetY === 'number'
        ) {
          context.beginPath();
          context.moveTo(data.offsetX, data.offsetY);
        }
        break;
      case 'draw':
        if (
          typeof data.offsetX === 'number' &&
          typeof data.offsetY === 'number' &&
          typeof data.color === 'string' &&
          typeof data.lineWidth === 'number'
        ) {
          context.lineTo(data.offsetX, data.offsetY);
          context.strokeStyle = data.color;
          context.lineWidth = data.lineWidth;
          context.stroke();
        }
        break;
      case 'end':
        context.closePath();
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (stompClient && stompClient.connected) {
      const subscription = stompClient.subscribe('/topic/draw', message => {
        const data = JSON.parse(message.body);
        drawOnCanvas(data);
      });

      return () => {
        subscription.unsubscribe();
      };
    }
  }, [stompClient]); // stompClient가 변경될 때마다 useEffect가 실행됩니다.

  const getCanvasContext = () => {
    const canvas = canvasRef.current;
    if (!canvas) {
      throw new Error('Canvas is not available');
    }
    const context = canvas.getContext('2d');
    if (!context) {
      throw new Error('Canvas context is not available');
    }
    return context;
  };

  const startDrawing = (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
  ) => {
    const { offsetX, offsetY } = event.nativeEvent;
    setIsDrawing(true);
    sendDrawingData({
      type: 'start',
      offsetX: offsetX as number,
      offsetY: offsetY as number,
    });
  };

  const draw = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = event.nativeEvent;
    const context = getCanvasContext();

    context.lineTo(offsetX, offsetY); // 현재 마우스 위치까지 선을 그립니다.
    context.strokeStyle = color; // 선의 색상을 설정합니다.
    context.lineWidth = lineWidth; // 선의 두께를 설정합니다.
    context.stroke(); // 캔버스에 선을 그립니다.

    // 그리기 데이터를 웹소켓을 통해 전송합니다.
    sendDrawingData({ type: 'draw', offsetX, offsetY, color, lineWidth });
  };

  const endDrawing = () => {
    const context = getCanvasContext();
    context.closePath();
    setIsDrawing(false);
    sendDrawingData({ type: 'end' });
  };

  const sendDrawingData = (data: DrawData) => {
    if (stompClient && stompClient.connected) {
      stompClient.publish({
        destination: '/app/draw', // 백엔드 엔드포인트
        body: JSON.stringify(data),
      });
    }
  };

  // 색상 선택 핸들러
  const changeColor = (newColor: string) => {
    setColor(newColor === 'eraser' ? eraserColor : newColor);
  };

  // 버튼 스타일 클래스를 동적으로 생성
  const getButtonClass = (buttonColor: string) => {
    return `mt-2 p-2 rounded-lg text-white ${
      color === (buttonColor === 'eraser' ? eraserColor : buttonColor)
        ? 'ring-2 ring-offset-2 ring-blue'
        : ''
    }`;
  };

  // 캔버스 전체 지우기
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext('2d');
      if (context) {
        context.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
  };

  // 선 두께 버튼에 적용할 클래스를 생성하는 함수
  const getLineWidthButtonClass = (width: number) => {
    return `p-2 rounded-full ${
      lineWidth === width ? 'ring-2 ring-offset-2 ring-black' : ''
    }`;
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseUp={endDrawing}
        onMouseMove={draw}
        className="border-4 border-blue rounded-xl"
        width={700}
        height={700}
      />
      <div className="flex justify-between">
        <div className="gap-3 flex">
          <button
            onClick={() => changeColor('#ff0000')}
            className={getButtonClass('#ff0000') + ' bg-red'}
          >
            Red
          </button>
          <button
            onClick={() => changeColor('#00ff00')}
            className={getButtonClass('#00ff00') + ' bg-green-500 '}
          >
            Green
          </button>
          <button
            onClick={() => changeColor('#0000ff')}
            className={getButtonClass('#0000ff') + ' bg-[#0000ff] '}
          >
            Blue
          </button>
          <button
            onClick={() => changeColor('#000000')}
            className={getButtonClass('#000000') + ' bg-black '}
          >
            Black
          </button>
          <button
            onClick={() => changeColor('eraser')}
            className={getButtonClass('eraser') + ' bg-gray-300'}
          >
            <BsEraserFill size={24} />
          </button>
          <button
            onClick={clearCanvas}
            className="mt-2 p-2 bg-gray-300 rounded-lg text-white"
          >
            <BsFillTrashFill size={24} />
          </button>
        </div>

        <div className="mt-4 gap-3 flex">
          <button
            onClick={() => setLineWidth(3)}
            className={getLineWidthButtonClass(3) + ' bg-gray-200'}
          >
            Thin
          </button>
          <button
            onClick={() => setLineWidth(8)}
            className={getLineWidthButtonClass(8) + ' bg-gray-400'}
          >
            Medium
          </button>
          <button
            onClick={() => setLineWidth(15)}
            className={
              getLineWidthButtonClass(15) + ' bg-gray-600 font-extrabold'
            }
          >
            Thick
          </button>
        </div>
      </div>
    </div>
  );
};

export default CanvasComponent;
