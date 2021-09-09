import configureStore from './utils/configureStore'

const store = configureStore()

export default store
export {default as withReducer} from './utils/withReducer'
export * from './utils/actions'