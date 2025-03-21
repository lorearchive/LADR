import { NavLink, useParams } from "react-router-dom";


function DirectoryFile({ chapter: chapter, desc: desc, link: link }) {
    
    return (
        <div href="#" className="flex flex-row mb-10 bg-white border border-gray-200 rounded-lg shadow dark:border-gray-700 dark:bg-gray-800">
        <div className="flex flex-col justify-between p-4 pl-6 leading-normal">
            <hgroup>
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Chapter { chapter }</h5>
                <p className="font-normal text-gray-700 mb-7 dark:text-gray-400"><em>{ desc }</em></p>
            </hgroup>

            <NavLink to={link}>
                <button type="button" className="px-2 justify-center py-2.5 text-sm font-medium text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-36">
                    <svg className="w-5 h-5 text-white me-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                        <path strokeLinecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                    </svg>
                    Read Chapter
                </button>
            </NavLink>

        </div>
    </div>
    )
    
    
}


export default function MainSto() {

    const { lang } = useParams()
    return (
        <>
            <h1 className="mb-7">Main Story</h1>
            <h2 className="mb-7">Volume 1</h2>

            <DirectoryFile chapter="1" desc="Abydos?" link={`/${lang}/main/1/1/`} />
            <DirectoryFile chapter="2" desc="Abydos?" link={`/${lang}/main/1/2/`} />
            <DirectoryFile chapter="3" desc="Abydos?" link={`/${lang}/main/1/3/`} />

            
        </>
    );
}