import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useHorizontalScroll, usePlayQuiz } from '@/hooks';
import { BottomLongButton, ChoiceInput } from '@/components';
import { useSetRecoilState } from 'recoil';
import { playQuizAtom } from '@/recoil/atoms/questionAtom';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useParams } from 'react-router';

type PlayQuizProps = {
  totalQuestions: number;
};

const PlayQuizGroup: React.FC<PlayQuizProps> = React.memo(
  ({ totalQuestions }) => {
    const [selectedQuestion, setSelectedQuestion] = useState(1);
    const [selectedChoiceId, setSelectedChoiceId] = useState<number | null>(
      null,
    );
    const questionButtonContainerRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    const { id } = useParams<{ id: string }>();
    const quizId = Number(id);
    const { questions, loading } = usePlayQuiz(quizId);
    const setQuestions = useSetRecoilState(playQuizAtom);

    useHorizontalScroll(questionButtonContainerRef);

    useEffect(() => {
      if (
        questions.length === 0 &&
        questions[0] &&
        questions[0].quizChoices.length < 2
      ) {
        toast.error(
          '퀴즈에 오류가 발견 됐어요 😱! 이전 페이지로 돌아갑니다 🐱‍👤',
        );
        setTimeout(() => {
          navigate(-1);
        }, 5000);
      }
    }, []);

    const sendQuizDataToServer = async (choiceId: number) => {
      try {
        const token = localStorage.getItem('Authorization');
        let headers: {
          'Content-Type': string;
          Authorization?: string;
        } = {
          'Content-Type': 'application/json',
        };

        if (token) {
          headers = {
            ...headers,
            Authorization: `Bearer ${token}`,
          };
        }

        await axios.post(
          `${import.meta.env.VITE_APP_GENERATED_SERVER_URL}/api/quiz/choice`,
          { choiceId },
          {
            headers: headers,
          },
        );
      } catch (error) {
        if (axios.isAxiosError(error)) {
          // );
        } else if (error instanceof Error) {
          // console.error('예상치 못한 오류가 발생했습니다:', error.message);
        }
      }
    };

    const handleChoiceCheck = useCallback(
      (questionId: number, choiceId: number) => {
        setSelectedChoiceId(choiceId);

        setQuestions(prevQuestions =>
          prevQuestions.map(q => {
            if (Number(q.id) === questionId) {
              return {
                ...q,
                quizChoices: q.quizChoices.map(c => ({
                  ...c,
                  checked: c.id === choiceId,
                })),
              };
            }
            return q;
          }),
        );
      },
      [questions, selectedChoiceId],
    );

    const moveToNextQuestion = () => {
      if (selectedQuestion < totalQuestions) {
        setSelectedChoiceId(null);
        setSelectedQuestion(prev => prev + 1);
      } else {
        navigate(`/quiz/result/${id}`);
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

    if (loading) {
      return <div className="hidden">Loading...</div>;
    }

    return (
      <div className="w-screen">
        <div className="w-[720px] mx-auto">
          <h1 className="play-quiz__title">
            Q{selectedQuestion}.{' '}
            {questions[selectedQuestion - 1]?.title || '제목'}
          </h1>
          <div className="max-w-[650px] mb-5 mx-auto">
            <div
              className="flex space-x-5 justify-center items-center"
              ref={questionButtonContainerRef}
            >
              {Array.from({ length: totalQuestions }).map((_, idx) => (
                <div
                  key={idx}
                  className={`w-[40px] h-[40px] rounded-full flex justify-center items-center border-blue border-2 slateshadow ${
                    idx + 1 === selectedQuestion
                      ? 'bg-blue text-white boder-blue'
                      : 'bg-white text-blue border-white'
                  }`}
                >
                  Q{idx + 1}
                </div>
              ))}
            </div>
            <div className="h-[28px] mt-5 border-2 border-blue rounded-[30px] slateshadow">
              <div
                className="h-full bg-blue rounded-[30px]"
                style={{
                  width: `${(selectedQuestion / totalQuestions) * 100}%`,
                }}
              ></div>
            </div>
          </div>
          <img
            className="w-full h-[305px] mb-[20px] border-4 border-blue rounded-2xl object-contain bg-center bg-no-repeat flex justify-center items-center slateshadow"
            src={questions[selectedQuestion - 1]?.image}
            alt="Quiz Image"
          />
          <div className="mb-48">
            {questions[selectedQuestion - 1]?.quizChoices?.map(choice => (
              <ChoiceInput
                key={choice.choiceId}
                choiceId={String(choice.choiceId)}
                checked={selectedChoiceId === choice.choiceId}
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
        </div>
        <BottomLongButton onClick={handleSubmit}>
          {selectedQuestion === totalQuestions
            ? '문제 결과보기'
            : '다음 문제로!'}
        </BottomLongButton>
      </div>
    );
  },
);

export default PlayQuizGroup;
