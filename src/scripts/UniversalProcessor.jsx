import { useState } from "react"

export default function UniversalProcessor({ NestedArray }) {

    // This is basically a long chain of ifs and else ifs so i dont have to write it over and over and over and over and over and over and over over and over and over and over and over and over and over over and over and over and over and over and over and over over and over and over and over and over and over and over again
    // Coudlve named it like ProcessorHub, ProcessHub, MainProcessor, MainProcessingUnit, CentralProcessingUnit, or something idk im not a good namer u see


    let html


    const output = NestedArray.map(subarray => {

        if (NestedArray.some(array => array[0].test('#fontsize'))) {

            const [fontsize, setFontsize] = useState(null)

            let fontarray = NestedArray.find(array => array[0].test('#fontsize'))

            const returnedFontsize = <ProcessCommand array={fontarray} />
            setFontsize(returnedFontsize)


            html = NestedArray.map()




        }



    })


    return output

}