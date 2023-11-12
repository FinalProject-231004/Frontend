// CanvasComponent.tsx
import React, { useRef, useState, useEffect } from 'react';
import { BsEraserFill, BsFillTrashFill } from 'react-icons/bs';
import { Client } from '@stomp/stompjs';

type CanvasComponentProps = {
  stompClient: Client | null;
  userRole: string;
};

type DrawData = {
  type: string;
  offsetX?: number;
  offsetY?: number;
  color?: string;
  lineWidth?: number;
};

const CanvasComponent: React.FC<CanvasComponentProps> = ({
  stompClient,
  userRole,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState<string>('#000000');
  const [lineWidth, setLineWidth] = useState<number>(3);
  const eraserColor = '#FFFFFF';
  const canDraw = userRole === 'ADMIN';

  const drawOnCanvas = (data: DrawData) => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');

    if (!context) {
      return;
    }
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
      case 'clear':
        if (canvas) {
          context.clearRect(0, 0, canvas.width, canvas.height);
        }
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    // 캔버스 초기 상태를 백엔드에서 로드하는 로직
    const loadInitialCanvasState = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_APP_GENERATED_SERVER_URL}/api/draw/state`,
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const initialState = await response.json();
        // initialState를 이용하여 캔버스를 업데이트하는 로직
        drawInitialState(initialState);
      } catch (error) {
        console.error('초기 캔버스 상태 로딩 실패:', error);
      }
    };

    loadInitialCanvasState();
  }, []); // 빈 의존성 배열을 사용하여 컴포넌트 마운트 시에만 호출

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

  const drawInitialState = (initialState: DrawData[]) => {
    initialState.forEach(drawData => {
      drawOnCanvas(drawData);
    });
  };

  const startDrawing = (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
  ) => {
    if (!canDraw) return;
    const { offsetX, offsetY } = event.nativeEvent;
    setIsDrawing(true);
    sendDrawingData({
      type: 'start',
      offsetX: offsetX as number,
      offsetY: offsetY as number,
    });
  };

  const draw = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    if (!isDrawing || !canDraw) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const x = (event.clientX - rect.left) * scaleX;
    const y = (event.clientY - rect.top) * scaleY;

    const context = canvas.getContext('2d');
    if (!context) return;

    if (context) {
      context.lineTo(x, y);
      context.strokeStyle = color;
      context.lineWidth = lineWidth;
      context.stroke();
      context.beginPath();
      context.moveTo(x, y);
    }

    // 그리기 데이터를 웹소켓을 통해 전송합니다.
    sendDrawingData({ type: 'draw', offsetX: x, offsetY: y, color, lineWidth });
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
    if (!canDraw) return;
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext('2d');
      if (context) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        // 웹소켓을 통해 캔버스 지우기 메시지 전송
        sendDrawingData({ type: 'clear' });
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
      <div className="flex justify-between items-center">
        <div className="gap-3 flex">
          <button
            onClick={() => changeColor('#ff0000')}
            className={
              getButtonClass('#ff0000') + ' bg-red rounded-full w-10 h-10'
            }
          ></button>
          <button
            onClick={() => changeColor('#F7BD00')}
            className={
              getButtonClass('#F7BD00') + ' bg-[#F7BD00] rounded-full w-10 h-10'
            }
          ></button>
          <button
            onClick={() => changeColor('#00ff00')}
            className={
              getButtonClass('#00ff00') + ' bg-green-500 rounded-full w-10 h-10'
            }
          ></button>
          <button
            onClick={() => changeColor('#0000ff')}
            className={
              getButtonClass('#0000ff') +
              ' bg-[#0000ff]  rounded-full w-10 h-10'
            }
          ></button>
          <button
            onClick={() => changeColor('#000000')}
            className={
              getButtonClass('#000000') + ' bg-black  rounded-full w-10 h-10'
            }
          ></button>
          <button
            onClick={() => changeColor('eraser')}
            className={
              getButtonClass('eraser') + ' bg-gray-300 rounded-full w-10 h-10'
            }
          >
            <BsEraserFill size={24} />
          </button>
          <button
            onClick={clearCanvas}
            className="mt-2 p-2 bg-gray-300 rounded-lg text-white  w-10 h-10"
          >
            <BsFillTrashFill size={24} />
          </button>
        </div>

        <div className="mt-2 gap-3 flex items-center justify-center">
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
