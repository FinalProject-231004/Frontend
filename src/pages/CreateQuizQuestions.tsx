import { CreateQuestionGroup } from '@/components';

const CreateQuizQuestions: React.FC = () => {
  return (
    <div className="max-w-[1080px] mx-auto">
      <h2 className="title">퀴즈 만들기</h2>
      <CreateQuestionGroup />
    </div>
  );
};

export default CreateQuizQuestions;
