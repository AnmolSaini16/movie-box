import React, { useState } from "react";
import Image from "next/image";
import { Skeleton } from "@mui/material";
import tmdbConfigs from "@/config/tmbdConfig";

export const LoadingImage = ({ src, alt }: { src: string; alt: string }) => {
  const [loading, setLoading] = useState<boolean>(src ? true : false);
  return (
    <>
      {src && (
        <Image
          layout="fill"
          objectFit="contain"
          src={tmdbConfigs.posterPath(src)}
          alt={alt}
          onLoad={() => setLoading(false)}
          style={loading ? { opacity: 0 } : { opacity: 1 }}
        />
      )}

      {loading && (
        <Skeleton
          variant="rectangular"
          animation="wave"
          width="100%"
          height="100%"
        />
      )}

      {!src && (
        <Skeleton
          variant="rectangular"
          animation={false}
          width="100%"
          height="100%"
        >
          {alt}
        </Skeleton>
      )}
    </>
  );
};
