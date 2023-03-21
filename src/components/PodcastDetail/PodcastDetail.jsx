/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable react/self-closing-comp */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import msToTime from '../utils/convertMiliseconsds';
import './styles.css';

export default function PodcastDetail() {
  const { podcastId } = useParams();
  const [podcastsDetail, setPodcastsDetail] = useState();

  const URL = `https://itunes.apple.com/lookup?id=${podcastId}&media=podcast
  &entity=podcastEpisode&limit=20`;

  useEffect(() => {
    fetch(
      `https://api.allorigins.win/get?url=${encodeURIComponent(
        URL,
      )}`,
    )
      .then((response) => response.json())
      .then((data) => {
        setPodcastsDetail(JSON.parse(data.contents));
      });
  }, []); console.log('podcaastDetail data', podcastsDetail);

  return (
    <div className="main__container">
      <div className="left__container">
        <div>Imágen podcast</div>
        <div>
          <h3>Título</h3>
          <span>Autor</span>
        </div>
        <div>
          <h3>Descripción</h3>
          <span>Texto descripción</span>
        </div>
      </div>
      <div className="right__container">
        <h1>
          EPISODES:
          {podcastsDetail?.resultCount}
        </h1>
        <table>
          <tr>
            <th>Title</th>
            <th>Date</th>
            <th>Duration</th>
          </tr>
          {podcastsDetail?.results.map((podcast) => (
            <tr key={podcast.artistId}>
              <td>{podcast?.artistName}</td>
              <td>{podcast?.releaseDate}</td>
              <td>{msToTime(podcast?.trackTimeMillis)}</td>
            </tr>
          ))}

        </table>

      </div>
    </div>
  );
}

PodcastDetail.propTypes = {
  item: PropTypes.any,
};
