let previousDialogue = ['null', 'null']; // [dialogue array, selectiongroup]

export const isPreviousDialogueReset = () => {
    if (previousDialogue[0] === 'null' && previousDialogue[1] === 'null') {
        return true;
    } else {
        return false;
    }
};

export const fetchPreviousDialogue = () => [...previousDialogue];

export const setPreviousDialogue = (array, group) => {
    previousDialogue[0] = array;
    previousDialogue[1] = group;
};

export const resetPreviousDialogue = () => {
    previousDialogue[0] = 'null';
    previousDialogue[1] = 'null';
};
