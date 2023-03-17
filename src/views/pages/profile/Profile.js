import React from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CWidgetStatsF
} from '@coreui/react'


import CIcon from '@coreui/icons-react'

import {
  cilUser,
} from '@coreui/icons'

import { DocsExample } from '../../../components'

import ReactImg from '../../../assets/images/react.jpg'

const Profile = () => {

  return (
    <CCard className="mb-4">
      <CCardHeader>Widgets</CCardHeader>
      <CCardBody>
         <CRow>
                  <CCol>
                    {/* <CWidgetStatsF
                      className="mb-3"
                      icon={<CIcon width={24} icon={cilUser} size="xl" />}
                      title= {userData.role }
                      value= {userData.name + ' / ' + userData.username}
                      color="secondary"
                    /> */}
                  </CCol>
            </CRow>
      </CCardBody>
    </CCard>
     
  )
}

export default Profile
