import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';


export default function GetDirectory({ path, chapter }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await fetch(`https://api.github.com/repos/lorearchive/ladr-json/contents${path}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.status}`);
        }
        const result = await response.json();

        // Transform the data
        const names = result
          .filter(item => item.name.endsWith(".json"))
          .map(item => ({ name: item.name.replace('.json', ''), sha: item.sha }));

        setData(names);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
    window.scrollTo(0, 0);

  }, [path]);

  if (loading) return <p>Searching through the Archive...</p>;
  if (error) return <p>Error while searching! {error}</p>;

  let url = window.location.pathname

  return (
    <div id="chapterList">
      <h1>Chapter {chapter}</h1>
      <div id="chapters">
        {data.map((item, index) => {
          return (
            <div key={item.sha || index} id="chapter" className="h-14 flex items-center justify-between transition-colors border-2 rounded-md mb-7 dark:bg-defaultGray dark:border-gray-500 hover:dark:bg-black min-h-[3rem]">
              <NavLink to={`${url}${item.name}`} className="flex items-center w-full p-3 h-14">
                  <p className="flex items-center m-0">
                    <strong>{item.name}</strong>
                  </p>
              </NavLink>
            
              <button data-tooltip-id="newtabtooltip" data-tooltip-content="Open in new tab" data-tooltip-variant="light" className="flex items-center self-stretch justify-center border-l border-gray-400 w-14">
                <NavLink
                  to={`${url}${item.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center w-6 h-6" // Added these classes
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
                    />
                  </svg>
                </NavLink>
              </button>
              <Tooltip id="newtabtooltip" />


            </div>
          );
        })}
      </div>
    </div>
  );
}
