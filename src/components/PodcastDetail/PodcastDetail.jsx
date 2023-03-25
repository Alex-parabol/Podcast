/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable react/self-closing-comp */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useAppContext } from '../../context/ContextProvider';
import msToTime from '../utils/convertMiliseconsds';
import './styles.css';

export default function PodcastDetail() {
  const { contextState } = useAppContext();
  const { podcasts } = contextState;

  const { podcastId } = useParams();
  const [podcastsDetail, setPodcastsDetail] = useState();
  const [podcastInformation, setPodcastInformation] = useState({});

  const URL = `https://itunes.apple.com/lookup?id=${podcastId}&media=podcast
  &entity=podcastEpisode&limit=20`;

  console.log(podcastInformation);

  const getPodcastInfo = () => {
    let podcastInfo = {
      img: [],
      title: '',
      author: '',
      description: '',
    };

    podcasts?.map((podcast) => {
      if (podcast?.id?.attributes['im:id'] === podcastId) {
        podcastInfo = {
          img: podcast['im:image'],
          title: podcast?.title?.label,
          author: podcast['im:artist']?.label,
          description: podcast?.summary?.label,
        };
        return podcastInfo;
      }
      return podcastInfo;
    });
    return podcastInfo;
  };

  useEffect(() => {
    setPodcastInformation(getPodcastInfo());
    fetch(
      `https://api.allorigins.win/get?url=${encodeURIComponent(
        URL,
      )}`,
    )
      .then((response) => response.json())
      .then((data) => {
        setPodcastsDetail(JSON.parse(data.contents));
      });
  }, [podcastsDetail]);

  return (
    <div className="main__container">
      <div className="left__container">
        <img
          className="podcast__img"
          alt="img"
          /* src={podcastInformation?.img[2]?.label} */
        />
        <div className="divider"></div>
        <div className="author__info">
          <h3>{podcastInformation?.title}</h3>
          <span>
            By:
            {' '}
            {podcastInformation?.title}
          </span>
        </div>
        <div className="divider"></div>
        <div>
          <h3>Description:</h3>
          <span className="description__span">{podcastInformation?.description}</span>
        </div>
      </div>
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
            <tr key={podcast.artistId}>
              <td className={index % 2 === 0 ? 'odd_row' : 'even_row'}>{podcast?.trackName}</td>
              <td className={index % 2 === 0 ? 'odd_row-black' : 'even_row-black'}>{podcast?.releaseDate}</td>
              <td className={index % 2 === 0 ? 'odd_row-black' : 'even_row-black'}>{msToTime(podcast?.trackTimeMillis)}</td>
            </tr>
          ))}

        </table>

      </div>
    </div>
  );
}

PodcastDetail.propTypes = {
  item: PropTypes.any,
  podcasts: PropTypes.array,
};
