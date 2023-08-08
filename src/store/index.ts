import { configureStore } from '@reduxjs/toolkit'
import moviesReducer from './slice/movies'
import searchSlice from './slice/search/index'
import { actorSlice } from './slice/actors'

export const store = configureStore({
  reducer: {
    search: searchSlice, 
    movies: moviesReducer,
    //@ts-ignore
    actors: actorSlice
},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch