import { MovieType } from "@/constants/movieContants";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { authClient, getApiPath, publicCLient } from "./ComponentApi";
import { appConstants } from "@/constants/appConstants";
import { AxiosResponse } from "axios";

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
