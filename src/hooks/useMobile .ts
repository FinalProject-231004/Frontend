import { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';

export const useMobile = () => {
  const isMobileQuery = useMediaQuery({ query: '(max-width:393px)' });
  const [isMobile, setMobile] = useState(isMobileQuery);

  useEffect(() => {
    setMobile(isMobileQuery);
  }, [isMobileQuery]);

  return isMobile;
};