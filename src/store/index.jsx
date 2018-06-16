import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import reducers from '@reducers'

const initialState = window.__INITIAL_STATE__ || {}
const middleware = [thunk]

// eslint-disable-next-line
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
