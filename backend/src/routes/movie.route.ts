import express from "express";
import {
  getMovieDetail,
  getNowPlayinMovies,
  getPopularMovies,
  getSearchResults,
  getTopRatedMovies,
  getTrendingMovies,
  getUpcomingMovies,
} from "../controllers/movie.controller";

const router = express.Router();

router.get("/trendingMovies", getTrendingMovies);

router.get("/topRatedMovies", getTopRatedMovies);

router.get("/popularMovies", getPopularMovies);

router.get("/upComingMovies", getUpcomingMovies);

router.get("/nowPlayingMovies", getNowPlayinMovies);

router.get("/getSearchResults", getSearchResults);

router.get("/:id", getMovieDetail);

export default router;
