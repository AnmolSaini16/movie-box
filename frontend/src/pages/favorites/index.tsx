import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import { getAllFavorites } from "@/api/userApi";
import {
  Favorite,
  MovieItem as MovieItemType,
} from "@/interfaces/movieInterface";
import { Box, Grid, Skeleton, Typography } from "@mui/material";
import { uiConfigs } from "@/styleConfig/uiConfig";
import MovieItem from "@/components/movie/MovieItem";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { MovieItemType as MovieItemTypeContant } from "@/constants/movieContants";

const movieTypeNotUsedValues = {
  adult: false,
  backdrop_path: "",
  original_language: "",
  original_title: "",
  overview: "",
  popularity: 0,
  video: false,
  vote_count: 0,
};

const FavoritesPage = () => {
  const { data: session } = useSession();
  const { data, isLoading } = getAllFavorites<Favorite[]>(
    session?.user?.email!
  );
  const favoritesData = data?.data;

  return (
    <>
      <Head>
        <title>MovieBox - Favorites</title>
      </Head>
      <Box {...uiConfigs.mainContent} sx={{ mt: 10 }}>
        <Box mb={1}>
          <Typography sx={{ fontSize: "18px" }}>Your Favorites</Typography>
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
          ) : !favoritesData?.length ? (
            <Box textAlign="center" mx="auto" mt={10}>
              <Typography color="text.secondary">
                You haven't added any titles to your favorites yet.
              </Typography>
            </Box>
          ) : (
            favoritesData?.map((favorite) => {
              const movieType: MovieItemType = {
                id: favorite.movieId,
                title: favorite.movieTitle,
                poster_path: favorite.moviePosterURL,
                vote_average: favorite.movieRating,
                release_date: favorite.movieReleaseData,
                genre_ids: favorite.movieGenre,
                ...movieTypeNotUsedValues,
              };
              return (
                <Grid item key={favorite.id}>
                  <MovieItem
                    movie={movieType}
                    type={MovieItemTypeContant.MovieRowFavoriteItem}
                  />
                </Grid>
              );
            })
          )}
        </Grid>
      </Box>
    </>
  );
};

export default FavoritesPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session)
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };

  return { props: { session } };
};
