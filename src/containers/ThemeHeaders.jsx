import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled, { ThemeProvider } from 'styled-components'
import DemoHeader from 'components/DemoHeaders'

const Outer = styled.div`
  text-align: center;
`
const Intro = styled.p`
  font-size: large;
`
class App extends Component {
  elementClicked() {
    console.log('Great!')
  }

  render() {
    return (
      <Outer>
        <ThemeProvider theme={{
          alternateTheme: true,
          fontColor: 'palevioletred',
          backgroundColor: 'papayawhip'
        }}>
          <DemoHeader title="Theme Header" />
        </ThemeProvider>
        <DemoHeader title="Demo Header" />
        <Intro onClick={this.elementClicked}>
          To get started, edit <code>src/App.js</code> and save to reload.
        </Intro>
        <Link to="/">Back to root</Link>
      </Outer>
    )
  }
}

export default App
