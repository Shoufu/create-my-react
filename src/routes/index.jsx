import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Hello from 'containers/Hello'
import ThemeHeaders from 'containers/ThemeHeaders'
import DemoStore from 'containers/DemoStore'

export default () => (
  <Router>
    <Switch>
      <Route path="/" exact component={Hello} />
      <Route path="/themeheaders" component={ThemeHeaders} />
      <Route path="/demostore" component={DemoStore} />
    </Switch>
  </Router>
)
