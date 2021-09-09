import { nthArg } from 'lodash'

export const createAction = (type, processor = nthArg()) => {
  const actionCreator = (payload) => ({
    type,
    payload: processor(payload)
  })

  actionCreator.toString = () => type

  return actionCreator
}

const ACTION_STATES = Object.freeze({
  PENDING: "PENDING",
  FULFILLED: "FULFILLED",
  REJECTED: "REJECTED",
})

export const createAsyncAction = (type, asyncFunction) => {
  const createActionType = withActionTypePrefix(type, '_')

  const pendingAction = createAction(createActionType(ACTION_STATES.PENDING))
  const fulfilledAction = createAction(createActionType(ACTION_STATES.FULFILLED))
  const rejectedAction = createAction(createActionType(ACTION_STATES.REJECTED))

  const thunk = (...params) => async (dispatch, getState) => new Promise(async (resolve, reject) => {
    dispatch(pendingAction())

    try {
      const payload = await asyncFunction(...params, {dispatch, getState})
      dispatch(fulfilledAction(payload))
      resolve(payload)
    }
    catch (error) {
      console.log(error)
      dispatch(rejectedAction(error.message))
      reject(error)
    }
  })

  thunk.fulfilled = fulfilledAction
  thunk.rejected = rejectedAction
  thunk.pending = pendingAction

  return thunk
}

export const withActionTypePrefix = (typePrefix, deliminator = '/') => (type) => `${typePrefix}${deliminator}${type}`
