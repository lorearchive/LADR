import { useEffect, useState } from "react";

export default function GetImage(id: number) {

    const [loading, setLoading] = useState(true)


    useEffect(() => {
        const fetchImage = async () => {
            try {
                const resposne = await fetch(`https://raw.githubusercontent.com/lorearchive/ladr-images/main/${id}`)
            } catch {

            } finally {

            }
        }
    })
}