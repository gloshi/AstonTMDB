import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { useAxios } from '../../../hooks/useAxios';

export interface IActor {
    gender: number;
    id: number;
    name: string;
    profile_path: string;
}
export interface IActorsState {
    isLoading: boolean
    popular: {
      actors: Record<number, IActor[]>;
      total_pages: number;
    };
}
const initialState:IActorsState = {
    isLoading: false,
    popular: {
        actors: {},
        total_pages: 0,
      },
   
}
export type ActorsType = Array<IActor>;

export type QueryType = {
  page: number;
  search?: string;
};
export const fetchActors = createAsyncThunk(
    'actors/fetchActors',
    async (data: any) => {
      const { page } = data;
      const res = await useAxios.get(`/person/popular?&page=${page}`);
      const actors: ActorsType = res.data.results.map((actor: IActor) => ({
        gender: actor.gender,
        id: actor.id,
        name: actor.name,
        profile_path: actor.profile_path,
      }));
      const total_pages: number = res.data.total_pages;
      return { page, actors, total_pages };
    }
  );

export const actorSlice = createSlice({
  name: 'actors',
  initialState,
 reducers:{},
  extraReducers: (builder) => {
    builder.addCase(fetchActors.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchActors.fulfilled, (state, action) => {
      state.isLoading = false;
      state.popular.actors = action.payload;
    });

}})


export default actorSlice.reducer