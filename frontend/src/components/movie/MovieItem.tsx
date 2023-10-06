import { Favorite, MovieItem } from "@/interfaces/movieInterface";
import React, { useState } from "react";
import {
  Box,
  Stack,
  Typography,
  Chip,
  Divider,
  IconButton,
  Tooltip,
  CircularProgress,
} from "@mui/material";
import { CircularRateComponent } from "../common/CircularRateComponent";
import { uiConfigs } from "@/styleConfig/uiConfig";
import { appConstants } from "@/constants/appConstants";
import HdIcon from "@mui/icons-material/Hd";
import Link from "next/link";
import CancelIcon from "@mui/icons-material/Cancel";
import { LoadingImage } from "../common/LoadingImage";
import { removeFavorite } from "@/api/userApi";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { MovieType } from "@/constants/movieContants";
import { useSession } from "next-auth/react";

export default function MovieItemComponent({
  movie,
  type = undefined,
}: {
  movie: MovieItem;
  type?: string;
}) {
  const { data: session } = useSession();
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState<boolean>(false);
  const removeFavoriteMutate = useMutation(removeFavorite, {
    onSuccess: () => {
      queryClient.setQueryData([movie.id], (oldData: any) => {
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

  const handleRemoveFavorite = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setLoading(true);
    try {
      const response = await removeFavoriteMutate.mutateAsync({
        movieId: movie?.id,
      });

      if (response?.status === 200) {
        enqueueSnackbar("Removed from favorite", { variant: "success" });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Link href={`/movie/${movie.id}`}>
      <Box
        position="relative"
        width={225}
        height={335}
        sx={{
          overflow: "hidden",
          cursor: "pointer",
          "&:hover .media-info": { opacity: 1, bottom: 10 },
          "&:hover .media-back-drop": { opacity: 1 },
          color: "primary.contrastText",
        }}
      >
        {/* Poster Image */}
        <LoadingImage src={movie?.poster_path} alt={movie?.title} />

        {/* Image content on hover */}
        <Box
          className="media-back-drop"
          sx={{
            opacity: { xs: 1, md: 0 },
            transition: "all 0.3s ease",
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            backgroundImage:
              "linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0))",
          }}
        />

        <Box
          className="media-info"
          sx={{
            transition: "all 0.3s ease",
            opacity: { xs: 1, md: 0 },
            position: "absolute",
            bottom: { xs: 10, md: "-20px" },
            width: "100%",
            height: "100&",
            boxSizing: "border-box",
            padding: 2,
          }}
        >
          <Stack spacing={1.5}>
            {movie?.vote_average && (
              <CircularRateComponent value={movie.vote_average} />
            )}

            <Typography
              variant="body1"
              fontWeight="700"
              sx={{
                fontSize: "1rem",
                ...uiConfigs.style.typoLines(1, "left"),
              }}
            >
              {movie?.title ?? movie?.original_title}
            </Typography>

            <Stack
              direction="row"
              alignItems="center"
              spacing={0.5}
              divider={<Divider orientation="vertical" flexItem />}
            >
              <Typography fontSize={"0.8rem"}>
                {movie?.release_date?.split("-")[0]}
              </Typography>
              <HdIcon />

              {type === "favorite" && (
                <Box>
                  <Tooltip title={loading ? "" : "Remove from favorite"}>
                    <IconButton
                      color="error"
                      onClick={handleRemoveFavorite}
                      disabled={loading}
                    >
                      {loading ? (
                        <CircularProgress size={20} />
                      ) : (
                        <CancelIcon fontSize="inherit" />
                      )}
                    </IconButton>
                  </Tooltip>
                </Box>
              )}
            </Stack>

            <Stack direction="row" spacing={1}>
              {[...movie?.genre_ids].splice(0, 2).map((genreId) => {
                return (
                  <Chip
                    color="primary"
                    key={genreId}
                    label={
                      appConstants.Genres.find((e) => e.id === genreId)?.name ??
                      ""
                    }
                  />
                );
              })}
            </Stack>
          </Stack>
        </Box>
      </Box>
    </Link>
  );
}
