// THis file needs to be optimized

let previousDialogue: any[] = []

let previousGroup: number

export function prevGroup(assign?: number): number | void {

    if (assign !== undefined) {
        previousGroup = assign
    } else {
        return previousGroup
    }
}

export function fetchPreviousDialogue(): any[] {
    return previousDialogue
}

export function setPreviousDialogue(array: any[]): void {
    previousDialogue = array
};

export function pushPreviousDialogue(array: any[]): void {
    previousDialogue.push(...array)
}


export const resetPreviousDialogue = () => {
    previousDialogue = []
};
