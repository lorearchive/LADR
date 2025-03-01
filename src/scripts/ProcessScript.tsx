import React, { JSX } from "react";
import { useParams } from "react-router-dom";

import _ from 'lodash';

import ProcessTokens from "./ProcessTokens.jsx";
import ProcessCommand from "./ProcessCommand.jsx";
import ProcessNestedArray from "./ProcessNestedArray.tsx";
import { CreateHtmlLine, LangNotReadyYetError } from "./CreateLine.tsx";
import GetImage from "./GetImage.tsx";

interface Object {
    SelectionGroup: number
    Transition: number
    BGName: number
    ScriptKr: string
    TextJp: string
    TextTh: string
    TextTw: string
    TextEn: string
}

let speaker: string                                                 // The speaker
let dialogue: string                                                // The
let fontsize: undefined | number = undefined                        // Font
let fontarray: (string | number)[] = []
let ignoreFor: number = 0  

let variator_fontsize: (string | number)[]  = []                    // An array which contains the fontsize variator

const variator_colour_regex = /^\[[0-9A-F]{6}\].*?\[-\]$/             // Matches EXACTLY "[HEXADECIMAL]...[-]"
const variator_colour_regexCapture = /^\[([0-9A-F]{6})\](.*?)\[-\]$/
const variator_colour_generalRegex = /\[([0-9A-F]{6})\](.*?)\[-\]/g   // Matches GENERALLY "...[HEXADECIMAL]...[-]..."
let variator_colour = "0"                                           // The captured hex code, defaulted at 0 to check if it has been changed later
let variator_colouredText: string                                   // The captured text


const variator_rubyHex = /\[ruby=(.*?)\](.*?)\[\/ruby\]/g             // Captures both ABC and DEF in "foo foo [ruby=ABC]DEF[/ruby] bar bar"
let variator_rubified: string[] = []

let previousGroup = 0
let previousDial: (string | JSX.Element)[] = []
let previousSingleDial: (string | JSX.Element)[]
let htmlSelection1: (string | JSX.Element)[] = []
let htmlSelection2: (string | JSX.Element)[] = []
let htmlSelection3: (string | JSX.Element)[] = []

let BGID: number
let Transition: number

let t9nParam: object = {}


