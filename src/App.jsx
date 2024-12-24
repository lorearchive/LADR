import { Routes, Route } from 'react-router-dom'
import Home from '../data/pages/Home'
import MainSto from '../data/pages/Story/MainSto';

export default function App() {
    return (
        <main>
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/main" element={<MainSto />} />
            </Routes>
        </main>
    );
}