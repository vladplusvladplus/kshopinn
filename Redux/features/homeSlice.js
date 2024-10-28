import { createSlice } from '@reduxjs/toolkit';
import { fetchHomeData } from '../actions/homeActions';

const initialState = {
  homeData: null,
};

export const homeSlice = createSlice({
  name: 'homeData',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchHomeData.fulfilled, (state, action) => {
      state.homeData = action.payload;
    });
  },
});

export const { homeData } = homeSlice.actions;
