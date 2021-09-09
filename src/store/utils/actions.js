import {nthArg} from 'lodash'

export const createAction = (type, processor = nthArg()) => {
  const actionCreator = (payload) => ({
    type,
    payload: processor(payload)
  })

  actionCreator.toString = ()=>type

  return actionCreator
}

export const createAsyncAction = (type, asyncFunction) => {

}

export const withActionTypePrefix = (typePrefix)=>(type)=>`${typePrefix}/${type}`
