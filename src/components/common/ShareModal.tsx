import { toast } from 'react-toastify';

interface ShareModalProps {
  isModalOpen: boolean;
  closeModal: () => void;
  handleCopyLink: () => void;
}

const ShareModal: React.FC<ShareModalProps> = ({
  isModalOpen,
  closeModal,
  handleCopyLink,
}) => {
  return (
    <div
      className={`${
        isModalOpen ? 'fixed' : 'hidden'
      } inset-0 flex items-center justify-center z-[500]`}
    >
      <div className="w-[613px] h-[308px] font-extrabold flex justify-center items-center bg-white p-6 rounded-xl shadow-lg shadow-slate-200">
        <div className="flex flex-col">
          <h2 className="text-2xl  text-center text-blue mb-4">
            이 퀴즈를 친구에게 공유할래요!
          </h2>

          <div className="flex flex-col text-2xl">
            <button
              onClick={() => {
                toast.warn('서비스 준비 중 입니다!🙄💦');
              }}
              className="mt-4 h-[57px] bg-[#FFEB00] border-blue p-2 rounded-full"
            >
              <div className="flex justify-center">
                <img
                  src="/kakaotalk.png"
                  alt="kakaotalk"
                  className="max-w-[35px] mr-2"
                />
                카톡으로 공유하기
              </div>
            </button>
            <button
              onClick={handleCopyLink}
              className="mt-4 h-[57px] bg-blue border-2 border-blue text-white p-2 rounded-full"
            >
              링크 복사하기
            </button>
          </div>
        </div>
      </div>
      <div
        className="absolute inset-0 bg-slate-200 opacity-40 -z-[500]"
        onClick={closeModal}
      ></div>
    </div>
  );
};

export default ShareModal;
