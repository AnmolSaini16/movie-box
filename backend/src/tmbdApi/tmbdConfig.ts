import tmbdConstants from "./tmbdConstants";
import { getUrl } from "./utils";

const tmbdConfig = {
  trendingMoviesToday: ({ page }: { page: string }) =>
    getUrl(tmbdConstants.trendingMoviesToday, { page }),

  topRatedMovies: ({ page }: { page: string }) =>
    getUrl(tmbdConstants.topRatedMovies, { page }),

  popularMovies: ({ page }: { page: string }) =>
    getUrl(tmbdConstants.popularMovies, { page }),

  upComingMovies: ({ page }: { page: string }) =>
    getUrl(tmbdConstants.upComingMovies, { page }),

  nowPlayingMovies: ({ page }: { page: string }) =>
    getUrl(tmbdConstants.nowPlaying, { page }),

  movieDetail: ({ id }: { id: string }) =>
    getUrl(tmbdConstants.movieDetail(id), {}),

  movieCredits: ({ id }: { id: string }) =>
    getUrl(tmbdConstants.movieCredits(id), {}),

  movieRecommendations: ({ id }: { id: string }) =>
    getUrl(tmbdConstants.movieRecommendations(id), {}),

  movieVideos: ({ id }: { id: string }) =>
    getUrl(tmbdConstants.movieVideos(id), {}),

  movieReviews: ({ id }: { id: string }) =>
    getUrl(tmbdConstants.movieReviews(id), {}),

  searchMovie: ({ page, query }: { page: string; query: string }) =>
    getUrl(tmbdConstants.searchMovie, { query, page }),
};

export default tmbdConfig;
