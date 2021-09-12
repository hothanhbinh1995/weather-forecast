import { nthArg } from "lodash"

const arrayToObject = (
  arr,
  { keyMapper = nthArg(), valueMapper = nthArg() } = {}
) => {
  if (!arr) {
    return arr
  }

  return arr.reduce((acc, value) => ({ ...acc, [keyMapper(value)]: valueMapper(value) }), {})
}

export default arrayToObject