import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'

import './index.css'

import Header from './components/Header.jsx'
import App from './App.jsx'

function Root() {
  return (
    <Router>
      <StrictMode>

          <div id="ladr-header" className="fixed top-0 flex items-center justify-center w-full">
            <div id="ladr-header-root" className="flex items-center justify-center flex-grow">
              <Header />
            </div>
          </div>

          <div id="ladr-page">
            <div id="ladr-window" className="flex justify-center pt-10">
              <App />
            </div>
          </div>

      </StrictMode>
    </Router>
  )
}

createRoot(document.getElementById('ladr-site')).render(<Root />)