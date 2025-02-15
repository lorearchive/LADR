import React from "react";

import ProcessCommand from "./ProcessCommand.jsx";
import { updateSprites } from "../../state/spriteids.ts"


import { CreateHtmlLine } from "./CreateLine.tsx";
import { previous } from '../../state/prevGroup.js'




/** NOTES
 * 
 * A subarray can be either a LINE, COMMAND, OR SELECTOR.
 * 
 * A Line is a normal bit of text you would expect
 * 
 * A Command begins with a # and directly modifies and adds graphics in-game
 * 
 * A Selector is a prompt in which the player can choose Sensei's response / dialogue (And a SELECTION is a response to a SELECTOR)
 * 
 * The CPU maps through each subarray and checks if it is a LINE, COMMAND, or SELECTOR.
 * 
 * 
 * 
 * A LINE can be modified by a VARIATOR. VARIATORS come in different shapes and forms, most commonly enclosed by square brackets.
 * VARIATORS are present inside the dialogue.
 * 
 * VARIATORS are checked in this priority order: (The simpler it is, the less priority it has)
 * 
 * 1. Font size VARIATOR
 * 2. Text color VARIATOR
 * 3. Ruby text VARIATOR
 * 4. Sensei name VARIATOR
 * 5. Newline VARIATOR (#n, and this is NOT a command.)
 * 
 */

let speaker: string                                                 // The speaker
let dialogue: string                                                // The string which is said by a character.
let fontsize: undefined | number = undefined                        // Fontsize if any, defaulted at 0 to see if it changed
let fontarray: (string | number)[] = []
let ignoreFor: number = 0                                           // How many subarrays .map() should ignore. This value + 1 is the length of the NestedArray which is a selection.

let normal: (string | number)[]                                     // A line which is NORMAL. i.e. ['pos', 'char', 'sprite', 'dialogue']
let commandArr: (string | number)[]                                 // A Command array

let variator_fontsize: (string | number)[]  = []                    // An array which contains the fontsize variator
let variator_fontsizeRaw = variator_fontsize[1] as number           // The raw integer font size provided by JSON
let variator_size = 1                                               // Font size calulcated into em unit, defaulting at 1

let variator_colour_regex = /^\[[0-9A-F]{6}\].*?\[-\]$/             // Matches EXACTLY "[HEXADECIMAL]...[-]"
let variator_colour_regexCapture = /^\[([0-9A-F]{6})\](.*?)\[-\]$/
let variator_colour_generalRegex = /\[([0-9A-F]{6})\](.*?)\[-\]/g   // Matches GENERALLY "...[HEXADECIMAL]...[-]..."
let variator_colourRegex = /^\[([A-F0-9]{6})\](.*?)\[-\]$/           // Matches both the hex colour code and text
let variator_colour = "0"                                           // The captured hex code, defaulted at 0 to check if it has been changed later
let variator_colouredText: string                                   // The captured text


let variator_rubyHex = /\[ruby=(.*?)\](.*?)\[\/ruby\]/g             // Captures both ABC and DEF in "foo foo [ruby=ABC]DEF[/ruby] bar bar"
let variator_rubified: string[] = []

let output: string[]


