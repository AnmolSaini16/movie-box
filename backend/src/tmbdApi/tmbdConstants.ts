const tmbdConstants = {
  trendingMoviesToday: "/trending/movie/day?language=en-US",
  topRatedMovies: "/movie/top_rated?language=en-US",
  popularMovies: "/movie/popular?language=en-US",
  upComingMovies: "/movie/upcoming?language=en-US",
  nowPlaying: "/movie/now_playing?language=en-US",
  movieDetail: (id: string) => `/movie/${id}?language=en-US`,
  movieCredits: (id: string) => `/movie/${id}/credits?language=en-US`,
  movieRecommendations: (id: string) =>
    `/movie/${id}/recommendations?language=en-US`,
  movieVideos: (id: string) => `/movie/${id}/videos?language=en-US`,
  movieReviews: (id: string) => `/movie/${id}/reviews?language=en-US`,
  searchMovie: `/search/movie`,
};

export default tmbdConstants;
