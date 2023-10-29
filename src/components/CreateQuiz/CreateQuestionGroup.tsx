import { useRecoilState } from 'recoil';
import { questionAtom } from '@/recoil/atoms/questionAtom';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useParams } from 'react-router';
import {
  QuestionItem,
  ChoiceItem,
  WarningModal,
  BottomLongButton,
} from '@/components';
import { useChoiceActions, useQuestionActions, useModalState } from '@/hooks';
const CreateQuestionGroup: React.FC = () => {
  const [questions, setQuestions] = useRecoilState(questionAtom);
  const navigate = useNavigate();
  const warningModal = useModalState();
  const completionModal = useModalState();
  const { addChoice, removeChoice, handleChoiceCheck } = useChoiceActions();
  const { addQuestion, removeQuestion } = useQuestionActions();
  const { id } = useParams();
  const submitQuiz = async () => {
    try {
      const formData = new FormData();
      const requestDtoArray = questions.map(question => {
        const quizTitle = question.text || '';
        const quizChoices = question.choices.map(choice => ({
          answer: choice.text,
          checks: choice.isAnswer,
        }));
        return {
          title: quizTitle,
          quizChoices,
        };
      });

      // Blob 객체로 변환
      const requestDtoBlob = new Blob([JSON.stringify(requestDtoArray)], {
        type: 'application/json',
      });
      formData.append('requestDto', requestDtoBlob);

      // 이미지 파일을 배열로
      const images = questions
        .map(question => question.image?.file)
        .filter(Boolean);

      if (images.length === 0) {
        toast.error('모든 질문에 이미지를 첨부해주세요.');
        return false;
      }

      images.forEach(image => {
        if (image instanceof File) {
          formData.append('image', image);
        }
      });

      const token = localStorage.getItem('Authorization');
      if (!token) {
        toast.error('로그인이 필요합니다. 🙇‍♀️');
        return false;
      }

      // API 요청
      await axios.post(
        `${
          import.meta.env.VITE_APP_GENERATED_SERVER_URL
        }/api/quiz/${id}/quizQuestion`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      navigate('/create-quiz/questions');
      return true;
    } catch (error) {
      // ...
    }
  };

  // 퀴즈 제출 전 검수
  const checkForIncompleteData = () => {
    return questions.some(question => {
      if (!question.text.trim()) return true;
      const isCorrectExists = question.choices.some(
        choice => choice.isAnswer && choice.text.trim(),
      );
      return (
        !isCorrectExists || question.choices.some(choice => !choice.text.trim())
      );
    });
  };

  const handleNavigation = async () => {
    if (checkForIncompleteData()) {
      warningModal.open();
    } else {
      const result = await submitQuiz();
      if (result) {
        navigate('/');
      }
    }
  };

  return (
    <div className="mb-48">
      {questions.map((question, index) => (
        <div key={question.id} className="w-full">
          <QuestionItem
            key={question.id}
            question={question}
            index={index}
            removeQuestion={removeQuestion}
            setQuestions={setQuestions}
            questions={questions}
          />
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

      <div>
        {/* 추후 모달관련 로직 따로 분리하기 */}
        <WarningModal
          isOpen={warningModal.isOpen}
          onRequestClose={warningModal.close}
          title="⚠"
          message="공백이나, 체크하지 않은 선택지가 있어요!"
          buttons={<button onClick={warningModal.close}>닫기</button>}
        />
        <WarningModal
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

      <div className="fixed bottom-[95px]">
        <div className="flex justify-between gap-2.5">
          <button
            className="w-[355px] h-[58px] text-blue text-lg font-extrabold bg-white border-blue border-2 py-3 rounded-md"
            onClick={addQuestion}
          >
            + 질문 추가하기
          </button>
          <button
            className="w-[355px] h-[58px] text-white text-lg font-extrabold bg-slate-200 border-2 py-3 rounded-md"
            onClick={() => {}}
          >
            임시저장 하기
          </button>
        </div>
        <BottomLongButton onClick={handleNavigation}>
          작성 완료하기
        </BottomLongButton>
      </div>
    </div>
  );
};
export default CreateQuestionGroup;
