/* eslint-disable radix */
/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { AppContext } from './AppContext';

export const useAppContext = () => useContext(AppContext);

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

export function ContextProvider({ children }) {
  const [contextState, setContextState] = useState({
    podcasts: [],
    loading: true,
    query: '',
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
        setContextState({ ...contextState, podcasts: parsedData, loading: false });
        localStorage.setItem('podcasts', JSON.stringify(parsedData));
        localStorage.setItem('lastUpdated', new Date().getTime().toString());
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
