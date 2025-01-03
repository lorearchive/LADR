let spriteArray = ['null', 'null', 'null', 'null', 'null'];

export const fetchSprites = () => [...spriteArray];


export const updateSprites = (position, data) => {

    if (typeof data !== 'string') {
        throw new Error('Invalid data when editing spriteids state: Must be a string.');
    }
    spriteArray[position] = data;
}

export const resetSprites = () => {
    spriteArray = ['null', 'null', 'null', 'null', 'null'];
}