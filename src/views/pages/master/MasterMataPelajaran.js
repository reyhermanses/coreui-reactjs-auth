import React, {useState} from 'react'
import { useCookies } from 'react-cookie'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CRow,
} from '@coreui/react'
import axios from 'axios'
import envConfig from '../../../env.config'

import Swal from 'sweetalert2'

const MasterMataPelajaran = () => {

  const [cookies, setCookie] = useCookies(['token'])
  const [validated, setValidated] = useState(false)

  console.log(`jwt mata pelajaran : ${cookies.token.jwt}`)

  let formData = {}

  const handlingSubmit =  (e) => {

    e.preventDefault()

    const form = e.currentTarget

    formData = {
      "semester_id" : form[0].value,
      "kelas_id" : form[1].value,
      "name" : form[2].value
  }

    if (form.checkValidity() === false) {
      e.preventDefault()
      e.stopPropagation()
    }

    postMataPelajaran(formData)

  }

   const postMataPelajaran =  ()=> {
      axios.post(`${envConfig.API_URL}mata-pelajaran/`, formData, {
        headers: { 
          Authorization: `Bearer ${cookies.token.jwt}`,
          "Content-Type": "application/json",
        }
      }).then(async(response) => {
        console.log(response)
        // console.log(response.data)
        Swal.fire({
          title: 'Success !',
          text: 'Subject created',
          icon: 'success'
        })
      }).catch(async(error) => {
        console.log('error ' + error);
        Swal.fire({
          title: 'Fail !',
          text: error,
          icon: 'error'
        })
    });
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Master</strong> <small>Mata Pelajaran</small>
          </CCardHeader>
          <CCardBody>
            <p className="text-medium-emphasis small">
            </p>
              <CForm className="row gy-2 gx-3 align-items-center needs-validation" noValidate validated={validated} onSubmit={handlingSubmit}>
              <CCol xs="auto">
                  <CFormLabel className="visually-hidden" htmlFor="autoSizingInput">
                    Semester
                  </CFormLabel>
                  <CFormInput id="autoSizingInput" name="semester_id" placeholder="Semester" required/>
                </CCol>
                <CCol xs="auto">
                  <CFormLabel className="visually-hidden" htmlFor="autoSizingInput">
                    Nama Kelas
                  </CFormLabel>
                  <CFormInput id="autoSizingInput" name="kelas_id" placeholder="Kelas" required/>
                </CCol>
                <CCol xs="auto">
                  <CFormLabel className="visually-hidden" htmlFor="autoSizingInput">
                    Nama Mata Pelajaran
                  </CFormLabel>
                  <CFormInput id="autoSizingInput" name="name" placeholder="Nama Kelas" required/>
                </CCol>
                <CCol xs="auto">
                  <CButton type="submit">Submit</CButton>
                </CCol>
              </CForm>

          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
   
  )
}

export default MasterMataPelajaran
