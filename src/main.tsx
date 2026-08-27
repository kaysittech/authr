import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import { AdminApp } from './AdminApp'
import './index.css'

// Dynamic Subdomain / Portal Routing
const isAdminPortal = 
  window.location.hostname.startsWith('admin') || 
  window.location.pathname.startsWith('/admin') || 
  window.location.search.includes('portal=admin');

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {isAdminPortal ? <AdminApp /> : <App />}
  </React.StrictMode>,
)
