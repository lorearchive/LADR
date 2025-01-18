import ProcessCommand from "./ProcessCommand.jsx";
import ProcessSelector from "./ProcessSelector.jsx";
import { updateSprites } from "../../state/spriteids.js"



export default function Cpu({ NestedArray, Group }) {

    let dialogue // The string which is said by a character.

    let normal // A line which is NORMAL. i.e. ['pos', 'char', 'sprite', 'dialogue']

    let variator_fontsize // An array which contains the fontsize variator
    let variator_fontsizeRaw // The raw integer font size provided by JSON
    let variator_size = 1 // Font size calulcated into em unit, defaulting at 1

    let variator_colour_regex = /^\[[0-9A-F]{6}\].*?\[-\]$/ // Matches EXACTLY "[HEXADECIMAL]...[-]"
    let variator_colour_generalRegex = /\[[0-9A-F]{6}\].*?\[-\]/ // Matches GENERALLY "...[HEXADECIMAL]...[-]..."
    let variator_colourRegex = /\[([A-F0-9]{6})\](.*?)\[-\]/g // Matches both the hex colour code and text
    let variator_colour = "0" // The captured hex code, defaulted at 0 to check if it has been changed later
    let variator_colouredText // The captured text


    let variator_rubyHex = /\[ruby=(.*?)\](.*?)\[\/ruby\]/g
    let variator_rubified


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
     * 
     * VARIATORS are checked in this priority order:
     * 
     * 1. Font size VARIATOR
     * 2. Text color VARIATOR
     * 3. Ruby text VARIATOR
     * 
     */

    NestedArray.map((subarray) => {


        if (subarray[0].isInteger(x) && x >= 1 && x <= 5) {

            normal = NestedArray.find(subarray => [1, 2, 3, 4, 5].some(value => value === subarray[0]))
            updateSprites((normal[0] - 1), normal[1])

    
            if (normal.length === 4) {
                dialogue = normal[3]
    
            } else if (normal.length === 3) {
                dialogue = ''
    
            } else if (normal.length !== 4 && normal.length !== 3) {
                console.log("LADR: A Normal Subarray of Nested Array is not of length value 4 AND 3. Proceeding with blank dialogue value.")
                dialogue = ''
            }
            


            // The CPU will now begin to check for VARIATORS.
            // 1. Font size VARIATOR (is special, because the variator is outside the dialogue)
            // More often that not #fontsize is found in the last subarray. But we still check anyways


            if (NestedArray.find(subarray => subarray.includes("#fontsize"))) {

                variator_fontsize = NestedArray.find(subarray => subarray.includes("#fontsize"))

                if (variator_fontsize.length === 2) {
                    variator_fontsizeRaw = variator_fontsize[1]

                } else {
                    console.error("LADR: Fontsize VARIATOR array does not contain 2 elements. Continuing with raw fontsize = 30")
                    variator_fontsizeRaw = 30
                }

                variator_size = variator_fontsizeRaw / 100 + 0.7; // Calculate the em value from raw fontsize

                if (variator_size <= 1) {
                    console.error("LADR: calculated font size to be equal to or less than 1em. Is this right? ", NestedArray)
                }
            }

            // The CPU will continue checking for VARIATORS.
            // 2. Text color VARIATOR

            if (variator_colour_regex.test(dialogue)) {
                
                while ((match = variator_colourRegex.exec(dialogue)) !== null) {
                    variator_colour = match[1]
                    variator_colouredText = match[2]
                }
            } else if (variator_colour_generalRegex.test(dialogue)) {
                console.log("LADR: Received general match for custom text colouring. ", NestedArray)
            }


            // The CPU will continue checking for VARIATORS.
            // 3. RUBY TEXT VARIATOR

            if (dialogue.includes("[ruby=")) {

                variator_rubified = [...dialogue.matchAll(variator_rubyHex)].map(match => ({
                    rt: match[1],
                    rb: match[2]

                }))




            }

    
            
        }
    




    })



}