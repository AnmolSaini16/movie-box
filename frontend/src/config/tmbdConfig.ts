const backdropPath = (imgEndpoint: string) =>
  `https://image.tmdb.org/t/p/original${imgEndpoint}`;

const posterPath = (imgEndpoint: string) =>
  `https://image.tmdb.org/t/p/w500${imgEndpoint}`;

const youtubePath = (videoId: string) =>
  `https://www.youtube.com/embed/${videoId}?controls=0`;

const tmdbConfigs = {
  backdropPath,
  posterPath,
  youtubePath,
};

export default tmdbConfigs;
