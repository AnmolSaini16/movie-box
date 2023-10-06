"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const movie_controller_1 = require("../controllers/movie.controller");
const router = express_1.default.Router();
router.get("/trendingMovies", movie_controller_1.getTrendingMovies);
router.get("/topRatedMovies", movie_controller_1.getTopRatedMovies);
router.get("/popularMovies", movie_controller_1.getPopularMovies);
router.get("/upComingMovies", movie_controller_1.getUpcomingMovies);
router.get("/nowPlayingMovies", movie_controller_1.getNowPlayinMovies);
router.get("/getSearchResults", movie_controller_1.getSearchResults);
router.get("/:id", movie_controller_1.getMovieDetail);
exports.default = router;
//# sourceMappingURL=movie.route.js.map