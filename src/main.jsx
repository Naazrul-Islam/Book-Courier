import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import router from './Router.jsx'
import { RouterProvider } from 'react-router'
import AuthProvider from './auth/AuthProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <AuthProvider> <RouterProvider router={router} /></AuthProvider>
  </StrictMode>,
)
