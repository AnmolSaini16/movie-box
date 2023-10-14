import { getSearchResults } from "@/api/movieApi";
import { Movie } from "@/interfaces/movieInterface";
import { uiConfigs } from "@/styleConfig/uiConfig";
import { Box, Grid, Typography } from "@mui/material";
import React, { useCallback, useContext, useEffect, useState } from "react";

import MovieItem from "@/components/movie/MovieItem";
import Head from "next/head";
import { MovieItemType } from "@/constants/movieContants";
import { debounce } from "lodash";
import { AppContext, AppContextType } from "@/context/appContext";
import { GridDataLoading } from "@/components/common/GridDataLoading";
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";

const SearchPage = () => {
  const { searchText } = useContext(AppContext) as AppContextType;
  const [searchQuery, setSeachQuery] = useState<string>(searchText);
  const { data, isLoading } = getSearchResults<Movie>(searchQuery, 1);
  const searchResults = data?.data;

  const debounceSearch = useCallback(
    debounce((query: string) => setSeachQuery(query), 500),
    []
  );

  useEffect(() => {
    debounceSearch(searchText);
  }, [searchText]);

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
            <GridDataLoading />
          ) : !searchResults?.results.length ? (
            <Box textAlign="center" mx="auto" mt={10}>
              <Typography color="text.secondary">No Results Found.</Typography>
            </Box>
          ) : (
            searchResults?.results?.map((movie) => (
              <Grid item key={movie.id}>
                <MovieItem movie={movie} type={MovieItemType.MovieRowItem} />
              </Grid>
            ))
          )}
        </Grid>
      </Box>
    </>
  );
};

export default SearchPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  return { props: { session } };
};
