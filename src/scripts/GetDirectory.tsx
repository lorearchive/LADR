import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";

// Add interface for the item type
interface DirectoryItem {
    name: string;
    sha: string;
    order: string
}

export default function GetDirectory({ dir }: {dir: string}) {
    const [data, setData] = useState<DirectoryItem[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const { lang } = useParams()
    console.log(lang)
    
    const truePath = window.location.pathname
    let path = truePath.slice(3)
    path = path.replace(/\/$/, '') // Removes trailing slash
    let kind: string = "";
    let volume: string = "";
    let chapter: string = "";
    // We don't define episode, because that won't be a directory

    if (path.startsWith("/main")) {

        if (/^\/main\/\d+\/?$/.test(path)) {
            kind = "volume";
            let match = path.match(/^\/main\/(\d+)\/?$/);
            if (match) volume = match[1];

        } else if (/^\/main\/\d+\/\d+\/?$/.test(path)) {
            kind = "chapter";
            let match = path.match(/^\/main\/(\d+)\/(\d+)\/?$/);
            if (match) {
                volume = match[1];
                chapter = match[2];
            }
        } else {
            kind = "any"
            path = path.replace(/[^A-Za-z0-9\s/]/g, '') // Removes all special characters other than slash, for sanitization
            if (path.startsWith("/test")) {
                path = path.slice(5)
            }
        }
    } else {
        throw new Error("LADR: Not ready for that URL yet! (Or it is malformed)")
    }

    useEffect(() => {
        const fetchFiles = async () => {
            try {
                let response: Response;

                if (kind === "volume") {
                    response = await fetch(
                        `https://api.github.com/repos/lorearchive/ladr-json/contents/Volume${volume}`
                    );

                } else if (kind === "chapter") {
                    response = await fetch(
                        `https://api.github.com/repos/lorearchive/ladr-json/contents/Volume${volume}/Chapter${chapter}`
                    );
                } else {
                    response = await fetch(
                        `https://api.github.com/repos/lorearchive/ladr-json/contents${path}`
                    )
                }

                if (!response.ok) {
                    throw new Error(
                        `LADR: Failed to fetch directory listing: ${response.status}`
                    );
                }

                const result = await response.json();

                if (dir !== undefined) { // The argument of the GetDirectory component "dir" is used to check if the given URL path leads to a directory of directories (true) or directory of files (false)
                    const names = result
                        .filter((item: { type: string }) => item.type === "dir")
                        .map((item: { name: string; sha: string }) => ({
                            order: item.name.startsWith("Chapter")
                                ? item.name.replace("Chapter", "")
                                : item.name,
                            name: item.name.startsWith("Chapter") 
                                ? item.name.replace(/^Chapter(\d+)/, "Chapter $1") 
                                : item.name,
                            sha: item.sha
                        }));
                    setData(names);
                } else if (kind === "any") {
                    const names = result
                    .filter((item: { name: string}) => item.name.endsWith(".json"))
                    .map((item: { name:string, sha: string}) => ({ name: item.name.replace('.json', ''), sha: item.sha }));

                    setData(names);

                } else {
                    const names = result
                        .filter((item: { name: string }) => item.name.endsWith(".json"))
                        .map((item: { name: string; sha: string }) => {
                            const match = item.name.match(/^Episode(\d+)[-_]?/);
                            const episodeNo = match ? match[1] : null
                            const sector = item.name.match(/-s(\d+)/)
                            const sectorNo = sector ? sector[1] : null

                            
                            if (sectorNo === null) {
                                return {
                                    order: match ? match[1] : null,
                                    name: `Episode ${episodeNo}`, 
                                    sha: item.sha 
                                };
                            } else {
                                return {
                                    order: match ? match[1] : null,
                                    sector: sectorNo,
                                    name: `Episode ${episodeNo} - Sector ${sectorNo}`,
                                    sha: item.sha
                                };
                            }
                            
                        });
                    setData(names);
                }
            } catch (err: unknown) {
                setError(err instanceof Error ? err.message : "Unknown error");
            } finally {
                setLoading(false);
            }
        };

        fetchFiles();

        window.scrollTo(0, 0);
    }, [path]); // Re-run when path changes

    if (loading) return <p>Searching through the archive...</p>;
    if (error) return <p>Error while searching! {error}</p>;

    switch (kind) {

        case "volume":
            return (
                <div id="chapterList">
                    <h1 className="mb-5">Volume {volume}</h1>
                    <div id="chapters">

                        {data.map((item, index) => {
                            return (
                                <div key={item.sha || index} id="chapter" className="h-14 flex items-center justify-between transition-colors border-2 rounded-md mb-7 dark:bg-defaultGray dark:border-gray-500 hover:dark:bg-black min-h-[3rem]">
                                    <NavLink to={`${truePath}${item.order}`} className="flex items-center w-full p-3 h-14">
                                        <p className="flex items-center m-0">
                                            <strong>{item.name}</strong>
                                        </p>
                                    </NavLink>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )

        case "chapter":
            return (
                <div id="chapterList">
                    <h1 className="mb-5">Volume {volume}, Chapter {chapter}</h1>
                    <div id="chapters">

                        {data.map((item, index) => {
                            return (
                                <div key={item.sha || index} id="chapter" className="h-14 flex items-center justify-between transition-colors border-2 rounded-md mb-7 dark:bg-defaultGray dark:border-gray-500 hover:dark:bg-black min-h-[3rem]">
                                    <NavLink to={`${truePath}${item.order}`} className="flex items-center w-full p-3 h-14">
                                        <p className="flex items-center m-0">
                                            <strong>{item.name}</strong>
                                        </p>
                                    </NavLink>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )

        case "any":
            return (
                <div id="chapterList">
                  <h1 className="mb-5">Chapter {chapter}</h1>
                  <div id="chapters">
                    {data.map((item, index) => {
                      return (
                        <div key={item.sha || index} id="chapter" className="h-14 flex items-center justify-between transition-colors border-2 rounded-md mb-7 dark:bg-defaultGray dark:border-gray-500 hover:dark:bg-black min-h-[3rem]">
                          <NavLink to={`${window.location.pathname}${item.name}`} className="flex items-center w-full p-3 h-14">
                              <p className="flex items-center m-0">
                                <strong>{item.name}</strong>
                              </p>
                          </NavLink>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
    
        default:
            return <p>LADR: Invalid path, kind: {kind}</p>;
    }
}