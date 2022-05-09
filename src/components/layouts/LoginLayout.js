import React from 'react'
import {Route, Router, Switch } from "react-router-dom"
import Login from '../login/Login'
import history from '../../history'

const loginLayout = () => {
  return (
    <div className='container'>
    <Router history={history}>
        <Switch>
            <Route exact path="/login" component={Login} />
        </Switch>
    </Router>
    </div>
  )
}

export default loginLayout