export function ProcessVariator( dialogue:string, telemetry?: boolean ): string {

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





export default function Cpu( NestedArray: (number | string)[][], Group: number ) {

    fontarray = NestedArray.find(subarray => subarray[0] === "#fontsize") as []

    if (fontarray !== undefined) {
        let a: number = fontarray[1] as number - 70
        if (a > 0) {
            fontsize = 0.00714 * (fontarray[1] as number) + 0.886

        } else if (a < 0) {
            fontsize = 0.01 * (fontarray[1] as number) + 0.3

        } else {
            console.error("LADR: Fontsize is 0.", NestedArray)
            throw new Error("LADR: Font size calculated to 0.")
        }
    } else {
        fontsize = undefined
    }

    if (previous.group !== 0 && Group === 0) {
        previous.group = 0
    }


    output = NestedArray.map((subarray: (string | number)[]) => {
        
        if (previous.ignoreFor !== 0) {
            previous.ignoreFor = previous.ignoreFor - 1
            return ""

        } else if (NestedArray.some((subarray) => (subarray[0] as string).startsWith("[ns")) || NestedArray.some((subarray) => (subarray[0] as string).startsWith("[s")) || Group !== 0) {

            let nal = NestedArray.length

            if(Group === 0) {
                let line = NestedArray.filter(subarray => {
                    return (subarray[0] as string).startsWith("[ns") || (subarray[0] as string).startsWith("[s")
                })

                if (NestedArray.length > 1) {
                    previous.ignoreFor = nal - 1
                }

            } else if (Group !== 0) {
                previous.ignoreFor = NestedArray.length !== 1 ? nal - 1 : 0
            }
            
        } else if (typeof subarray[0] === 'string' && /^[1-5]$/.test(subarray[0] as string)) {
            
            if (subarray.length === 4) {
                speaker = subarray[1] as string
                dialogue = subarray[3] as string

                updateSprites(subarray[0], speaker)

                if (fontsize !== undefined) {
                    dialogue = speaker.startsWith("통신") ? ProcessVariator(dialogue, true) : ProcessVariator(dialogue, false)
                    return CreateHtmlLine("normal", dialogue, speaker, fontsize)
                } else {
                    dialogue = speaker.startsWith("통신") ? ProcessVariator(dialogue, true) : ProcessVariator(dialogue, false)
                    return CreateHtmlLine("normal", dialogue, speaker)
                }
    
            } else if (subarray.length === 3) {
                speaker = ""
                dialogue = ''
                return ""
    
            } else if (subarray.length !== 4 && subarray.length !== 3) {
                console.error("LADR: A Normal Subarray of Nested Array is not of length value 4 AND 3. Proceeding with blank dialogue and speaker value.")
                speaker = ""
                dialogue = ''
                return ""
            }
            
        } else if (typeof subarray[0] === 'string' && subarray[0].startsWith("#") && subarray[0] !== "#fontsize") {

            if (fontsize !== undefined) {
                return ProcessCommand({array: subarray, fontSize: fontsize })
            } else {
                return ProcessCommand({array: subarray })
            }

        } else if (typeof subarray[0] === 'string' &&  subarray[0] === "#fontsize") {
            return ""

        } else if (subarray.length === 1 && subarray[0] === "") {
            return ""

        } else {
            throw new Error("LADR: Unrecognized array type. Check the console.")
        }

    })

    //if (Group === 0 && prevGroup() !== 0) {
      //  console.log("GRP 0 AND PREVGRP NOT0,", fetchPreviousDialogue())
        //prevGroup(0)

        //output.unshift(...fetchPreviousDialogue())
//    }

    return output
}




export function CpuNoIgnore( NestedArray: (number | string)[][], Group: number ) {

    fontarray = NestedArray.find(subarray => subarray[0] === "#fontsize") as []

    if (fontarray !== undefined) {
        let a: number = fontarray[1] as number - 70
        if (a > 0) {
            fontsize = a / 10 - 4
        } else if (a < 0) {
            fontsize = 0.01 * (fontarray[1] as number) + 0.3
        }
    } else {
        fontsize = undefined
    }


    output = NestedArray.map((subarray: (string | number)[]) => {
        
        if (typeof subarray[0] === 'string' && /^[1-5]$/.test(subarray[0] as string)) {
            
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
    
            } else if (subarray.length !== 4 && subarray.length !== 3) {
                console.error("LADR: A Normal Subarray of Nested Array is not of length value 4 AND 3. Proceeding with blank dialogue and speaker value.")
                speaker = ""
                dialogue = ''
                return ""
            }
            
        } else if (typeof subarray[0] === 'string' && subarray[0].startsWith("#") && subarray[0] !== "#fontsize") {

            if (fontsize !== undefined) {
                return ProcessCommand({array: subarray, fontSize: fontsize })
            } else {
                return ProcessCommand({array: subarray })
            }

        } else if (typeof subarray[0] === 'string' &&  subarray[0] === "#fontsize") {
            return ""

        } else if (subarray.length === 1 && subarray[0] === "") {
            return ""

        } else {
            throw new Error("LADR: Unrecognized array type. Check the console.")
        }
    




    })
    return output
}
