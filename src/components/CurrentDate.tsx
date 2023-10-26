import React, { useState, useEffect } from 'react';

const CurrentDate: React.FC = () => {
  const [today, setToday] = useState(new Date());

  useEffect(() => {
    // 현재 시간을 기준으로 다음 자정까지 남은 시간을 계산
    const now = new Date();
    const nextMidnight = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1,
      0, 0, 0
    );
    const msUntilMidnight = nextMidnight.getTime() - now.getTime();

    // 자정에 날짜를 갱신하기 위한 타이머 설정
    const timer = setTimeout(() => {
      setToday(new Date());
    }, msUntilMidnight);

    // 컴포넌트가 언마운트될 때 타이머 제거
    return () => clearTimeout(timer);
  }, [today]);

  const formatDate = (date: Date) => {
    return `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`;
  };

  return (
    <div className="text-center">
      <p className="text-[24px]">{formatDate(today)}</p>
    </div>
  );
};

export default CurrentDate;
