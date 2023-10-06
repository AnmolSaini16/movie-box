import { Banner } from "@/components/common/Banner";
import { MovieRow } from "@/components/movie/MovieRow";
import { MovieRowTitle, MovieType } from "@/constants/movieContants";
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>MovieBox</title>
      </Head>
      <Banner movieType={MovieType.NowPlayingMovies} />
      <MovieRow
        movieType={MovieType.TrendingMovies}
        rowTitle={MovieRowTitle.TrendingMovies}
      />
      <MovieRow
        movieType={MovieType.PopularMovies}
        rowTitle={MovieRowTitle.PopularMovies}
      />
      <MovieRow
        movieType={MovieType.UpComingMovies}
        rowTitle={MovieRowTitle.UpComingMovies}
      />
      <MovieRow
        movieType={MovieType.TopRatedMovies}
        rowTitle={MovieRowTitle.TopRatedMovies}
      />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  return { props: { session } };
};
