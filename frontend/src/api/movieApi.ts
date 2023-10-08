import { MovieType } from "@/constants/movieContants";
import {
  UseInfiniteQueryResult,
  UseQueryResult,
  useInfiniteQuery,
  useQuery,
} from "@tanstack/react-query";
import { authClient, getApiPath, publicCLient } from "./ComponentApi";
import { appConstants } from "@/constants/appConstants";
import { AxiosResponse } from "axios";
import { Movie } from "@/interfaces/movieInterface";

export const getMovieWithType = <T>(
  movieType: MovieType,
  page: number
): UseQueryResult<AxiosResponse<T>> => {
  return useQuery({
    queryKey: [movieType],
    queryFn: () => publicCLient.get(getApiPath(movieType, { page: `${page}` })),
    ...appConstants.Cached_Query,
  });
};

export const getMovieDetail = <T>(
  movieType: MovieType,
  id: string
): UseQueryResult<T, unknown> => {
  return useQuery({
    queryKey: [+id],
    queryFn: async () => {
      const data = await authClient.get(getApiPath(movieType, {}, id));
      return data?.data;
    },
    refetchOnWindowFocus: false,
  });
};

export const getSearchResults = <T>(
  query: string,
  page: number
): UseQueryResult<AxiosResponse<T>> => {
  return useQuery({
    queryKey: [query],
    queryFn: () =>
      authClient.get(
        getApiPath(MovieType.GetSearchResults, { query, page: `${page}` })
      ),
    keepPreviousData: true,
  });
};

export const getInfiniteMoviesWithType = (
  movieType: MovieType
): UseInfiniteQueryResult<Movie, unknown> => {
  return useInfiniteQuery({
    queryKey: [`InfiniteQuery-${movieType}`],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await publicCLient.get(
        getApiPath(movieType, { page: `${pageParam}` })
      );
      return res.data;
    },
    getNextPageParam: (lastPage: Movie) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    ...appConstants.Cached_Query,
  });
};
