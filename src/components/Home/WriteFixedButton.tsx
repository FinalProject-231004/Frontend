import { useNavigate } from 'react-router-dom';
import { FaPencil } from 'react-icons/fa6';
import { toast } from 'react-toastify';
import { useWindowSize } from '@/hooks';

const WriteFixedButton: React.FC = () => {
  const navigate = useNavigate();
  const windowSize = useWindowSize();
  const token = localStorage.getItem('Authorization');

  const goToPost = (): void => {
    if (!token) {
      toast.warning('로그인이 필요한 서비스입니다.');
    } else {
      navigate(`/create-quiz/details`);
    }
  };

  const pencilIconSize = windowSize <= 393 ? 25 : windowSize <= 1024 ? 32 : 30;

  return (
    <div className="w-screen">
      <button
        type="button"
        onClick={goToPost}
        className="w-16 h-16 rounded-full fixed bottom-8 right-[325px] md:right-8 md:bottom-7 sm:w-12 sm:h-12 sm:right-5 sm:bottom-4 transition duration-200 ease-in-out transform hover:scale-110 bg-blue border-2 border-slate-40 shadow-md shadow-slate-300 sm:shadow-slate-500"
      >
        <div className="rounded-full text-white relative -right-[15px] md:-right-[14px] sm:-right-[10px] sm:-bottom-0">
          <FaPencil size={pencilIconSize} />
        </div>
      </button>
    </div>
  );
};

export default WriteFixedButton;
