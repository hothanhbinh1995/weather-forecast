import { ASYNC_ACTION_STATES } from "../../../constants";
import { addAction, removeAction } from "../../asyncActionWatcher";

const removeStateSuffix = (actionType, suffix) =>
  actionType.replace(`_${suffix}`, "");
const isAsyncAction = (actionType, state) => actionType.endsWith(state);

const asyncActionWatcherMiddleware = (store) => (next) => (action) => {
  const isPendingAsyncAction = isAsyncAction(
    action.type,
    ASYNC_ACTION_STATES.PENDING
  );
  const result = next(action);

  if (isPendingAsyncAction) {
    store.dispatch(
      addAction(removeStateSuffix(action.type, ASYNC_ACTION_STATES.PENDING))
    );
  }

  const isFulfilledAsyncAction = isAsyncAction(
    action.type,
    ASYNC_ACTION_STATES.FULFILLED
  );
  const isRejectedAsyncAction = isAsyncAction(
    action.type,
    ASYNC_ACTION_STATES.FULFILLED
  );

  if (isFulfilledAsyncAction || isRejectedAsyncAction) {
    store.dispatch(
      removeAction(
        removeStateSuffix(
          action.type,
          isFulfilledAsyncAction
            ? ASYNC_ACTION_STATES.FULFILLED
            : ASYNC_ACTION_STATES.REJECTED
        )
      )
    );
  }

  return result;
};

export default asyncActionWatcherMiddleware;
