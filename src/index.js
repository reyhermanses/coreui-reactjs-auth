import 'react-app-polyfill/stable'
import 'core-js'
import React, {useState} from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { Provider } from 'react-redux'
import store from './store'



import { CButton, CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'


// function Login(props){
//   props.setIsLoggedIn(false)
//   return (
//     <>
//       test
//     </>
//   )
// }

// function App(){
//   const [isLoggedIn, setIsLoggedIn] = useState(false)

//   console.log(isLoggedIn)

//   return (
//     <>
//       <Login setIsLoggedIn={setIsLoggedIn}/>
//     </>
//   )
// }

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
