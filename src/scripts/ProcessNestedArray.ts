import ProcessVariator from "./ProcessVariator"

export default function ProcessNestedArray( NestedArray: any[][], Group: number, BGID: number, Transition: number, TextEn?: string ): any[] {

    let t9nParam: object = {}

    let speaker: string                                                     // The speaker
    let dialogue: string                                                    // The dialogue said by the speaker
    let fontsize: undefined | number = undefined                            // Fontsize, if any
    let fontarray: (string | number)[] = []                                 // Array derived by the rawtoken that includes custom font
    let ignoreFor: number = 0                                               // Selectors preceding the first selector is ignored by the renderer - they are already accounted for
    
    let lang = TextEn === undefined ? "ko" : "en"


    switch (lang) {
        case "ko":
            t9nParam = {}
            break
        case "en":
            t9nParam = { TextEn }
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


}