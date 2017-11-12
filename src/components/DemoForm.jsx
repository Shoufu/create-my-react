import React, { Component } from 'react'
import styled from 'styled-components'

const Form = styled.form`
  min-height: 150px;
  padding: 20px;
  background-color: #FCC99E;
  text-align: center;

  > input[type="text"] {
    height: 40px;
    border-radius: 5px;
    border: none;
    width: 200px;
    vertical-align: middle;
    text-align: center;
    font-size: 20px;
    padding-left: 10px;
    outline: none;
  }

  > button {
    height: 40px;
    border-radius: 5px;
    background-color: white;
    border: none;
    width: 100px;
    font-size: 20px;
    line-height: 42px;
    vertical-align: middle;
    margin-left: 15px;
    outline: none;
  }
`

export default class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    event.preventDefault()
    this.setState({ value: event.target.value })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.submit(this.state)
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <h1>Input whatever and click button to post '/test'</h1>
        <input type="text" value={this.state.value} onChange={this.handleChange} />
        <button type="submit">Post Test</button>
      </Form>
    )
  }
}
