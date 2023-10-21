import { useRecoilState } from 'recoil';
import { questionAtom } from '@/recoil/atoms/questionAtom';
import QuestionItem from '@/components/CreateQuiz/QuestionItem';
import ChoiceItem from '@/components/CreateQuiz/ChoiceItem';
import { useChoiceActions } from '@/hooks/useChoiceActions';
import { useQuestionActions } from '@/hooks/useQuestionActions';
import { useNavigate } from 'react-router-dom';
import CustomModal from '@/components/CreateQuiz/WarningModal';
import useModalState from '@/hooks/useModalState';

const QuestiontGroup: React.FC = () => {
  const [questions, setQuestions] = useRecoilState(questionAtom);
  const navigate = useNavigate();
  const choiceModal = useModalState();
  const questionModal = useModalState();
  const warningModal = useModalState();
  const completionModal = useModalState();
  const { addChoice, removeChoice, handleChoiceCheck } =
    useChoiceActions(choiceModal);
  const { addQuestion, removeQuestion } = useQuestionActions(questionModal);

  // 퀴즈 제출 전 검수
  const checkForIncompleteData = () => {
    for (const question of questions) {
      if (question.text.trim() === '') return true;

      let isCorrectExists = false;

      for (const choice of question.choices) {
        if (choice.text.trim() === '') return true;
        if (choice.isAnswer) isCorrectExists = true;
      }

      if (!isCorrectExists) return true;
    }
    return false;
  };

  const handleCompleteClick = (e: React.MouseEvent) => {
    e.preventDefault();

    if (checkForIncompleteData()) {
      warningModal.open();
    } else {
      completionModal.open();
    }
  };

  return (
    <div>
      {questions.map((question, index) => (
        <div key={question.id} className="w-[1080px]">
          <QuestionItem
            key={question.id}
            question={question}
            index={index}
            removeQuestion={removeQuestion}
            setQuestions={setQuestions}
            questions={questions}
          />
          {question.image?.preview && (
            <div
              className="w-1080px] h-[600px] mx-auto mt-[10px] mb-[20px] border-4 border-blue rounded-2xl bg-cover bg-center"
              style={{ backgroundImage: `url(${question.image.preview})` }}
            ></div>
          )}
          {question.choices.map(choice => (
            <ChoiceItem
              key={choice.id}
              choice={choice}
              questionId={question.id}
              handleChoiceCheck={handleChoiceCheck}
              handleChoiceChange={(questionId, choiceId, text) => {
                setQuestions(
                  questions.map(q =>
                    q.id === questionId
                      ? {
                          ...q,
                          choices: q.choices.map(c =>
                            c.id === choiceId ? { ...c, text } : c,
                          ),
                        }
                      : q,
                  ),
                );
              }}
              addChoice={addChoice}
              removeChoice={removeChoice}
            />
          ))}
        </div>
      ))}
      <button
        className="w-full h-[72px] mt-5 mb-[200px] text-blue text-2xl border-blue border-2 py-3 rounded-md"
        onClick={addQuestion}
      >
        + 질문 추가하기
      </button>
      <div>
        <CustomModal
          isOpen={choiceModal.isOpen}
          onRequestClose={choiceModal.close}
          title="⚠"
          message="선택지는 2개 이상 필요해요! 😣"
          buttons={<button onClick={choiceModal.close}>확인</button>}
        />

        <CustomModal
          isOpen={questionModal.isOpen}
          onRequestClose={questionModal.close}
          title="⚠"
          message="질문은 1개 이상 필요해요!🙄"
          buttons={<button onClick={questionModal.close}>확인</button>}
        />

        <CustomModal
          isOpen={warningModal.isOpen}
          onRequestClose={warningModal.close}
          title="⚠"
          message="공백이나, 체크하지 않은 선택지가 있어요!"
          buttons={<button onClick={warningModal.close}>닫기</button>}
        />

        <CustomModal
          isOpen={completionModal.isOpen}
          onRequestClose={completionModal.close}
          title="⚠"
          message="만들고나면 수정할 수 없어요!😹"
          buttons={
            <div className="flex justify-between mt-3">
              <button
                onClick={completionModal.close}
                className="w-1/2 mr-2 py-2 bg-gray-200 text-black rounded-md"
              >
                돌아가기
              </button>
              <button
                onClick={() => {
                  completionModal.close();
                  navigate('/'); // 이후에는 다 퀴즈 상세페이지로 변경하기! 💩
                }}
                className="w-1/2 ml-2 py-2 bg-blue text-white rounded-md"
              >
                퀴즈 완성
              </button>
            </div>
          }
        />
      </div>
      <div className="fixed bottom-0 w-[1080px] mx-auto bg-white">
        <button
          type="button"
          onClick={handleCompleteClick}
          className="w-full h-[80px] bg-blue font-extrabold text-[26px] text-white py-3"
        >
          작성 완료하기
        </button>
      </div>
    </div>
  );
};

export default QuestiontGroup;
