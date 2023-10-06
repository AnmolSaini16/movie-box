import { MovieType } from "@/constants/movieContants";
import axios from "axios";
import { getSession } from "next-auth/react";

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

const AxiosOptions = {
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
};

const getToken = async () => {
  const session = await getSession();
  if (session?.user) {
    return session.user.token;
  }
  return null;
};

//Public Client without authentication
export const publicCLient = axios.create(AxiosOptions);

//Private Client with Bearer token
export const authClient = axios.create(AxiosOptions);
authClient.interceptors.request.use(async (config) => {
  const token = await getToken();
  config.headers.Authorization = token ? `Bearer ${token}` : "";

  return config;
});

// API's:
export const getApiPath = (
  movieType: MovieType,
  params: Record<string, string>,
  id?: string
) => {
  const queryString = new URLSearchParams(params).toString();

  switch (movieType) {
    case MovieType.NowPlayingMovies:
      return `/api/movie/nowPlayingMovies?${queryString}`;

    case MovieType.PopularMovies:
      return `/api/movie/popularMovies?${queryString}`;

    case MovieType.TrendingMovies:
      return `/api/movie/trendingMovies?${queryString}`;

    case MovieType.TopRatedMovies:
      return `/api/movie/topRatedMovies?${queryString}`;

    case MovieType.UpComingMovies:
      return `/api/movie/upComingMovies?${queryString}`;

    case MovieType.GetSearchResults:
      return `/api/movie/getSearchResults?${queryString}`;

    case MovieType.MovieDetail:
      return `/api/movie/${id}`;

    case MovieType.AddFavorite:
      return "/api/user/addFavorite";

    case MovieType.RemoveFavorite:
      return "/api/user/removeFavorite";

    case MovieType.GetAllFavorites:
      return "/api/user/getAllFavorites";

    default:
      return "";
  }
};
