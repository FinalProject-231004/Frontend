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
    <div className="fixed inset-0 bg-slate-500 bg-opacity-50 flex justify-center items-center">
      <div className="w-[320px] h-[330px] bg-[#F1F8FF] rounded-lg overflow-hidden shadow-md shadow-slate-400 transform transition-all p-6 md:w-[450px] md:h-[240px] sm:w-[340px] sm:h-[200px]">
        <div className="flex flex-col justify-center items-center h-full">
          <div className="sm:flex flex-col justify-center items-center">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col">
                <label className="text-blue">정답:</label>
                <input
                  type="text"
                  value={answer}
                  onChange={e => setAnswer(e.target.value)}
                />
                <label className="text-blue">맞출 사람 수:</label>
                <input
                  type="number"
                  value={numberOfPeople}
                  onChange={e => setNumberOfPeople(Number(e.target.value))}
                />
                <label className="text-blue">마일리지:</label>
                <input
                  type="number"
                  value={mileage}
                  onChange={e => setMileage(Number(e.target.value))}
                />
              </div>
              <div className="flex mx-auto">
                <div className="flex mx-auto gap-3 mt-4">
                  <button
                    type="submit"
                    className="bg-navy rounded-xl text-white py-2 px-4"
                  >
                    제출
                  </button>

                  <div>
                    <button
                      type="button"
                      className="bg-[#FF6347] rounded-xl text-white py-2 px-4"
                      onClick={handleClose}
                    >
                      취소
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminModal;
