import React from 'react'
import styled, { keyframes } from 'styled-components'
import logo from 'assets/logo.svg'

const Header = styled.div`
  background-color: ${props => props.theme.backgroundColor || 'black'};
  height: 150px;
  padding: 20px;
  color: white;
  box-shadow: 1px 1px 1px;

  > h1 {
    font-size: 1.5em;
    color: ${props => props.theme.fontColor || 'white'};

    ${props => props.theme.alternateTheme && 'text-transform: uppercase;'}
  }
`
const spin = keyframes`
from { transform: rotate(0deg); }
to { transform: rotate(360deg); }
`
const Logo = styled.img`
  animation: ${spin} infinite 20s linear;
  height: 80px;

  ${ props => props.backwards && 'animation-direction: reverse;'}
`

export default () => (
  <Header>
    <Logo src={logo} alt="logo" />
    <Logo backwards src={logo} alt="logo" />
    <h1>Welcome to React</h1>
  </Header>
)
