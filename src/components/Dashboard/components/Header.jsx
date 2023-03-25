/* eslint-disable react/self-closing-comp */
import React from 'react';
import { useAppContext } from '../../../context/ContextProvider';
import '../styles.css';

export default function Header() {
  const { contextState } = useAppContext();

  const { isLoading } = contextState;
  return (
    <div className="Header__container">
      <h1 className="Header-app">Podcaster</h1>
      {isLoading && <div className="lds-circle"><div></div></div>}
    </div>
  );
}
