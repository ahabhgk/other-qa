import React from 'react'
import { HashRouter as Router, Switch } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import QandA from './pages/QandA'

const App = () => (
  <Router>
    <Switch>
      <Login path="/" exact />
      <QandA path="/qa" />
    </Switch>
  </Router>
)

export default App
