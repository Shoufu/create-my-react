import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import DemoInput from 'components/DemoForm'
import { getTest, postTest } from 'actions/test'

const Outer = styled.div`
  text-align: center;
`
const GetText = styled.div`
  min-height: 150px;
  padding: 20px;
  background-color: #FEDB9B;

  > p {
    font-size: 30px;
  }

  > button {
    height: 40px;
    border-radius: 5px;
    background-color: white;
    border: none;
    width: 100px;
    font-size: 20px;
    outline: none;
  }
`
const Board = styled.div`
  min-height: 150px;
  padding: 20px;
  background-color: #C2CF8B;
  font-size: 30px;
  vertical-align: middle;
`

class App extends Component {
  constructor(props) {
    super(props)
    this.showResponseText = this.showResponseText.bind(this)
  }

  showResponseText() {
    console.log(this.props.responseText)
  }

  render() {
    return (
      <Outer>
        <DemoInput submit={this.props.submit} />
        <GetText>
          <p>Or just click this button to get '/test'</p>
          <button onClick={this.props.getText}>Get Text</button>
        </GetText>
        <Board>
          <p>{this.props.test}</p>
        </Board>
        <Link to="/">Back to root</Link>
      </Outer>
    )
  }
}

const mapStateToProps = (state) => {
  const test = JSON.stringify(state.test)
  return {
    test: test !== '{}' ? test : 'Nothing!'
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getText: bindActionCreators(getTest, dispatch),
    submit: bindActionCreators(postTest, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
