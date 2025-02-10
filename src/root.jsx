import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useParams, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'

import { PrefModalOpenContext } from './context.js'
import Modal from './components/Preferences/Modal.jsx'

// /data/pages/
import Home from '../data/pages/Home.jsx'
import MainSto from '../data/pages/Story/MainSto.jsx'
import RelSto from '../data/pages/Story/RelSto.jsx'

import './index.css'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'

import GetDirectory from './scripts/GetDirectory.tsx'
import GetEpisode from './scripts/GetEpisode.jsx'
import { usePrefStore } from './store.ts'
import LangUpdater from './components/Preferences/LangUpdater.tsx'

// Wrap page components with motion
const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    transition={{ duration: 0.13 }}
  >
    {children}
  </motion.div>
);

const NumberGuard1 = ({ children }) => {
    const { level1 } = useParams()

    return /^\d+$/.test(level1) ? children : <PageWrapper><GetDirectory /></PageWrapper>
}

const NumberGuard2 = ({ children }) => {
    const { level1 } = useParams()
    const { level2 } = useParams()

    return (/^\d+$/.test(level1) && /^\d+$/.test(level2)) ? children : <PageWrapper><GetEpisode /></PageWrapper>
}

const NumberGuard3 = ({ children }) => {
    const { level1 } = useParams()
    const { level2 } = useParams()
    const { level3 } = useParams()

    return (/^\d+$/.test(level1) && /^\d+$/.test(level2) && /^[\d-]+$/.test(level3)) ? children : <PageWrapper><GetDirectory /></PageWrapper>
}

// NumberGuards check if the path is made up of only numbers. This is paramount for Quick URL Navigation.


const LangGuard = ({ children }) => {
    const { lang } = useParams()

    return (/^[a-z]{2}$/.test(lang) ? children : <Navigate to={`/${lang}/home`} />)
}


function App() {

    const location = useLocation();
    const lang = usePrefStore((state) => state.lang)

    return (
        <main>
            <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                    <Route path="/"                                     element={<Navigate to={`/${lang}/home`} />} />
                    
                    <Route path="/:lang/home"                           element={ <PageWrapper><Home /></PageWrapper> } />
                    <Route path="/:lang/main"                           element={ <PageWrapper><MainSto /></PageWrapper> } />

                    <Route path="/:lang/main/:level1"                   element={ <NumberGuard1><PageWrapper><GetDirectory dir="true" /></PageWrapper></NumberGuard1> } />
                    <Route path="/:lang/main/:level1/:level2"           element={ <NumberGuard2><PageWrapper><GetDirectory /></PageWrapper></NumberGuard2> } />
                    <Route path="/:lang/main/:level1/:level2/:level3"   element={ <NumberGuard3><PageWrapper><GetEpisode /></PageWrapper></NumberGuard3> } />


                    <Route path="/relationship"                         element={ <PageWrapper><RelSto /></PageWrapper> } />
                </Routes>
            </AnimatePresence>
        </main>
    );
}

function Root() {

    const [modalOpen, setModalOpen] = useState(false)
    const close = () => setModalOpen(false)
    const open = () => setModalOpen(true)


    return (
        <Router>
            <StrictMode>

                <LangUpdater />
                
                <AnimatePresence
                    initial={false}
                    exitBeforeEnter={true}
                >
                    {modalOpen && <Modal modalOpen={modalOpen} handleClose={close} />}
                </AnimatePresence>

                <div id="ladr-header" className="top-0 z-50 flex items-center justify-center w-full">
                    <div id="ladr-header-root" className="flex items-center justify-center flex-grow">
                        <PrefModalOpenContext.Provider value={{modalOpen, open, close}}>
                            <Header />
                        </PrefModalOpenContext.Provider>
                    </div>
                </div>

                <div id="ladr-page">
                    <div id="ladr-window" className="flex justify-center pt-10 bg-transparent">
                        <App />
                    </div>
                </div>


                <Footer />
            </StrictMode>
        </Router>
    )
}

createRoot(document.getElementById('ladr-site')).render(<Root />)