import { useEffect, useState } from 'react';

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
        const segments = path.split('/').filter(Boolean); // Removes empty parts



        const storytype = segments[0] ?? ''; // e.g., 'main', 'relationship', or 'event', fallback to empty string if undefined
        const volume = segments[1] ?? ''; // e.g., volume name (e.g., 'volume1')
        const chapter = segments[2] ?? ''; // e.g., chapter name (e.g., 'chapter1')
        const episode = segments[3] ?? ''; // e.g., episode filename (e.g., 'episode1.json')

        // Initialize the URL variable here
        let url = '';

        if (volume === '') {
          // Trying to access root files
          url = `https://media.githubusercontent.com/media/lorearchive/ladr-json/${storytype}.json`;
        } else if (chapter === '') {
          // Trying to access files inside a directory
          url = `https://media.githubusercontent.com/media/lorearchive/ladr-json/${storytype}/${volume}.json`;
        } else if (episode === '') {
          // Trying to access files inside a directory inside a directory
          url = `https://media.githubusercontent.com/media/lorearchive/ladr-json/${storytype}/${volume}/${chapter}.json`;
        } else {
          // Trying to access files inside a directory inside a directory inside a directory
          url = `https://media.githubusercontent.com/media/lorearchive/ladr-json/${storytype}/${volume}/${chapter}/${episode}.json`;
        }

        // Fetch the JSON data from the constructed URL
        const response = await fetch(url);
        if (!response.ok) {
            console.log(url)
          throw new Error(`Failed to fetch episode: ${response.status}`);
        }
        const episodeData = await response.json();

        // Assuming 'DataList' is an array of objects with a 'ScriptKr' key
        const dataList = episodeData.DataList; // Change based on actual JSON structure
        if (dataList) {
          const scriptData = dataList.map(item => item.ScriptKr);
          setData(scriptData); // Set the data to display
        } else {
          throw new Error('DataList not found in the JSON response');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEpisode();
  }, []); // Empty dependency array to run only once on component mount

  if (loading) return <p>Loading episode...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div id="episode">
      <h1>Episode</h1>
      <div id="scriptData">
        {data ? (
          data.map((item, index) => (
            <div key={index} className="p-4 mb-4 border">
              <p>{item}</p>
            </div>
          ))
        ) : (
          <p>No script data available</p>
        )}
      </div>
    </div>
  );
}
