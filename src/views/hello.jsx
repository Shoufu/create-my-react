import React, { Component } from 'react'
// import styled from 'styled-components'
import logo from 'assets/logo.svg'

// const Outer = styled.div`
//   text-align: center;
// `

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    )
  }
}

export default App
