import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'; // 1. Meka aluthen ekathu kala

// 2. METHANATA OYAGE DIGA CLIENT ID EKA PASTE KARANNA
const clientId = "219364857049-t683gqqhgt14ida1iq683svejmmmo2ma.apps.googleusercontent.com"; 

createRoot(document.getElementById('root')).render(
  // 3. Mulu App ekama me Provider eken wrap karanna oni
  <GoogleOAuthProvider clientId={clientId}>
    <StrictMode>
      <App />
    </StrictMode>
  </GoogleOAuthProvider>,
)