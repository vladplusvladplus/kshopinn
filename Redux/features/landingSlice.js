import { createSlice } from '@reduxjs/toolkit';
import { fetchLandingData } from '../actions/landingActions';

const initialState = {
  landingData: null,
  landingLoading: false,
  errorLanding: false,
};

export const landingSlice = createSlice({
  name: 'landing data',
  initialState,
  reducers: {
    resetLanding: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLandingData.pending, (state) => {
        state.landingLoading = true;
        state.errorLanding = false;
      })
      .addCase(fetchLandingData.fulfilled, (state, action) => {
        state.landingData = action.payload;
        state.landingLoading = false;
      })
      .addCase(fetchLandingData.rejected, (state, action) => {
        state.errorLanding = true;
        state.landingLoading = false;
      });
  },
});

export const { landingData, landingLoading, errorLanding, resetLanding } =
  landingSlice.actions;
