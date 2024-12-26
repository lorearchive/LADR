import { NavLink } from "react-router-dom";

export default function MainSto() {
    return (
        <>
            <h1>Main Story</h1>


            <h2>Volume 1</h2>

            <div href="#" className="flex flex-row mb-10 bg-white border border-gray-200 rounded-lg shadow dark:border-gray-700 dark:bg-gray-800">
                <img src="/main/BG_CS_Abydos_02_crop.jpg" alt="Shiroko on her bike" className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"></img>
                <div className="flex flex-col justify-between p-4 pl-6 leading-normal">
                    <hgroup>
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Chapter 1</h5>
                        <p className="font-normal text-gray-700 mb-7 dark:text-gray-400"><em>Sensei is requested by Okusora Ayane of the Foreclosure Task Force to assist their school in repelling the local gangs that have been harassing them. As Sensei assists the girls of Abydos, more and more parties come into the mix, and secrets of school—and its students'—past are slowly brought to light. Will Sensei be able to save the school and its students?</em></p>
                    </hgroup>

                    <button type="button" className="px-2 justify-center py-2.5 text-sm font-medium text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-36">
                        <svg className="w-5 h-5 text-white me-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                        </svg>
                        Read Chapter
                    </button>
                </div>
            </div>


            <h2>Test</h2>
            <div href="#" className="flex flex-row mb-10 bg-white border border-gray-200 rounded-lg shadow dark:border-gray-700 dark:bg-gray-800">
                <div className="flex flex-col justify-between p-4 pl-6 leading-normal">
                    <hgroup>
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Chapter 1</h5>
                        <p className="font-normal text-gray-700 mb-7 dark:text-gray-400"><em>For testing purposes</em></p>
                    </hgroup>

                    <NavLink to="/main/test/">
                        <button type="button" className="px-2 justify-center py-2.5 text-sm font-medium text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-36">
                            <svg className="w-5 h-5 text-white me-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                            </svg>
                            Read Chapter
                        </button>
                    </NavLink>

                </div>
            </div>



        </>
    );
}