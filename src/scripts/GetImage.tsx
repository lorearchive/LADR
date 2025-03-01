import React, {useEffect, useState} from "react"
import BGNameLookup from "../../data/ExcelTable/ScenarioBGNameExcelTable.json"

export default function GetImage(id: number) {

    const [imageExists, setImageExists] = useState<boolean | null>(null);
    let imageUrl: string | undefined;

    const match = BGNameLookup.DataList.find(obj => obj.Name === id)
    if (!match) throw new Error("LADR: NO corresponding BGName object found in LIR.")
        
    const type = match.BGType
    const path = match.BGFileName

    let shouldRender: boolean = true



    switch (type) {
        case "Image":
            imageUrl = `https://raw.githubusercontent.com/lorearchive/ladr-images/main/${path}.jpg`
            break

        case "Spine":
        case "BlurRT":
            shouldRender = false
            break
        default:
            console.error(type, match)
            throw new Error("LADR: Unrecognized GetImage type.")
    }

    if (id === 1047754314) {
        shouldRender = false
    }


    if (shouldRender && imageUrl) {
        useEffect(() => {
            const checkImage = async () => {
                try {
                    const response = await fetch(imageUrl, { method: "HEAD" });
                    setImageExists(response.ok);
                } catch {
                    setImageExists(false);
                }
            };
    
            checkImage();
        }, [id]);
    
        if (imageExists === null) return <p>Checking image...</p>;
    
        return <div id="bgImage" className="my-4 mb-8"><img src={imageUrl} alt={`Image ${id}`} /></div>
    } else {
        return ""
    }
}
