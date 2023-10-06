import { Credits } from "@/interfaces/movieInterface";
import { Box, Typography } from "@mui/material";
import React from "react";
import { VerticalSwiper } from "../common/VerticalSwiper";
import { uiConfigs } from "@/styleConfig/uiConfig";
import { SwiperSlide } from "swiper/react";
import { LoadingImage } from "../common/LoadingImage";
import { WrapperContainer } from "../common/WrapperContainer";

export const MovieCast = ({ credits }: { credits: Credits[] }) => {
  return (
    <WrapperContainer title="Cast">
      <VerticalSwiper>
        <>
          {credits?.map((cast) => (
            <SwiperSlide key={cast.id}>
              <Box
                sx={{
                  width: 140,
                  height: 210,
                }}
              >
                <LoadingImage alt={cast?.name} src={cast?.profile_path} />
                <Box
                  sx={{
                    position: "absolute",
                    width: 120,
                    height: "max-content",
                    bottom: 0,
                    padding: "10px",
                    backgroundColor: "rgba(0,0,0,0.6)",
                  }}
                >
                  <Typography
                    sx={{
                      ...uiConfigs.style.typoLines(1, "left"),
                      fontSize: 12,
                    }}
                  >
                    {cast?.name}
                  </Typography>
                </Box>
              </Box>
            </SwiperSlide>
          ))}
        </>
      </VerticalSwiper>
    </WrapperContainer>
  );
};
