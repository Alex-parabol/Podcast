import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../../context/ContextProvider';
import '../styles.css';

export default function SearchBar() {
  const { contextState, setContextState } = useAppContext();
  const [input, setInput] = useState('');

  useEffect(() => {
    setContextState({ ...contextState, query: input });
  }, [input]);
  const inputHandler = (e) => {
    // convert input text to lower case
    const lowerCase = e.target.value.toLowerCase();
    setInput(lowerCase);
  };

  return (
    <div className="Search__bar">
      <span className="logo">100</span>
      <input
        className="Search__placeholder"
        type="search"
        placeholder="Filter podcast..."
        value={input}
        onChange={inputHandler}

      />
    </div>
  );
}
