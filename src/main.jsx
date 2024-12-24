import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'

import './index.css'

import Header from './components/Header.jsx'
import App from './App.jsx'

// Create a root wrapper component
function Root() {
  return (
    <Router>
      <StrictMode>
        <div id="ladr-site">
          <div id="ladr-header" className="absolute top-0 flex items-center justify-center w-full">
            <div id="ladr-header-root" className="flex items-center justify-center flex-grow">
              <Header />
            </div>
          </div>

          <div id="ladr-page">
            <div id="ladr-window-root">
              <App />
            </div>
          </div>
        </div>
      </StrictMode>
    </Router>
  )
}

createRoot(document.getElementById('ladr-site')).render(<Root />)