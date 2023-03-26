/* eslint-disable indent */
/* eslint-disable react/prop-types */
/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import msToTime from '../../utils/convertMiliseconsds';
import { useAppContext } from '../../../context/ContextProvider';

import '../styles.css';

export default function Table({ podcastsDetail }) {
  const { contextState } = useAppContext();
  const { podcasts } = contextState;

    return (
      <div className="right__container">
        <h1 className="podcasts__header">
          EPISODES:
          {podcastsDetail?.resultCount}
        </h1>
        <table className="table__component">
          <tr>
            <th className="table__header">Title</th>
            <th className="table__header">Date</th>
            <th className="table__header">Duration</th>
          </tr>
          {podcastsDetail?.results.map((podcast, index) => (
            <tr key={podcast?.artistId}>
              <Link className="no_underline" key={podcasts?.link?.attributes?.href} to={`episode/${podcast?.trackId}`}>
                <td className={index % 2 === 0 ? 'odd_row' : 'even_row'}>{podcast?.trackName}</td>
              </Link>
              <td className={index % 2 === 0 ? 'odd_row-black' : 'even_row-black'}>{podcast?.releaseDate}</td>
              <td className={index % 2 === 0 ? 'odd_row-black' : 'even_row-black'}>{msToTime(podcast?.trackTimeMillis)}</td>
            </tr>
          ))}

        </table>

      </div>
    );
}

Table.propTypes = {
  podcasts: PropTypes.shape({}),
};
