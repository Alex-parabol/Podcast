/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { AppContext } from './AppContext';

export const useAppContext = () => useContext(AppContext);

export function ContextProvider({ children }) {
  const [contextState, setContextState] = useState({
    podcasts: [],
    loading: true,
  });

  useEffect(() => {
    fetch(
      `https://api.allorigins.win/get?url=${encodeURIComponent(
        'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json',
      )}`,
    )
      .then((response) => response.json())
      .then((data) => {
        const finalData = JSON.parse(data.contents).feed.entry;
        setContextState({ ...contextState, podcasts: finalData, loading: false });
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
