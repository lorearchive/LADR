import { createContext } from "react";
import { fetchSprites, updateSprites } from "../../state/spriteids.js";

import ProcessCommand from "./ProcessCommand.jsx";
import ProcessSelector from "./ProcessSelector.jsx";


export const SpriteContext = createContext();


export function ProcessScript({ script, group }) {


    const tokens = script.split(";");
    let tokenGroup = [];
    let currentGroup = [];

    for (let token of tokens) {

        if (token.includes("\n")) {

            let parts = token.split("\n");

            currentGroup.push(parts[0]);

            tokenGroup.push(currentGroup);

            currentGroup = [...parts.slice(1)];
        } else { 
            currentGroup.push(token); 
        }
    }

    if (currentGroup.length > 0) {
        tokenGroup.push(currentGroup);
    }

    /**
     * script contains the raw script data, found in the ScriptKr field of the loaded json.
     * tokens is an array which explodes this script by semicolons.
     * 
     * tokens is then further split by \n, and when it does, it creates a nested array.
     * tokenGroup is a nested array which includes arrays which have been split by \n, which have been exploded by semicolons.
     * 
     * Accessing the nested array is as follows:
     * 
     * array[n][m] loads the value at position m of an array which is at position n.
     * 
     * If such nested array is deemed to begin with a #, then it is processed as a command and sent over to the processCommand function where it will return predefined HTML
     * for render.
     */



    console.log(tokens)

    if (tokenGroup.some(arr => arr[0].startsWith('[ns')) || tokenGroup.some(arr => arr[0].startsWith('[s')) || group !== 0) { // Selector, and selection?
        return <ProcessSelector array={tokenGroup} group={group} />
    }

    const processedContent = tokenGroup.map(subArray => {

        if (subArray[0].startsWith('#') && group === 0) {
            return (
                <ProcessCommand array={subArray} />
            );



        } else if (/^[1-5]$/.test(subArray[0])) {

            updateSprites((subArray[0] - 1), subArray[1].trim());


            const speaker = subArray[1]?.trim() ?? 'LADR.Err.NoSpeaker';
            const dialogue = subArray.slice(3);
            const lineNo = '';


            if (subArray.length >= 4) {
                return (
                    <div key={lineNo} id={`Line${lineNo}`} className="flex p-2 rounded noto-serif-kr">
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
            return '';
        }
        
        return null;
    }).filter(Boolean); // Remove null/empty values

    return processedContent;
}