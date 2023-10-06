export enum MovieType {
  TrendingMovies = "GetTrendingMovies",
  TopRatedMovies = "GetTopRatedMovies",
  PopularMovies = "GetPopularMovies",
  UpComingMovies = "GetUpComingMovies",
  NowPlayingMovies = "GetNowPlayingMovies",
  MovieDetail = "GetMovieDetail",
  AddFavorite = "AddFavorite",
  RemoveFavorite = "RemoveFavorite",
  GetAllFavorites = "GetAllFavorites",
  GetSearchResults = "GetSearchResults",
}

export enum MovieRowTitle {
  TrendingMovies = "Trending Now",
  PopularMovies = "Popular Movies",
  NowPlayingMovies = "Now Playing Movies",
  TopRatedMovies = "Top Rated Movies",
  UpComingMovies = "Up Coming Movies",
}

export enum MovieItemType {
  MovieRowItem = "MovieRowItem",
  MovieRowFavoriteItem = "MovieRowFavoriteItem",
}
