import { useRef, useCallback } from 'react';

const useDebounce = (callback: Function, delay: number) => {
  const timerRef = useRef<NodeJS.Timeout>();

  const debouncedCallback = useCallback((...args: any) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  }, [callback, delay]);

  return debouncedCallback;
};

export default useDebounce;