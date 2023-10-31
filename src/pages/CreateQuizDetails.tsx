import React from 'react';
import { CreateQuizGroup } from '@/components';

const CreateQuizDetails: React.FC = () => {
  return (
    <div className="w-screen mx-auto">
      <h2 className="title">퀴즈 만들기</h2>
      <CreateQuizGroup />
    </div>
  );
};

export default CreateQuizDetails;
