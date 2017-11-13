import Immutable from 'immutable'
import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import reducer from 'reducers'

const initialState = Immutable.Map({})
const middleware = [thunk]

// eslint-disable-next-line
if (process.env.NODE_ENV !== 'production') {
  const logger = createLogger()
  middleware.push(logger)
}

export default function configureStore() {
  return createStore(
    reducer,
    initialState,
    applyMiddleware(...middleware)
  )
}
