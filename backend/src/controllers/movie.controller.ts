import { Request, Response } from "express";
import tmbdClient from "../tmbdApi";
import responseHandler from "../handlers/response.handler";
import prisma from "../prisma";
import { IUserInfoInRequest } from "../interface";
import { JwtPayload } from "jsonwebtoken";
import tokenMiddleware from "../middleware/token.middleware";

export const getTrendingMovies = async (req: Request, res: Response) => {
  try {
    const page = req.query.page as string;

    const response = await tmbdClient.trendingMoviesToday({ page });

    return responseHandler.ok(res, response);
  } catch {
    responseHandler.error(res);
  }
};

export const getTopRatedMovies = async (req: Request, res: Response) => {
  try {
    const page = req.query.page as string;

    const response = await tmbdClient.topRatedMovies({ page });

    return responseHandler.ok(res, response);
  } catch {
    responseHandler.error(res);
  }
};

export const getPopularMovies = async (req: Request, res: Response) => {
  try {
    const page = req.query.page as string;

    const response = await tmbdClient.popularMovies({ page });

    return responseHandler.ok(res, response);
  } catch {
    responseHandler.error(res);
  }
};

export const getUpcomingMovies = async (req: Request, res: Response) => {
  try {
    const page = req.query.page as string;

    const response = await tmbdClient.upComingMovies({ page });

    return responseHandler.ok(res, response);
  } catch {
    responseHandler.error(res);
  }
};

export const getNowPlayinMovies = async (req: Request, res: Response) => {
  try {
    const page = req.query.page as string;

    const response = await tmbdClient.nowPlayingMovies({ page });

    return responseHandler.ok(res, response);
  } catch {
    responseHandler.error(res);
  }
};

export const getMovieDetail = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const [movieDetail, credits, recommendations, videos, reviews] =
      await Promise.all([
        tmbdClient.movieDetail({ id }),
        tmbdClient.movieCredits({ id }),
        tmbdClient.movieRecommendations({ id }),
        tmbdClient.movieVideos({ id }),
        tmbdClient.movieReviews({ id }),
      ]);

    movieDetail.credits = credits.cast;

    movieDetail.recommendations = recommendations;

    movieDetail.videos = videos;

    movieDetail.reviews = reviews;

    // To check for Favorite
    const { data } = tokenMiddleware.tokenDecode(req) as JwtPayload;

    if (data) {
      const user = await prisma.user.findFirst({
        where: { id: data },
      });

      if (user) {
        const isFavourite = await prisma.favorite.findFirst({
          where: { userId: user.id, movieId: +id },
        });
        movieDetail.isFavorite = !!isFavourite;
      }
    }

    return responseHandler.ok(res, movieDetail);
  } catch {
    responseHandler.error(res);
  }
};

export const getSearchResults = async (req: Request, res: Response) => {
  try {
    const page = req.query.page as string;
    const query = req.query.query as string;

    const response = await tmbdClient.searchMovie({ query, page });

    return responseHandler.ok(res, response);
  } catch {
    responseHandler.error(res);
  }
};
