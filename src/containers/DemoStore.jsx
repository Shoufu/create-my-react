import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { getTest, removeText } from 'actions/test'

const Outer = styled.div`
  text-align: center;
`
const GetText = styled.div`
  min-height: 150px;
  padding: 20px;
  background-color: #FCC99E;

  > p {
    font-size: 30px;
  }
`
const Board = styled.div`
  min-height: 150px;
  padding: 20px;
  background-color: #FEDB9B;
  font-size: 30px;
  vertical-align: middle;
`
const Button = styled.button`
  height: 40px;
  border-radius: 5px;
  background-color: white;
  border: none;
  width: 100px;
  font-size: 20px;
  outline: none;
`
const StyledLink = styled(Link)`
  padding: 20px;
`

const mapStateToProps = ({ test }) => {
  return {
    test
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getText: bindActionCreators(getTest, dispatch),
    removeText: bindActionCreators(removeText, dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class extends Component {
  constructor(props) {
    super(props)
  }

  showResponseText = () => {
    console.log(this.props.text)
    console.log(this.props.text)
  }

  render() {
    return (
      <Outer>
        <GetText>
          <p>Just click this button to get data from '/test'</p>
          <Button onClick={this.props.getText}>Get Text</Button>
        </GetText>
        <Board>
          <p>{this.props.test.data || 'Nothing'}</p>
          <Button onClick={this.props.removeText}>Delete</Button>
        </Board>
        <StyledLink to="/">Back to root</StyledLink>
      </Outer>
    )
  }
}
