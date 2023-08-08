import { RouteProps } from "react-router-dom";
import Main from "../pages/Main";
import Genres from "../pages/Genres";
import ErrorPage from "../pages/Error";
import SingleMovie from "../pages/SingleMovie";
import SingleActor from "../pages/SingleActor";
import SearchPage from "../pages/SearchPage";
import Upcoming from "../pages/Upcoming";
import NowPlaying from "../pages/NowPlaying";
import TopRated from "../pages/TopRated";
import Favorites from "../pages/Favorites";
import Actors from "../pages/Actors";

export enum AppRoutes {
  MAIN = "/",
  SEARCH = "search",
  TOP_RATED = "rated",
  GENRES = "genres",
  SINGLE_MOVIE = "movie",
  SINGLE_ACTOR = "actor",
  UPCOMING = "upcoming",
  NOWPLAYNG = "nowplayng",
  FAVORITES = "favorites",
  ACTORS = "actors",
  //last
  NOT_FOUND = "error",
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: "/",
  [AppRoutes.SEARCH]: "/search",
  [AppRoutes.TOP_RATED]: "/rated",
  [AppRoutes.GENRES]: "/genres",
  [AppRoutes.SINGLE_MOVIE]: "/movie", //:id
  [AppRoutes.SINGLE_ACTOR]: "/actor",
  [AppRoutes.UPCOMING]: "/upcoming",
  [AppRoutes.NOWPLAYNG]: "/nowplayng",
  [AppRoutes.FAVORITES]: "/favorites",
  [AppRoutes.ACTORS]: "/actors",

  [AppRoutes.NOT_FOUND]: "*",
};

export const routeConfig: Record<AppRoutes, RouteProps> = {
  [AppRoutes.MAIN]: {
    path: "/",
    element: <Main />,
  },
  [AppRoutes.SEARCH]: {
    path: RoutePath.search,
    element: <SearchPage />,
  },
  [AppRoutes.TOP_RATED]: {
    path: RoutePath.rated,
    element: <TopRated />,
  },
  [AppRoutes.GENRES]: {
    path: RoutePath.genres,
    element: <Genres />,
  },
  [AppRoutes.UPCOMING]: {
    path: RoutePath.upcoming,
    element: <Upcoming />,
  },
  [AppRoutes.NOWPLAYNG]: {
    path: RoutePath.nowplayng,
    element: <NowPlaying />,
  },
  [AppRoutes.SINGLE_MOVIE]: {
    path: `${RoutePath.movie}/:id`,
    element: <SingleMovie />,
  },
  [AppRoutes.SINGLE_ACTOR]: {
    path: `${RoutePath.actor}/:id`,
    element: <SingleActor />,
  },
  [AppRoutes.FAVORITES]: {
    path: RoutePath.favorites,
    element: <Favorites />,
  },
  [AppRoutes.ACTORS]: {
    path: RoutePath.actors,
    element: <Actors />,
  },
  //last
  [AppRoutes.NOT_FOUND]: {
    path: RoutePath.error,
    element: <ErrorPage />,
  },
};
