import React from "react";
import { Swiper } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css/navigation";
import { Box, useTheme } from "@mui/material";

export const VerticalSwiper = ({ children }: { children: JSX.Element }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        "& .swiper-slide": {
          width: {
            xs: "auto",
          },
        },
        "& .swiper-button-next": {
          color: theme.palette.secondary.main,
        },
        "& .swiper-button-prev": {
          color: theme.palette.secondary.main,
        },
      }}
    >
      <Swiper
        slidesPerView="auto"
        navigation={true}
        modules={[Navigation]}
        spaceBetween={8}
        style={{ width: "100%", height: "max-content" }}
      >
        {children}
      </Swiper>
    </Box>
  );
};