export default function ProcessScript( { DataList }: {DataList: Object[]}) {

    const { lang } = useParams<{ lang: string }>()

    return DataList.map((item) => {
        BGID = item.BGName
        const Group = item.SelectionGroup
        Transition = item.Transition
        const script = item.ScriptKr
        let textEn
        let textJp
        let textCh
        let textTh

        if (lang === "en") {
            t9nParam = { TextEn: ProcessVariator(item.TextEn) }
            textEn = item.TextEn

        } else if (lang === "ko") {
            t9nParam = {}
        } else {
            throw new Error("LADR: Not ready for this language yet.")
        }

        const tokens = script.split(";")
        const NestedArray = ProcessTokens(tokens);


        fontarray = NestedArray.find(subarray => subarray[0] === "#fontsize") as []

        if (fontarray !== undefined) {
            let a: number = fontarray[1] as number - 70
            if (a > 0) {
                fontsize = 0.007 * (fontarray[1] as number) + 0.886

            } else if (a < 0) {
                fontsize = 0.01 * (fontarray[1] as number) + 0.3

            } else {
                console.error("LADR: Fontsize is 0.", NestedArray)
                throw new Error("LADR: Font size calculated to 0.")
            }
        } else {
            fontsize = undefined
        }


        let output = NestedArray.map((subarray: (string | number)[]) => {
            // two .map()s, one for the objects inside the DataList array, another for each of the lines inside nestedarray.

            if (ignoreFor !== 0) {
                // Ignore the arrays inside nested array for ignoreFor amount of times. Used if the entire nestedarray is passed to another function.
                ignoreFor--
                return ""

            } else if (NestedArray.some((subarray) => (subarray[0] as string).startsWith("[ns")) || NestedArray.some((subarray) => (subarray[0] as string).startsWith("[s")) || Group !== 0) {

                let nal = NestedArray.length

                if(Group === 0) {
                    let line = NestedArray.filter(subarray => {
                        return (subarray[0] as string).startsWith("[ns") || (subarray[0] as string).startsWith("[s")
                    })

                    if (nal > 1) {
                        ignoreFor = nal - 1
                    }
                    return ProcessSelector({nestedArray: line, group: Group, ...t9nParam})

                } else if (Group !== 0) {
                    ignoreFor = nal !== 1 ? nal - 1 : 0
                    return ProcessSelector({ nestedArray: NestedArray, group: Group, ...t9nParam })
                }
                
            } else if (typeof subarray[0] === 'string' && /^[1-5]$/.test(subarray[0] as string)) {
                
                if (subarray.length === 4) {
                    speaker = subarray[1] as string
                    dialogue = subarray[3] as string

                    if (fontsize !== undefined) {
                        dialogue = ProcessVariator(dialogue)
                        return CreateHtmlLine({ type: "normal", dialogue, speaker, fontsize, ...t9nParam});
                    } else {
                        dialogue = ProcessVariator(dialogue)
                        return CreateHtmlLine({ type: "normal", dialogue, speaker, ...t9nParam });
                    }
        
                } else if (subarray.length === 3) {
                    speaker = ""
                    dialogue = ''
                    return ""
        
                } else if (subarray.length === 2) {
                    speaker = ""
                    dialogue = ""
                } else if (subarray.length !== 4 && subarray.length !== 3 && subarray.length !==2) {
                    console.error("LADR: A Normal Subarray of Nested Array is not of length value 4 AND 3 AND 2. Proceeding with blank dialogue and speaker value.", subarray)
                    speaker = ""
                    dialogue = ''
                    return ""
                }
                
            } else if (typeof subarray[0] === 'string' && subarray[0].startsWith("#") && subarray[0] !== "#fontsize") {

                if (fontsize !== undefined) {
                    return ProcessCommand({array: subarray, fontSize: fontsize, ...t9nParam})
                } else {
                    return ProcessCommand({array: subarray, ...t9nParam})
                }

            } else if (typeof subarray[0] === 'string' &&  subarray[0] === "#fontsize") {
                return ""

            } else if (subarray.length === 1 && subarray[0] === "") {
                return ""

            } else {
                throw new Error("LADR: Unrecognized array type. Check the console.")
            }
        })

        if (BGID !== 0) {
            output.push(GetImage(BGID))
        }

        if (htmlSelection2.length !== 0 && Group === 0) {
            // We know htmlSelection1 is always going to be populated. We know htmlSelection3 is often not populated. Checking htmlSelection2 as well as the current group seems good to see if we have any leftover selections to render.
            const commonSelectionDivider = <div id="CommonSelectionDivider" data-selection="Common"  className="mt-2 mb-2 border-t border-dashed dark:border-slate-500"></div>
            const selectionDivider = <div id="SelectionDivider"  className="mt-2 mb-2 border-t border-dashed dark:border-slate-500"></div>


            if (htmlSelection3.length === 0) {

                if (_.isEqual(htmlSelection1, htmlSelection2)) {
                    output.unshift(commonSelectionDivider, ...htmlSelection1)
                    htmlSelection1 = []
                    htmlSelection2 = []
                } else {
                    output.unshift(selectionDivider, ...htmlSelection1, selectionDivider, ...htmlSelection2)
                    htmlSelection1 = []
                    htmlSelection2 = []
                }

            } else {
                if (_.isEqual(htmlSelection1, htmlSelection2) && _.isEqual(htmlSelection2, htmlSelection3)) {
                    output.unshift(commonSelectionDivider, ...htmlSelection1)
                    htmlSelection1 = []
                    htmlSelection2 = []
                    htmlSelection3 = []
                } else {
                    output.unshift(selectionDivider, ...htmlSelection1, selectionDivider, ...htmlSelection2, selectionDivider, ...htmlSelection3)
                    htmlSelection1 = []
                    htmlSelection2 = []
                    htmlSelection3 = []
                }
            }
        }

        if (Transition !== 0) {

            switch(Transition) {
                case 1122508889:         // Fade to black
                case 1127535352:         // Black gradient slide in from left
                case 1173843909:         // Dissolve?
                case 1369285246:         // ?
                case 1974926776:         // Fade from black
                case 2130373248:         // Blink black
                case 2136104277:         // Ease fade to black
                case 2243764445:         // Slow fade to black
                case 2482233134:         // Slow from black
                case 2752031158:         // Very slow ease fade to black
                case 3182852162:         // Slow to white, quick ease from white
                case 3656288287:         // Instant to black
                case 3785883235:         // Fade To and from white
                case 3854440696:         // ?
                case 4004024664:         // Ease dissolve
                case 42187309:           // Slow fade to and from white
                case 509674679:          // Ease to black?
                case 704731093:          // Some weird ass white slow-fast-ease-in white fade
                    output.unshift(<br />)
                    break

                case 1027503790:
                case 1626584722:         // Goofy white transition (there are so many of them which look similar )
                case 2046503352:
                case 2127590351:         // Ease out of black
                case 348351892:          // ?
                    break
                default:
                    console.error("LADR: Unrecognized transition type! Transition:", Transition)
                    throw new Error("Unrecognized transition type! Refer to the console for more info.")
            }

        }

        return output.map((element) => element)
    })
}



