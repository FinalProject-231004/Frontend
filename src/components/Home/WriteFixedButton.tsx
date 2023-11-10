import { useNavigate } from 'react-router-dom';
import { FaPencil } from 'react-icons/fa6';
import { toast } from 'react-toastify';

const WriteFixedButton: React.FC = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('Authorization');

  const goToPost = (): void => {
    if (!token) {
      toast.warning('로그인이 필요한 서비스입니다.');
    } else {
      navigate(`/create-quiz/details`);
    }
  };

  return (
    <div className="w-screen">
      <button
        type="button"
        onClick={goToPost}
        className="w-16 h-16 rounded-full fixed bottom-9 right-[320px] sm:right-5 sm:bottom-5 transition duration-200 ease-in-out transform hover:scale-110 bg-blue border-2 border-slate-40 shadow-md shadow-slate-300"
      >
        <div className="w-12 h-12 rounded-full text-white relative -right-[15px] -bottom-2">
          <FaPencil size={32} />
        </div>
      </button>
    </div>
  );
};

export default WriteFixedButton;
