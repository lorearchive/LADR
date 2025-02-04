export default function ProcessTokens(tokens) {
    let tokenGroups = [];
    let currentGroup = [];


    for (let token of tokens) {

        if (token.includes("\n")) {
            
            const parts = token.split("\n");

            if (parts[0]) {
                currentGroup.push(parts[0]);
            }

            if (currentGroup.length > 0) {
                tokenGroups.push(currentGroup);
            }

            for (let i = 1; i < parts.length - 1; i++) {
                if (parts[i]) {
                    tokenGroups.push([parts[i]]);
                }
            }

            currentGroup = parts[parts.length - 1] ? [parts[parts.length - 1]] : [];


        } else {
            currentGroup.push(token);
        }
    }

    if (currentGroup.length > 0) {
        tokenGroups.push(currentGroup);
    }

    return tokenGroups;
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