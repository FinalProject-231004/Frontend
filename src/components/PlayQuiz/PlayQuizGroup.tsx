import { useState, useRef, useEffect } from 'react';
import { useHorizontalScroll } from '@/hooks';
import { BottomLongButton, ChoiceInput } from '@/components';
import { useRecoilState } from 'recoil';
import { PlayQuiz } from '@/types/questionTypes';
import { playQuizAtom } from '@/recoil/atoms/questionAtom';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useParams } from 'react-router';

type PlayQuizProps = {
  totalQuestions: number;
};

const PlayQuizGroup: React.FC<PlayQuizProps> = ({ totalQuestions }) => {
  const [selectedQuestion, setSelectedQuestion] = useState(1);
  const [questions, setQuestions] = useRecoilState<PlayQuiz[]>(playQuizAtom);
  const [selectedChoiceId, setSelectedChoiceId] = useState<number | null>(null);
  const questionButtonContainerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const quizId = Number(id);

  useHorizontalScroll(questionButtonContainerRef);

  useEffect(() => {
    // questions 배열이 비어있거나 첫 번째 문항의 quizChoices 길이가 2 미만인 경우
    if (
      questions.length === 0 &&
      questions[0] &&
      questions[0].quizChoices.length < 2
    ) {
      toast.error(
        '퀴즈에 오류가 발견 됐어요 😱! 이전 페이지로 돌아갑니다 🐱‍👤',
      );
      setTimeout(() => {
        navigate(-1); // 이전 페이지로 이동
      }, 5000); // 3초 후 실행
    }
  }, []);

  const sendQuizDataToServer = async (choiceId: number) => {
    try {
      const token = `eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VybmFtZTMiLCJhdXRoIjoiQURNSU4iLCJleHAiOjE2OTkxNjYwNzEsImlhdCI6MTY5Nzk1NjQ3MX0.cJ2DD8-STMhzrkBhP7ll27Fjyy5t4vcNcE2E5ifnzmw`;
      const response = await axios.post(
        `${import.meta.env.VITE_APP_GENERATED_SERVER_URL}/api/quiz/choice`,
        {
          choiceId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );
      console.log(response);
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
    setSelectedChoiceId(choiceId);

    setQuestions(prevQuestions =>
      prevQuestions.map(q => {
        if (Number(q.id) === questionId) {
          return {
            ...q,
            quizChoices: q.quizChoices.map(c => ({
              ...c,
              checked: c.id === choiceId, // 현재 선택된 질문의 경우, 선택된 선택지만 체크
            })),
          };
        }
        return q; // 다른 질문은 변경하지 않음
      }),
    );
  };

  const moveToNextQuestion = () => {
    if (selectedQuestion < totalQuestions) {
      setSelectedChoiceId(null);
      setSelectedQuestion(prev => prev + 1);
    } else {
      navigate(`/result/${quizId}`);
    }
  };
  const handleSubmit = () => {
    if (selectedChoiceId != null) {
      sendQuizDataToServer(selectedChoiceId);
      moveToNextQuestion();
    } else {
      toast.error('선택지를 선택해주세요.');
    }
  };

  return (
    <div>
      <h1 className="play-quiz__title">
        Q{selectedQuestion}. {questions[selectedQuestion - 1]?.title || '제목'}
      </h1>
      <img
        className="w-full h-[460px] mb-[20px] border-4 border-blue rounded-2xl object-contain bg-center bg-no-repeat flex justify-center items-center slateshadow"
        src={questions[selectedQuestion - 1]?.image}
        alt="Quiz Image"
      />
      <div className="w-[900px] h-[160px] mt-16 mx-auto">
        <div
          className="flex space-x-5 mb-5 justify-center items-center"
          ref={questionButtonContainerRef}
        >
          {Array.from({ length: totalQuestions }).map((_, idx) => (
            <div
              key={idx}
              className={`min-w-[72px] h-[72px] text-2xl rounded-full flex justify-center items-center border-blue border-2 slateshadow ${
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
      <div>
        {questions[selectedQuestion - 1]?.quizChoices?.map(choice => (
          <ChoiceInput
            key={choice.choiceId}
            choiceId={choice.choiceId}
            checked={!!choice.checked}
            onCheck={() => {
              handleChoiceCheck(
                Number(questions[selectedQuestion - 1].id),
                choice.choiceId,
              );
            }}
          >
            {choice.answer}
          </ChoiceInput>
        ))}
      </div>
      <BottomLongButton onClick={handleSubmit}>
        {selectedQuestion === totalQuestions ? '문제 결과보기' : '다음 문제로!'}
      </BottomLongButton>
    </div>
  );
};

export default PlayQuizGroup;
