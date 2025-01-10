import { createContext } from "react";
import { fetchSprites, updateSprites } from "../../state/spriteids.js";

import ProcessCommand from "./ProcessCommand.jsx";
import ProcessSelector from "./ProcessSelector.jsx";


export const SpriteContext = createContext();


export function ProcessScript({ script, group }) {

    let processedContent = []
    let isFontSize = false
    const lineNo = '';


    const tokens = script.split(";");


    function splitTokens(tokens) {
        let tokenGroups = [];
        let currentGroup = [];
        
        for (let token of tokens) {
          if (token.includes('\n')) {
            const parts = token.split('\n');
            
            // Add the first part to current group if it exists
            if (parts[0]) {
              currentGroup.push(parts[0]);
            }
            
            // Add the current group to token groups if it's not empty
            if (currentGroup.length > 0) {
              tokenGroups.push(currentGroup);
            }
            
            // Handle all middle parts (if any)
            for (let i = 1; i < parts.length - 1; i++) {
              if (parts[i]) {
                tokenGroups.push([parts[i]]);
              }
            }
            
            // Start a new current group with the last part
            currentGroup = parts[parts.length - 1] ? [parts[parts.length - 1]] : [];
            
          } else {
            currentGroup.push(token);
          }
        }
        
        // Add the last group if it's not empty
        if (currentGroup.length > 0) {
          tokenGroups.push(currentGroup);
        }
        
        return tokenGroups;
      }

    const tokenGroup = splitTokens(tokens)


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

    let fontsize


    if (tokenGroup.some(arr => arr[0].startsWith('#fontsize'))) {

        let fontarr = tokenGroup.find(arr => arr[0].startsWith('#fontsize'));

        fontsize = (fontarr[1] / 100) + 0.7
    
        processedContent = tokenGroup.map(subarray => {
            if (/^[1-5]$/.test(subarray[0])) {
                const speaker = subarray[1];
                const dialogue = subarray.slice(3);
    
    
                return (
                    <div key={lineNo} id={`Line${lineNo}`} className="flex p-2 rounded noto-serif-kr">
                        <div id="speaker" className="flex justify-end flex-shrink-0 w-40 mr-2">
                            <p className="font-semibold text-gray-600">
                                {speaker}:
                            </p>
                        </div>
                        <div id="dialogue" className="text-gray-200">
                            <q style={{fontSize: fontsize + 'em'}}>{dialogue}</q>
                        </div>
                    </div>
                );

            } else if (subarray[0].startsWith('#na')) {

                return <ProcessCommand array={subarray} fontSize={fontsize} />;

            } else if (/^#(?!(?:na|fontsize)\b)/.test(subarray[0])) {

                return <ProcessCommand array={subarray} />;
            }
        });
        
    } else if (tokenGroup.some(arr => arr[0].startsWith('[ns')) || tokenGroup.some(arr => arr[0].startsWith('[s')) || group !== 0) { // Selector, and selection?

        return <ProcessSelector array={tokenGroup} group={group} />
        
    } else if (tokenGroup.some(row => row.some(arr => arr.includes("[ruby=")))) {

        const rubyString = tokenGroup.flat().find(item => item.includes("[ruby="));
        return rubyString



    } else if (!tokenGroup.some(arr => arr[0].startsWith('#fontsize'))) {
        
        console.log(tokenGroup)
        processedContent = tokenGroup.map(subArray => {

            if (/^#(?!fontsize\b)/.test(subArray[0]) && group === 0) {
                return (
                    <ProcessCommand array={subArray} /> 
                );



            } else if (/^[1-5]$/.test(subArray[0])) {

                const speaker = subArray[1]?.trim() ?? 'LADR.Err.NoSpeaker';
                const dialogue = subArray.slice(3);


                if (subArray.length == 4) {
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
                    
                } else {
                    return ''
                };
            }
            
            return 'null';
        })
    }


    return processedContent;
}
