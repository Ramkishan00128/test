import { createSlice } from '@reduxjs/toolkit'

export const createEventSlice = createSlice({
    name: 'event',
  initialState: {
    eventList: "",
    createEventResponse: "",
  },
  reducers: {
    setCreateEventResponse: (state, action) => {
      state.createEventResponse = action.payload;
    },
  },
    
})

export const { setCreateEventResponse } = createEventSlice.actions

export default createEventSlice.reducer