import { debounce } from "lodash";
import { useCallback } from "react";

const useDebounceCallback = (callback, wait) => {
  // debounce is return a function
  const debouncedCallback = useCallback(debounce(callback, wait), [wait]);

  return debouncedCallback;
};

export default useDebounceCallback;
