import { useState } from 'react'


let previousDialogue: any[] = []




export function fetchPreviousDialogue(): any[] {
    return previousDialogue
}

export function setPreviousDialogue(array: any[]): void {
    previousDialogue = array
};

export function pushPreviousDialogue(array: any[]): void {
    previousDialogue.push(...array)
}


export function resetPreviousDialogue(): void {
    previousDialogue = []
};

