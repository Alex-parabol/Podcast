/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
import './styles.css';
import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import PodcastDetail from './components/PodcastDetail/PodcastDetail';
import PodcastDashboard from './components/Dashboard/PodcastDashboard';
import Header from './components/Dashboard/components/Header';

export default function App() {
  const [podcasts, setPodcasts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(
      `https://api.allorigins.win/get?url=${encodeURIComponent(
        'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json',
      )}`,
    )
      .then((response) => response.json())
      .then((data) => {
        const finalData = JSON.parse(data.contents).feed.entry;
        setPodcasts(finalData);
        setIsLoading(false);
      });
  }, []);

  return (
    /* /podcast/{podcastId} */
    <div className="App">
      <Header isLoading={isLoading} />
      <Routes>
        <Route path="/" element={<PodcastDashboard podcasts={podcasts} />} />
        <Route path="/podcast/{podcastId}" element={<PodcastDetail />} />
      </Routes>

    </div>

  );
}
