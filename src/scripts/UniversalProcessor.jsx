// You can call this mechanism the cpu. If you want. Or call it the UniversalProcessor.

import ProcessCommand from "./ProcessCommand.jsx";
import ProcessSelector from "./ProcessSelector.jsx";

export default function UniversalProcessor({ NestedArray, Group }) {
    // This is basically a long chain of ifs and else ifs so i dont have to write the rendering process over and over and over and over and over and over and over over and over and over and over and over and over and over over and over and over and over and over and over and over over and over and over and over and over and over and over again
    // Coudlve named it like ProcessorHub, ProcessHub, MainProcessor, MainProcessingUnit, CentralProcessingUnit, Core, Hub, CoreProcessor, ProcessProcessor, PP, P, MainHub, or something idk im not a good namer u see

    let lineNo;
    let output;
    console.log(NestedArray)

    if (NestedArray.some((subarray) => subarray[0].startsWith("#fontsize"))) {

        let fontarray = NestedArray.find((subarray) => subarray[0].startsWith("#fontsize"));
        const fontsize = fontarray[1] / 100 + 0.7;


        output = NestedArray.map((subarray) => {

            if (/^[1-5]$/.test(subarray[0])) {

                const speaker = subarray[1];
                const dialogue = subarray.slice(3);

                return (
                    <div key={lineNo} id={`Line${lineNo}`} className="flex p-2 rounded noto-serif-kr">
                        <div id="speaker" className="flex justify-end flex-shrink-0 w-40 mr-2">
                        <p className="font-semibold text-gray-600">{speaker}:</p>
                        </div>
                        <div id="dialogue" className="text-gray-200">
                        <q style={{ fontSize: fontsize + "em" }}>{dialogue}</q>
                        </div>
                    </div>
                );

            } else if (subarray[0].startsWith("#na")) {

                return <ProcessCommand array={subarray} fontSize={fontsize} />;

            } else if (/^#(?!(?:na|fontsize)\b)/.test(subarray[0])) {

                return <ProcessCommand array={subarray} />;
            }
        })




    } else if (NestedArray.some((subarray) => subarray[0].startsWith("[ns")) || NestedArray.some((subarray) => subarray[0].startsWith("[s")) || Group !== 0 || NestedArray.some(subarray => subarray.some(item => /^\[([0-9A-F]{6})\]/.test(item)))) { // Selector, and selection?
        
        return <ProcessSelector array={NestedArray} group={Group} />;

    } else if (NestedArray.some((row) => row.some((arr) => arr.includes("[ruby=")))) {

        const rubyString = NestedArray.flat().find((item) => item.includes("[ruby="));
        return rubyString;


    } else if (!NestedArray.some((subarray) => subarray[0].startsWith("#fontsize"))) {
      
        output = NestedArray.map((subarray) => {

            if (/^#(?!fontsize\b)/.test(subarray[0]) && Group === 0) {
                return <ProcessCommand array={subarray} />;

            } else if (/^[1-5]$/.test(subarray[0])) {
                const speaker = subarray[1]?.trim() ?? "LADR.Err.NoSpeaker";
                const dialogue = subarray.slice(3);

                if (subarray.length == 4) {
                    return (
                        <div key={lineNo} id={`Line${lineNo}`} className="flex p-2 rounded noto-serif-kr">
                            <div id="speaker" className="flex justify-end flex-shrink-0 w-40 mr-2">
                            <p className="font-semibold text-gray-600">{speaker}:</p>
                            </div>
                            <div id="dialogue" className="text-gray-200">
                            <q>{dialogue}</q>
                            </div>
                        </div>
                    );

                } else {
                    return ''
                }
            }

            console.log("LADR: Unrecognized array format (not fontsizze, command, selector etc.), returning with null")
            return "null";
        })
    }


    return output; // An array filled with html components. these html components are handled by the variable html.
}
