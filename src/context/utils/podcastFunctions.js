/* eslint-disable radix */
export function parsePodcasts(responseData) {
  const resultData = responseData.contents;
  const result = JSON.parse(resultData);
  return result.feed.entry;
}

export function getPodcastsFromLocalStorage() {
  const podcasts = localStorage.getItem('podcasts');
  const lastUpdated = localStorage.getItem('lastUpdated');
  if (!podcasts || !lastUpdated) return null;
  const now = new Date().getTime();
  const timeDiff = now - parseInt(lastUpdated);
  if (timeDiff > 24 * 60 * 60 * 1000) {
    localStorage.removeItem('podcasts');
    localStorage.removeItem('lastUpdated');
    return null;
  }
  return JSON.parse(podcasts);
}

export function parsePodcastsDetail(responseData) {
  const resultData = responseData.contents;
  const result = JSON.parse(resultData);
  return result.feed.entry;
}

export function getPodcastsDetailFromLocalStorage() {
  const podcastsDetail = localStorage.getItem('podcastsDetail');
  const lastUpdatedDetail = localStorage.getItem('lastUpdatedDetail');
  if (!podcastsDetail || !lastUpdatedDetail) return null;
  const now = new Date().getTime();
  const timeDiff = now - parseInt(lastUpdatedDetail);
  if (timeDiff > 24 * 60 * 60 * 1000) {
    localStorage.removeItem('podcastsDetail');
    localStorage.removeItem('lastUpdatedDetail');
    return null;
  }
  return JSON.parse(podcastsDetail);
}
