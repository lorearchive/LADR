import ProcessCommand from "./ProcessCommand.jsx";
import Cpu, { CpuNoIgnore } from "./Cpu.tsx";

import { fetchPreviousDialogue, setPreviousDialogue, resetPreviousDialogue, prevGroup, pushPreviousDialogue } from "../../state/previousDialogue.ts";


// This script is responsible for processing the selector types and responses.

// A selector is sensei's dialogue which can be clicked. A selection is the response to the selector.



export default function ProcessSelector({ nestedArray, group }) {

    // If it is a selector
    if (group === 0) {

        prevGroup(0)

        let selectorIDs = []
        let selectorID = 0
        let selectorID2 = 0
        let selectorID3 = 0

        let line
        let dialogue
        let dialogue2
        
        if (nestedArray.length === 1) {
            
            if (nestedArray[0][0].startsWith("[ns")) {
                dialogue = nestedArray[0][0].slice(4)
            } else {
                dialogue = nestedArray[0][0].slice(3)
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

                if (subArray[0].startsWith('[ns')) {
                    return subArray[0].slice(3, subArray[0].indexOf("]"))

                } else if (subArray[0].startsWith('[s')) {
                    return subArray[0].slice(2, subArray[0].indexOf("]"))
                }

            })

            selectorID = selectorIDs[0]
            selectorID2 = selectorIDs[1]

            line = nestedArray.map(subarray => {
                if (subarray[0].startsWith("[ns")) {
                    return subarray[0].slice(subarray[0].indexOf("]") + 2)
                } else if (subarray[0].startsWith("[s")) {
                    return subarray[0].slice(subarray[0].indexOf("]") + 2)
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

        let currentHtml = CpuNoIgnore(nestedArray, 0)
        let prevDialogue = fetchPreviousDialogue()
        let previousGroup = prevGroup()

        if (previousGroup === 0) {
            console.log(nestedArray)

            setPreviousDialogue(currentHtml)
            return (
                <>
                    <div id="SelectionDivider" className="border-t border-dashed dark:border-slate-500"></div>
                    {currentHtml}
                </>
            )
            
        } else if (group - 1 === previousGroup) {

            if (prevDialogue.length === currentHtml.length && prevDialogue.every((element, index) => element === currentHtml[index])) {
                return ""
            }

            pushPreviousDialogue(currentHtml)
            return ""

        } else if (group - 2 === prevGroup()) {

           throw new Error("THREE SELFECITIONES")

        }


    }
}


