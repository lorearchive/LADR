import ProcessCommand from "./ProcessCommand.jsx";
import { isPreviousDialogueReset, fetchPreviousDialogue, setPreviousDialogue, resetPreviousDialogue } from "../../state/previousDialogue.js";

// This script is responsible for processing the selector types and responses.

// A selector is sensei's dialogue which can be clicked. A selection is the response to the selector.

// AHHHHHHHHHHHHHHHHHH NESTINGgsdyhuiffffffffffffffffffffyffffffffyfyfyfyfyissssssssssssssbdifiiiifikiiiiiiikikikikikikikikikk09j78888888888888888888888888799



export default function ProcessSelector({ array, group }) {

    // In this casse, array should be a nested array! why didnt i just name it nestedarray

    // If it is a selector
    if (group === 0) {


        let line = array.filter(subArray => !subArray[0].startsWith('#'));

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

    }

        // If group !== 0, handle responses


    if (group !== 0) {

        let previousDialogue
        let script
        let groupNo


        if (isPreviousDialogueReset()) { // Last script was not a selection
            // wait
            setPreviousDialogue(array, group)
            return ''

        } else { // the last script was a selection
            /**
             * previousDialogue[0] contains the script which should be rendered according to the rules.
             * previousDialogue[1] contains the selection group.
             */

            previousDialogue = fetchPreviousDialogue()
            script = previousDialogue[0]
            groupNo = previousDialogue[1]

            if (script.toString() === array.toString()) { // Selection is identical with the last one

                const output = array.map(subarray => {

                    if (subarray[0].startsWith('#')) {
                        resetPreviousDialogue()
                        return <ProcessCommand array={subarray} />


                    } else if (/^[1-5]$/.test(subarray[0]) && subarray.length == 4) {

                        const speaker = array[0][1]?.trim() ?? 'LADR.Err.NoSpeaker';
                        const dialogue = array[0].slice(3);

                        resetPreviousDialogue()
                        return (
                            <div id={`ResponseMutual`} className="flex p-2 rounded noto-serif-kr">
                                <div id="speaker" className="flex justify-end flex-shrink-0 w-40 mr-2">
                                    <p className="font-semibold text-gray-600">
                                        {speaker}:
                                    </p>
                                </div>
                                <div id="dialogue" className="text-gray-200">
                                    <q>{dialogue}</q>
                                </div>
                            </div>
                        );

                    }

                })

                return output


            }



        }

    }




}
