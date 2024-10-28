import { createSlice } from '@reduxjs/toolkit';

import { fetchAboutUsData } from '../actions/aboutUsActions';

const initialState = {
  aboutUsData: null,
};

export const aboutUsSlice = createSlice({
  name: 'aboutUs',
  initialState,
  reducers: {
    resetAboutUs: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAboutUsData.fulfilled, (state, action) => {
      state.aboutUsData = action.payload;
    });
    builder.addDefaultCase((state, action) => {
      let additional = {};

      /* istanbul ignore next */
      if (action.payload && action.payload?.about) {
        additional = action.payload.about;
      }

      return { ...state, ...additional };
    });
  },
});

export const { aboutUsData, resetAboutUs } = aboutUsSlice.actions;
