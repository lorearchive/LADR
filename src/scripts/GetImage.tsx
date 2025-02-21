import React, {useEffect, useState} from "react";



export default function GetImage(type: string, id: number) {

    const [imageExists, setImageExists] = useState<boolean | null>(null);
    let imageUrl: string

    if (type === "BG") {
        imageUrl = `https://raw.githubusercontent.com/lorearchive/ladr-images/main/BG/${id}.jpg`
    } else if (type === "other") {
        imageUrl = `https://raw.githubusercontent.com/lorearchive/ladr-images/main/${id}.jpg`
    } else {
        throw new Error("LADR: Unrecognized GetImage type.")
    }
    

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
}
