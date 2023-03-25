import './styles.css';
import { useEffect, useState } from 'react';

function parsePodcasts(responseData) {
  const resultData = responseData.contents;
  const result = JSON.parse(resultData);
  return result.feed.entry;
}

function getPodcastsFromLocalStorage() {
  const podcasts = localStorage.getItem('podcasts');
  const lastUpdated = localStorage.getItem('lastUpdated');
  if (!podcasts || !lastUpdated) return null;
  const now = new Date().getTime();
  const timeDiff = now - parseInt(lastUpdated);
  if (timeDiff > 24 * 60 * 60 * 1000) {
    localStorage.removeItem('podcasts');
    localStorage.removeItem('lastUpdated');
    return null;
  }
  return JSON.parse(podcasts);
}

export default function App() {
  const [podcasts, setPodcasts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedPodcasts = getPodcastsFromLocalStorage();
    if (storedPodcasts) {
      setPodcasts(storedPodcasts);
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    setError(null);
    // with fetch
    fetch(
      `https://api.allorigins.win/get?url=${encodeURIComponent(
        'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json',
      )}`,
    )
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error('Network response was not ok.');
      })
      .then((data) => {
        const parsedData = parsePodcasts(data);
        setPodcasts(parsedData);
        localStorage.setItem('podcasts', JSON.stringify(parsedData));
        localStorage.setItem('lastUpdated', new Date().getTime().toString());
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return (
      <div>
        Ocurrió un error:
        {' '}
        {error.message}
      </div>
    );
  }

  return (
    <div className="App">
      {podcasts.map((item) => {
        console.log(item);
        return <h1 key={item.id.label}>{item['im:name'].label}</h1>;
      })}
    </div>
  );
}
