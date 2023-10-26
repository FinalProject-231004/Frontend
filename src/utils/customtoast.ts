import { toast } from 'react-toastify';

export const warningToast = (message: string) => {
  toast.warn(message, {
    position: 'top-center',
    autoClose: 3000,
    hideProgressBar: false,
    rtl: false,
    pauseOnFocusLoss: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'colored',
  });
};
export const errorToast = (message: string) => {
  toast.error(message, {
    position: 'top-center',
    autoClose: 3000,
    hideProgressBar: false,
    rtl: false,
    pauseOnFocusLoss: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'colored',
  });
};
