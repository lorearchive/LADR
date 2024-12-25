export default function Home() {
    
    return (
        <>

            <img src="/home/BG_BeachFrontSide_Night_crop.jpg" alt="The beach at night" className="mb-10"></img>

            <div id="alert-additional-content" className="p-4 mb-10 border border-gray-300 rounded-lg bg-gray-50 dark:border-gray-600 dark:bg-gray-800" role="alert">
                <div className="flex items-center">
                    <svg className="flex-shrink-0 w-4 h-4 me-2 dark:text-gray-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                    </svg>
                    <span className="sr-only">Info</span>
                    <h1 className="text-lg font-medium text-gray-800 dark:text-gray-300">Welcome to LADR!</h1>
                </div>
                <div className="mt-2 mb-4 text-sm text-gray-800 dark:text-gray-300">
                    Lore Archive's Dialogue Reader is an ultra-fast, Single-Page Application for reading Blue Archive's story on the web, created by the <a href="https://lorearchive.org" className="font-semibold underline hover:no-underline">Lore Archive</a> team.
                </div>
                <div className="flex">
                <button type="button" className="px-4 py-2 mb-2 text-sm font-medium text-center text-white rounded-lg shadow-lg bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 me-2 ">Learn More</button>

                </div>
            </div>

            <hr></hr>

            <h2>"If you're not paying for a product, you are the product."</h2>
            <p className="font-serif">The Lore Archive team is here to break this assumption. We don't sell your data, we don't track you, and we don't show you ads. We're here to provide a fast, clean, and junk-free reading experience for Blue Archive's story. We do not generate profit, and we rely on your donations to keep going.</p>


        </>

    );
}