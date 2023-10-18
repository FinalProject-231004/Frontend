import QuestionGroup from '@/components/CreateQuiz/QuestionGroup';

const CreateQuizQuestions: React.FC = () => {
  return (
    <div className="max-w-[1080px] mx-auto">
      <h2 className="text-center mt-[150px] mb-[75px] text-[32px] font-extrabold text-blue">
        퀴즈 만들기
      </h2>
      <QuestionGroup />
    </div>
  );
};

export default CreateQuizQuestions;
