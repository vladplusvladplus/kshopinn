import { createSlice } from '@reduxjs/toolkit';
import { setCookie } from 'cookies-next';

const initialState = {
  isVisible: false,
};

export const editSlice = createSlice({
  name: 'edit',
  initialState,
  reducers: {
    setIsVisible(state, action) {
      state.isVisible = action.payload;
    },
    toggleBlock(state) {
      state.isVisible = false;

      if (typeof window !== 'undefined') {
        setCookie('showBlock', 'false');
      }
    },
    toggleEdit(state) {
      state.isVisible = true;

      if (typeof window !== 'undefined') {
        setCookie('showBlock', 'true');
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase('HYDRATE', (state, action) => {
      return {
        ...state,
        ...action.payload.edit,
      };
    });
  },
});

export const { isVisible, setIsVisible, toggleBlock, toggleEdit } =
  editSlice.actions;

export const selectIsVisible = (state) => state.edit.isVisible;
