import { useEffect, useState } from 'react';

export default function GetEpisode() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  // Specifically process commands
  const processCommand = (command, instruction = '', instruction2 = '', instruction3 = '') => {
    switch (command) {
        case '#1':
        case '#2':
        case '#3':
        case '#4':
        case '#5':
          switch(instruction) {
            case 'm1':
            case 'm2':
            case 'm3':
            case 'm4':
            case 'm5':
              return ( ' ' );
              break;

          }

          break;


        case '#wait':
          let height = Number(instruction) / 10;
          return (``)
          


        default:
            console.log('Unknown command');
            // Handle the default case
    }
  };

  // Process script
  const processScript = (script, index) => {
    if (script.startsWith('#')) {
      const [command, ...instruction] = script.split(';'); // Split by semicolon
      const ins = instruction.join(';').trim(); // Combine the rest as the instruction


      switch (command) {
        case '#title':
          return (
            <h2
              id="EpTitle"
              className="noto-serif-kr text-2xl my-1 mb-6 font-bold relative pl-4 before:content-[''] before:absolute before:inset-y-0 before:left-0 before:w-1 before:bg-gradient-to-b before:from-transparent before:to-blue-600"
            >
              {ins}
            </h2>
          );

        case '#place':
          return (
            <div id="EpPlace" className="flex items-center p-2 pr-3 my-1 mb-6 text-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="gray"
                className="mr-2 size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                />
              </svg>
              <h5 id="EpPlaceTag" className="flex items-center noto-serif-kr dark:text-gray-400">
                <em>{ins}</em>
              </h5>
            </div>
          );

        default:
          return <p>{script}</p>; // Default rendering for unknown commands
      }
    }

    // Non-command processing logic
    const tokens = script.split(';');
    if (/^[1-5]$/.test(tokens[0])) {
      const speaker = tokens[1]?.trim() ?? 'Err.NoSpeaker'; // Get the speaker (second token)
      const dialogue = tokens.slice(3).join(';').trim(); // Combine everything after the third token
      const lineNo = index + 1; // Use the passed index to calculate LineNo
    


      return (
        <div id={`Line${lineNo}`} className="p-2 rounded noto-serif-kr">
          <p className="flex items-center space-x-2">
            <span id="speaker" className="font-semibold text-gray-600">
              {speaker}:
            </span>
            <span id="dialogue" className="text-gray-300">
              {dialogue}
            </span>
          </p>
        </div>
      );
    }
    

    return <p>{script}</p>; // Default rendering for non-commands
  };

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
          const scriptData = dataList.map((item, index) => processScript(item.ScriptKr, index));
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
          data.map((item, index) => (
            <div key={index} className="mb-1">
              {item} {/* Render processed content */}
            </div>
          ))
        ) : (
          <p>No script data available</p>
        )}
      </div>
    </div>
  );
}
