import React from 'react';
import ReactModal from 'react-modal';

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onRequestClose: () => void;
  width: string;
  height: string;
  bgColor: string;
}

const Modal: React.FC<ModalProps> = ({ children, isOpen, onRequestClose, width, height, bgColor }) => {

  const customModalStyles: ReactModal.Styles = {
    /*overlay는 모달 창 바깥 부분, content는 모달 창부분*/
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.4)",
      width: "100%",
      height: "100vh",
      zIndex: 10,
      position: "fixed",
      top: 0,
      left: 0,
    },
    content: {
      width: width,
      height: height,
      padding: 0,
      zIndex: 150,
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      border:0,
      borderRadius: "10px",
      boxShadow: "3px 3px 3px rgba(0, 0, 0, 0.25)",
      backgroundColor: bgColor,
      justifyContent: "center",
      overflow: "auto",
    },
  };

  // 모달을 닫을 때 onRequestClose 함수 호출
  const closeModal = () => {
    onRequestClose();
  };

  return (
    <ReactModal
      isOpen={isOpen}
      style={customModalStyles} // 스타일 적용
      onRequestClose={closeModal} // 모달 창 닫기 요청을 받을 때 호출
      shouldCloseOnOverlayClick={true} // 외부 클릭으로 모달 닫기 활성화
    >
      <div className="modal-content">
        {children}
        {/* <button onClick={closeModal}>닫기</button> */}
      </div>
    </ReactModal>
  );
};

export default Modal;
