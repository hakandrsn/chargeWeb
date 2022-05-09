import React from 'react'
import history from '../history'
import LoginLayout from './layouts/LoginLayout'
import HomeLayout from './layouts/HomeLayout'

const App = () => {
    const username = localStorage.getItem("username")
    const admin = localStorage.getItem("admin")
    const site = localStorage.getItem("site")

    if (username && admin && site) {
        history.push("/")
        return <HomeLayout />
    } else {
        history.push("/login")
        return <LoginLayout />

    }
}

export default App