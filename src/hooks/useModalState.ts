import { useState } from 'react';

const useModalState = (initialValue = false) => {
  const [isOpen, setIsOpen] = useState(initialValue);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  return { isOpen, open, close };
};

export default useModalState;
