import Modal from 'react-modal';

type WarningModalProps = {
  isOpen: boolean;
  onRequestClose: () => void;
  title: string;
  message: string;
  buttons: React.ReactNode;
};

const WarningModal: React.FC<WarningModalProps> = ({
  isOpen,
  onRequestClose,
  title,
  message,
  buttons,
}) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    shouldCloseOnOverlayClick={false}
    contentLabel="Warning"
    className="w-[713px] h-[180px] inline-block align-bottom bg-[#F1F8FF] rounded-lg text-left overflow-hidden shadow-md shadow-slate-400 transform transition-all sm:my-8 sm:align-middle max-w-md p-6"
    overlayClassName="fixed inset-0 bg-gray-300 bg-opacity-75 transition-opacity flex justify-center items-center"
  >
    <div className="sm:flex flex-col justify-center items-center">
      <h3 className="text-3xl">{title}</h3>
    </div>
    <p className="text-blue font-extrabold mt-3 text-center">{message}</p>
    <button
      className="text-sm mt-6 sm:flex bg-blue p-2 rounded-lg text-white mx-auto"
      type="button"
    >
      {buttons}
    </button>
  </Modal>
);

export default WarningModal;
