import React, {useState, useContext} from 'react'
import { NavLink, useNavigate, Navigate, Redirect } from 'react-router-dom'
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import {
  cilBell,
  cilCommentSquare,
  cilEnvelopeOpen,
  cilLockLocked,
  cilSettings,
  cilTask,
  cilUser
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import avatar8 from './../../assets/images/avatars/8.jpg'

import { useCookies } from 'react-cookie'
import { UserContext } from '../../views/pages/login/UserContext'


import Swal from 'sweetalert2'


const AppHeaderDropdown = () => {

  const nav = useNavigate()
  
  const {value, setValue} = useContext(UserContext)
  const [cookies, setCookie] = useCookies(['token'])

  function timeout(delay) {
    return new Promise( res => setTimeout(res, delay) );
}

        const handlerLogout = async(e) => {          
          if(cookies.token !== '' || cookies.token !== undefined){
            Swal.fire({
              title: 'Success !',
              text: 'You are logged out!',
              icon: 'success'
            })
              setCookie('token', '')
              setValue(null)
              await timeout(1000)
              window.location.reload(true)
              nav('/login')
          }else{
              console.log('error logout')
              nav('/500')
          }
        
        }

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CAvatar src={avatar8} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-light fw-semibold py-2">Account</CDropdownHeader>
        <CDropdownItem href="#">
          <CIcon icon={cilBell} className="me-2" />
          Updates
          <CBadge color="info" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilEnvelopeOpen} className="me-2" />
          Messages
          <CBadge color="success" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilTask} className="me-2" />
          Tasks
          <CBadge color="danger" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilCommentSquare} className="me-2" />
          Comments
          <CBadge color="warning" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownHeader className="bg-light fw-semibold py-2">Settings</CDropdownHeader>
        <CDropdownItem to="/profile" component={NavLink}>
          <CIcon icon={cilUser} className="me-2" />
          Profile
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilSettings} className="me-2" />
          Settings
        </CDropdownItem>
        <CDropdownItem onClick={handlerLogout}>
          <CIcon icon={cilLockLocked} className="me-2" />
            Logout
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
