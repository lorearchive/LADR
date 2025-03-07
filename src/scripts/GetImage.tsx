import React, {useEffect, useState} from "react"
import axios from "axios"
import sizeOf from 'image-size'
import { Buffer } from "buffer"

import BGNameLookup from "../../data/ExcelTable/ScenarioBGNameExcelTable.json"

interface imgDim {
    width: number,
    height: number
}

export default function GetImage(id: number) {

    const [imgDim, setImgDim] = useState<imgDim | null>(null)
    const [imageExists, setImageExists] = useState<boolean | null>(null)
    const [error, setError] = useState<Error | null>(null)
    const [loading, setLoading] = useState(true);


    const match = BGNameLookup.DataList.find(obj => obj.Name === id)
    if (!match) throw new Error("LADR: NO corresponding BGName object found in LIR.")
        
    const type = match.BGType
    const path = match.BGFileName

    let imageUrl: string | undefined
    let shouldRender: boolean = true // Should we render this image?



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

    if (id === 1047754314) { // Blank black background
        shouldRender = false
    }


    if (shouldRender && imageUrl) {
        useEffect(() => {
            if (!imageUrl) return
        
            const getImageDimensionsNode = async (imageUrl: string): Promise<imgDim> => {
                try {
                    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
                    const buffer = Buffer.from(response.data);
                    const dimensions = sizeOf(buffer);
        
                    console.log("Fetched Dimensions:", dimensions);
        
                    return {
                        width: dimensions.width!,
                        height: dimensions.height!
                    };
                } catch (err) {
                    console.error("Error in getImageDimensionsNode:", err);
                    throw err;
                }
            };
        
            const checkImage = async () => {
                try {
                    const response = await fetch(imageUrl, { method: "HEAD" });
                    setImageExists(response.ok);
        
                    if (response.ok) {
                        const dimensions = await getImageDimensionsNode(imageUrl);
                        setImgDim(dimensions);
                    } else {
                        console.error("Image does not exist.");
                        setError(new Error(`LADR: ${response.status}`));
                    }
                } catch (err) {
                    console.error("Error in checkImage:", err);
                    setError(err instanceof Error ? err : new Error("Unknown error"));
                } finally {
                    setLoading(false); // Important!
                }
            };
        
            checkImage();
        }, [id, imageUrl]);

        useEffect(() => {
            console.log("imageUrl:", imageUrl);
            console.log("imgDim:", imgDim);
        }, [imgDim, imageUrl]);
        
    
        if (loading) return <p>Loading dimensions...</p>;
        if (imageExists === null) return <p>Checking image...</p>;
        if (error) return <p>Error while fetching image. {error.message}</p>;

        if (imgDim?.width === 1280 && imgDim?.height === 900) {
            return (
                <div id="bgImage" className="my-4 mb-8">
                    <img src={imageUrl} alt={`Image ${id}`} style={{ maxWidth: `80%`, height: `auto`, aspectRatio: `${720}/200`,objectFit: "cover", margin: "0 auto" }}/>
                </div>
            )
        } else if (imgDim?.width === 1600 && imgDim?.height === 1124) {
            return (
                <div id="bgImage" className="my-4 mb-8">
                    <img src={imageUrl} alt={`Image ${id}`} style={{ maxWidth: `80%`, height: `auto`, aspectRatio: `${720}/200`,objectFit: "cover", margin: "0 auto" }}/>
                </div>
            )
        }
        
        else if (imgDim) {
            console.error("Unexpected Dimensions:", imgDim);
            throw new Error("SIGMAs");
        } else {
            throw new Error("TOILETs")
        }

    } else {
        return ""
    }
}
