/* eslint-disable react/prop-types */
/* eslint-disable react/require-default-props */
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useAppContext } from '../../context/ContextProvider';
import SearchBar from './components/SearchBar';
import './styles.css';

export default function PodcastDashboard() {
  const { contextState } = useAppContext();
  const { podcasts } = contextState;
  const { query } = contextState;

  const filteredData = podcasts?.filter((podcast) => {
    if (query === '') {
      return podcast;
    } return podcast['im:artist']?.label.toLowerCase().includes(query) || podcast?.title?.label?.toLowerCase().includes(query);
  });
  console.log('podcasts dashboard', podcasts);

  return (
    <>
      <SearchBar />
      <div className="Dashboard__grid">
        {filteredData?.map((item) => (
          <Link key={item?.link?.attributes?.href} to={`podcast/${item?.id?.attributes['im:id']}`}>
            <div className="podcast__container">
              <img
                className="podcast__image"
                alt="img"
                src={item['im:image'][2]?.label}
              />
              <div className="info__border">
                <h1 className="podcast__title" key={item.id.label}>
                  {item['im:name'].label}
                </h1>
                <span className="author__span">
                  Author:
                  {item['im:artist'].label}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

    </>
  );
}

PodcastDashboard.propTypes = {
  podcasts: PropTypes.shape({}),
};
