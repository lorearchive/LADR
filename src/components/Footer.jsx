export default function Footer() {
    return (

        <footer id="ladr-footer" className="bg-white rounded-lg shadow mt-7 dark:bg-gray-900">
            <div className="w-full max-w-screen-xl p-4 mx-auto md:py-8">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <a href="https://flowbite.com/" className="flex items-center mb-4 space-x-3 sm:mb-0 rtl:space-x-reverse">
                        <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Lore Archive</span>
                    </a>
                    <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                        <li>
                            <a href="#" className="hover:underline me-4 md:me-6">Bluesky</a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline me-4 md:me-6">GitHub</a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline me-4 md:me-6">Discord</a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline">Contact</a>
                        </li>
                    </ul>
                </div>
                <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">Built by Cieron with 🍵</span>
            </div>
        </footer>

    );
}