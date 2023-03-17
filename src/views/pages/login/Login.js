import React, { useState, useEffect, useRef, useContext } from 'react'
import { Link, useNavigate, Navigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CSpinner
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'

import axios from 'axios'

import Env from '../../../env.config'

import Swal from 'sweetalert2'
import { UserContext } from './UserContext'


const Login = () => {

  const {value, setValue} = useContext(UserContext)

  const nav = useNavigate()
  const [state, setState] = useState('');
  const [data, setData] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [validated, setValidated] = useState(false)
  let dataUser = {}

  const handleSubmit = (e) => {

    e.preventDefault()

    setIsLoading(true)

    const form = e.currentTarget

    dataUser = {
      'username': e.currentTarget[0].value,
      'password': e.currentTarget[1].value
    }

    if (form.checkValidity() === false) {
      e.preventDefault()
      e.stopPropagation()
    }

    fetchUser(dataUser)

  }

  function fetchUser(){
    axios.post(Env.API_URL + "login", dataUser) 
      .then( (response) => {
        setState('success')
        setIsLoading(false)
        // let localToken = 'test'
        // let localToken = localStorage.setItem('localToken', JSON.stringify(response.data.data.auth))
        // console.log(`${localToken}`)
        console.log(response.data.data.auth)
        let storeToken = localStorage.setItem('localToken', response.data.data.auth)
        // console.log(response.data.data)
        setValue(localStorage.getItem("localToken"))

        Swal.fire({
          title: 'Success !',
          text: 'Logged in successfully',
          icon: 'success'
        })

        nav('/')
      })
      .catch((err)=>{
        console.log(err.message)
        setIsLoading(false)
        Swal.fire({
          title: 'Error!',
          text: err.message,
          icon: 'error'
        })
      });
  }



  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm className="row g-3 needs-validation" noValidate validated={validated} onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput placeholder="Username" name='username' autoComplete="username" required />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        name='password'
                        placeholder="Password"
                        autoComplete="current-password"
                        required
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4" type="submit">
                          {isLoading ? <CSpinner variant="grow"/> : 'Login'}
            </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
