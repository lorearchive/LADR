import PropTypes from 'prop-types'

import { fetchSprites } from "../../state/spriteids.ts";

import ProcessSelector from "./ProcessSelector.jsx";
import { ProcessVariator } from "./Cpu.tsx";
import { CreateEmLine, CreateHtmlLine } from "./CreateLine.tsx";



export default function ProcessCommand({ array, fontSize = 0, dialogue = "", NestedArray = [...Array(2)].map(e => Array(2)) }) {

    const command = array[0];
    const instruction = array[1];
    const instruction2 = array[2];
    const instruction3 = array[3];
    const instruction4 = array[4];

    let speaker
    let position = command.replace(/^#/, "")
    let svg


    // sorry

    switch (command) {
        case "#title":
            if (instruction2) {
                return (
                    <h2 id="EpTitle" className="noto-serif-kr text-2xl my-1 mb-6 font-bold relative pl-4 before:content-[''] before:absolute before:inset-y-0 before:left-0 before:w-1 before:bg-gradient-to-b before:from-transparent before:to-blue-600">
                        {instruction} // {instruction2}
                    </h2>
                 );

            } else {
                return (
                    <h2 id="EpTitle" className="noto-serif-kr text-2xl my-1 mb-6 font-bold relative pl-4 before:content-[''] before:absolute before:inset-y-0 before:left-0 before:w-1 before:bg-gradient-to-b before:from-transparent before:to-blue-600">
                        {instruction}
                    </h2>
                );
            }

        case "#place":
            if (instruction2) {
                return (
                    <div id="EpPlace" className="flex items-center p-2 pr-3 my-1 mb-6 text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="gray" className="mr-2 size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                        </svg>

                        <h5 id="EpPlaceTag" className="flex items-center noto-serif-kr dark:text-gray-400">
                            <em>
                                {instruction} // {instruction2}
                            </em>
                        </h5>
                    </div>
                );

            } else {

                return (
                    <div id="EpPlace" className="flex items-center p-2 pr-3 mb-4 text-sm mt-11">
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="gray"
                        className="flex items-center justify-center mr-2 size-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                            />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                            />
                        </svg>

                        <h5
                        id="EpPlaceTag"
                        className="flex items-center noto-serif-kr dark:text-gray-400"
                        >
                            <em>{instruction}</em>
                        </h5>
                    </div>
                );
            }

        case "#na":
            if (array.length !== 3 && array.length !== 2) {
                throw new Error("LADR: #na ARR LENGTH NOT 3 AND 2", array)
            }
        
            if (fontSize !== 0) {
                if (array.length === 3) {

                    dialogue = ProcessVariator(instruction2)
                    speaker = instruction
                    return CreateHtmlLine("normal", dialogue, speaker, fontSize)
                
                } else if (array.length === 2) {
                    dialogue = ProcessVariator(instruction)
                    return CreateHtmlLine("narration", dialogue, undefined, fontSize)
                }

            } else {
                if (array.length === 3) {
                    dialogue = ProcessVariator(instruction2)
                    speaker = instruction
                    return CreateHtmlLine("normal", dialogue, speaker)

                } else if (array.length === 2) {
                    dialogue = ProcessVariator(instruction)
                    return CreateHtmlLine("narration", dialogue)

                }
            }



        case "#zmc":
            switch (instruction) {
                case "instant":
                    return "";

                case "move":
                    let height = Math.round((instruction4 / 100 - 5) / 10);
                        if (height > 1) {
                        return ( <div id="visualDelay" style={{ height: `${height}px` }}></div> );
                        } else {
                            return "";
                        }

                default:
                    console.error("LADR: No valid instruction case for #zmc. Received ", instruction)
                    return "";
            }



        case "#bgshake":
        case "#showmenu":
        case "#hidemenu":
            return "";


        case "#st":
            if (array.length === 5 && instruction2 !== "instant" && instruction4 !== "") {
                return CreateHtmlLine("noSpeaker", ProcessVariator(array[4]))
            } else if (array.length === 5 && instruction2 === "instant" && instruction4 === "") {
                return ""
            } else {
                return "#st error!", array
            }
            break

        case "#stm":
            if (array.length === 5) {
                return CreateHtmlLine("center", ProcessVariator(array[4]))
            }
            break

        case "#clearST":
            return <br />;

        case "#all":
            if (instruction === "hide" || "HIDE") {
                return "";
            } else {
                console.error("LADR: No valid instruction for #all. Received ", instruction);
            }


        case "#wait":
            let height = instruction / 100 - 7;
            if (height > 2) {
                return <div id="visualDelay" style={{ height: `${height}px` }}></div>;
            } else {
                return "";
            }

        case "#fontsize":
            let fontArray = NestedArray.find((array) => array.includes("#fontsize")) || []
            let fontsizeRaw
            let fontsize

            if (fontArray.length === 2) {

                fontsizeRaw = fontArray[1]

                let a = fontsizeRaw - 70

                if (a > 0) {
                    fontsize = (a / 10) - (0.75 * (a / 10)) + 0.55
                } else {
                    fontsize = (a / 10) - 4.1
                }

                if (fontsize > 1) {
                    return fontsize
                } else {
                    console.error("LADR: calculated font size to be equal to or less than 1em. Is this right? ", NestedArray)
                    return 1
                }

            } else if (fontArray.length === 0) {
                return undefined
            } else {
                throw new Error("LADR: Invalid fontsize array passed to #fontsize command processor.", NestedArray)
            }


        case "#1":
        case "#2":
        case "#3":
        case "#4":
        case "#5":
            switch (instruction) {
                case "al":
                case "ar":
                case "d":
                case "dl":
                case "dr":
                case "black":
                    return <br />;

                case "a":
                case "h":
                case "m1":
                case "m2":
                case "m3":
                case "m4":
                case "m5":
                case "hide":
                case "jump":
                case "shake":
                case "stiff":
                case "hophop":
                case "closeup":
                case "greeting":
                    return "";

                case "fx":
                    switch (instruction2) {
                        case "{shot}":
                            return ""
                    }

                case "em":
                    return ""
                    // switch (instruction2) {
                    //     case "…":
                    //     case "[...]":
                    //         svg = (
                    //             <span className="emsvg">
                    //                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    //                     <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
                    //                 </svg>
                    //             </span>
                    //         )
                    //         return CreateEmLine(position, svg)
                    
                    //     case "[?]":
                    //         svg = (
                    //             <span className="emsvg">
                    //                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    //                     <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"/>
                    //                 </svg>
                    //             </span>
                    //         )
                    //         return CreateEmLine(position, svg)
                    
                    //     case "[!]":
                    //         svg = (
                    //             <span className="emsvg">
                    //                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    //                     <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"/>
                    //                 </svg>
                    //             </span>
                    //         )
                    //         return CreateEmLine(position, svg)
                    
                    //     case "[?!]":
                    //         svg = (
                    //             <span className="emsvg">
                    //                 <p>
                    //                     <strong>?!</strong>
                    //                 </p>
                    //             </span>
                    //         )
                    //         return CreateEmLine(position, svg)
                    
                    //     case "[반응]":
                    //     case "[속상함]":
                    //     case "[///]":
                    //         return ""
                    
                    //     case "[반짝]":
                    //         svg = (
                    //             <span className="emsvg">
                    //                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    //                     <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"/>
                    //                 </svg>
                    //             </span>
                    //         )
                    //         return CreateEmLine(position, svg)
                    
                    //     case "[재잘]":
                    //         svg = (
                    //             <span className="emsvg">
                    //                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    //                     <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"/>
                    //                 </svg>
                    //             </span>
                    //         )
                    //         return CreateEmLine(position, svg)
                    
                    //     case "[땀]":
                    //         svg = (
                    //             <span className="emsvg">
                    //                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-droplet size-5" viewBox="0 0 16 16">
                    //                     <path fillRule="evenodd" d="M7.21.8C7.69.295 8 0 8 0q.164.544.371 1.038c.812 1.946 2.073 3.35 3.197 4.6C12.878 7.096 14 8.345 14 10a6 6 0 0 1-12 0C2 6.668 5.58 2.517 7.21.8m.413 1.021A31 31 0 0 0 5.794 3.99c-.726.95-1.436 2.008-1.96 3.07C3.304 8.133 3 9.138 3 10a5 5 0 0 0 10 0c0-1.201-.796-2.157-2.181-3.7l-.03-.032C9.75 5.11 8.5 3.72 7.623 1.82z"/>
                    //                     <path fillRule="evenodd" d="M4.553 7.776c.82-1.641 1.717-2.753 2.093-3.13l.708.708c-.29.29-1.128 1.311-1.907 2.87z"/>
                    //                 </svg>
                    //             </span>
                    //         )
                    //         return CreateEmLine(position, svg)
                    
                    //     case "[빠직]":
                    //         svg = (
                    //             <span className="emsvg">
                    //                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="size-5">
                    //                     <path d="M50 20 C20 20, 15 0, 15 0 C14 -2, 16 -3, 18 -2 C20 -1, 35 15, 50 15 C65 15, 80 -1, 82 -2 C84 -3, 86 -2, 85 0 C85 0, 80 20, 50 20Z" fill="white"/>
                    //                     <path d="M50 80 C20 80, 15 100, 15 100 C14 102, 16 103, 18 102 C20 101, 35 85, 50 85 C65 85, 80 101, 82 102 C84 103, 86 102, 85 100 C85 100, 80 80, 50 80Z" fill="white"/>
                    //                     <path d="M20 50 C20 20, 0 15, 0 15 C-2 14, -3 16, -2 18 C-1 20, 15 35, 15 50 C15 65, -1 80, -2 82 C-3 84, -2 86, 0 85 C0 85, 20 80, 20 50Z" fill="white"/>
                    //                     <path d="M80 50 C80 20, 100 15, 100 15 C102 14, 103 16, 102 18 C101 20, 85 35, 85 50 C85 65, 101 80, 102 82 C103 84, 102 86, 100 85 C100 85, 80 80, 80 50Z" fill="white"/>
                    //                 </svg>
                    //             </span>
                    //         )
                    //         return CreateEmLine(position, svg)
                    
                    //     case "[음표]":
                    //         svg = (
                    //             <span className="emsvg">
                    //                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    //                     <path strokeLinecap="round" strokeLinejoin="round" d="m9 9 10.5-3m0 6.553v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 1 1-.99-3.467l2.31-.66a2.25 2.25 0 0 0 1.632-2.163Zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 0 1-.99-3.467l2.31-.66A2.25 2.25 0 0 0 9 15.553Z"/>
                    //                 </svg>
                    //             </span>
                    //         )
                    //         return CreateEmLine(position, svg)
                    //     default:
                    //     return "EMHERE", instruction2;
                    // }

        default:
          return "DEFAULTININS", instruction;
      }
    default:
      return "DEFAULTINCOM", command;
  }
}

