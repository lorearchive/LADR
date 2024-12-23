import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Header from './components/Header.jsx'

createRoot(document.getElementById('ladr-header-root')).render(
  <StrictMode>
    <Header />
  </StrictMode>,
)