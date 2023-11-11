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

  const pencilIconSize = windowSize <= 393 ? 25 : windowSize <= 1024 ? 40 : 32;

  return (
    <div className="w-screen">
      <button
        type="button"
        onClick={goToPost}
        className="w-16 h-16 md:w-20 md:h-20 rounded-full fixed bottom-9 right-[320px] md:right-10 md:bottom-9 sm:w-12 sm:h-12 sm:right-6 sm:bottom-4 transition duration-200 ease-in-out transform hover:scale-110 bg-blue border-2 border-slate-40 shadow-md shadow-slate-300 sm:shadow-slate-500"
      >
        <div className="rounded-full text-white relative -right-[14px] md:-right-[18px] sm:-right-[7px] sm:-bottom-2">
          <FaPencil size={pencilIconSize} />
        </div>
      </button>
    </div>
  );
};

export default WriteFixedButton;
