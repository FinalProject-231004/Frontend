import React from 'react';
import { PacmanLoader } from 'react-spinners';

const LoadingSpinner: React.FC = () => {
  return (
    <div>
      <PacmanLoader color="#0078FF" />
    </div>
  );
};

export default LoadingSpinner;
