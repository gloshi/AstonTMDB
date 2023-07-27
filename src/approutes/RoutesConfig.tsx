import { RouteProps } from "react-router-dom"
import Main from "../pages/Main"
import Search from "../components/Search"
import Ranking from "../pages/Ranking"
import Genres from "../pages/Genres"
import ErrorPage from "../pages/Error"


export enum AppRoutes {
    MAIN = '/',
    SEARCH = 'search',
    TOP_RATED = "rated",
    GENRES = 'genres',

    //last
    NOT_FOUND = 'error'
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.SEARCH]: '/search',
    [AppRoutes.TOP_RATED]: '/rated',
    [AppRoutes.GENRES]: '/genres',

    [AppRoutes.NOT_FOUND]: '*',
}


export const routeConfig: Record<AppRoutes, RouteProps> = {
    [AppRoutes.MAIN]: {
        path: '/',
        element: <Main />
    },
    [AppRoutes.SEARCH]: {
        path: RoutePath.search,
        element: <Search />
    },
    [AppRoutes.TOP_RATED]: {
        path: RoutePath.rated,
        element: <Ranking />,
        
    },
    [AppRoutes.GENRES]: {
        path: RoutePath.genres,
        element: <Genres />,
        
    },
    [AppRoutes.NOT_FOUND]: {
        path: RoutePath.error,
        element: <ErrorPage />
    },


}