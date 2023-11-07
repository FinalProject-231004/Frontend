import { useNavigate } from 'react-router-dom';
import { FaPencil } from 'react-icons/fa6';

const WriteFixedButton: React.FC = () => {
  const navigate = useNavigate();

  const goToPost = (): void => {
    navigate(`/create-quiz/details`);
  };

  return (
    <div className="w-screen">
      <button
        type="button"
        onClick={goToPost}
        className="w-14 h-14 rounded-full fixed bottom-6 right-[330px] transition duration-200 ease-in-out transform hover:scale-110 bg-blue border-2 border-slate-40 shadow-md shadow-slate-300"
      >
        <div className="w-12 h-12 rounded-full text-white relative -right-3 -bottom-2">
          <FaPencil size={30} />
        </div>
      </button>
    </div>
  );
};

export default WriteFixedButton;
