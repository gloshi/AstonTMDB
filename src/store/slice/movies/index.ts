import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PaginableResult } from "../../types";
import {
  CastPerson,
  Configuration,
  Genre,
  IMovie,
  MovieAccountState,
} from "./types";
import { useAxios } from "../../../hooks/useAxios";
import { RootState } from "../..";

export * from "./types";

export interface MoviesState {
  isLoading: boolean;
  configuration: Configuration;
  trending: IMovie[];
  isLoadingTrending: boolean;
  popular: PaginableResult<IMovie[]>;
  nowPlaying: PaginableResult<IMovie[]>;
  upcoming: PaginableResult<IMovie[]>;
  topRated: PaginableResult<IMovie[]>;
  search: PaginableResult<IMovie[]>;
  discover: PaginableResult<IMovie[]>;
  searchLoading: boolean;
  genres: Genre[];
  movieDetails: IMovie;
  personDetails: CastPerson;
  isLoadingDetails: boolean;
}

export const initialPaginableResult: PaginableResult<IMovie[]> = {
  page: 0,
  results: [],
  total_pages: 0,
  total_results: 0,
};

export const initialConfiguration: Configuration = {
  images: {
    secure_base_url: "",
    poster_sizes: [],
    backdrop_sizes: [],
    profile_sizes: [],
    logo_sizes: [],
  },
  change_keys: [],
};

const initialState: MoviesState = {
  isLoading: false,
  isLoadingTrending: false,
  isLoadingDetails: false,
  searchLoading: false,
  configuration: initialConfiguration,
  trending: [] as IMovie[],
  popular: initialPaginableResult,
  nowPlaying: initialPaginableResult,
  upcoming: initialPaginableResult,
  topRated: initialPaginableResult,
  search: initialPaginableResult,
  discover: initialPaginableResult,
  genres: [] as Genre[],
  movieDetails: {} as IMovie,
  personDetails: {} as CastPerson,
};

export const fetchConfigs = createAsyncThunk(
  "movies/FETCH_CONFIGS",
  async () => {
    const response = await useAxios.get<Configuration>("configuration");

    return response.data;
  }
);

export const fetchTrendingMovies = createAsyncThunk(
  "movies/FETCH_TRENDING_MOVIES",
  async () => {
    const response = await useAxios.get<PaginableResult<IMovie[]>>(
      "trending/movie/week"
    );

    return response.data.results;
  }
);

export const fetchPopularMovies = createAsyncThunk(
  "movies/FETCH_POPULAR_MOVIES",
  async () => {
    const response = await useAxios.get<PaginableResult<IMovie[]>>(
      "movie/popular"
    );

    return response.data;
  }
);

export const fetchNowPlayngMovies = createAsyncThunk(
  "movies/FETCH_NOW_PLAYING_MOVIES",
  async () => {
    const response = await useAxios.get<PaginableResult<IMovie[]>>(
      "movie/now_playing"
    );

    return response.data;
  }
);

export const fetchUpcomingMovies = createAsyncThunk(
  "movies/FETCH_UPCOMING_MOVIES",
  async () => {
    const response = await useAxios.get<PaginableResult<IMovie[]>>(
      "movie/upcoming"
    );

    return response.data;
  }
);

export const fetchTopRatedMovies = createAsyncThunk(
  "movies/FETCH_TOP_RATED_MOVIES",
  async (page: number) => {
    const response = await useAxios.get<PaginableResult<IMovie[]>>(
      `movie/top_rated?page=${page}`
    );

    return response.data;
  }
);

type SearchMoviesArgs = {
  query: string;
  page: number;
};

export const searchMovies = createAsyncThunk(
  "movies/SEARCH_MOVIES",
  async ({ query, page }: SearchMoviesArgs) => {
    const response = await useAxios.get<PaginableResult<IMovie[]>>(
      `search/movie?query=${query}&page=${page}`
    );

    return response.data;
  }
);

export const fetchMovieDetails = createAsyncThunk(
  "movies/FETCH_MOVIE_DETAILS",
  async (movieId: string, { getState }) => {
    const response = await useAxios.get<IMovie>(
      `/movie/${movieId}?&append_to_response=credits,similar,videos,images,recommendations,external_ids,account_states`
    );

    return response.data;
  }
);

type FetchMovieAccountStateArgs = {
  movieId: number;
  context: string;
};

export const fetchMovieAccountState = createAsyncThunk(
  "movies/FETCH_MOVIE_ACCOUNT_STATE",
  async ({ movieId, context }: FetchMovieAccountStateArgs) => {
    const movieAccountStateResponse = await useAxios.get<MovieAccountState>(
      `/movie/${movieId}/account_states`
    );

    return {
      movieId,
      accountState: movieAccountStateResponse.data,
      context,
    };
  }
);

export const fetchGenres = createAsyncThunk("movies/FETCH_GENRES", async () => {
  const response = await useAxios.get("genre/movie/list");

  return response.data.genres as Genre[];
});


// export const addMovieToFavorites = createAsyncThunk(
//   'profile/ADD_TO_FAVORITES',
//   async ({ movieId, isFavorite, context }: AddMovieToFavoritesArgs, { getState }) => {
//     const { profile } = getState() as RootState;

//     await useAxios.post(`/account/${profile.account?.id}/favorite`, {
//       media_id: movieId,
//       media_type: 'movie',
//       favorite: isFavorite,
//     });

//     return {
//       movieId,
//       isFavorite,
//       context,
//     };
//   },
// );

type AddMovieToWatchlistArgs = {
  movieId: number;
  isInWatchList: boolean;
  context: string;
};

