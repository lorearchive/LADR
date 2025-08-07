import _ from 'lodash'
import ProcessVariator from './ProcessVariator'
import ProcessTokens from './ProcessTokens'
import ProcessNestedArray from './ProcessNestedArray'


export interface rawToken {
    SelectionGroup: number
    Transition: number
    BGName: number
    ScriptKr: string
    TextJp: string
    TextTh: string
    TextTw: string
    TextEn: string
}




let previousGroup = 0                // Used when rendering selections
let htmlSelection1: string[] = []
let htmlSelection2: string[] = []
let htmlSelection3: string[] = []

let BGID: number        // If raw token contains custom bg
let Transition: number  // same thing but for transtion
let t9nParam: object = {} // Contains language data. Empty if ko. Not empty if anything else.


export default function ProcessEpisode( dataList: rawToken[], curLang: string ) {
    // curLang is the current lang requested by user

    if (curLang !== "en" && curLang !== "ko" ) {
        throw new Error("LADR: This language is not ready yet.")
    }

    // Create token array

    return dataList.map((item) => {
        BGID = item.BGName
        Transition = item.Transition

        const Group = item.SelectionGroup // Does this token belong to a selection group?
        const script = item.ScriptKr // The yolk



        if (curLang === "en") {
            t9nParam = { TextEn: ProcessVariator(item.TextEn) }

        } else if (curLang === "ko") {
            t9nParam = {}

        } else {
            throw new Error("LADR: Not ready for this language yet.")
        }


        const tokens = script.split(";")
        const nestedArray = ProcessTokens(tokens)

        let output = ProcessNestedArray( nestedArray, Group, BGID, Transition, ...Object.values(t9nParam))

        console.log(output)

    })

}


export function ProcessSelector( NestedArray: (string | number)[][], group: number, TextEn?: string ) {
    
    const lang = TextEn === undefined ? "ko" : "en"

    if (group === 0) {
        
        let previousGroup = 0

        let selectorIDs = []
        let selectorID: string
        let selectorID2: string
        let selectorID3: string

        let line
        let dialogue
        let dialogue2
        let dialogue3
        
        if (NestedArray.length === 1) {

            switch (lang) {
                case "ko":
                    if ((NestedArray[0][0] as string).startsWith("[ns")) {
                        dialogue = (NestedArray[0][0] as string).slice(4)
                    } else {
                        dialogue = (NestedArray[0][0] as string).slice(3)
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
                    throw new Error("LADR: Language not yet supported")
            }
            return (`
                <div id="SingleSelector" className="flex flex-col items-center justify-center p-2 my-6 rounded noto-serif-kr">
                  <div className="flex justify-center flex-shrink-0 w-6/12 p-2 m-2 transition-colors rounded-md dark:bg-slate-800 hover:dark:bg-slate-700">
                    <q className="font-semibold">
                        {dialogue}
                    </q>
                  </div>
                </div>`
            )

        } else if (NestedArray.length === 2) {
            selectorIDs = NestedArray.map(subArray => {

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
        
                    line = NestedArray.map(subarray => {
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
                    throw new Error("LADR: Language not yet supported")
            }

            
            return (`
                <div id="Selectors" className="flex flex-col items-center justify-center p-2 my-6 rounded noto-serif-kr">
                    <div id={Selector${selectorID}} className="flex justify-center flex-shrink-0 p-2 mx-4 my-2 text-center transition-colors rounded-md w-lg dark:bg-slate-800 hover:dark:bg-slate-700">
                        <q className="font-semibold">
                            {dialogue}
                        </q>
                    </div>
                    <div id={Selector${selectorID2}} className="flex justify-center flex-shrink-0 p-2 mx-4 my-2 text-center transition-colors rounded-md w-lg dark:bg-slate-800 hover:dark:bg-slate-700">
                        <q className="font-semibold">
                            {dialogue2}
                        </q>
                    </div>
                </div>`
            )
        } else if (NestedArray.length === 3) {
            selectorIDs = NestedArray.map(subArray => {

                if ((subArray[0] as string).startsWith('[ns')) {
                    return (subArray[0] as string).slice(3, (subArray[0] as string).indexOf("]"))

                } else if ((subArray[0] as string).startsWith('[s')) {
                    return (subArray[0] as string).slice(2, (subArray[0] as string).indexOf("]"))
                }

            })

            selectorID = selectorIDs[0] as string
            selectorID2 = selectorIDs[1] as string
            selectorID3 = selectorIDs[2] as string

            line = NestedArray.map(subarray => {
                if ((subarray[0] as string).startsWith("[ns")) {
                    return (subarray[0] as string).slice((subarray[0] as string).indexOf("]") + 2)
                } else if ((subarray[0] as string).startsWith("[s")) {
                    return (subarray[0] as string).slice((subarray[0] as string).indexOf("]") + 2)
                }
            })

            dialogue = line[0]
            dialogue2 = line[1]
            dialogue3 = line[2]

            return (`
                <div id="Selectors" className="flex flex-col items-center justify-center p-2 my-6 rounded noto-serif-kr">
                    <div id={Selector${selectorID}} className="flex justify-center flex-shrink-0 w-6/12 p-2 m-2 transition-colors rounded-md dark:bg-slate-800 hover:dark:bg-slate-700">
                        <q className="font-semibold">
                            {dialogue}
                        </q>
                    </div>
                    <div id={Selector${selectorID2}} className="flex justify-center flex-shrink-0 w-6/12 p-2 m-2 transition-colors rounded-md dark:bg-slate-800 hover:dark:bg-slate-700">
                        <q className="font-semibold">
                            {dialogue2}
                        </q>
                    </div>
                    <div id={Selector${selectorID3}} className="flex justify-center flex-shrink-0 w-6/12 p-2 m-2 transition-colors rounded-md dark:bg-slate-800 hover:dark:bg-slate-700">
                        <q className="font-semibold">
                            {dialogue3}
                        </q>
                    </div>
                </div>`
            )
        } else {
            console.error(NestedArray)
            throw new Error("LADR: This is most likely a selector. Not of length 1, 2, OR 3. Check the console for more info.")
        }

   } else {
    let currentHtml
    let SelectionProcessTrue = true // i dont think this is necessary

    switch (lang) {
        case "ko":
            currentHtml = ProcessNestedArray({ NestedArray: NestedArray, Group: 0, BGID, Transition })
            break
        case "en":
            currentHtml = ProcessNestedArray({ NestedArray: NestedArray, Group: 0, BGID, Transition, ...t9nParam })
            break
        default:
                LangNotReadyYetError()
    }

    if (previousGroup === 0) {
        previousGroup = group
        if (currentHtml && (currentHtml.every((element: string | Element) => element === "" || (React.isValidElement(element) && element.type === 'br')))) {
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
