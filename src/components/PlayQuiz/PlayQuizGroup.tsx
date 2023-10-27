import { useState, useRef } from 'react';
import { useHorizontalScroll } from '@/hooks';
import { BottomLongButton, ChoiceInput } from '@/components';
import { useRecoilState } from 'recoil';
import { PlayQuiz } from '@/types/questionTypes';
import { playQuizAtom } from '@/recoil/atoms/questionAtom';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { postAPI } from '@/apis/axios';

type PlayQuizProps = {
  totalQuestions: number;
};

const PlayQuizGroup: React.FC<PlayQuizProps> = ({ totalQuestions }) => {
  const [selectedQuestion, setSelectedQuestion] = useState(1);
  const [questions, setQuestions] = useRecoilState<PlayQuiz[]>(playQuizAtom);
  const questionButtonContainerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useHorizontalScroll(questionButtonContainerRef);

  const sendQuizDataToServer = async (id: number, questionData: PlayQuiz) => {
    try {
      const response = await postAPI(
        `${import.meta.env.VITE_APP_GENERATED_SERVER_URL}/api/choice/${id}`,
        {
          image: '',
          requestDto: {
            title: questionData.title,
            choices: questionData.quizChoices.map(choice => ({
              answer: choice.answer,
              checks: choice.checks,
            })),
          },
        },
      );
      console.log(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Failed to send data to server:', error.response?.data);
      } else {
        console.error('An unexpected error occurred:', error);
      }
    }
  };

  // 체크 상태를 변경하는 함수
  const handleChoiceCheck = (questionId: number, choiceId: number) => {
    setQuestions(prevQuestions =>
      prevQuestions.map(q => {
        if (Number(q.id) === questionId) {
          return {
            ...q,
            quizChoices: q.quizChoices.map(c =>
              c.id === choiceId
                ? { ...c, checks: !c.checks }
                : { ...c, checks: false },
            ),
          };
        }
        return q;
      }),
    );
  };

  const moveToNextQuestion = () => {
    if (selectedQuestion < totalQuestions) {
      setSelectedQuestion(prev => prev + 1);
    } else {
      // 나중에 결과페이지로 변경변경변경 🐣
      navigate('/');
    }
  };

  console.log(questions, selectedQuestion);
  return (
    <div>
      <h1 className="play-quiz__title">
        Q{selectedQuestion}. {questions[selectedQuestion - 1]?.title || '제목'}
      </h1>
      <div className="w-[900px] h-[160px] mt-16 mx-auto">
        <div
          className="flex space-x-5 mb-5 justify-center items-center"
          ref={questionButtonContainerRef}
        >
          {Array.from({ length: totalQuestions }).map((_, idx) => (
            <div
              key={idx}
              className={`w-[72px] h-[72px] text-2xl rounded-full flex justify-center items-center border-blue border-2 slateshadow ${
                idx + 1 === selectedQuestion
                  ? 'bg-blue text-white boder-blue'
                  : 'bg-white text-blue border-white'
              }`}
            >
              Q{idx + 1}
            </div>
          ))}
        </div>
        <div className="w-[900px] h-[35px] mt-5 border-2 border-blue relative rounded-[30px] slateshadow">
          <div
            className="h-full bg-blue rounded-[30px]"
            style={{ width: `${(selectedQuestion / totalQuestions) * 100}%` }}
          ></div>
        </div>
      </div>
      <img
        className="w-full h-[460px] mb-[20px] border-4 border-blue rounded-2xl object-contain bg-center bg-no-repeat flex justify-center items-center slateshadow"
        src={questions[selectedQuestion - 1]?.image}
        alt="Quiz Image"
      />
      <div>
        {questions[selectedQuestion - 1]?.quizChoices?.map((choice, idx) => (
          <ChoiceInput
            key={choice.id}
            checked={choice.checks}
            onCheck={() =>
              handleChoiceCheck(
                Number(questions[selectedQuestion - 1].id),
                choice.id,
              )
            }
          >
            {choice.answer || `문항 내용 짠짠 ${idx + 1}`}
          </ChoiceInput>
        ))}
      </div>

      <BottomLongButton
        onClick={() => {
          sendQuizDataToServer(
            parseInt(questions[selectedQuestion - 1].id),
            questions[selectedQuestion - 1],
          );
          moveToNextQuestion();
        }}
      >
        {selectedQuestion === totalQuestions ? '문제 결과보기' : '다음 문제로!'}
      </BottomLongButton>
    </div>
  );
};

export default PlayQuizGroup;
