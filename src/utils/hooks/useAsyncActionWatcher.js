import { isEqual } from "lodash"
import { useSelector } from "react-redux"

const useAsyncActionWatcher = (...actions) => useSelector(
  state => actions.map(action => state.asyncActionWatcher.runningActions.includes(action.toString())),
  isEqual
)

export default useAsyncActionWatcher