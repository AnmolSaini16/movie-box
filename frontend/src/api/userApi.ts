import { MovieType } from "@/constants/movieContants";
import { authClient, getApiPath } from "./ComponentApi";
import { appConstants } from "@/constants/appConstants";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { Favorite } from "@/interfaces/movieInterface";

export const addFavorite = ({ payload }: { payload: Partial<Favorite> }) => {
  return authClient.post(getApiPath(MovieType.AddFavorite, {}), payload);
};

export const removeFavorite = ({ movieId }: { movieId: number }) => {
  return authClient.delete(getApiPath(MovieType.RemoveFavorite, {}), {
    data: {
      movieId,
    },
  });
};

export const getAllFavorites = <T>(
  email: string
): UseQueryResult<AxiosResponse<T>> => {
  return useQuery({
    queryKey: [MovieType.GetAllFavorites, email],
    queryFn: () => authClient.get(getApiPath(MovieType.GetAllFavorites, {})),
    ...appConstants.Cached_Query,
  });
};
