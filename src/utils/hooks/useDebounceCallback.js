import { debounce } from "lodash"
import { useCallback } from "react"

const useDebounceCallback = (callback, wait)=>{
  // debounce is return a function
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedCallback = useCallback(debounce(callback, wait), [wait])

  return debouncedCallback
}

export default useDebounceCallback