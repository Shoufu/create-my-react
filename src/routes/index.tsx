import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import asyncImport from './bundle'

const Hello = asyncImport(() => import('@/pages/Hello'))

export const Routes = () => (
  <Router>
    <Switch>
      <Route path="/" exact component={Hello} />
    </Switch>
  </Router>
)

export default Routes
