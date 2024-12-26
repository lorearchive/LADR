import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

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
          .filter(item => item.type === 'file')
          .map(item => ({ name: item.name.replace('.json', ''), sha: item.sha }));

        setData(names);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
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
            <NavLink key={item.sha || index} to={`${url}${item.name}`}>
                <div id="chapter" className="flex justify-between p-4 transition-colors border rounded-md mb-7 dark:bg-defaultGray dark:border-gray-500 hover:dark:bg-black">
                <p><strong>{item.name}</strong></p>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6" aria-hidden="true" focusable="false">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
                </svg>
                </div>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
}
