let previousSelector = false;

export const previousWasASelector = (): boolean => {
    return previousSelector
}

export function setPreviousSelector(): void {
    previousSelector = true
}

export function resetPreviousSelector(): void {
    previousSelector = false

}