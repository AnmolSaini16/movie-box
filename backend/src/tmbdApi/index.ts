import axiosClient from "../axios/axios.client";
import tmbdConfig from "./tmbdConfig";

const tmbdClient = {
  trendingMoviesToday: async ({ page }: { page: string }) =>
    await axiosClient.get(tmbdConfig.trendingMoviesToday({ page })),

  topRatedMovies: async ({ page }: { page: string }) =>
    await axiosClient.get(tmbdConfig.topRatedMovies({ page })),

  popularMovies: async ({ page }: { page: string }) =>
    await axiosClient.get(tmbdConfig.popularMovies({ page })),

  upComingMovies: async ({ page }: { page: string }) =>
    await axiosClient.get(tmbdConfig.upComingMovies({ page })),

  nowPlayingMovies: async ({ page }: { page: string }) =>
    await axiosClient.get(tmbdConfig.nowPlayingMovies({ page })),

  movieDetail: async ({ id }: { id: string }) =>
    await axiosClient.get(tmbdConfig.movieDetail({ id })),

  movieCredits: async ({ id }: { id: string }) =>
    await axiosClient.get(tmbdConfig.movieCredits({ id })),

  movieRecommendations: async ({ id }: { id: string }) =>
    await axiosClient.get(tmbdConfig.movieRecommendations({ id })),

  movieVideos: async ({ id }: { id: string }) =>
    await axiosClient.get(tmbdConfig.movieVideos({ id })),

  movieReviews: async ({ id }: { id: string }) =>
    await axiosClient.get(tmbdConfig.movieReviews({ id })),

  searchMovie: async ({ page, query }: { page: string; query: string }) =>
    await axiosClient.get(tmbdConfig.searchMovie({ page, query })),
};

export default tmbdClient;
