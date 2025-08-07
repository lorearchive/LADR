interface DirectoryItem {
    name: string;
    sha: string;
    number: string
}

export default async function GetDirectory(type: string, volume: string, chapter: string | undefined = undefined) {
    let error;
    let names: DirectoryItem[] = [];

    let toSearchFor: string;

    switch (type) {
        case "main":
            if (typeof Number(volume) !== "number") throw new Error("LADR: Volume is not a number.");

            if (chapter === undefined) {
                toSearchFor = "volume";
            } else {
                toSearchFor = "chapter";
            }

            const fetchFiles = async () => {
                try {
                    let response: Response;

                    if (toSearchFor === "volume") {
                        response = await fetch(
                            `https://api.github.com/repos/lorearchive/ladr-json/contents/Volume${volume}`
                        );
                    } else if (toSearchFor === "chapter") {
                        response = await fetch(
                            `https://api.github.com/repos/lorearchive/ladr-json/contents/Volume${volume}/Chapter${chapter}`
                        );
                    } else {
                        throw new Error("LADR: Something is wrong with the URL.");
                    }

                    if (!response.ok) {
                        throw new Error(`LADR: Failed to fetch directory listing: ${response.status}`);
                    }

                    const result = await response.json();

                    if (toSearchFor === "volume") {
                        names = result
                            .filter((item: { type: string }) => item.type === "dir")
                            .map((item: DirectoryItem) => ({
                                name: item.name.startsWith("Chapter")
                                    ? item.name.replace(/^Chapter(\d+)/, "Chapter $1")
                                    : item.name,
                                sha: item.sha,
                            }));
                    } else if (toSearchFor === "chapter") {
                        names = result
                            .filter((item: { type: string, name: string }) => item.type === "file" || item.name.endsWith(".json"))
                            .map((item: DirectoryItem) => {
                                const episodeNo = item.name.slice(2, 4)
                                const sectorNo  = item.name.at(4) === "0" ? "1" : "2"

                                if (sectorNo === "1") {
                                    return {
                                        name: `Episode ${episodeNo}`, 
                                        sha: item.sha,
                                        number: episodeNo
                                    }
                                } else {
                                    return {
                                        sector: sectorNo,
                                        name: `Episode ${episodeNo} - Sector ${sectorNo}`,
                                        sha: item.sha,
                                        number: episodeNo
                                    };
                                }
                            })
                    } else {
                        throw new Error("LADR: Something is wrong with the URL.")
                    }
                } catch (e) {
                    error = e;
                }
            };

            await fetchFiles(); // await the async function
            return names;

        default:
            throw new Error("LADR: Route is not valid.");
    }
}