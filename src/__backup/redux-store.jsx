import { createStore, applyMiddleware, combineReducers } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'

/**
 * 这里是 Redux Store 的备份代码，如果想使用 redux 则可以使用这份代码
 */

const initialState = window.__INITIAL_STATE__ || {}
const middleware = [thunk]
const reducers = combineReducers({})

if (process.env.NODE_ENV !== 'production') {
  const logger = createLogger()
  middleware.push(logger)
}

export default function configureStore() {
  const store = createStore(
    reducers,
    initialState,
    applyMiddleware(...middleware)
  )

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('@reducers', () => {
      const nextRootReducer = require('@reducers')
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
