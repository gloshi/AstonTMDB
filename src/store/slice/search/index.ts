import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface SeachProps {
  value: string
}

const initialState: SeachProps = {
    value: ''
}

export const searchSlice = createSlice({
  name: 'value',
  initialState,
  reducers: {
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setSearchValue} = searchSlice.actions

export default searchSlice.reducer

