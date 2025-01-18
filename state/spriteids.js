let spriteArray = ['null', 'null', 'null', 'null', 'null'];

export const fetchSprites = () => [...spriteArray];


export const updateSprites = (position, data) => {

    if (typeof position !== 'integer') {
        throw new Error('LADR: state: Invalid position value when editing spriteids state: Must be an integer.');
    }

    if (typeof data !== 'string') {
        throw new Error('LADR: state: Invalid data value when editing spriteids state: Must be a string.');
    }

    spriteArray[position] = data;
}

export const resetSprites = () => {
    spriteArray = ['null', 'null', 'null', 'null', 'null'];
}