import processCommand from "./processCommand.jsx";
import processSelector from "./processSelector.jsx";


export default function processScript(script, selectionGroup) {

    const tokens = script.split(";");

    let tokenGroup = [];
    let currentGroup = [];

    for (let token of tokens) {
        if (token.includes("\n")) {

            let parts = token.split("\n");

            currentGroup.push(parts[0]);

            tokenGroup.push(currentGroup);

            currentGroup = [...parts.slice(1)];

        } else { currentGroup.push(token); }
    }

    if (currentGroup.length > 0) {
        tokenGroup.push(currentGroup);
    }


    /**
     * 
     * script contains the raw script data, found in the ScriptKr field of the loaded json.
     * tokens is an array which explodes this script by semicolons.
     * 
     * tokens is then further split by \n, and when it does, it creates a nested array.
     * tokenGroup is a nested array which includes arrays which have been split by \n, which have been exploded by semicolons.
     * 
     * Accessing the nested array is as follows:
     * 
     * array[n]][m] loads the value at position m of an array which is at position n.
     * 
     * If such nested array is deemed to begin with a #, then it is processed as a command and sent over to the processCommand function where it will return predefined HTML
     * for render.
     * 
     * 
     */

    console.log(tokenGroup);

    let rendertoken;

    tokenGroup.forEach(item => {
        if (item[0]?.startsWith('#')) {
            rendertoken = processCommand(item);
        } else if (item[0]?.startsWith('[ns]') || item[0]?.startsWith('[s]')) {
            rendertoken = processSelector(item, selectionGroup);
        }

    });




    if (tokenGroup[0][0].startsWith('#')) {
        const [command, ...instruction] = tokenGroup[0];
        const ins = instruction.join(';').trim();
        const insArray = ins.split(';');


        let explodedInsArray = []
        let dummyArray = []
        
        for (let item of insArray) {
            if (item.includes("\n")) {
            let parts = item.split("\n");
            dummyArray.push(parts[0]);
            explodedInsArray.push(dummyArray);
            dummyArray = [...parts.slice(1)];
            } else {
            dummyArray.push(item);
            }
        }
    
        if (dummyArray.length > 0) {
            explodedInsArray.push(dummyArray);
        }


        switch (command) {

            case '#title':
                return (
                <h2 id="EpTitle" className="noto-serif-kr text-2xl my-1 mb-6 font-bold relative pl-4 before:content-[''] before:absolute before:inset-y-0 before:left-0 before:w-1 before:bg-gradient-to-b before:from-transparent before:to-blue-600">
                    {ins}
                </h2>
                );

            case '#place':
                return (
                <div id="EpPlace" className="flex items-center p-2 pr-3 my-1 mb-6 text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="gray" className="mr-2 size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                    </svg>

                    <h5 id="EpPlaceTag" className="flex items-center noto-serif-kr dark:text-gray-400">
                        <em>{ins}</em>
                    </h5>
                </div>
                );

            case '#wait':
                return ''

            case '#na':
                if (explodedInsArray.length === 1 && explodedInsArray[0].length === 2) {
                    
                    return (
                        <div className="p-2 rounded noto-serif-kr flex">
                            <div id="speaker" className="flex mr-2 w-40 justify-end">
                                <p className="font-semibold text-gray-600">
                                    {insArray[0]}:
                                </p>
                            </div>
                            <div id="dialogue" className="text-gray-200">
                                <q>
                                    {insArray[1]}
                                </q>
                            </div>
                        </div>
                    );
                } else if (explodedInsArray.length >= 2 && explodedInsArray[0].length > 1) {
                    return <p>{script}</p>;

                }

            case '#all':
                switch(explodedInsArray[0][0]) {
                    case 'hide':
                        return (<><br />nodial<br /></>)
                    default:
                        return <p>{script}</p>;
                }

            default:
                return <p>{script}</p>;
        }
    }



    const matchingGroups = tokenGroup.filter((group) => /^[1-5]$/.test(group[0]));


    return matchingGroups.map((group) => {
        const speaker = group[1]?.trim() ?? 'LADR.Err.NoSpeaker';
        const dialogue = group.slice(3)

        const lineNo = ''




        tokenGroup.forEach(group => {
            if (group.some(token => token.startsWith('#'))) {
                // Pass the group to processCommand
                const commandResponse = processCommand(group);
            }
        });

        // group is an individual array of semicolon-exploded script split by \n.


        if (group.length >= 4) { // For when the speaker does have a dialogue

            return (
                <div key={lineNo} id={`Line${lineNo}`} className="p-2 rounded noto-serif-kr flex">
                    <div id="speaker" className="flex mr-2 w-40 justify-end">
                        <p className="font-semibold text-gray-600">
                            {speaker}:
                        </p>
                    </div>
                    <div id="dialogue" className="text-gray-200">
                        <q>
                            {dialogue}
                        </q>
                    </div>
                </div>
            );
        } else { // For when the speaker does not have a dialogue

            return ''
        }
    });


}