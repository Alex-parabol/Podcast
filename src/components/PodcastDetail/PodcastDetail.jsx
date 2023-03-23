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
  const [podcastPic, setPodcastPic] = useState({});

  const URL = `https://itunes.apple.com/lookup?id=${podcastId}&media=podcast
  &entity=podcastEpisode&limit=20`;

  const getImg = () => {
    let podcastImg;
    podcasts?.map((podcast) => {
      if (podcast?.id?.attributes['im:id'] === podcastId) {
        podcastImg = podcast['im:image'];
      }
      return podcastImg;
    });
    return podcastImg;
  };

  useEffect(() => {
    setPodcastPic(getImg());
    fetch(
      `https://api.allorigins.win/get?url=${encodeURIComponent(
        URL,
      )}`,
    )
      .then((response) => response.json())
      .then((data) => {
        setPodcastsDetail(JSON.parse(data.contents));
      });
  }, []);

  /*  const getPodcastImage = (podcastArr) => {
    podcasts.map((podcast) => (
      const identification = podcast?.item?.id?.attributes['im:id']
      let img;
      if(identification === podcastId){
        return img = podcast['im:image'][2]?.label
      }

    ));
    return img;
  }; */

  /* useEffect(() => {
    getPodcastImage(podcasts);
  }, []); */

  return (
    <div className="main__container">
      <div className="left__container">
        <img
          className=""
          alt="img"
          src={podcastPic[2]?.label}
        />
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
        <table className="table__component">
          <tr>
            <th className="table__header">Title</th>
            <th className="table__header">Date</th>
            <th className="table__header">Duration</th>
          </tr>
          {podcastsDetail?.results.map((podcast, index) => (
            <tr key={podcast.artistId}>
              <td className={index % 2 === 0 ? 'odd_row' : 'even_row'}>{podcast?.trackName}</td>
              <td className={index % 2 === 0 ? 'odd_row' : 'even_row'}>{podcast?.releaseDate}</td>
              <td className={index % 2 === 0 ? 'odd_row' : 'even_row'}>{msToTime(podcast?.trackTimeMillis)}</td>
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
