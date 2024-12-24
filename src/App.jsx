import { Routes, Route, Navigate } from 'react-router-dom'
import Home from '../data/pages/Home'
import MainSto from '../data/pages/Story/MainSto';
import RelSto from '../data/pages/Story/RelSto';

export default function App() {
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