/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable react/self-closing-comp */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useAppContext } from '../../context/ContextProvider';
import Table from './components/Table';
import './styles.css';

export default function PodcastDetail() {
  const { contextState, setContextState } = useAppContext();
  const { podcasts } = contextState;

  const { podcastId } = useParams();
  const [podcastsDetail, setPodcastsDetail] = useState();
  const [podcastInformation, setPodcastInformation] = useState({});

  const URL = `https://itunes.apple.com/lookup?id=${podcastId}&media=podcast
  &entity=podcastEpisode&limit=20`;

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
          img: podcast['im:image'][2].label,
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
        setContextState({ ...contextState, podcastId });
      });
  }, []);

  return (
    <div className="main__container">
      <div className="left__container">
        {podcastInformation?.img && (
          <img
            className="podcast__img"
            alt="img"
            src={podcastInformation?.img}
          />
        )}

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
        <div className="description__container">
          <h3>Description:</h3>
          <span>{podcastInformation?.description}</span>
        </div>
      </div>
      <div className="right__container">

        <Table podcastsDetail={podcastsDetail} />

      </div>

    </div>
  );
}

PodcastDetail.propTypes = {
  item: PropTypes.any,
  podcasts: PropTypes.array,
};
