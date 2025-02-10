import { NavLink } from 'react-router-dom'
import ModalButton from './Preferences/ModalButton';
import { usePrefStore } from '../store';

export default function Header() {

    const lang = usePrefStore((state) => state.lang)
    
    return (
        <nav className="flex justify-between flex-grow text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
            <ul className="flex flex-wrap mx-auto -mb-px">
                <li id="ladr-header-li" className="me-2">
                    <NavLink to={`/${lang}/home`} className="ladr-header-links">Home</NavLink>
                </li>
                <li id="ladr-header-li" className="me-2">
                    <NavLink to={`/${lang}/main`} className="ladr-header-links" >Main Story</NavLink>
                </li>
                <li id="ladr-header-li" className="me-2">
                    <NavLink to="/relationship" className="ladr-header-links">Relationship Story</NavLink>
                </li>
                <li id="ladr-header-li" className="me-2">
                    <a href="#" className="ladr-header-links">Event Story</a>
                </li>
                <li>
                    <a className="inline-block p-4 text-gray-400 rounded-t-lg cursor-not-allowed dark:text-gray-500">Donate</a>
                </li>
            </ul>
            
            <form className="flex items-center max-w-sm mx-auto">   
                <label htmlFor="simple-search" className="sr-only">Search</label>
                <div className="relative w-full">
                    <div className="absolute inset-y-0 flex items-center pointer-events-none start-0 ps-3">
                        <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.03v13m0-13c-2.819-.831-4.715-1.076-8.029-1.023A.99.99 0 0 0 3 6v11c0 .563.466 1.014 1.03 1.007 3.122-.043 5.018.212 7.97 1.023m0-13c2.819-.831 4.715-1.076 8.029-1.023A.99.99 0 0 1 21 6v11c0 .563-.466 1.014-1.03 1.007-3.122-.043-5.018.212-7.97 1.023"/>
                        </svg>
                    </div>
                    <input type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search the archive..." required />
                </div>
                <button type="submit" className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                    <span className="sr-only">Search</span>
                </button>
            </form>

            <ModalButton />

        </nav>
    );
}