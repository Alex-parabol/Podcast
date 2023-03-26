/* eslint-disable radix */
/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { AppContext } from './AppContext';
import { getPodcastsFromLocalStorage, parsePodcasts } from './utils/podcastFunctions';

export const useAppContext = () => useContext(AppContext);

export function ContextProvider({ children }) {
  const [contextState, setContextState] = useState({
    podcasts: [],
    loading: true,
    query: '',
    podcastId: '',
    showEpisode: false,
  });

  useEffect(() => {
    const storedPodcasts = getPodcastsFromLocalStorage();
    if (storedPodcasts) {
      setContextState({ ...contextState, podcasts: storedPodcasts, loading: false });
    }
    fetch(
      `https://api.allorigins.win/get?url=${encodeURIComponent(
        'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json',
      )}`,
    )
      .then((response) => response.json())
      .then((data) => {
        const parsedData = parsePodcasts(data);

        localStorage.setItem('podcasts', JSON.stringify(parsedData));
        localStorage.setItem('lastUpdated', new Date().getTime().toString());
        setContextState({ ...contextState, podcasts: parsedData, loading: false });
      });
  }, []);

  return (
    <AppContext.Provider value={{ contextState, setContextState }}>
      {children}
    </AppContext.Provider>
  );
}
ContextProvider.propTypes = {
  children: PropTypes.node,
};
