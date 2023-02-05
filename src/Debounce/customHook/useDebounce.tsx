import { useEffect, useState } from "react";

function useDebounce(value: any, delay = 1000) {
  const [debounceVal, setDebounceVal] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceVal(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debounceVal;
}

export default useDebounce;
