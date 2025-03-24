import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthContextProvider } from './context/AuthContext.jsx'
import { GithubProvider } from './context/GithubContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <GithubProvider>
    <AuthContextProvider>
    <App />
    </AuthContextProvider>
      </GithubProvider>
    </BrowserRouter>
  </StrictMode>,
)
