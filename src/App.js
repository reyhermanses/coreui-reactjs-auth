import React, { Component, Suspense, useState, setState, Switch, useEffect } from 'react'
import { HashRouter, Route, Routes, Navigate } from 'react-router-dom'
import './scss/style.scss'

import {
  CSpinner
} from '@coreui/react'
import Logout from './views/pages/login/Logout'
import ProtectedRoute from './components/protectedRoutes'

import { UserContext } from './views/pages/login/UserContext'
import { CookiesProvider } from 'react-cookie';
import { useCookies } from 'react-cookie'


// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
// const Login = import('./views/pages/login/Login')
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

// Profile
const Profile = React.lazy(() => import('./views/pages/profile/Profile'))



const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"><CSpinner variant="grow"/></div>
  </div>
)


function App () {

  const [value, setValue] = useState(null)
  const [session, sessionState]  = useState(null)
  const [cookies, setCookie] = useCookies(['token'])


  useEffect(() => {
    if(value){
      console.log('existing!')
      sessionState(value)
    }else {
      console.log('unexisting!')
      sessionState(null)
    }
  }, [session, value, sessionState, setValue]);

  console.log(`session : ${session}`)
  console.log(`value : ${value}`)

  return (
      <HashRouter>
        <Suspense fallback={loading}>
          <UserContext.Provider value={{value, setValue}}>
            <CookiesProvider>
              <Routes>
              <Route exact path="/login" name="Login Page" element={<Login />} />
                <Route exact path="/logout" name="Logout Page" element={<Logout />} />
                <Route exact path="/register" name="Register Page" element={<Register />} />
                <Route exact path="/404" name="Page 404" element={<Page404 />} />
                <Route exact path="/500" name="Page 500" element={<Page500 />} />
                <Route path="*" name="Home" element={cookies.token ? (<DefaultLayout/>) : (<Navigate to="/login" replace/>)} />
                {/* <ProtectedRoute path="*" element={DefaultLayout} /> */}
              </Routes>
            </CookiesProvider>
          </UserContext.Provider>
        </Suspense>
      </HashRouter>
    )
}

export default App