// export const addMovieToWatchList = createAsyncThunk(
//   'profile/ADD_TO_WATCHLIST',
//   async ({ movieId, isInWatchList, context }: AddMovieToWatchlistArgs, { getState }) => {
//     const { profile } = getState() as RootState;

//     await useAxios.post(`/account/${profile.account?.id}/watchlist`, {
//       media_id: movieId,
//       media_type: 'movie',
//       watchlist: isInWatchList,
//     });

//     return {
//       movieId,
//       isInWatchList,
//       context,
//     };
//   },
// );

export const fetchPersonDetails = createAsyncThunk(
  "movies/FETCH_PERSON_DETAILS",
  async (personId: number) => {
    const response = await useAxios.get<CastPerson>(
      `/person/${personId}?append_to_response=external_ids`
    );

    return response.data;
  }
);

type FetchDiscoverArgs = {
  genreId: number;
  page: number;
};

export const fetchDiscover = createAsyncThunk(
  "movies/FETCH_DISCOVER",
  async ({ genreId, page }: FetchDiscoverArgs) => {
    const response = await useAxios.get<PaginableResult<IMovie[]>>(
      `/discover/movie?with_genres=${genreId}&page=${page}`
    );

    return response.data;
  }
);

const moviesReducer = createSlice({
  name: "movies",
  initialState,
  reducers: {
    clearMovieDetails(state) {
      state.movieDetails = {} as IMovie;
    },
    setMovieDetailsBackdrop(state, action: PayloadAction<string>) {
      state.movieDetails.backdrop_path = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTrendingMovies.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchTrendingMovies.fulfilled, (state, action) => {
      state.isLoading = false;
      state.trending = action.payload;
    });

    builder.addCase(fetchPopularMovies.fulfilled, (state, action) => {
      state.popular = action.payload;
    });

    builder.addCase(fetchUpcomingMovies.fulfilled, (state, action) => {
      state.upcoming = action.payload;
    });

    builder.addCase(fetchNowPlayngMovies.fulfilled, (state, action) => {
      state.nowPlaying = action.payload;
    });

    builder.addCase(fetchTopRatedMovies.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchTopRatedMovies.fulfilled, (state, action) => {
      state.isLoading = false;

      // if (action.payload.page > 1) {
      //   action.payload.results = [...state.topRated.results, ...action.payload.results];
      // }

      state.topRated = action.payload;
    });
    builder.addCase(fetchTopRatedMovies.rejected, (state, action) => {
      state.isLoading = false;
      console.log(action.payload);
    });

    builder.addCase(searchMovies.pending, (state) => {
      state.searchLoading = true;
    });
    builder.addCase(searchMovies.fulfilled, (state, action) => {
      state.searchLoading = false;

      if (action.payload.page > 1) {
        action.payload.results = [
          ...state.search.results,
          ...action.payload.results,
        ];
      }

      state.search = action.payload;
    });

    builder.addCase(fetchMovieDetails.pending, (state) => {
      state.isLoadingDetails = true;
    });
    builder.addCase(fetchMovieDetails.fulfilled, (state, action) => {
      state.isLoadingDetails = false;
      state.movieDetails = action.payload;
    });

    builder.addCase(fetchGenres.fulfilled, (state, action) => {
      state.genres = action.payload;
    });

    // builder.addCase(addMovieToFavorites.fulfilled, (state, action) => {
    //   const { movieId, isFavorite, context } = action.payload;

    //   if (context === 'movieDetails') {
    //     state.movieDetails.isFavorite = isFavorite;
    //   }

    //   if (context === 'topRated') {
    //     state.topRated.results = state.topRated.results.map((movie) => {
    //       if (movie.id === movieId) {
    //         movie.isFavorite = isFavorite;
    //       }

    //       return movie;
    //     });
    //   }
    // });
    // builder.addCase(addMovieToWatchList.fulfilled, (state, action) => {
    //   const { movieId, isInWatchList, context } = action.payload;

    //   if (context === 'movieDetails') {
    //     state.movieDetails.isInWatchList = isInWatchList;
    //   }

    //   if (context === 'topRated') {
    //     state.topRated.results = state.topRated.results.map((movie) => {
    //       if (movie.id === movieId) {
    //         movie.isInWatchList = isInWatchList;
    //       }

    //       return movie;
    //     });
    //   }
    // });

    builder.addCase(fetchMovieAccountState.fulfilled, (state, action) => {
      const { movieId, context, accountState } = action.payload;

      if (context === "topRated") {
        state.topRated.results = state.topRated.results.map((movie) => {
          if (movie.id === movieId) {
            movie.isFavorite = accountState.favorite;
            movie.isInWatchList = accountState.watchlist;
          }

          return movie;
        });
      }
    });

    builder.addCase(fetchPersonDetails.pending, (state) => {
      state.isLoadingDetails = true;
    });
    builder.addCase(fetchPersonDetails.fulfilled, (state, action) => {
      state.isLoadingDetails = false;
      state.personDetails = action.payload;
    });

    builder.addCase(fetchDiscover.pending, (state) => {
      state.isLoadingDetails = true;
    });
    builder.addCase(fetchDiscover.fulfilled, (state, action) => {
      state.isLoading = false;

      if (action.payload.page > 1) {
        action.payload.results = [
          ...state.discover.results,
          ...action.payload.results,
        ];
      }

      state.discover = action.payload;
    });
  },
});

export const { clearMovieDetails, setMovieDetailsBackdrop } =
  moviesReducer.actions;

export default moviesReducer.reducer;
