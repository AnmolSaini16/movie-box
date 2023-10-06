"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSearchResults = exports.getMovieDetail = exports.getNowPlayinMovies = exports.getUpcomingMovies = exports.getPopularMovies = exports.getTopRatedMovies = exports.getTrendingMovies = void 0;
const tmbdApi_1 = __importDefault(require("../tmbdApi"));
const response_handler_1 = __importDefault(require("../handlers/response.handler"));
const prisma_1 = __importDefault(require("../prisma"));
const token_middleware_1 = __importDefault(require("../middleware/token.middleware"));
const getTrendingMovies = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = req.query.page;
        const response = yield tmbdApi_1.default.trendingMoviesToday({ page });
        return response_handler_1.default.ok(res, response);
    }
    catch (_a) {
        response_handler_1.default.error(res);
    }
});
exports.getTrendingMovies = getTrendingMovies;
const getTopRatedMovies = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = req.query.page;
        const response = yield tmbdApi_1.default.topRatedMovies({ page });
        return response_handler_1.default.ok(res, response);
    }
    catch (_b) {
        response_handler_1.default.error(res);
    }
});
exports.getTopRatedMovies = getTopRatedMovies;
const getPopularMovies = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = req.query.page;
        const response = yield tmbdApi_1.default.popularMovies({ page });
        return response_handler_1.default.ok(res, response);
    }
    catch (_c) {
        response_handler_1.default.error(res);
    }
});
exports.getPopularMovies = getPopularMovies;
const getUpcomingMovies = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = req.query.page;
        const response = yield tmbdApi_1.default.upComingMovies({ page });
        return response_handler_1.default.ok(res, response);
    }
    catch (_d) {
        response_handler_1.default.error(res);
    }
});
exports.getUpcomingMovies = getUpcomingMovies;
const getNowPlayinMovies = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = req.query.page;
        const response = yield tmbdApi_1.default.nowPlayingMovies({ page });
        return response_handler_1.default.ok(res, response);
    }
    catch (_e) {
        response_handler_1.default.error(res);
    }
});
exports.getNowPlayinMovies = getNowPlayinMovies;
const getMovieDetail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const [movieDetail, credits, recommendations, videos, reviews] = yield Promise.all([
            tmbdApi_1.default.movieDetail({ id }),
            tmbdApi_1.default.movieCredits({ id }),
            tmbdApi_1.default.movieRecommendations({ id }),
            tmbdApi_1.default.movieVideos({ id }),
            tmbdApi_1.default.movieReviews({ id }),
        ]);
        movieDetail.credits = credits.cast;
        movieDetail.recommendations = recommendations;
        movieDetail.videos = videos;
        movieDetail.reviews = reviews;
        // To check for Favorite
        const { data } = token_middleware_1.default.tokenDecode(req);
        if (data) {
            const user = yield prisma_1.default.user.findFirst({
                where: { id: data },
            });
            if (user) {
                const isFavourite = yield prisma_1.default.favorite.findFirst({
                    where: { userId: user.id, movieId: +id },
                });
                movieDetail.isFavorite = !!isFavourite;
            }
        }
        return response_handler_1.default.ok(res, movieDetail);
    }
    catch (_f) {
        response_handler_1.default.error(res);
    }
});
exports.getMovieDetail = getMovieDetail;
const getSearchResults = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = req.query.page;
        const query = req.query.query;
        const response = yield tmbdApi_1.default.searchMovie({ query, page });
        return response_handler_1.default.ok(res, response);
    }
    catch (_g) {
        response_handler_1.default.error(res);
    }
});
exports.getSearchResults = getSearchResults;
//# sourceMappingURL=movie.controller.js.map