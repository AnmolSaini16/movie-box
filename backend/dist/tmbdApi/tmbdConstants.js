"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tmbdConstants = {
    trendingMoviesToday: "/trending/movie/day?language=en-US",
    topRatedMovies: "/movie/top_rated?language=en-US",
    popularMovies: "/movie/popular?language=en-US",
    upComingMovies: "/movie/upcoming?language=en-US",
    nowPlaying: "/movie/now_playing?language=en-US",
    movieDetail: (id) => `/movie/${id}?language=en-US`,
    movieCredits: (id) => `/movie/${id}/credits?language=en-US`,
    movieRecommendations: (id) => `/movie/${id}/recommendations?language=en-US`,
    movieVideos: (id) => `/movie/${id}/videos?language=en-US`,
    movieReviews: (id) => `/movie/${id}/reviews?language=en-US`,
    searchMovie: `/search/movie`,
};
exports.default = tmbdConstants;
//# sourceMappingURL=tmbdConstants.js.map