import { useCallback, useEffect, useRef, useState } from 'react';
import { LuEraser } from 'react-icons/lu';

type CanvasProps = {
  width: number;
  height: number;
};

type Coordinate = {
  x: number;
  y: number;
};

const CanvasContainer: React.FC<CanvasProps> = ({ width, height }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [mousePosition, setMousePosition] = useState<Coordinate | undefined>(
    undefined,
  );
  const [isPainting, setIsPainting] = useState(false);

  const getCoordinates = (event: MouseEvent): Coordinate | undefined => {
    if (!canvasRef.current) {
      return;
    }

    const canvas: HTMLCanvasElement = canvasRef.current;
    return {
      x: event.pageX - canvas.offsetLeft,
      y: event.pageY - canvas.offsetTop,
    };
  };

  const drawLine = (
    originalMousePosition: Coordinate,
    newMousePosition: Coordinate,
  ) => {
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;
    const context = canvas.getContext('2d');

    if (context) {
      context.strokeStyle = 'red';
      context.lineJoin = 'round';
      context.lineWidth = 5;

      context.beginPath();
      context.moveTo(originalMousePosition.x, originalMousePosition.y);
      context.lineTo(newMousePosition.x, newMousePosition.y);
      context.closePath();

      context.stroke();
    }
  };

  // const startTouch = useCallback((event: TouchEvent) => {
  //   // MouseEvent인터페이스를 TouchEvent로
  //   event.preventDefault();
  //   if (!canvasRef.current) {
  //     return;
  //   }
  //   const canvas: HTMLCanvasElement = canvasRef.current;
  //   const touch = event.touches[0]; // event로 부터 touch 좌표를 얻어낼수 있습니다.
  //   const mouseEvent = new MouseEvent('mousedown', {
  //     clientX: touch.clientX,
  //     clientY: touch.clientY,
  //   });
  //   canvas.dispatchEvent(mouseEvent); // 앞서 만든 마우스 이벤트를 디스패치해줍니다
  // }, []);

  const startPaint = useCallback((event: MouseEvent | TouchEvent) => {
    event.preventDefault();
    const coordinates = getCoordinates(event as MouseEvent);
    if (coordinates) {
      setIsPainting(true);
      setMousePosition(coordinates);
    }
  }, []);

  // paint 함수를 터치 이벤트에도 대응하도록 수정
  const paint = useCallback(
    (event: MouseEvent | TouchEvent) => {
      event.preventDefault();
      if (isPainting) {
        const newMousePosition = getCoordinates(event as MouseEvent);
        if (mousePosition && newMousePosition) {
          drawLine(mousePosition, newMousePosition);
          setMousePosition(newMousePosition);
        }
      }
    },
    [isPainting, mousePosition],
  );

  const exitPaint = useCallback(() => {
    setIsPainting(false);
  }, []);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;

    // 이벤트 리스너 설정
    const setEventListeners = () => {
      canvas.addEventListener('touchstart', startPaint, { passive: true });
      canvas.addEventListener('touchmove', paint, { passive: true });
      canvas.addEventListener('touchend', exitPaint);
      canvas.addEventListener('mousedown', startPaint);
      canvas.addEventListener('mousemove', paint);
      canvas.addEventListener('mouseup', exitPaint);
      canvas.addEventListener('mouseleave', exitPaint);
    };

    setEventListeners();

    // 이벤트 리스너 제거
    return () => {
      canvas.removeEventListener('touchstart', startPaint);
      canvas.removeEventListener('touchmove', paint);
      canvas.removeEventListener('touchend', exitPaint);
      canvas.removeEventListener('mousedown', startPaint);
      canvas.removeEventListener('mousemove', paint);
      canvas.removeEventListener('mouseup', exitPaint);
      canvas.removeEventListener('mouseleave', exitPaint);
    };
  }, [startPaint, paint, exitPaint]);

  const clearCanvas = () => {
    if (!canvasRef.current) {
      return;
    }

    const canvas: HTMLCanvasElement = canvasRef.current;
    const context = canvas.getContext('2d');

    if (context) {
      context.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  return (
    <div className="canvas">
      <canvas
        ref={canvasRef}
        height={height}
        width={width}
        className="canvas"
      />
      <button onClick={clearCanvas}>
        <LuEraser />
      </button>
    </div>
  );
};

CanvasContainer.defaultProps = {
  width: window.innerWidth,
  height: window.innerHeight,
};

export default CanvasContainer;
