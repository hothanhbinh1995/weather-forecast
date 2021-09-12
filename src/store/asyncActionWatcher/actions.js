import { createAction, withActionTypePrefix } from "../utils/actions";

const createActionType = withActionTypePrefix("ASYNC_ACTION_WATCHER");

export const addAction = createAction(createActionType("ADD_ACTION"));
export const removeAction = createAction(createActionType("REMOVE_ACTION"));
