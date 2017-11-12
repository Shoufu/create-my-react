import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class App extends Component {
  elementClicked() {
    console.log('Great!')
  }

  render() {
    return [
      <h1 onClick={this.elementClicked} key="title">React Tutorial</h1>,
      <ul role="nav" key="nav-list">
        <li><Link to="/themeheaders">Theme Headers</Link></li>
        <li><Link to="/demostore">Demo Store</Link></li>
      </ul>
    ]
  }
}

export default App
