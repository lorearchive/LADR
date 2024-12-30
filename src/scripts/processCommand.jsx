export default function processCommand (array) {

    const command = array[0]
    const instruction = array[1]
    const instruction2 = array[2]
    const instruction3 = array[3]
    

    // This is pretty damn ugly.


    switch (command) {

        case '#title':
            if (instruction2) {

                return (
                    <h2 id="EpTitle" className="noto-serif-kr text-2xl my-1 mb-6 font-bold relative pl-4 before:content-[''] before:absolute before:inset-y-0 before:left-0 before:w-1 before:bg-gradient-to-b before:from-transparent before:to-blue-600">
                        {instruction}:{instruction2}
                    </h2>
                );

            } else {
                return (
                    <h2 id="EpTitle" className="noto-serif-kr text-2xl my-1 mb-6 font-bold relative pl-4 before:content-[''] before:absolute before:inset-y-0 before:left-0 before:w-1 before:bg-gradient-to-b before:from-transparent before:to-blue-600">
                        {instruction}
                    </h2>
                );
            }

        case '#place':

            if (instruction2) {
                return (
                    <div id="EpPlace" className="flex items-center p-2 pr-3 my-1 mb-6 text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="gray" className="mr-2 size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                        </svg>
    
                        <h5 id="EpPlaceTag" className="flex items-center noto-serif-kr dark:text-gray-400">
                            <em>{instruction} // {instruction2}</em>
                        </h5>
                    </div>
                );

            } else {
                return (
                    <div id="EpPlace" className="flex items-center p-2 pr-3 my-1 mb-6 text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="gray" className="mr-2 size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                        </svg>
    
                        <h5 id="EpPlaceTag" className="flex items-center noto-serif-kr dark:text-gray-400">
                            <em>{instruction}</em>
                        </h5>
                    </div>
                );

            }


        case '#wait':
            return (<><br />nodial<br /></>)

        case '#na':
            if (array.length === 3) {
                return (
                    <div className="p-2 rounded noto-serif-kr flex">
                        <div id="speaker" className="flex mr-2 w-40 justify-end">
                            <p className="font-semibold text-gray-600">
                                {instruction}:
                            </p>
                        </div>
                        <div id="dialogue" className="text-gray-200">
                            <q>
                                {instruction2}
                            </q>
                        </div>
                    </div>
                );
            } else {
                return <p>{array}</p>;

            }
            
    


        case '#1':
        case '#2':
        case '#3':
        case '#4':
        case '#5':
            switch(instruction) {
                case 'm1':
                case 'm2':
                case 'm3':
                case 'm4':
                case 'm5':
                    return ( '' );
            
                case 'em':
                    switch(instruction2) {
                        case '[음표]':
                            return (
                                <span className="emsvg">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6"><path stroke-linecap="round" stroke-linejoin="round" d="m9 9 10.5-3m0 6.553v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 1 1-.99-3.467l2.31-.66a2.25 2.25 0 0 0 1.632-2.163Zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 0 1-.99-3.467l2.31-.66A2.25 2.25 0 0 0 9 15.553Z" />
                                    </svg>
                                </span>
                            )

                        case '[반짝]':
                            return (
                                <span className="emsvg">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6"><path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
                                    </svg>
                                </span>
                            )

                        case '[?]':
                            return (
                                <span className="emsvg">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6"><path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
                                    </svg>
                                </span>
                            )

                        case '[?!]':
                            return (
                                <p>?!</p>
                            )

                        case '[빠직]':
                            return (
                                <span className="emsvg">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6"><path stroke-linecap="round" stroke-linejoin="round" d="M15.182 16.318A4.486 4.486 0 0 0 12.016 15a4.486 4.486 0 0 0-3.198 1.318M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
                                    </svg>
                                </span>
                            )
                        case '[반응]':
                            return ('')
                        
                        default:
                            return instruction2

                    }

            
                case 'a':
                    return <br />

                case '#all':
                    switch(instruction) {
                        case 'hide':
                            return <br />
                        default:
                            return instruction
                    }


                case 'greeting':
                case 'stiff':
                case 'hophop':
                case 'jump':
                    return ('')



            }

    }




};