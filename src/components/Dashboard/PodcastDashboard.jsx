/* eslint-disable react/prop-types */
/* eslint-disable react/require-default-props */
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './styles.css';

export default function PodcastDashboard({ podcasts }) {
  useEffect(() => {}, []);

  console.log(podcasts);
  return (
    <div className="Dashboard__grid">
      {podcasts.map((item) => (
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
  );
}

PodcastDashboard.propTypes = {
  podcasts: PropTypes.shape({}),
};
