import { getMovieDetail } from "@/api/movieApi";
import { MovieDetail } from "@/components/movie/MovieDetail";
import { MovieType } from "@/constants/movieContants";
import { MovieDetailType } from "@/interfaces/movieInterface";
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]";
import { useSession } from "next-auth/react";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import axios from "axios";
import Head from "next/head";

const MovieDetailsPage = ({ id }: { id: string }) => {
  const { data: session } = useSession();
  const { data: movieDetail, isLoading } = getMovieDetail<MovieDetailType>(
    MovieType.MovieDetail,
    id
  );

  const title = `MovieBox - ${
    movieDetail?.title || movieDetail?.original_title
  }`;

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <MovieDetail movie={movieDetail} loading={isLoading} session={session} />
    </>
  );
};

export default MovieDetailsPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);
  const queryClient = new QueryClient();

  const { id } = context.query;
  const token = session?.user?.token ?? "";
  const baseURL = process.env.BACKEND_URL || "http://localhost:5000";

  try {
    if (id) {
      await queryClient.fetchQuery([+id], async () => {
        const response = await axios.get(baseURL + `/api/movie/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        return response?.data;
      });
    }
  } catch (error) {
    console.log("error", error);
  }

  return { props: { dehydratedState: dehydrate(queryClient), id, session } };
};
