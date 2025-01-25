let previousDialogue = ['null', 'null']; // [dialogue array, selectiongroup]

export function isPreviousDialogueReset() {
    if (previousDialogue[0] === 'null' && previousDialogue[1] === 'null') {
        return true
    } else {
        return false
    }
};

export function fetchPreviousDialogue(element = 8) {
    
    if (element === undefined) {
        return [...previousDialogue];
    } else if (element === 0) {
        return previousDialogue[0]
    } else if (element === 1) {
        return previousDialogue[1]
    } else {
        throw new Error("Previous dialogue array does note xisgshuhFD")
    }

}

export function setPreviousDialogue(array, group) {
    previousDialogue[0] = array;
    previousDialogue[1] = group;
};

export const resetPreviousDialogue = () => {
    previousDialogue = ['null', 'null']
};
