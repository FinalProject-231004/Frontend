import Modal from 'react-modal';

type WarningModalProps = {
  isOpen: boolean;
  onRequestClose: () => void;
  title: string;
  message: string;
  button: React.ReactNode;
};

const WarningModal: React.FC<WarningModalProps> = ({
  isOpen,
  onRequestClose,
  title,
  message,
  button,
}) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    shouldCloseOnOverlayClick={false}
    contentLabel="Warning"
    className="w-[500px] h-[220px] bg-[#F1F8FF] rounded-lg overflow-hidden shadow-md shadow-slate-300 transform transition-all p-6 sm:w-[340px] sm:h-[200px]"
    overlayClassName="fixed inset-0 bg-gray-200 bg-opacity-75 transition-opacity flex justify-center items-center"
  >
    <div className="flex flex-col justify-center items-center h-full">
      <div className="sm:flex flex-col justify-center items-center">
        <h3 className="text-3xl sm:text-2xl">{title}</h3>
      </div>
      <p className="text-blue text-xl font-extrabold mt-3 text-center sm:text-lg sm:break-words sm:max-w-[270px]">
        {message}
      </p>
      <div className="flex justify-center items-center mt-6 w-full">
        {button}
      </div>
    </div>
  </Modal>
);

export default WarningModal;
