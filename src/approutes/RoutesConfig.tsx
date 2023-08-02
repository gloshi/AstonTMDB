import { RouteProps } from "react-router-dom";
import Main from "../pages/Main";
import Search from "../components/Search";
import Ranking from "../pages/Ranking";
import Genres from "../pages/Genres";
import ErrorPage from "../pages/Error";
import SingleMovie from "../pages/SingleMovie";
import SingleActor from "../pages/SingleActor";
import SearchPage from "../pages/SearchPage";

export enum AppRoutes {
  MAIN = "/",
  SEARCH = "search",
  TOP_RATED = "rated",
  GENRES = "genres",
  SINGLE_MOVIE = "movie",
  SINGLE_ACTOR = "actor",
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
    element: <Ranking />,
  },
  [AppRoutes.GENRES]: {
    path: RoutePath.genres,
    element: <Genres />,
  },
  [AppRoutes.SINGLE_MOVIE]: {
    path: `${RoutePath.movie}/:id`,
    element: <SingleMovie />,
  },
  [AppRoutes.SINGLE_ACTOR]: {
    path: `${RoutePath.actor}/:id`,
    element: <SingleActor />,
  },
  //last
  [AppRoutes.NOT_FOUND]: {
    path: RoutePath.error,
    element: <ErrorPage />,
  },
};
