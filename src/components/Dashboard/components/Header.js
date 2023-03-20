import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";

export default function Header() {
  return (
    <>
      <h1 className="Header-app">Podcaster</h1>
      <SearchBar />
    </>
  );
}
