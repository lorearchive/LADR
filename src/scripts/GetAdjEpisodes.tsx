import React, {JSX, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

export default function GetAdjEpisodes() {
    const [adjNavigate, setAdjNavigate] = useState<JSX.Element | null>(null);
    const [error, setError] = useState<any>(null);

    useEffect(() => {
        const fetchMeta = async () => {
            try {
                const path = window.location.pathname
                const segments = path.split('/').filter(Boolean);
                const basePath = `/${segments.slice(0, 4).join("/")}`;

                if (segments[1] === "main") {
                    const volume = segments[2];
                    const chapter = segments[3];
                    const episode = segments[4].split("-")[0];
                    const sector = segments[4].split("-")[1];

                    const url = `https://raw.githubusercontent.com/lorearchive/ladr-json/main/Volume${volume}/Chapter${chapter}/.meta.json`;

                    const response = await fetch(url);
                    if (!response.ok) {
                        console.log(url);
                        throw new Error(`LADR: Failed to fetch metadata: ${response.status}`);
                    }

                    const adjData = await response.json();
                    const episodeData = adjData[episode];
                    const sectorCount = String(episodeData.Sectors);

                    const prevEpisodeData = adjData[String(parseInt(episode) - 1)];
                    const prevSectorCount = prevEpisodeData?.Sectors || 1; // Handle missing data

                    const prevEp = parseInt(episode) - 1;
                    const nextEp = parseInt(episode) + 1;

                    if (sector === "1") { // That is, current sector
                        if (sectorCount === sector) { // sector count of current episode is 1
                            setAdjNavigate(
                                <div id="adjNavigate" className="flex justify-between h-5 mt-3">
                                    <NavLink to={`${basePath}/${prevEp}-${prevSectorCount}`} id="prevEpisodeNavigate" className="flex">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />
                                        </svg>
                                        Episode {prevEp} - Sector {prevSectorCount}
                                    </NavLink>
                                    <NavLink to={`${basePath}/${nextEp}-1`} id="nextEpisodeNavigate" className="flex">
                                        Episode {nextEp}
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
                                        </svg>

                                    </NavLink>
                                </div>
                            );
                        } else {
                            setAdjNavigate(
                                <div id="adjNavigate" className="flex justify-between h-5 mt-3">
                                    <NavLink to={`${basePath}/${prevEp}-${prevSectorCount}`} id="prevEpisodeNavigate" className="flex">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />
                                        </svg>
                                        Episode {prevEp} - Sector {prevSectorCount}
                                    </NavLink>
                                    <NavLink to={`${basePath}/${episode}-${parseInt(sector) + 1}`} id="nextEpisodeNavigate" className="flex">
                                        Episode {episode} - Sector {parseInt(sector) + 1}
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
                                        </svg>

                                    </NavLink>
                                </div>
                            );
                        }

                    } else if (sector !== "1") {
                        const parsedSector = parseInt(sector)
                        if (sectorCount === sector) {
                            setAdjNavigate(
                                <div id="adjNavigate" className="flex justify-between h-5 mt-3">
                                    <NavLink to={`${basePath}/${episode}-${parsedSector - 1}`} id="prevEpisodeNavigate" className="flex">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />
                                        </svg>
                                        Episode {episode} - Sector {parsedSector - 1}
                                    </NavLink>
                                    <NavLink to={`${basePath}/${nextEp}-1`} id="nextEpisodeNavigate" className="flex">
                                        Episode {nextEp}
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
                                        </svg>

                                    </NavLink>
                                </div>
                            );
                        }
                    }
                }
            } catch (error) {
                setError(error instanceof Error ? error.message : String(error));
            }
        };

        fetchMeta();
    }, []);


    if (error) return <p>Error while searching! {error}</p>;

    return (
        <div>
            {adjNavigate}
        </div>
    );
}
