import "./styles.css";
import { useEffect, useState } from "react";
import PodcastDashboard from "./components/Dashboard/PodcastDashboard.js";

import Header from "./components/Dashboard/components/Header";

export default function App() {
  const [podcasts, setPodcasts] = useState([]);

  useEffect(() => {
    fetch(
      `https://api.allorigins.win/get?url=${encodeURIComponent(
        "https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json"
      )}`
    )
      .then((response) => response.json())
      .then((data) => {
        const finalData = JSON.parse(data.contents).feed.entry;
        setPodcasts(finalData);
      });
  }, []);

  return (
    <div className="App">
      <Header />
      <PodcastDashboard podcasts={podcasts} />
    </div>
  );
}
