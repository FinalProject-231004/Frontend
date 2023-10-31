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

      const requestDtoBlob = new Blob([JSON.stringify(requestDtoArray)], {
        type: 'application/json',
      });
      formData.append('requestDto', requestDtoBlob);

      const images = questions
        .map(question => question.image?.file)
        .filter(Boolean);

      if (images.length === 0) {
        toast.error('모든 질문에 이미지를 첨부해주세요!');
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

  const handleNavigation = () => {
    if (checkForIncompleteData()) {
      warningModal.open();
    } else {
      completionModal.open();
    }
  };

  const handleSubmitQuiz = async () => {
    const result = await submitQuiz();
    if (result) {
      completionModal.close();
      navigate(`/quiz/${id}`);
      toast.success('퀴즈 생성 완료! 🤩');
    }
  };

  return (
    <div className="w-screen">
      <div className="w-[720px] mb-48 mx-auto">
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

        <WarningModal
          isOpen={warningModal.isOpen}
          onRequestClose={warningModal.close}
          title="🚨"
          message="공백이거나, 체크하지 않은 선택지가 있어요!"
          button={
            <div
              onClick={warningModal.close}
              className="flex justify-center items-center w-20 bg-blue text-white rounded-md py-2"
            >
              닫기
            </div>
          }
        />
        <WarningModal
          isOpen={completionModal.isOpen}
          onRequestClose={completionModal.close}
          title="🤩"
          message="작성 완료 후 수정할 수 없어요!"
          button={[
            <button
              onClick={completionModal.close}
              className="w-28 mr-4 py-2 bg-gray-200 text-black rounded-md"
            >
              돌아가기
            </button>,
            <button
              onClick={async () => {
                await handleSubmitQuiz();
              }}
              className="w-28 py-2 bg-blue text-white rounded-md"
            >
              퀴즈 완성
            </button>,
          ]}
        />

        <div className="flex justify-between gap-2.5">
          <button
            className="w-[355px] h-[55px] text-white text-lg font-extrabold bg-slate-200 border-2 py-3 rounded-md shadow-sm shadow-slate-300"
            onClick={() => {}}
          >
            임시저장 하기
          </button>
          <button
            className="w-[355px] h-[55px] text-blue text-lg font-extrabold bg-white border-blue border-2 py-3 rounded-md shadow-sm shadow-slate-300"
            onClick={addQuestion}
          >
            + 질문 추가하기
          </button>
        </div>
      </div>
      <BottomLongButton onClick={handleNavigation}>
        작성 완료하기
      </BottomLongButton>
    </div>
  );
};
export default CreateQuestionGroup;
