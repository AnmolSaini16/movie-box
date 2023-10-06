export interface Movie {
  page: number;
  results: MovieItem[];
  total_pages: number;
  total_results: number;
  dates?: { maximum: string; minimum: string };
}

export interface MovieItem {
  adult: boolean;
  backdrop_path: string;
  genre_ids: Array<number>;
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface MovieDetailType {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: {};
  budget: number;
  genres: Array<{ id: number; name: string }>;
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: {};
  production_countries: {};
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: {};
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  isFavorite?: boolean;
  credits: Credits[];
  recommendations: Recommendations;
  videos: {
    id: number;
    results: Video[];
  };
  reviews: {
    id: number;
    page: number;
    results: Review[];
    total_pages: number;
    total_results: number;
  };
}
export interface Favorite {
  id: string;
  userId: string;
  movieId: number;
  movieTitle: string;
  moviePosterURL: string;
  movieRating: number;
  movieReleaseData: string;
  movieGenre: number[];
  createdAt: string;
}

export interface Credits {
  adult: boolean;
  cast_id: number;
  character: string;
  credit_id: string;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  order: number;
  original_name: string;
  popularity: number;
  profile_path: string;
}

export interface Recommendations extends Movie {}

export interface Video {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  official: boolean;
  published_at: string;
  site: string;
  size: number;
  type: string;
}

export interface Review {
  author: string;
  author_details: {
    name: string;
    username: string;
    avatar_path: string;
    rating: number;
  };
  content: string;
  created_at: string;
  id: string;
  updated_at: string;
  url: string;
}
