import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'


import Home from '../data/pages/Home'
import MainSto from '../data/pages/Story/MainSto';
import RelSto from '../data/pages/Story/RelSto';

import './index.css'

import Header from './components/Header.jsx'


function App() {
  return (
      <main>
          <Routes>
              <Route path="/" element={<Navigate to="/home" />} />

              <Route path="/mainstory" element={<Navigate to="/main" />} />


              
              <Route path="/home" element={<Home />} />
              <Route path="/main" element={<MainSto />} />
              <Route path="/relationship" element={<RelSto />} />
          </Routes>
      </main>
  );
}


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