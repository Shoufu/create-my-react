import React, { Component } from 'react'
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
    // eslint-disable-next-line
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
          <DemoHeader />
        </ThemeProvider>
        <DemoHeader />
        <Intro onClick={this.elementClicked}>
          To get started, edit <code>src/App.js</code> and save to reload.
        </Intro>
      </Outer>
    )
  }
}

export default App
