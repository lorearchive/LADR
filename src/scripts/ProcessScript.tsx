import React, { JSX, useState } from "react";
import ProcessTokens from "./ProcessTokens.jsx";

import { CpuNoIgnore } from "./Cpu.tsx";
import ProcessCommand from "./ProcessCommand.jsx";

import { updateSprites } from "../../state/spriteids.ts";
import { CreateHtmlLine } from "./CreateLine.tsx";

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
let variator_fontsizeRaw = variator_fontsize[1] as number           // The raw integer font size provided by JSON
let variator_size = 1                                               // Font size calulcated into em unit, defaulting at 1

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


export default function ProcessScript( DataList: Object[]) {

    const lang = window.location.pathname.slice(1, 3)

    return DataList.map((item) => {
        const Group = item.SelectionGroup
        const Transition = item.Transition
        const script = item.ScriptKr
        let scriptTh
        let scriptTw
        let scriptJp
        let scriptEn

        switch (lang) {
            case "ja":
                scriptJp = item.TextJp
            case "th":
                scriptTh = item.TextTh
            case "zh":
                scriptTw = item.TextTw // im not so sure why it is named Tw...
            case "en":
                scriptEn = item.TextEn
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

            } else if(Transition !== 0) {

                switch(Transition) {
                    case 1122508889:         // Fade to black
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
                        return <br />

                    case 1027503790:
                    case 1626584722:         // Goofy white transition (there are so many of them which look similar )
                    case 2046503352:
                    case 2127590351:         // Ease out of black
                    case 348351892:          // ?
                        return ""
                    default:
                        console.error("LADR: Unrecognized transition type! Transition:", Transition)
                        throw new Error("Unrecognized transition type! Refer to the console for more info.")
                }

            } else if (NestedArray.some((subarray) => (subarray[0] as string).startsWith("[ns")) || NestedArray.some((subarray) => (subarray[0] as string).startsWith("[s")) || Group !== 0) {

                let nal = NestedArray.length

                if(Group === 0) {
                    let line = NestedArray.filter(subarray => {
                        return (subarray[0] as string).startsWith("[ns") || (subarray[0] as string).startsWith("[s")
                    })

                    if (NestedArray.length > 1) {
                        ignoreFor = nal - 1
                    }
                    return ProcessSelector(line, Group)

                } else if (Group !== 0) {
                    ignoreFor = NestedArray.length !== 1 ? nal - 1 : 0
                    return ProcessSelector(NestedArray, Group)
                }
                
            } else if (typeof subarray[0] === 'string' && /^[1-5]$/.test(subarray[0] as string)) {
                
                if (subarray.length === 4) {
                    speaker = subarray[1] as string
                    dialogue = subarray[3] as string

                    updateSprites(subarray[0], speaker)

                    if (fontsize !== undefined) {
                        dialogue = ProcessVariator(dialogue)
                        return CreateHtmlLine("normal", dialogue, speaker, fontsize)
                    } else {
                        dialogue = ProcessVariator(dialogue)
                        return CreateHtmlLine("normal", dialogue, speaker)
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
                    return ProcessCommand({array: subarray, fontSize: fontsize})
                } else {
                    return ProcessCommand({array: subarray})
                }

            } else if (typeof subarray[0] === 'string' &&  subarray[0] === "#fontsize") {
                return ""

            } else if (subarray.length === 1 && subarray[0] === "") {
                return ""

            } else {
                throw new Error("LADR: Unrecognized array type. Check the console.")
            }
        })

        if (htmlSelection2.length !== 0 && Group === 0) {
            // We know htmlSelection1 is always going to be populated. We know htmlSelection3 is often not populated. Checking htmlSelection2 as well as the current group seems good to see if we have any leftover selections to render.
            const commonSelectionDivider = <div id="CommonSelectionDivider" data-selection="Common"  className="mt-2 mb-2 border-t border-dashed dark:border-slate-500"></div>
            const selectionDivider = <div id="SelectionDivider" data-selection="Common"  className="mt-2 mb-2 border-t border-dashed dark:border-slate-500"></div>


            if (htmlSelection3.length === 0) {

                if (JSON.stringify(htmlSelection1) === JSON.stringify(htmlSelection2)) {
                    output.unshift(commonSelectionDivider, ...htmlSelection1)
                    htmlSelection1 = []
                    htmlSelection2 = []
                } else {
                    output.unshift(selectionDivider, ...htmlSelection1, selectionDivider, ...htmlSelection2)
                    htmlSelection1 = []
                    htmlSelection2 = []
                }

            } else {
                if (JSON.stringify(htmlSelection1) === JSON.stringify(htmlSelection2) && JSON.stringify(htmlSelection2) === JSON.stringify(htmlSelection3)) {
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
        return output
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



export function ProcessSelector( nestedArray: (string | number)[][], group: number ) {

    // If it is a selector
    if (group === 0) {

        previousGroup = 0

        let selectorIDs = []
        let selectorID: string
        let selectorID2: string
        let selectorID3 = 0

        let line
        let dialogue
        let dialogue2
        
        if (nestedArray.length === 1) {
            
            if ((nestedArray[0][0] as string).startsWith("[ns")) {
                dialogue = (nestedArray[0][0] as string).slice(4)
            } else {
                dialogue = (nestedArray[0][0] as string).slice(3)
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

            line = nestedArray.map(subarray => {
                if ((subarray[0] as string).startsWith("[ns")) {
                    return (subarray[0] as string).slice((subarray[0] as string).indexOf("]") + 2)
                } else if ((subarray[0] as string).startsWith("[s")) {
                    return (subarray[0] as string).slice((subarray[0] as string).indexOf("]") + 2)
                }
            });


            dialogue = line[0]
            dialogue2 = line[1]

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
                </div>
            )
        }

        
    } else {

        const currentHtml = CpuNoIgnore(nestedArray, 0)

        if (previousGroup === 0) {
            previousGroup = group
            if (currentHtml.every(element => element === "" || (React.isValidElement(element) && element.type === 'br'))) {
                htmlSelection1 = [""]
            } else {
                htmlSelection1 = currentHtml
            }
            return ""

        } else if (group === previousGroup) {

            if (htmlSelection2.length !== 0) {
                htmlSelection2.push(...currentHtml)

            } else if (htmlSelection1.length !== 0) {
                htmlSelection1.push(...currentHtml)
            } else {
                htmlSelection3.push(...currentHtml)
            }
            return ""

        } else if (group - 1 === previousGroup) {
        
            previousGroup = group
            if (htmlSelection2.length === 0) {

                if (currentHtml.every(element => element === "" || (React.isValidElement(element) && element.type === 'br'))) {
                    htmlSelection2 = [""]
                } else {
                    htmlSelection2 = currentHtml
                }            
            } else {
                htmlSelection3 = currentHtml
            }

        }
    }
}







    
