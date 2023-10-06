import { getSearchResults } from "@/api/movieApi";
import { Movie } from "@/interfaces/movieInterface";
import { uiConfigs } from "@/styleConfig/uiConfig";
import { Box, Grid, Skeleton, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";

import MovieItem from "@/components/movie/MovieItem";
import Head from "next/head";

const SearchPage = () => {
  const router = useRouter();
  const { q } = router.query;
  const { data, isLoading } = getSearchResults<Movie>(q as string, 1);
  const searchResults = data?.data;

  return (
    <>
      <Head>
        <title>MovieBox - Search Movies</title>
      </Head>
      <Box {...uiConfigs.mainContent} sx={{ mt: 10 }}>
        <Box mb={1}>
          <Typography sx={{ fontSize: "18px" }}>Search Results</Typography>
        </Box>
        <Grid container spacing={1}>
          {isLoading ? (
            new Array(6).fill("").map((_x, i) => (
              <Grid item key={i}>
                <Skeleton
                  variant="rectangular"
                  animation="wave"
                  width={225}
                  height={335}
                />
              </Grid>
            ))
          ) : !searchResults?.results.length ? (
            <Box textAlign="center" width="100%" mt={4}>
              <Typography>No Results Found</Typography>
            </Box>
          ) : (
            searchResults?.results?.map((movie) => (
              <Grid item key={movie.id}>
                <MovieItem movie={movie} />
              </Grid>
            ))
          )}
        </Grid>
      </Box>
    </>
  );
};

export default SearchPage;
