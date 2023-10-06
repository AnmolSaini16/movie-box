import { MovieItem as MovieItemType } from "@/interfaces/movieInterface";
import React from "react";
import { SwiperSlide } from "swiper/react";
import { VerticalSwiper } from "../common/VerticalSwiper";
import MovieItem from "./MovieItem";
import { WrapperContainer } from "../common/WrapperContainer";

export const MovieRecommended = ({
  recommendations,
}: {
  recommendations: MovieItemType[];
}) => {
  return (
    <WrapperContainer title="Recommended">
      <VerticalSwiper>
        <>
          {recommendations?.map((recommendation) => (
            <SwiperSlide key={recommendation.id}>
              <MovieItem movie={recommendation} />
            </SwiperSlide>
          ))}
        </>
      </VerticalSwiper>
    </WrapperContainer>
  );
};
