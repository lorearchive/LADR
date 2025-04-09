interface DirectoryItem {
    name: string;
    sha: string;
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
                    } else {
                        throw new Error("LADR: wait")
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