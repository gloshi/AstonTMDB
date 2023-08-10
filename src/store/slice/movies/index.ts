import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PaginableResult } from "../../types";
import { CastPerson, Configuration, Genre, IMovie } from "./types";
import { useAxios } from "../../../hooks/useAxios";

export * from "./types";

export interface MoviesState {
  isLoading: boolean;
  isLoadingActors: boolean;
  configuration: Configuration;
  trending: IMovie[];
  isLoadingTrending: boolean;
  popular: PaginableResult<IMovie[]>;
  nowPlaying: PaginableResult<IMovie[]>;
  upcoming: PaginableResult<IMovie[]>;
  topRated: PaginableResult<IMovie[]>;
  search: PaginableResult<IMovie[]>;
  searchActor: PaginableResult<CastPerson[]>;
  discover: PaginableResult<IMovie[]>;
  searchLoading: boolean;
  actors: PaginableResult<IActor[]>;
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
export const initialPaginableResultforActor: PaginableResult<CastPerson[]> = {
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
export interface IActor {
  gender: number;
  id: number;
  name: string;
  profile_path: string;
}
const initialState: MoviesState = {
  isLoading: false,
  isLoadingActors: false,
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
  searchActor: initialPaginableResultforActor,
  discover: initialPaginableResult,
  actors: initialPaginableResultforActor,
  genres: [] as Genre[],
  movieDetails: {} as IMovie,
  personDetails: {} as CastPerson,
};

export const fetchConfigs = createAsyncThunk(
  "movies/FETCH_CONFIGS",
  async () => {
    const response = await useAxios.get<Configuration>("configuration");

    return response.data;
  },
);

export const fetchTrendingMovies = createAsyncThunk(
  "movies/FETCH_TRENDING_MOVIES",
  async () => {
    const response = await useAxios.get<PaginableResult<IMovie[]>>(
      "trending/movie/week",
    );

    return response.data.results;
  },
);
//actors
export const fetchActors = createAsyncThunk(
  "movies/actors",
  async (page: number) => {
    const response = await useAxios.get<PaginableResult<IActor[]>>(
      `person/popular?&page=${page}`,
    );
    return response.data;
  },
);
export const fetchPopularMovies = createAsyncThunk(
  "movies/FETCH_POPULAR_MOVIES",
  async () => {
    const response = await useAxios.get<PaginableResult<IMovie[]>>(
      "movie/popular",
    );

    return response.data;
  },
);

export const fetchNowPlayngMovies = createAsyncThunk(
  "movies/FETCH_NOW_PLAYING_MOVIES",

  async (page: number) => {
    const response = await useAxios.get<PaginableResult<IMovie[]>>(
      `movie/now_playing?page=${page}`,
    );

    return response.data;
  },
);

export const fetchUpcomingMovies = createAsyncThunk(
  "movies/FETCH_UPCOMING_MOVIES",

  async (page: number) => {
    const response = await useAxios.get<PaginableResult<IMovie[]>>(
      `movie/upcoming?page=${page}`,
    );

    return response.data;
  },
);

export const fetchTopRatedMovies = createAsyncThunk(
  "movies/FETCH_TOP_RATED_MOVIES",
  async (page: number) => {
    const response = await useAxios.get<PaginableResult<IMovie[]>>(
      `movie/top_rated?page=${page}`,
    );

    return response.data;
  },
);

type SearchMoviesArgs = {
  searchValue: string;
  page?: number;
};
type SearchPersonArgs = {
  searchValue: string;
  page?: number;
};
export const searchMovies = createAsyncThunk(
  "movies/SEARCH_MOVIES",
  async ({ searchValue }: SearchMoviesArgs) => {
    const response = await useAxios.get<PaginableResult<IMovie[]>>(
      `search/movie?query=${searchValue}`,
    );

    return response.data;
  },
);
export const searchPerson = createAsyncThunk(
  "movies/SEARCH_PERSON",
  async ({ searchValue }: SearchPersonArgs) => {
    const response = await useAxios.get<PaginableResult<CastPerson[]>>(
      `search/person?query=${searchValue}`,
    );

    return response.data;
  },
);
export const fetchMovieDetails = createAsyncThunk(
  "movies/FETCH_MOVIE_DETAILS",
  async (movieId: string, { getState }) => {
    const response = await useAxios.get<IMovie>(
      `/movie/${movieId}?&append_to_response=credits,similar,videos,images,recommendations,external_ids,account_states`,
    );

    return response.data;
  },
);

export const fetchGenres = createAsyncThunk("movies/FETCH_GENRES", async () => {
  const response = await useAxios.get("genre/movie/list");

  return response.data.genres as Genre[];
});

export const fetchPersonDetails = createAsyncThunk(
  "movies/FETCH_PERSON_DETAILS",
  async (personId: number) => {
    const response = await useAxios.get<CastPerson>(
      `/person/${personId}?append_to_response=external_ids`,
    );

    return response.data;
  },
);

type FetchDiscoverArgs = {
  genreId: number;
  page: number;
};

export const fetchDiscover = createAsyncThunk(
  "movies/FETCH_DISCOVER",
  async ({ genreId, page }: FetchDiscoverArgs) => {
    const response = await useAxios.get<PaginableResult<IMovie[]>>(
      `/discover/movie?with_genres=${genreId}&page=${page}`,
    );

    return response.data;
  },
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
    builder.addCase(fetchActors.pending, (state) => {
      state.isLoadingActors = true;
    });
    builder.addCase(fetchActors.fulfilled, (state, action) => {
      state.isLoading = false;
      state.actors = action.payload;
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
    builder.addCase(searchPerson.pending, (state) => {
      state.searchLoading = true;
    });
    builder.addCase(searchPerson.fulfilled, (state, action) => {
      state.searchLoading = false;

      if (action.payload.page > 1) {
        action.payload.results = [
          ...state.searchActor.results,
          ...action.payload.results,
        ];
      }

      state.searchActor = action.payload;
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

    builder.addCase(fetchPersonDetails.pending, (state) => {
      state.isLoadingDetails = true;
    });
    builder.addCase(fetchPersonDetails.fulfilled, (state, action) => {
      state.isLoadingDetails = false;
      state.personDetails = action.payload;
    });
    builder.addCase(fetchPersonDetails.rejected, (state, action) => {
      console.log(action);
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
