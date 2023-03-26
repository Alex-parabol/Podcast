/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
import './styles.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PodcastDetail from './components/PodcastDetail/PodcastDetail';
import PodcastDashboard from './components/Dashboard/PodcastDashboard';
import Header from './components/Dashboard/components/Header';
import EpisodeDetail from './components/EpisodeDetail/EpisodeDetail';
import { ContextProvider } from './context/ContextProvider';

export default function App() {
  return (

    <ContextProvider>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<PodcastDashboard />} />
          <Route path="/podcast/:podcastId" element={<PodcastDetail />} />
          <Route path="/podcast/:podcastId/episode/:episodeId" element={<EpisodeDetail />} />
        </Routes>
      </div>
    </ContextProvider>
  );
}
