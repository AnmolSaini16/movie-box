import { Video } from "@/interfaces/movieInterface";
import { Box } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { WrapperContainer } from "../common/WrapperContainer";
import tmdbConfigs from "@/config/tmbdConfig";

export const MovieVideos = ({ videos }: { videos: Video[] }) => {
  return (
    <WrapperContainer title="Videos">
      <Box
        sx={{
          "& .swiper-slide": {
            width: "100%",
            opacity: "0.6",
            paddingBottom: "3rem",
          },
          "& .swiper-slide-active": { opacity: 1 },
          "& .swiper-pagination-bullet": {
            backgroundColor: "text.primary",
          },
          "& .swiper-button-next, & .swiper-button-prev": {
            color: "text.primary",
            "&::after": {
              fontSize: { xs: "1rem", md: "2rem" },
            },
          },
          "& .swiper": {
            paddingX: { xs: "1rem", md: "4rem" },
          },
        }}
      >
        <Swiper
          spaceBetween={10}
          grabCursor={true}
          pagination={{ clickable: true }}
          navigation={true}
          modules={[Navigation, Pagination]}
          style={{ width: "100%", height: "max-content" }}
        >
          {videos?.map((video) => (
            <SwiperSlide key={video.id}>
              <MovieVideo video={video} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </WrapperContainer>
  );
};

const MovieVideo = ({ video }: { video: Video }) => {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    const height = (iframeRef?.current?.offsetWidth! * 9) / 16 + "px";
    iframeRef?.current?.setAttribute("height", height);
  }, [video]);

  return (
    <Box sx={{ height: "max-content" }}>
      <iframe
        key={video?.key}
        src={tmdbConfigs.youtubePath(video.key)}
        ref={iframeRef}
        width="100%"
        title={video?.id}
        style={{ border: 0 }}
        loading="lazy"
      ></iframe>
    </Box>
  );
};
