import express from "express";
import {
  addToFavorite,
  getAllFavorites,
  removeFavorite,
} from "../controllers/favorite.controller";
import tokenMiddleware from "../middleware/token.middleware";
import { getUserInfo } from "../controllers/user.controller";
import requestHandler from "../handlers/request.handler";
import { body } from "express-validator";

const router = express.Router();

router.post(
  "/addFavorite",
  tokenMiddleware.checkAuth,
  body("movieId")
    .exists()
    .withMessage("movieId is required")
    .isLength({ min: 1 })
    .withMessage("movieId can not be empty"),
  body("movieTitle").exists().isString().withMessage("movieTitle is required"),
  body("moviePosterURL")
    .exists()
    .isString()
    .withMessage("moviePosterURL is required"),
  body("movieReleaseData")
    .exists()
    .isString()
    .withMessage("movieReleaseData is required"),
  body("movieGenre").exists().withMessage("movieGenre is required"),
  body("movieRating")
    .exists()
    .isFloat()
    .withMessage("movieRating should be int"),
  requestHandler.validate,
  addToFavorite
);

router.delete(
  "/removeFavorite",
  tokenMiddleware.checkAuth,
  body("movieId").exists().withMessage("favoriteId is required"),
  requestHandler.validate,
  removeFavorite
);

router.get("/getAllFavorites", tokenMiddleware.checkAuth, getAllFavorites);

router.get("/getUserInfo", tokenMiddleware.checkAuth, getUserInfo);

export default router;
