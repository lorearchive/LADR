import React, {useEffect, useState} from "react"
import axios from "axios"
import sizeOf from 'image-size'
import { Buffer } from "buffer"

import BGNameLookup from "../../data/ExcelTable/ScenarioBGNameExcelTable.json"

interface imgDim {
    width: number,
    height: number
}

interface lirContents {
    name: string
    download_url: string
}

export default function GetImage(id: number) {

    const [imgDim, setImgDim] = useState<imgDim | null>(null)
    const [imageExists, setImageExists] = useState<boolean | null>(null)
    const [error, setError] = useState<Error | null>(null)
    const [loading, setLoading] = useState(true);
    const [diffImgUrl, setDiffImgUrl] = useState<string | undefined>(undefined)


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
        
            const getImageDimensionsNode = async (imageUrl: string): Promise<imgDim> => {
                try {
                    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
                    const buffer = Buffer.from(response.data);
                    const dimensions = sizeOf(buffer);
        
                    return {
                        width: dimensions.width!,
                        height: dimensions.height!
                    }

                } catch (err) {
                    console.error("Error in getImageDimensionsNode:", err);
                    throw err;
                }
            }
        
            const getLirContents = async (dir: string) => {
                let newPath = dir.split("/");
                if (newPath.length !== 4) throw new Error("LADR: getLirContents encountered path that is not 4 levels deep.");
                
                newPath = newPath.slice(0, -1); // Remove the last part
                const stringNewPath = newPath.join("/");
            
                try {
                    const response = await axios.get(
                        `https://api.github.com/repos/lorearchive/ladr-images/contents/${stringNewPath}`
                    );
                    return response.data
                } catch (error) {
                    console.error("Error fetching LIR contents:", error);
                    throw error
                }
            }

            const checkImage = async () => {
                try {
                    const response = await fetch(imageUrl, { method: "HEAD" });
                    setImageExists(response.ok);
        
                    if (response.ok) {
                        const dimensions = await getImageDimensionsNode(imageUrl);
                        setImgDim(dimensions);
                        setDiffImgUrl(undefined)
                        
                    } else {
                        const jsonContent: lirContents[] = await getLirContents(path)
                        const matchedObj = jsonContent.find(obj => obj.name.includes(path.split("/")[3]))
                        let DIU = matchedObj?.download_url // different image url used as a locally scoped variable
                        setDiffImgUrl(matchedObj?.download_url)

                        if (DIU) {
                            const dimensions = await getImageDimensionsNode(DIU)
                            setImgDim(dimensions)                            
                        } else {
                            console.error("Image does not exist.", id);
                            setError(new Error(`LADR: ${response.status}`));
                        }
                    }
                        
                } catch (err) {
                    console.error("Error in checkImage:", err);
                    setError(err instanceof Error ? err : new Error("Unknown error"));
                } finally {
                    setLoading(false)
                }
            };
        
            checkImage();
        }, [id, imageUrl]);
        
    
        if (loading) return <p>Loading dimensions...</p>;
        if (imageExists === null) return <p>Checking image...</p>;
        if (error) return <p>Error while fetching image. {error.message}</p>;


        if (!diffImgUrl) {
            if (imgDim?.width === 1280 && imgDim?.height === 900) {
                return (
                    <div id="bgImage" className="my-4 mb-8">
                        <img src={imageUrl} alt={`Image ${id}`} loading="lazy" style={{ maxWidth: `80%`, height: `auto`, aspectRatio: `${720}/200`,objectFit: "cover", margin: "0 auto" }}/>
                    </div>
                )
            } else if (imgDim?.width === 1600 && imgDim?.height === 1124) {
                return (
                    <div id="bgImage" className="my-4 mb-8">
                        <img src={imageUrl} alt={`Image ${id}`} loading="lazy" style={{ maxWidth: `80%`, height: `auto`, aspectRatio: `${720}/200`,objectFit: "cover", margin: "0 auto" }}/>
                    </div>
                )
            }
            
            else if (imgDim) {
                console.error("Unexpected Dimensions:", imgDim);
                throw new Error("Unexpected Dimensions. Check the console for more info.");
            } else {
                throw new Error("imgDim is not defined.")
            }

        } else {
            if (imgDim?.width === 1280 && imgDim?.height === 900) {
                return (
                    <div id="bgImage" className="my-4 mb-8">
                        <img src={diffImgUrl} alt={`Image ${id}`} loading="lazy" style={{ maxWidth: `80%`, height: `auto`, aspectRatio: `${720}/200`,objectFit: "cover", margin: "0 auto" }}/>
                    </div>
                )
            } else if (imgDim?.width === 1600 && imgDim?.height === 1124) {
                return (
                    <div id="bgImage" className="my-4 mb-8">
                        <img src={diffImgUrl} alt={`Image ${id}`} loading="lazy" style={{ maxWidth: `80%`, height: `auto`, aspectRatio: `${720}/200`,objectFit: "cover", margin: "0 auto" }}/>
                    </div>
                )
            }
            
            else if (imgDim) {
                console.error("Unexpected Dimensions:", imgDim);
                throw new Error("Unexpected Dimensions. Check the console for more info.");
            } else {
                throw new Error("imgDim is not defined.")
            }
        }

        

    } else {
        return ""
    }
}
