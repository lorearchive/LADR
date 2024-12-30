export default function processSelector(array, group) {

    let selection = array.map(item => {
        let [firstPart, ...rest] = item.split(' ');
        return [firstPart, rest.join(' ')];
    });


    
}