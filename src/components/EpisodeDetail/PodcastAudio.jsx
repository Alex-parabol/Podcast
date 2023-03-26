/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';

import './styles.css';

export default function PodcastAudio() {
  // Con el id clarificado de episodeId rellenaríamos sin problemas este componente.

  return (
    <div className="audio__container">
      <h2>Título del podcast</h2>
      <span className="description__audio">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit.
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Earum cupiditate temporibus.
      </span>
      <audio className="audio__controls" controls type="audio/mpeg" />
    </div>
  );
}
