import { script } from 'framer-motion/client';
import { useEffect, useState } from 'react';
import { ProcessScript } from './ProcessScript.jsx';

export default function GetEpisode() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);




  useEffect(() => {
    const fetchEpisode = async () => {
      try {
        setLoading(true);
        setError(null);

        // Capture the current URL path
        const path = window.location.pathname;

        // Strip off leading slashes and split the path by "/"
        const segments = path.split('/').filter(Boolean);

        const storytype = segments[0] ?? '';
        const volume = segments[1] ?? '';
        const chapter = segments[2] ?? '';
        const episode = segments[3] ?? '';

        let url = '';
        if (volume === '') {
          url = `https://media.githubusercontent.com/media/lorearchive/ladr-json/${storytype}.json`;
        } else if (chapter === '') {
          url = `https://media.githubusercontent.com/media/lorearchive/ladr-json/${storytype}/${volume}.json`;
        } else if (episode === '') {
          url = `https://media.githubusercontent.com/media/lorearchive/ladr-json/${storytype}/${volume}/${chapter}.json`;
        } else {
          url = `https://media.githubusercontent.com/media/lorearchive/ladr-json/${storytype}/${volume}/${chapter}/${episode}.json`;
        }

        const response = await fetch(url);
        if (!response.ok) {
          console.log(url);
          throw new Error(`Failed to fetch episode: ${response.status}`);
        }
        const episodeData = await response.json();

        const dataList = episodeData.DataList;
        if (dataList) {
          const scriptData = dataList.map((item) => <ProcessScript script={item.ScriptKr} group={item.SelectionGroup} />);

          setData(scriptData);
        } else {
          throw new Error('DataList not found in the JSON response');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    window.scrollTo(0, 0);

    fetchEpisode();
  }, []); // Empty dependency array to run only once on component mount

  if (loading) return <p>Loading episode...</p>;
  if (error) return <p>Error: {error}</p>;


    return (
      <div id="episode">
        <h1>Episode</h1>
        <div id="scriptData">
          {data ? (
            data.map((item) => (
              <>
                {item}
              </>
            ))
          ) : (
            <p>No script data available</p>
          )}
        </div>
      </div>
    );
  
}
