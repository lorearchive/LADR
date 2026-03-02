import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  
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
                    <h3 className="text-lg font-medium text-gray-800 dark:text-gray-300">Welcome to LADR!</h3>
                </div>
                <div className="mt-2 mb-4 text-sm text-gray-800 dark:text-gray-300">
                    Lore Archive's Dialogue Reader is an ultra-fast, Single-Page Application for reading Blue Archive's story on the web, created by the <a href="https://lorearchive.org" className="font-semibold underline hover:no-underline">Lore Archive</a> team.
                </div>
                <div className="flex">
                <button type="button" className="px-4 py-2 mb-2 text-sm font-medium text-center text-white rounded-lg shadow-lg bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 me-2 ">Learn More</button>

                </div>
            </div>

            <Dialog>
                <DialogTrigger className="flex items-center px-4 py-2 mb-4 ml-auto mr-auto text-sm font-medium text-center text-white rounded-lg shadow-lg hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 me-2 ">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="mr-2 size-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                    </svg>
                    What's new?
                </DialogTrigger>
                <DialogContent className="bg-gray-900">
                    <DialogHeader>
                    <DialogTitle className="mt-1!">LADR Changelog</DialogTitle>
                    <DialogDescription>
                        <em>@latest - v1.2.0beta <strong>Current</strong></em>
                        <br /><br />
                        <span style={{color: `white`}}>
                            - File management of the LJR has been improved, alongside correct file ordering
                            - Optimizations and improvements
                            <br /><br />
                            For the complete changelog, visit the <a href="https://github.com/lorearchive/LADR/blob/main/CHANGELOG.md" className="text-blue-600 underline">GitHub CHANGELOG.</a>
                        </span>

                    </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

            <hr className="border-white" />

            <h1>LADR IS CURRENTLY UNMAINTAINED. - 2 MARCH, 2026</h1>
            <p className="font-serif">As I am currently focused on developing the Lore Archive Wiki, LADR developments and maintenance will temporarily be paused. For updates, visit <a href="https://lorearchive.github.io" className="text-blue-600 underline">the updates page</a>.</p>


            <h2>Help us make LADR BETTR!</h2>
            <p className="font-serif">We don't sell your data, we don't track you, and we don't show you ads. We're here to provide a fast, clean, and junk-free reading experience for Blue Archive's story. If you like it, we invite you to propose improvements you want to see! Check out the <a href="https://github.com/orgs/lorearchive/projects/1/views/1" className="text-blue-600 underline">LADR Backlog</a> for the latest development updates.</p>
            <br></br>
            <p className="font-serif">The stylistic choices of LADR were inspired by <a href="https://github.com/050644zf" className="text-blue-600 underline">050644zf</a>'s <a href="https://astr.pages.dev/#/zh_CN/menu/maintheme" className="text-blue-600 underline">Arknights Story Text Reader</a>. Check them out!</p>
        
            
            <br />


            <h2>Pre-Release information</h2>
            <p className="font-serif">We are currently in the beta stages of LADR. Expect everything to break - if you see any issues, visit our <a href="https://github.com/lorearchive/LADR/blob/main/CONTRIBUTING.md" className="text-blue-600 underline">contributing guide</a>.</p>
            <br />
            <p className="font-serif">When you see a blank page, that means an error has occured. Please tell me more about it! Open the browser's Developer Tools by pressing Ctrl/Cmd + Shift + I, navigate to the console tab, then show us the error message! You can report it in our <a href="https://github.com/lorearchive/LADR/issues" className="text-blue-600 underline">issue tracker</a>.</p>




            <h2>TL2TJ</h2>
            <p className="font-serif"><em>TL2TJ version: v1.14</em></p>
            <br />
            <p className="font-serif">LADR uses the translations provided by TL2TJ for translations. TL2TJ is a Blue Archive mod which attempts to fix the "mistakes" the Blue Archive localizers have made.</p>


            





        </>

    );
}
