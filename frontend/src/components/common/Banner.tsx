import { Box, Button, Chip, Skeleton, Stack, Typography } from "@mui/material";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import { MovieType } from "@/constants/movieContants";
import { getMovieWithType } from "@/api/movieApi";
import tmdbConfigs from "@/config/tmbdConfig";
import { uiConfigs } from "@/styleConfig/uiConfig";
import { CircularRateComponent } from "./CircularRateComponent";
import { appConstants } from "@/constants/appConstants";
import { Movie } from "@/interfaces/movieInterface";
import Link from "next/link";

interface Props {
  movieType: MovieType;
}

export const Banner = ({ movieType }: Props) => {
  const { data, isLoading } = getMovieWithType<Movie>(movieType, 1);
  const nowPlayingMovies = data?.data;

  return (
    <Box sx={{ height: "80vh", position: "relative" }}>
      {isLoading ? (
        <Skeleton
          variant="rectangular"
          animation="wave"
          width="100%"
          height="100%"
        />
      ) : (
        <Swiper
          loop={true}
          modules={[Autoplay, Pagination]}
          autoplay={{
            delay: 8000,
            disableOnInteraction: false,
          }}
          pagination={{
            dynamicBullets: true,
          }}
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "grey",
            //@ts-ignore
            "--swiper-pagination-color": "white",
          }}
        >
          {nowPlayingMovies?.results?.map((movieItem) => (
            <SwiperSlide key={movieItem.id}>
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  backgroundImage: `url(${tmdbConfigs.backdropPath(
                    movieItem.backdrop_path ?? movieItem.poster_path
                  )})`,
                }}
              />
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  ...uiConfigs.style.gradientBgImage,
                }}
              />
              <Box
                sx={{
                  height: "100%",
                  width: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  display: "flex",
                  alignItems: "center",
                  paddingX: { sm: "10px", md: "5rem", lg: "10rem" },
                }}
              >
                <Box
                  sx={{
                    width: { sm: "unset", md: "40%" },
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    paddingX: "30px",
                    color: "text.primary",
                  }}
                >
                  <Stack
                    direction="column"
                    spacing={2}
                    sx={{ paddingX: { xs: 2, sm: 2 } }}
                  >
                    {/* Rating and genre */}
                    <Box>
                      <CircularRateComponent value={movieItem.vote_average} />
                    </Box>

                    <Stack direction="row" spacing={1}>
                      {[...movieItem.genre_ids].splice(0, 2).map((genreId) => {
                        return (
                          <Chip
                            color="primary"
                            key={genreId}
                            label={
                              appConstants.Genres.find((e) => e.id === genreId)
                                ?.name ?? ""
                            }
                          />
                        );
                      })}
                    </Stack>

                    {/* Title */}
                    <Typography
                      fontSize={{ xs: "2rem", md: "2rem", lg: "3rem" }}
                      fontWeight="700"
                      lineHeight={1.2}
                      sx={{
                        ...uiConfigs.style.typoLines(2, "left"),
                      }}
                    >
                      {movieItem.title ?? movieItem.original_title}
                    </Typography>

                    {/* Overview */}
                    <Typography
                      variant="body1"
                      sx={{
                        ...uiConfigs.style.typoLines(3),
                      }}
                    >
                      {movieItem.overview}
                    </Typography>

                    <Link href={`/movie/${movieItem.id}`}>
                      <Button
                        variant="outlined"
                        sx={{ width: 150, height: 40 }}
                        color="secondary"
                      >
                        Watch Now
                      </Button>
                    </Link>
                  </Stack>
                </Box>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </Box>
  );
};
