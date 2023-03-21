/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable react/self-closing-comp */
import React from 'react';
import PropTypes from 'prop-types';

export default function PodcastDetail() {
  return (
    <div>
      <h1>SONG + TITLE</h1>
    </div>
  );
}

PodcastDetail.propTypes = {
  item: PropTypes.any,
};
