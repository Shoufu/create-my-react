import React from 'react'
import { render } from 'react-dom'
import { injectGlobal } from 'styled-components'
import { Provider } from 'react-redux'

import configureStore from './store'
import Routers from './routes'

const store = configureStore()

injectGlobal`
  body {
    margin: 0;
    padding: 0;
    font-family: sans-serif;
  }
`

render((
  <Provider store={store}>
    <Routers />
  </Provider>
), document.getElementById('root'))

if (module.hot) {
  module.hot.accept()
}
