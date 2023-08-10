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
import { lazy } from "react";

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

const MainPage = lazy(() => import("../pages/Main"));
const Search = lazy(() => import("../pages/SearchPage"));
const SingleActorPage = lazy(() => import("../pages/SingleActor"));
const SingleMoviePage = lazy(() => import("../pages/SingleMovie"));
const UpcomingPage = lazy(() => import("../pages/Upcoming"));
const NowPlayingPage = lazy(() => import("../pages/NowPlaying"));
const TopRatedPage = lazy(() => import("../pages/TopRated"));
const ActorsPage = lazy(() => import("../pages/Actors"));

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
    element: <MainPage />,
  },
  [AppRoutes.SEARCH]: {
    path: RoutePath.search,
    element: <Search />,
  },
  [AppRoutes.TOP_RATED]: {
    path: RoutePath.rated,
    element: <TopRatedPage />,
  },
  [AppRoutes.GENRES]: {
    path: RoutePath.genres,
    element: <Genres />,
  },
  [AppRoutes.UPCOMING]: {
    path: RoutePath.upcoming,
    element: <UpcomingPage />,
  },
  [AppRoutes.NOWPLAYNG]: {
    path: RoutePath.nowplayng,
    element: <NowPlayingPage />,
  },
  [AppRoutes.SINGLE_MOVIE]: {
    path: `${RoutePath.movie}/:id`,
    element: <SingleMoviePage />,
  },
  [AppRoutes.SINGLE_ACTOR]: {
    path: `${RoutePath.actor}/:id`,
    element: <SingleActorPage />,
  },
  [AppRoutes.FAVORITES]: {
    path: RoutePath.favorites,
    element: <Favorites />,
  },
  [AppRoutes.ACTORS]: {
    path: RoutePath.actors,
    element: <ActorsPage />,
  },
  //last
  [AppRoutes.NOT_FOUND]: {
    path: RoutePath.error,
    element: <ErrorPage />,
  },
};
