import { AdminModalProps } from '@/types/liveQuiz';
import { useState } from 'react';

const AdminModal = ({ isOpen, onClose, onSubmit }: AdminModalProps) => {
  const [answer, setAnswer] = useState('');
  const [numberOfPeople, setNumberOfPeople] = useState(0);
  const [mileage, setMileage] = useState(0);

  const resetForm = () => {
    setAnswer('');
    setNumberOfPeople(0);
    setMileage(0);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({ answer, numberOfPeople, mileage });
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-md">
        <form onSubmit={handleSubmit}>
          <div>
            <label>정답:</label>
            <input
              type="text"
              value={answer}
              onChange={e => setAnswer(e.target.value)}
            />
          </div>
          <div>
            <label>맞출 사람 수:</label>
            <input
              type="number"
              value={numberOfPeople}
              onChange={e => setNumberOfPeople(Number(e.target.value))}
            />
          </div>
          <div>
            <label>마일리지:</label>
            <input
              type="number"
              value={mileage}
              onChange={e => setMileage(Number(e.target.value))}
            />
          </div>
          <div className="flex justify-between">
            <button type="submit">제출</button>
            <button type="button" onClick={handleClose}>
              취소
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminModal;
