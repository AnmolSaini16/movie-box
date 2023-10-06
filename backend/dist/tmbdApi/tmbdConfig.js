"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tmbdConstants_1 = __importDefault(require("./tmbdConstants"));
const utils_1 = require("./utils");
const tmbdConfig = {
    trendingMoviesToday: ({ page }) => (0, utils_1.getUrl)(tmbdConstants_1.default.trendingMoviesToday, { page }),
    topRatedMovies: ({ page }) => (0, utils_1.getUrl)(tmbdConstants_1.default.topRatedMovies, { page }),
    popularMovies: ({ page }) => (0, utils_1.getUrl)(tmbdConstants_1.default.popularMovies, { page }),
    upComingMovies: ({ page }) => (0, utils_1.getUrl)(tmbdConstants_1.default.upComingMovies, { page }),
    nowPlayingMovies: ({ page }) => (0, utils_1.getUrl)(tmbdConstants_1.default.nowPlaying, { page }),
    movieDetail: ({ id }) => (0, utils_1.getUrl)(tmbdConstants_1.default.movieDetail(id), {}),
    movieCredits: ({ id }) => (0, utils_1.getUrl)(tmbdConstants_1.default.movieCredits(id), {}),
    movieRecommendations: ({ id }) => (0, utils_1.getUrl)(tmbdConstants_1.default.movieRecommendations(id), {}),
    movieVideos: ({ id }) => (0, utils_1.getUrl)(tmbdConstants_1.default.movieVideos(id), {}),
    movieReviews: ({ id }) => (0, utils_1.getUrl)(tmbdConstants_1.default.movieReviews(id), {}),
    searchMovie: ({ page, query }) => (0, utils_1.getUrl)(tmbdConstants_1.default.searchMovie, { query, page }),
};
exports.default = tmbdConfig;
//# sourceMappingURL=tmbdConfig.js.map