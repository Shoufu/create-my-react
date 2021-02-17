import React from 'react'
import { render } from 'react-dom'
import Routers from './routes'
import '@styles/index.css'

render(<Routers />, document.getElementById('root'))

if (module.hot) {
  module.hot.accept()
}
