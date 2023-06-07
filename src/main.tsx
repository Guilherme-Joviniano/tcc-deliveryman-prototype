import React from 'react'
import ReactDOM from 'react-dom/client'
import './global/global-styles.css'
import { Home } from './templates/Home'
import Login from './services/api/fetchs/Login'

const token = localStorage.getItem('token')

if(!token) {
Login.login().then(() => {
  console.log("Logado!");
  Login.saveDetails().then(() => {
  })
})
}


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>,
)