export function ProcessVariator( dialogue: string, telemetry?: boolean ): string {

    // Text color VARIATOR

    if (variator_colour_regex.test(dialogue)) {

        let matches = variator_colour_regexCapture.exec(dialogue) as RegExpExecArray
        variator_colour = matches[1]
        variator_colouredText = matches[2]


        dialogue = `<span class="colouredText" style="color: #${variator_colour} ">${variator_colouredText}</span>`

    } else if (variator_colour_generalRegex.test(dialogue)) {
        console.error("LADR: Received general match for custom text colouring. ", dialogue)
    }


    // RUBY TEXT VARIATOR

    if (dialogue.includes("[ruby=")) {

        variator_rubified = [...dialogue.matchAll(variator_rubyHex)].flatMap(match => [match[1], match[2]]) as [] // [rt, rb, rt, rb, rt, rb, ...]

        if (variator_rubified.length % 2 !== 0) {
            console.error("LADR: Rubified array does not contain an even amount of elements. Continuing with blank rubified array.")
            variator_rubified = []
        }

        dialogue = dialogue.replace(`[ruby=${variator_rubified[0]}]${variator_rubified[1]}[/ruby]`, `<ruby>${variator_rubified[1]}<rp>(</rp><rt>${variator_rubified[0]}</rt><rp>)</rp></ruby>`)

    }

    // newlineVARIATOR

    if (dialogue.includes("#n")) {
        dialogue = dialogue.replace(/#n/g, "<br />")
    }

    if (telemetry) {
        dialogue = dialogue.replace(dialogue, `<span style="font-style: oblique;">${dialogue}</span>`)
    }
    return dialogue
}



export function ProcessSelector({ nestedArray, group, TextEn }: { nestedArray: (string | number)[][], group: number, TextEn?: string }) {
    const { lang } = useParams<{ lang: string }>()

    // If it is a selector
    if (group === 0) {

        previousGroup = 0

        let selectorIDs = []
        let selectorID: string
        let selectorID2: string
        let selectorID3: string

        let line
        let dialogue
        let dialogue2
        let dialogue3
        
        if (nestedArray.length === 1) {

            switch (lang) {
                case "ko":
                    if ((nestedArray[0][0] as string).startsWith("[ns")) {
                        dialogue = (nestedArray[0][0] as string).slice(4)
                    } else {
                        dialogue = (nestedArray[0][0] as string).slice(3)
                    }
                    break
                case "en":
                    if (TextEn && TextEn.startsWith("[ns")) {
                        dialogue = TextEn.slice(TextEn.indexOf("]") + 1)

                    } else if (TextEn) {
                        dialogue = TextEn.slice(TextEn.indexOf("]") + 1)
                    }
                    break
                default:
                    LangNotReadyYetError()
            }
            return (
                <div id="SingleSelector" className="flex flex-col items-center justify-center p-2 my-6 rounded noto-serif-kr">
                  <div className="flex justify-center flex-shrink-0 w-6/12 p-2 m-2 transition-colors rounded-md dark:bg-slate-800 hover:dark:bg-slate-700">
                    <q className="font-semibold">
                        {dialogue}
                    </q>
                  </div>
                </div>
            )

        } else if (nestedArray.length === 2) {


            selectorIDs = nestedArray.map(subArray => {

                if ((subArray[0] as string).startsWith('[ns')) {
                    return (subArray[0] as string).slice(3, (subArray[0] as string).indexOf("]"))

                } else if ((subArray[0] as string).startsWith('[s')) {
                    return (subArray[0] as string).slice(2, (subArray[0] as string).indexOf("]"))
                }

            })

            selectorID = selectorIDs[0] as string
            selectorID2 = selectorIDs[1] as string


            switch (lang) {
                case "ko":
        
                    line = nestedArray.map(subarray => {
                        if ((subarray[0] as string).startsWith("[ns")) {
                            return (subarray[0] as string).slice((subarray[0] as string).indexOf("]") + 2)
                        } else if ((subarray[0] as string).startsWith("[s")) {
                            return (subarray[0] as string).slice((subarray[0] as string).indexOf("]") + 2)
                        }
                    });
        
        
                    dialogue = line[0]
                    dialogue2 = line[1]
                    break

                case "en":
                    if (TextEn && TextEn.startsWith("[ns")) {
                        const TextEnBr1Index = TextEn.indexOf("] ")
                        dialogue = TextEn.slice(TextEnBr1Index + 1, TextEn.indexOf("\n"))
                        dialogue2 = TextEn.slice(TextEn.indexOf(`${selectorID2}] `) + selectorID2.length + 1)
                    

                    } else if (TextEn) {
                        const TextEnBr1Index = TextEn.indexOf("] ")
                        dialogue = TextEn.slice(TextEnBr1Index + 1, TextEn.indexOf("\n"))
                        dialogue2 = TextEn.slice(TextEn.indexOf(`${selectorID2}] `) + selectorID2.length + 1)
                    }
                    break
                default:
                    LangNotReadyYetError()
            }

            
            return (
                <div id="Selectors" className="flex flex-col items-center justify-center p-2 my-6 rounded noto-serif-kr">
                    <div id={`Selector${selectorID}`} className="flex justify-center flex-shrink-0 p-2 mx-4 my-2 text-center transition-colors rounded-md w-lg dark:bg-slate-800 hover:dark:bg-slate-700">
                        <q className="font-semibold">
                            {dialogue}
                        </q>
                    </div>
                    <div id={`Selector${selectorID2}`} className="flex justify-center flex-shrink-0 p-2 mx-4 my-2 text-center transition-colors rounded-md w-lg dark:bg-slate-800 hover:dark:bg-slate-700">
                        <q className="font-semibold">
                            {dialogue2}
                        </q>
                    </div>
                </div>
            )
        } else if (nestedArray.length === 3) {

            selectorIDs = nestedArray.map(subArray => {

                if ((subArray[0] as string).startsWith('[ns')) {
                    return (subArray[0] as string).slice(3, (subArray[0] as string).indexOf("]"))

                } else if ((subArray[0] as string).startsWith('[s')) {
                    return (subArray[0] as string).slice(2, (subArray[0] as string).indexOf("]"))
                }

            })

            selectorID = selectorIDs[0] as string
            selectorID2 = selectorIDs[1] as string
            selectorID3 = selectorIDs[2] as string

            line = nestedArray.map(subarray => {
                if ((subarray[0] as string).startsWith("[ns")) {
                    return (subarray[0] as string).slice((subarray[0] as string).indexOf("]") + 2)
                } else if ((subarray[0] as string).startsWith("[s")) {
                    return (subarray[0] as string).slice((subarray[0] as string).indexOf("]") + 2)
                }
            })

            dialogue = line[0]
            dialogue2 = line[1]
            dialogue3 = line[2]

            return (
                <div id="Selectors" className="flex flex-col items-center justify-center p-2 my-6 rounded noto-serif-kr">
                    <div id={`Selector${selectorID}`} className="flex justify-center flex-shrink-0 w-6/12 p-2 m-2 transition-colors rounded-md dark:bg-slate-800 hover:dark:bg-slate-700">
                        <q className="font-semibold">
                            {dialogue}
                        </q>
                    </div>
                    <div id={`Selector${selectorID2}`} className="flex justify-center flex-shrink-0 w-6/12 p-2 m-2 transition-colors rounded-md dark:bg-slate-800 hover:dark:bg-slate-700">
                        <q className="font-semibold">
                            {dialogue2}
                        </q>
                    </div>
                    <div id={`Selector${selectorID3}`} className="flex justify-center flex-shrink-0 w-6/12 p-2 m-2 transition-colors rounded-md dark:bg-slate-800 hover:dark:bg-slate-700">
                        <q className="font-semibold">
                            {dialogue3}
                        </q>
                    </div>
                </div>
            )

        } else {
            console.error(nestedArray)
            throw new Error("LADR: This is most likely a selector. Not of length 1, 2, OR 3. Check the console for more info.")
        }

        
    } else {

        let currentHtml
        let SelectionProcessTrue = true // i dont think this is necessary

        switch (lang) {
            case "ko":
                currentHtml = ProcessNestedArray({ NestedArray: nestedArray, Group: 0, BGID, Transition, SelectionProcessTrue })
                break
            case "en":
                currentHtml = ProcessNestedArray({ NestedArray: nestedArray, Group: 0, BGID, Transition, SelectionProcessTrue, ...t9nParam })
                break
            default:
                    LangNotReadyYetError()
        }

        if (previousGroup === 0) {
            previousGroup = group
            if (currentHtml && (currentHtml.every((element: string | JSX.Element) => element === "" || (React.isValidElement(element) && element.type === 'br')))) {
                htmlSelection1 = [""]
            } else if (currentHtml) {
                htmlSelection1 = currentHtml
            } else {
                throw new Error("LADR: currentHtml is undefined.")
            }
            return ""

        } else if (group === previousGroup) {

            if (htmlSelection2.length !== 0 && currentHtml) {
                htmlSelection2.push(...currentHtml)

            } else if (htmlSelection1.length !== 0 && currentHtml) {
                htmlSelection1.push(...currentHtml)
            } else if (currentHtml) {
                htmlSelection3.push(...currentHtml)
            } else {
                throw new Error("LADR: currentHtml is undefined.")
            }
            return ""

        } else if (group - 1 === previousGroup) {
        
            previousGroup = group
            if (htmlSelection2.length === 0) {

                if (currentHtml && (currentHtml.every((element: string| JSX.Element) => element === "" || (React.isValidElement(element) && element.type === 'br')))) {
                    htmlSelection2 = [""]
                } else if (currentHtml) {
                    htmlSelection2 = currentHtml
                }            
            } else if (currentHtml) {
                htmlSelection3 = currentHtml
            } else {
                throw new Error("LADR: currentHtml is undefined.")
            }
        }
    }
}







    
