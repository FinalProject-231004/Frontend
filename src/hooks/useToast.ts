import { useEffect } from 'react';
import { toast } from 'react-toastify';

const useToast = () => {
  useEffect(() => {
    const triggerHourlyToast = () => {
      toast.success('라이브퀴즈짠짠짠!', {
        position: 'bottom-right',
        autoClose: 10000, // 10초 동안 표시
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    };

    const now = new Date();
    const timeUntilNextHour =
      (60 - now.getMinutes()) * 60 * 1000 - now.getSeconds() * 1000;

    const timer = setTimeout(() => {
      triggerHourlyToast();

      setInterval(
        () => {
          triggerHourlyToast();
        },
        60 * 60 * 1000,
      ); // 1시간마다 반복
    }, timeUntilNextHour);

    return () => clearTimeout(timer);
  }, []);
};

export default useToast;
