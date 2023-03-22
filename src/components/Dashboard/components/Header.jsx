/* eslint-disable react/require-default-props */
/* eslint-disable react/self-closing-comp */
import React from 'react';
import PropTypes from 'prop-types';
import SearchBar from './SearchBar';
import '../styles.css';

export default function Header({ isLoading }) {
  return (
    <>
      <div className="Header__container">
        <h1 className="Header-app">Podcaster</h1>
        {isLoading && <div className="lds-circle"><div></div></div>}
      </div>
      <SearchBar />

    </>
  );
}

Header.propTypes = {
  isLoading: PropTypes.bool,
};
