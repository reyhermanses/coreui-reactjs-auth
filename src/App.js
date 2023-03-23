import React, { Component, Suspense, useState, setState, Switch, useEffect } from 'react'
import {BrowserRouter as Router, HashRouter, Route, Routes, Navigate, useNavigate,useLocation, useParams } from 'react-router-dom'
import './scss/style.scss'

import {
  CSpinner
} from '@coreui/react'
import Logout from './views/pages/login/Logout'

import { UserContext } from './views/pages/login/UserContext'
import { CookiesProvider } from 'react-cookie';
import { useCookies } from 'react-cookie'


// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))


const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"><CSpinner variant="grow"/></div>
  </div>
)


function App () {
  
  const [value, setValue] = useState(null)
  const [session, sessionState]  = useState(null)
  const [cookies, setCookie] = useCookies(['token'])
  const [url, setUrl] = useState('*')
  useEffect(() => {

    if(Object.keys(cookies)) {
      setUrl(window.location.pathname)
    }else{
      setUrl('*')
    }
    
    return () => {
      // console.log('token:', url)
    };
  }, [url]);

  // console.log(`current url : ${url}`)
  // console.log(`app cookie : ${cookies.token.jwt}`)

  console.log(`token : ${cookies.token}`)


  return (
      <Router>
        <Suspense fallback={loading}>
          <UserContext.Provider value={{value, setValue}}>
            <CookiesProvider>
              <Routes>
              <Route exact path="/login" name="Login Page" element={ <Login />} />
              <Route exact path="/register" name="Register Page" element={<Register />} />
              <Route exact path="/404" name="Page 404" element={<Page404 />} />
              <Route exact path="/500" name="Page 500" element={<Page500 />} />
              <Route path="*" name="dashboard page" element={ cookies.token !== '' ? (<DefaultLayout/>) : (<Navigate to="/login" replace/>)}/>
              </Routes>
            </CookiesProvider>
          </UserContext.Provider>
        </Suspense>
      </Router>
    )
}

export default App
