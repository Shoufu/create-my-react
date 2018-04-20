import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import configureStore from './store'
import Routers from './routes'
import 'styles/index.css'

const store = configureStore()

render((
  <Provider store={store}>
    <Routers />
  </Provider>
), document.getElementById('root'))

if (module.hot) {
  module.hot.accept()
}
