import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ProcessScript from './ProcessScript.tsx';
import GetAdjEpisodes from './GetAdjEpisodes.tsx';



export default function GetEpisode() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchEpisode = async () => {
            
            try {
                setLoading(true);
                setError(null);

                let path = window.location.pathname.slice(3) // slices the first slash then the language code. The language code always consists of 2 characters, and follows the ISO 639-1 standard.
                const segments = path.split('/').filter(Boolean);

                const storytype = segments[0] ?? '';
                const volume = segments[1] ?? '';
                const chapter = segments[2] ?? '';
                let episode = segments[3] ?? '';
                let sector

                if (episode.includes("-")) {
                    sector = episode.slice(episode.indexOf("-") + 1)
                    episode = episode.slice(0, episode.indexOf("-"))
                } else {
                    sector = 1
                }

                if (!/.*-\d+$/.test(location.pathname)) {
                    console.log('Redirecting to:', `${location.pathname}-${sector}`);
                    navigate(`${location.pathname}-${sector}`, { replace: true });
                }
                
                let url = '';
                if (volume === '') {
                    url = `https://raw.githubusercontent.com/lorearchive/ladr-json/${storytype}.json`
                } else if (chapter === '') {
                    url = `https://raw.githubusercontent.com/lorearchive/ladr-json/${storytype}/Volume${volume}.json`
                } else if (episode === '') {
                    url = `https://raw.githubusercontent.com/lorearchive/ladr-json/${storytype}/Volume${volume}/Chapter${chapter}.json`
                } else {
                    url = `https://raw.githubusercontent.com/lorearchive/ladr-json/${storytype}/Volume${volume}/Chapter${chapter}/Episode${episode}-s${sector}.json`
                }

                const response = await fetch(url);

                if (!response.ok) {
                    console.log(url);
                    throw new Error(`Failed to fetch episode: ${response.status}`);
                }

                const episodeData = await response.json();
                const dataList = episodeData.DataList;

                const scriptData = ProcessScript(dataList)
                setData(scriptData);


            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        window.scrollTo(0, 0);
        fetchEpisode();

    }, [location.pathname, navigate]);

    if (loading) return <p>Loading episode...</p>;
    if (error) return <p>Error: {error}</p>;


    return (
        <>
            <div id="episode">
                <h1>Episode</h1>
                <div id="scriptData">
                {
                    data.map((item) => (
                    <>
                        {item}
                    </>
                    ))
                }
                </div>
            </div>
            <div id="adjEpisodes">
                <GetAdjEpisodes />
            </div>
        </>
    );
  
}
