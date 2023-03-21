import React, { useEffect } from 'react';
import '../styles.css';

export default function SearchBar() {
  useEffect(() => {}, []);

  return (
    <div className="Search__bar">
      <span className="logo">100</span>
      <input
        className="Search__placeholder"
        type="search"
        placeholder="Filter podcast..."
        name="q"
      />
    </div>
  );
}
