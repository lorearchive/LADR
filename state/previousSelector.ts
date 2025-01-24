let previousSelector = false;

export const previousWasASelector = () => {
    return previousSelector
}

export function setPreviousSelector() {
    previousSelector = true
}

export function resetPreviousSelector() {
    previousSelector = false

}