import React from 'react'
import { render } from 'react-dom'
import { injectGlobal } from 'styled-components'
import Hello from './views/Hello'

injectGlobal`
  body {
    margin: 0;
    padding: 0;
    font-family: sans-serif;
  }
`

render(<Hello />, document.getElementById('root'))

if (module.hot) {
  module.hot.accept()
}
