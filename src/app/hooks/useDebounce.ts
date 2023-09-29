import { useEffect } from "react";

const useDebounce = (func: Function, dependancy: any) => {
  useEffect(() => {
    const timerId = setTimeout(func, 500);
    return () => clearTimeout(timerId);
  }, [dependancy]);
};

export default useDebounce;
