interface DirectoryItem {
    name: string;
    sha: string;
}

export default function GetDirectory(dir: string, type: string) {

    let n

    const splitDir = dir.split("/").filter(Boolean)
    const volume = splitDir[0]
    const chapter = splitDir[1]
    // We don't define episode, because that won't be a directory

    let toSearchFor: string // What is it that we are searching for? Volume or Chapter?

    switch(type) {
        case "main":
            if (typeof(volume) !== "number") throw new Error ("LADR: Volume is not a number.")

            if (chapter === undefined) {
                toSearchFor = "volume"
            } else {
                toSearchFor = "chapter"
            }

            const fetchFiles = async () => {

                try {
                    let response: Response

                    if (toSearchFor === "volume") {
                        response = await fetch(
                            `https://api.github.com/repos/lorearchive/ladr-json/contents/Volume${volume}`
                        )
                    } else if (toSearchFor === "chapter") {
                        response = await fetch(
                            `https://api.github.com/repos/lorearchive/ladr-json/contents/Volume${volume}/Chapter${chapter}`
                        )
                    } else {
                        throw new Error("LADR: Something is wrong with the URL.")
                    }

                    if (!response.ok) {
                        throw new Error(`LADR: Failed to fetch directory listing: ${response.status}`)
                    }

                    const result = await response.json()


                    if (toSearchFor === "volume") {
                        const names = result
                            .filter((item: { type: string }) => item.type === "dir")
                            .map((item: DirectoryItem) => ({
                                name: item.name.startsWith("Chapter") ? item.name.replace(/^Chapter(\d+)/, "Chapter $1")  : item.name,
                                sha: item.sha
                            }))
                    }


                } catch (e) {

                }
            }
    }
    
}