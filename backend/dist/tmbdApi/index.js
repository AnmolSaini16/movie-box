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
const axios_client_1 = __importDefault(require("../axios/axios.client"));
const tmbdConfig_1 = __importDefault(require("./tmbdConfig"));
const tmbdClient = {
    trendingMoviesToday: ({ page }) => __awaiter(void 0, void 0, void 0, function* () { return yield axios_client_1.default.get(tmbdConfig_1.default.trendingMoviesToday({ page })); }),
    topRatedMovies: ({ page }) => __awaiter(void 0, void 0, void 0, function* () { return yield axios_client_1.default.get(tmbdConfig_1.default.topRatedMovies({ page })); }),
    popularMovies: ({ page }) => __awaiter(void 0, void 0, void 0, function* () { return yield axios_client_1.default.get(tmbdConfig_1.default.popularMovies({ page })); }),
    upComingMovies: ({ page }) => __awaiter(void 0, void 0, void 0, function* () { return yield axios_client_1.default.get(tmbdConfig_1.default.upComingMovies({ page })); }),
    nowPlayingMovies: ({ page }) => __awaiter(void 0, void 0, void 0, function* () { return yield axios_client_1.default.get(tmbdConfig_1.default.nowPlayingMovies({ page })); }),
    movieDetail: ({ id }) => __awaiter(void 0, void 0, void 0, function* () { return yield axios_client_1.default.get(tmbdConfig_1.default.movieDetail({ id })); }),
    movieCredits: ({ id }) => __awaiter(void 0, void 0, void 0, function* () { return yield axios_client_1.default.get(tmbdConfig_1.default.movieCredits({ id })); }),
    movieRecommendations: ({ id }) => __awaiter(void 0, void 0, void 0, function* () { return yield axios_client_1.default.get(tmbdConfig_1.default.movieRecommendations({ id })); }),
    movieVideos: ({ id }) => __awaiter(void 0, void 0, void 0, function* () { return yield axios_client_1.default.get(tmbdConfig_1.default.movieVideos({ id })); }),
    movieReviews: ({ id }) => __awaiter(void 0, void 0, void 0, function* () { return yield axios_client_1.default.get(tmbdConfig_1.default.movieReviews({ id })); }),
    searchMovie: ({ page, query }) => __awaiter(void 0, void 0, void 0, function* () { return yield axios_client_1.default.get(tmbdConfig_1.default.searchMovie({ page, query })); }),
};
exports.default = tmbdClient;
//# sourceMappingURL=index.js.map