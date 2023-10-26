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
  console.log(id);

  const submitQuiz = async () => {
    try {
      const formData = new FormData();
      const quizTitle = questions[0]?.text || '';
      const quizChoices = questions.map(question => ({
        answer: question.text,
        checks: question.choices.some(choice => choice.isAnswer),
      }));

      const requestDto = {
        title: quizTitle,
        quizChoices,
      };

      const blob = new Blob([JSON.stringify(requestDto)], {
        type: 'application/json',
      });

      formData.append('requestDto', blob);

      if (questions[0]?.image?.file) {
        formData.append('image', questions[0].image.file);
      }

      // 요청 전송
      await axios.post(
        `${
          import.meta.env.VITE_APP_GENERATED_SERVER_URL
        }/api/quiz/${id}/quizQuestion`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VybmFtZTMiLCJhdXRoIjoiQURNSU4iLCJleHAiOjE2OTkxNjYwNzEsImlhdCI6MTY5Nzk1NjQ3MX0.cJ2DD8-STMhzrkBhP7ll27Fjyy5t4vcNcE2E5ifnzmw`,
          },
        },
      );

      navigate('/create-quiz/questions');
    } catch (error) {
      toast.error('퀴즈 생성에 실패했습니다. 다시 시도해주세요.');
      if (axios.isAxiosError(error)) {
        console.error(
          '퀴즈 생성에 실패했습니다:',
          error.response?.data || error.message,
        );
      } else {
        console.error('퀴즈 생성에 실패했습니다:', error);
      }
      throw error; // 에러를 던져서 상위 함수에서 catch 할 수 있게 함
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
    try {
      if (checkForIncompleteData()) {
        warningModal.open();
      } else {
        await submitQuiz();
        navigate('/');
      }
    } catch (error) {
      // submitQuiz에서 에러가 발생하면 여기로 온다.
      // 이 경우에는 페이지 이동을 하지 않음.
      console.error('Quiz submission failed:', error);
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
      <BottomLongButton onClick={handleNavigation}>
        작성 완료하기
      </BottomLongButton>
    </div>
  );
};

export default CreateQuestionGroup;
