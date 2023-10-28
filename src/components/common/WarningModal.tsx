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
    contentLabel="Warning"
    style={{
      overlay: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      content: {
        width: '300px',
        height: '150px',
        textAlign: 'center',
        margin: 'auto',
      },
    }}
  >
    <h2>{title}</h2>
    <p>{message}</p>
    <div>{buttons}</div>
  </Modal>
);

export default WarningModal;
