let spriteArray = ['null', 'null', 'null', 'null', 'null', 'null'];
// An array with SIX elements. spriteArray[0] always remains at 'null' since it is not updated. Only positions 1 through to 5 are updated.


export const fetchSprites = () => [...spriteArray];

export function fetchSpritePos(position: string): string {
    return spriteArray[position]
}

export const updateSprites = (position: string, data:string): void => {

    spriteArray[position] = data;
}

export const resetSprites = (): void => {
    spriteArray = ['null', 'null', 'null', 'null', 'null', 'null'];
}