import { useEffect, useState } from "react";

function useDebounce(value, delay = 1000) {
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

//Value =>e.target.value 타이핑이끝나고 1초후 불러온다!

export default useDebounce;
