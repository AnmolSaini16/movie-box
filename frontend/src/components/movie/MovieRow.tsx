import { Box, Button, Skeleton, Typography } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import React from "react";
import { SwiperSlide } from "swiper/react";

import { MovieRowTitle, MovieType } from "@/constants/movieContants";
import { getMovieWithType } from "@/api/movieApi";
import MovieItem from "./MovieItem";
import { VerticalSwiper } from "../common/VerticalSwiper";
import { Movie } from "@/interfaces/movieInterface";
import { uiConfigs } from "@/styleConfig/uiConfig";

export const MovieRow = ({
  movieType,
  rowTitle,
}: {
  movieType: MovieType;
  rowTitle: MovieRowTitle;
}) => {
  const { data, isLoading } = getMovieWithType<Movie>(movieType, 1);
  const movieData = data?.data;

  return (
    <>
      <Box {...uiConfigs.mainContent} mt={4}>
        <Box mb={1}>
          <Button color="secondary">
            <Typography sx={{ mr: 1, fontSize: "18px" }}>{rowTitle}</Typography>{" "}
            <ArrowForwardIosIcon fontSize="inherit" />
          </Button>
        </Box>
        <VerticalSwiper>
          <>
            {isLoading
              ? new Array(8).fill("").map((_x, i) => (
                  <SwiperSlide key={i}>
                    <Box width={225} height={335}>
                      <Skeleton
                        variant="rectangular"
                        animation="wave"
                        width="100%"
                        height="100%"
                      />
                    </Box>
                  </SwiperSlide>
                ))
              : movieData?.results?.map((movieItem) => (
                  <SwiperSlide key={movieItem.id}>
                    <MovieItem movie={movieItem} />
                  </SwiperSlide>
                ))}
          </>
        </VerticalSwiper>
      </Box>
    </>
  );
};
