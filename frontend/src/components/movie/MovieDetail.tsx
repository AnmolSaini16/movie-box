import tmdbConfigs from "@/config/tmbdConfig";
import {
  Favorite,
  MovieDetailType,
  MovieItem,
} from "@/interfaces/movieInterface";
import { uiConfigs } from "@/styleConfig/uiConfig";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Divider,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import { CircularRateComponent } from "../common/CircularRateComponent";
import { MovieDetailImageLoading, MovieDetailTextLoading } from "./Loading";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addFavorite, removeFavorite } from "@/api/userApi";
import { useSnackbar } from "notistack";
import { AppContext, AppContextType } from "@/context/appContext";
import { MovieType } from "@/constants/movieContants";
import { Session } from "next-auth";
import { MovieCast } from "./MovieCast";
import { MovieRecommended } from "./MovieRecommended";
import { MovieVideos } from "./MovieVideos";
import { MovieReviews } from "./MovieReviews";

export const MovieDetail = ({
  movie,
  loading,
  session,
}: {
  movie: MovieDetailType | undefined;
  loading: boolean;
  session: Session | null;
}) => {
  const queryClient = useQueryClient();
  const loggedIn = Boolean(session?.user);
  const { setShowAuthModal } = useContext(AppContext) as AppContextType;
  const { enqueueSnackbar } = useSnackbar();
  const videoRef = useRef<HTMLDivElement | null>(null);
  const [loadingFavoriteIcon, setLoadingFavoriteIcon] =
    useState<boolean>(false);

  const addFavoriteMutate = useMutation(addFavorite, {
    onSuccess: (data) => {
      queryClient.setQueryData([movie?.id], (oldData: any) => {
        return { ...oldData, isFavorite: true };
      });
      queryClient.setQueryData(
        [MovieType.GetAllFavorites, session?.user?.email],
        (oldData: any) => {
          if (oldData) {
            const updatedData = [...oldData?.data, data?.data];
            return { ...oldData, data: updatedData };
          }
          return oldData;
        }
      );
    },
  });

  const removeFavoriteMutate = useMutation(removeFavorite, {
    onSuccess: () => {
      queryClient.setQueryData([movie?.id], (oldData: any) => {
        return { ...oldData, isFavorite: false };
      });
      queryClient.setQueryData(
        [MovieType.GetAllFavorites, session?.user?.email],
        (oldData: any) => {
          if (oldData) {
            const updatedData = (oldData?.data as Favorite[]).filter(
              (item) => item.movieId !== movie?.id
            );
            return { ...oldData, data: updatedData };
          }
          return oldData;
        }
      );
    },
  });

  const handleFavoriteClick = async () => {
    if (!loggedIn) {
      return setShowAuthModal(true);
    }

    if (movie?.isFavorite) {
      handleRemoveFavorite();
      return;
    }

    setLoadingFavoriteIcon(true);
    try {
      const payload = {
        movieId: movie?.id as number,
        movieTitle: movie?.title ?? movie?.original_title,
        moviePosterURL: movie?.poster_path,
        movieRating: movie?.vote_average,
        movieReleaseData: movie?.release_date,
        movieGenre: movie?.genres.map((x) => x.id),
      };
      const response = await addFavoriteMutate.mutateAsync({ payload });
      if (response?.status === 201) {
        enqueueSnackbar("Added to favorite", { variant: "success" });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingFavoriteIcon(false);
    }
  };

  const handleRemoveFavorite = async () => {
    setLoadingFavoriteIcon(true);
    try {
      const response = await removeFavoriteMutate.mutateAsync({
        movieId: movie?.id as number,
      });

      if (response?.status === 200) {
        enqueueSnackbar("Removed from favorite", { variant: "success" });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingFavoriteIcon(false);
    }
  };

  const getFavIcon = () => {
    if (loadingFavoriteIcon) return <CircularProgress size={28} />;
    return movie?.isFavorite ? (
      <FavoriteIcon fontSize="inherit" />
    ) : (
      <FavoriteBorderIcon fontSize="inherit" />
    );
  };

  return (
    <>
      <Box
        sx={{
          zIndex: "-1",
          position: "relative",
          paddingTop: { xs: "80%", sm: "60%", md: "35%" },
          backgroundPosition: "top",
          backgroundSize: "cover",
          backgroundImage: `url(${tmdbConfigs.backdropPath(
            movie?.backdrop_path!
          )})`,
          backgroundAttachment: "fixed",
          "&::before": {
            content: '""',
            position: "absolute",
            left: 0,
            bottom: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
            ...uiConfigs.style.horizontalGradientBgImage,
          },
        }}
      />
      <Box
        sx={{
          color: "primary.contrastText",
          ...uiConfigs.mainContent,
        }}
      >
        <Box
          sx={{
            marginTop: { xs: "-10rem", md: "-10rem", lg: "-20rem" },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: { md: "row", xs: "column" },
            }}
          >
            {/* poster */}
            <Box
              sx={{
                width: { xs: "70%", sm: "50%", md: "40%" },
                margin: { xs: "0 auto 2rem", md: "0 2rem 0 0" },
              }}
            >
              {!movie?.id || loading ? (
                <MovieDetailImageLoading />
              ) : (
                <Box
                  sx={{
                    paddingTop: "140%",
                    ...uiConfigs.style.backgroundImage(
                      tmdbConfigs.posterPath(
                        (movie?.poster_path ?? movie?.backdrop_path)!
                      )
                    ),
                  }}
                />
              )}
            </Box>
            {/* poster */}

            {/* movie info */}
            <Box
              sx={{
                width: { xs: "100%", md: "60%" },
                color: "text.primary",
              }}
            >
              {!movie?.id || loading ? (
                <MovieDetailTextLoading />
              ) : (
                <Stack spacing={4}>
                  {/* title and tagline*/}
                  <Box>
                    <Typography
                      variant="h4"
                      fontSize={{ xs: "2rem", md: "2rem", lg: "4rem" }}
                      fontWeight="700"
                      sx={{ ...uiConfigs.style.typoLines(2, "left") }}
                    >
                      {`${movie?.title || movie?.original_title} (${
                        movie?.release_date?.split("-")[0]
                      })`}
                    </Typography>

                    <Typography fontStyle="italic">{movie?.tagline}</Typography>
                  </Box>

                  {/* rate and genres */}
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    flexWrap="wrap"
                  >
                    {/* rate */}
                    {movie?.vote_average && (
                      <CircularRateComponent value={movie?.vote_average!} />
                    )}

                    <Divider />

                    {/* genres */}
                    {movie?.genres?.map((genre) => (
                      <Chip
                        label={genre.name}
                        variant="filled"
                        color="primary"
                        key={genre.id}
                      />
                    ))}
                  </Stack>

                  {/* overview */}
                  <Typography
                    variant="body1"
                    sx={{ ...uiConfigs.style.typoLines(10) }}
                  >
                    {movie?.overview}
                  </Typography>

                  <Stack direction="row" spacing={3}>
                    <Tooltip
                      title={
                        loadingFavoriteIcon
                          ? ""
                          : movie?.isFavorite
                          ? "Remove from favorite"
                          : "Add to Favorite"
                      }
                    >
                      <span>
                        <IconButton
                          sx={{ fontSize: "2rem", width: 50, height: 50 }}
                          color="error"
                          onClick={handleFavoriteClick}
                          disabled={loadingFavoriteIcon}
                        >
                          {getFavIcon()}
                        </IconButton>
                      </span>
                    </Tooltip>
                    <Button
                      variant="contained"
                      onClick={() =>
                        videoRef?.current?.scrollIntoView({
                          behavior: "smooth",
                        })
                      }
                    >
                      Watch Now
                    </Button>
                  </Stack>

                  {/* Cast Row */}
                  {!!movie?.credits.length && (
                    <MovieCast credits={movie?.credits} />
                  )}
                </Stack>
              )}
            </Box>
          </Box>
        </Box>

        {/* Movie Videos */}

        {!!movie?.videos?.results?.length && (
          <Box ref={videoRef}>
            <MovieVideos videos={movie?.videos.results.slice(0, 5)} />
          </Box>
        )}

        {/* Movie Reviews */}
        {movie?.reviews && <MovieReviews reviews={movie?.reviews?.results} />}

        {/* Recommended */}
        {!!movie?.recommendations?.results?.length && (
          <MovieRecommended
            recommendations={movie?.recommendations.results as MovieItem[]}
          />
        )}
      </Box>
    </>
  );
};
