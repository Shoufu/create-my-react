import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Hello from '@containers/Hello'

export default () => (
  <Router>
    <Switch>
      <Route path="/" exact component={Hello} />
    </Switch>
  </Router>
)
