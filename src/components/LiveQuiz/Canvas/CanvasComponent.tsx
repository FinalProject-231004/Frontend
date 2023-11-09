import React, { useRef, useState } from 'react';
import { BsEraserFill, BsFillTrashFill } from 'react-icons/bs';

const CanvasComponent: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState<string>('#000000');
  const [lineWidth, setLineWidth] = useState<number>(3); // 선 두께의 초기값
  const eraserColor = '#FFFFFF';

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

  // 캔버스에 그리기 시작
  const startDrawing = (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
  ) => {
    const { offsetX, offsetY } = event.nativeEvent;
    const context = getCanvasContext();
    context.beginPath();
    context.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  // 그리기 중
  const draw = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = event.nativeEvent;
    const context = getCanvasContext();
    context.lineTo(offsetX, offsetY);
    context.strokeStyle = color;
    context.lineWidth = lineWidth;
    context.stroke();
  };

  // 그리기 종료
  const endDrawing = () => {
    const context = getCanvasContext();
    context.closePath();
    setIsDrawing(false);
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
