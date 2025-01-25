import ProcessCommand from "./ProcessCommand.jsx";
import Cpu, { CpuNoIgnore } from "./Cpu.tsx";

import { isPreviousDialogueReset, fetchPreviousDialogue, setPreviousDialogue, resetPreviousDialogue } from "../../state/previousDialogue.js";


// This script is responsible for processing the selector types and responses.

// A selector is sensei's dialogue which can be clicked. A selection is the response to the selector.

let count = 1



export default function ProcessSelector({ nestedArray, group }) {


    // If it is a selector
    if (group === 0) {


        let line = nestedArray.filter(subArray => /^\[ns\d+\]/.test(subArray[0]) || /^\[s\d+\]/.test(subArray[0]));

        line = line.map(subArray => {
            const [item] = subArray; // Extract the single string in the subarray
            const index = item.indexOf(" "); // Find the first space
            return [item.slice(0, index), item.slice(index + 1)]; // Split the string
        });


        let selectorIDs = []
        let selectorID = 0
        let selectorID2 = 0
        let selectorID3 = 0

        let dialogue = ''
        let dialogue2 = ''
        let dialogue3 = ''



        if (line.length === 1) { // if [ns] or [s]

            dialogue = line[0][1]
            return (
                <div id={`Selector${selectorID}`} className="flex flex-col items-center justify-center p-2 my-6 rounded noto-serif-kr">
                  <div className="flex justify-center flex-shrink-0 w-6/12 p-2 m-2 transition-colors rounded-md dark:bg-slate-800 hover:dark:bg-slate-700">
                    <q className="font-semibold">
                        {dialogue}
                    </q>
                  </div>
                </div>

            )


        } else if (line.length >=  2) { // if [nsx] or [sx]

            selectorIDs = line.map(subArray => {

                if (subArray[0].startsWith('[ns')) {
                    return subArray[0].slice(3, subArray[0].indexOf("]"))

                } else if (subArray[0].startsWith('[s')) {
                    return subArray[0].slice(2, subArray[0].indexOf("]"))
                }

            })

            selectorID = selectorIDs[0]
            selectorID2 = selectorIDs.length >= 2 ? selectorIDs[1] : null
            selectorID3 = selectorIDs.length === 3 ? selectorIDs[2] : null

            dialogue = line[0][1]
            dialogue2 = line[1][1]
            dialogue3 = line.length === 3 ? line[2][1] : null


        }




         if (line.length === 2) {
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

        } else if (line.length === 3) {
            return (
                <div id="Selectors" className="flex flex-col items-center justify-center p-2 my-8 rounded noto-serif-kr">
                    <div id={`Selector${selectorID}`} className="flex justify-center flex-shrink-0 p-2 m-2 rounded-md bg-slate-800 w-96">
                        <q className="font-semibold">
                            {dialogue}
                        </q>
                    </div>
                    <div id={`Selector${selectorID2}`} className="flex justify-center flex-shrink-0 p-2 m-2 rounded-md bg-slate-800 w-96">
                        <q className="font-semibold">
                            {dialogue2}
                        </q>
                    </div>
                    <div id={`Selector${selectorID3}`} className="flex justify-center flex-shrink-0 p-2 m-2 rounded-md bg-slate-800 w-96">
                        <q className="font-semibold">
                            {dialogue3}
                        </q>
                    </div>
                </div>
            )
        }

    } else if (group !== 0) {
        let previousDialogue
        let script
        let groupNo


        if (group - 1 !== fetchPreviousDialogue(1)) {
            setPreviousDialogue(nestedArray, group)
            return ""
        } else {
            if (JSON.stringify(fetchPreviousDialogue(0)) === JSON.stringify(nestedArray)) {
                let output = CpuNoIgnore(nestedArray, 0)
                return output
            } else {
                throw new Error("AHAHHAHAHHAH")
            }
        }

    } else {
        throw new Error("How did you get here?")
    }
}
