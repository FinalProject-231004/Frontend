import { useState, useRef } from 'react';
import { useHorizontalScroll } from '@/hooks';
import { BottomLongButton, ChoiceInput } from '@/components';
import { useRecoilState } from 'recoil';
import { PlayQuiz } from '@/types/questionTypes';
import { playQuizAtom } from '@/recoil/atoms/questionAtom';
import { useNavigate } from 'react-router';

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
      const response = await fetch(`/api/quiz/${id}/quizQuestion`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VybmFtZTMiLCJhdXRoIjoiQURNSU4iLCJleHAiOjE2OTkxNjYwNzEsImlhdCI6MTY5Nzk1NjQ3MX0.cJ2DD8-STMhzrkBhP7ll27Fjyy5t4vcNcE2E5ifnzmw`,
        },
        body: JSON.stringify({
          image: 'YOUR_IMAGE_STRING_HERE', // 이미지 문자열 정보를 여기에 넣어주세요
          requestDto: {
            title: questionData.title,
            choices: questionData.choices.map(choice => ({
              answer: choice.answer,
              isAnswer: choice.isAnswer,
            })),
          },
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
      } else {
        console.error('Failed to send data to server.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // 체크 상태를 변경하는 함수
  const handleChoiceCheck = (questionId: string) => {
    setQuestions(prevQuestions =>
      prevQuestions.map(q => {
        if (q.id === questionId) {
          return {
            ...q,
            quizChoices: q.choices.map(c =>
              c.id === c.id ? { ...c, checks: true } : { ...c, checks: false },
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
      // 마지막 문제에서는 '/' 페이지로 라우팅
      navigate('/');
    }
  };

  return (
    <div>
      <h1 className="play-quiz__title">
        Q{selectedQuestion}. {questions[selectedQuestion - 1]?.title || '제목'}
      </h1>

      {/* 문항에 이미지가 있다면 불러오기 - 이미지 요기 오세요 */}
      <img
        className="w-full h-[460px] mb-[10px] border-4 border-blue rounded-2xl bg-contain bg-center bg-no-repeat flex justify-center items-center"
        style={{
          backgroundImage: `url(${
            questions[selectedQuestion - 1]?.image || ''
          })`,
        }}
      />
      <div>
        {questions[selectedQuestion - 1]?.choices.map((choice, idx) => (
          <ChoiceInput
            key={choice.id} //
            checked={choice.isAnswer || false}
            onCheck={() =>
              handleChoiceCheck(questions[selectedQuestion - 1].id)
            }
          >
            {choice.answer || `문항 내용 짠짠 ${idx + 1}`}
          </ChoiceInput>
        ))}
      </div>
      <div className="w-[900px] h-[160px] mt-16 mx-auto">
        <div
          className="flex space-x-5 mb-5 justify-center items-center"
          ref={questionButtonContainerRef}
        >
          {Array.from({ length: totalQuestions }).map((_, idx) => (
            <div
              key={idx}
              className={`w-[72px] h-[72px] text-2xl rounded-full flex justify-center items-center border-blue border-2 ${
                idx + 1 === selectedQuestion
                  ? 'bg-blue text-white'
                  : 'bg-white text-blue'
              }`}
            >
              Q{idx + 1}
            </div>
          ))}
        </div>
        <div className="w-[900px] h-[35px] mt-5 border-2 border-blue relative rounded-[30px]">
          <div
            className="h-full bg-blue rounded-[30px]"
            style={{ width: `${(selectedQuestion / totalQuestions) * 100}%` }}
          ></div>
        </div>
      </div>
      <BottomLongButton
        onClick={() => {
          sendQuizDataToServer;
          moveToNextQuestion();
        }}
      >
        {selectedQuestion === totalQuestions ? '문제 결과보기' : '다음 문제로!'}
      </BottomLongButton>
    </div>
  );
};

export default PlayQuizGroup;
