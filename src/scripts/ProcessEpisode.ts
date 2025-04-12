import _ from 'lodash'
import ProcessVariator from './ProcessVariator'


interface rawToken {
    SelectionGroup: number
    Transition: number
    BGName: number
    ScriptKr: string
    TextJp: string
    TextTh: string
    TextTw: string
    TextEn: string
}


let speaker: string                                                     // The speaker
let dialogue: string                                                    // The dialogue said by the speaker
let fontsize: undefined | number = undefined                            // Fontsize, if any
let fontarray: (string | number)[] = []                                 // Array derived by the rawtoken that includes custom font
let ignoreFor: number = 0                                               // Selectors preceding the first selector is ignored by the renderer - they are already accounted for


let previousGroup = 0                // Used when rendering selections
let htmlSelection1: string[] = []
let htmlSelection2: string[] = []
let htmlSelection3: string[] = []

let BGID: number        // If raw token contains custom bg
let Transition: number  // same thing but for transtion

let t9nParam: object = {} // You'll see...


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

        let textEn


        if (curLang === "en") {
            t9nParam = { TextEn: ProcessVariator(item.TextEn) }
            textEn = item.TextEn

        } else if (curLang === "ko") {
            t9nParam = {}

        } else {
            throw new Error("LADR: Not ready for this language yet.")
        }


    })

}
