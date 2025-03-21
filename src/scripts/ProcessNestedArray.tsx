import React from "react";
import { useParams } from "react-router-dom";
import { ProcessSelector } from "./ProcessScript";
import { ProcessVariator } from "./ProcessScript";
import { CreateHtmlLine } from "./CreateLine";
import ProcessCommand from "./ProcessCommand";
import GetImage from "./GetImage.tsx";

export default function ProcessNestedArray({ NestedArray, Group, BGID, Transition, TextEn }: { NestedArray: any[][], Group: number, BGID: number, Transition: number, TextEn?: string }): any[] {
    const { lang } = useParams<{ lang: string }>()

    let t9nParam: object = {}
    let fontarray: (number | string)[] | undefined
    let fontsize: number | undefined

    let ignoreFor: number = 0
    let speaker: string
    let dialogue: string

    switch (lang) {
        case "ko":
            t9nParam = {}
            break
        case "en":
            if (TextEn === undefined) {
                throw new Error("ProcessNestedArray: TextEn is undefined...")
            } else {
                TextEn = ProcessVariator(TextEn)
            }
            t9nParam = { TextEn}
            break
        default:
            throw new Error("LADR: Not ready for this language yet.")
    }


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
                return ProcessSelector({nestedArray: NestedArray, group: Group, ...t9nParam})
            }
            
        } else if (typeof subarray[0] === 'string' && /^[1-5]$/.test(subarray[0] as string)) {
            
            if (subarray.length === 4) {
                speaker = subarray[1] as string
                dialogue = subarray[3] as string
                dialogue = ProcessVariator(dialogue)

                if (fontsize !== undefined) {
                    return CreateHtmlLine({ type: "normal", dialogue, speaker, fontsize, ...t9nParam});
                } else {
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
            case 1272583944:         // ?
            case 1626584722:         // Goofy white transition (there are so many of them which look similar )
            case 2046503352:
            case 2089682509:         // ?
            case 2127590351:         // Ease out of black
            case 2246884625:         // ?
            case 2457385855:         // ?
            case 2527144513:         // ?
            case 2878370298:         // ?
            case 3222392982:         // ?
            case 348351892:          // ?
            case 3657480713:         // ?
            case 3957412172:         // ?
            case 4075662009:         // ?
                break
            default:
                console.error("LADR: Unrecognized transition type! Transition:", Transition)
                throw new Error("Unrecognized transition type! Refer to the console for more info.")
        }
    }
    return output
}