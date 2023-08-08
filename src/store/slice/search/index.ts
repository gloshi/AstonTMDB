import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface SeachProps {
  value: string
}

const initialState: SeachProps = {
    value: ''
}

export const searchSlice = createSlice({
  name: 'actors',
  initialState,
  reducers: {
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.value = action.payload
    },
  },
})

export const { setSearchValue} = searchSlice.actions

export default searchSlice.reducer

