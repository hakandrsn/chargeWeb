import React, { useEffect } from 'react'
import { Route, Router, Switch  } from "react-router-dom"
import history from '../../history'
import Users from '../users/Users'
import UsersDetail from '../users/UsersDetail'
import UserBalance from '../users/UserBalance'

import Devices from '../devices/Devices'
import DevicesDetail from '../devices/DevicesDetail'

import HomePage from '../home/HomePage'
import Header from '../Header'
import ResetPassword from '../settings/ResetPassword'
import Profil from '../settings/Profil'
import NewUser from '../users/NewUser'
import UserUpdate from '../users/UserUpdate'
import AboutUs from '../aboutus/AboutUs'
import Contact from '../contact/Contact'

const HomeLayout = () => {
    return (
        <div className='container-fluid m-0 p-0'>
            <Router history={history}>
                <Header />
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route exact path="/users" component={Users} />
                    <Route exact path="/user/:id" component={UsersDetail} />
                    <Route exact path="/user/balance/:id" component={UserBalance} />
                    <Route exact path="/users/newuser" component={NewUser} />
                    <Route exact path="/users/update/:id" component={UserUpdate} />
                    <Route exact path="/devices" component={Devices} />
                    <Route exact path="/device/:id" component={DevicesDetail} />
                    <Route exact path="/reset/:id" component={ResetPassword} />
                    <Route exact path="/profil/:id" component={Profil} />

                    <Route exact path="/aboutus" component={AboutUs} />
                    <Route exact path="/contact" component={Contact} />


                </Switch>
            </Router>
        </div>
    )
}

export default HomeLayout