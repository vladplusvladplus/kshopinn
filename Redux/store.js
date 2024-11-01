import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { hireSlice } from './features/hireSlice';
import { contactSlice } from './features/contactSlice';
import { footerSlice } from './features/footerSlice';
import { aboutSlice } from './features/aboutSlice';
import { inner1Slice } from './features/innner1Slice';
import { inner2Slice } from './features/inner2Slice';
import { inner3Slice } from './features/inner3Slice';
import { caseStudySlice } from './features/caseStudySlice';
import { caseDetailSlice } from './features/caseDetailSlice';
import { landingSlice } from './features/landingSlice';
import { navbarSlice } from './features/navbarSlice';
import { blogSlice } from './features/blogSlice';
import { editSlice } from './features/editSlice';
import { errorSlice } from './features/errorSlice';
import { headerSlice } from './features/headerSlice';
import { ipSlice } from './features/ipSlice';
import { aboutUsSlice } from './features/aboutUsSlice';
import { homeSlice } from './features/homeSlice';

const makeStore = () =>
  configureStore({
    reducer: {
      hire: hireSlice.reducer,
      contact: contactSlice.reducer,
      footer: footerSlice.reducer,
      about: aboutSlice.reducer,
      inner1: inner1Slice.reducer,
      inner2: inner2Slice.reducer,
      inner3: inner3Slice.reducer,
      caseStudy: caseStudySlice.reducer,
      caseDetail: caseDetailSlice.reducer,
      landing: landingSlice.reducer,
      navbar: navbarSlice.reducer,
      blog: blogSlice.reducer,
      edit: editSlice.reducer,
      error: errorSlice.reducer,
      header: headerSlice.reducer,
      ip: ipSlice.reducer,
      aboutUs: aboutUsSlice.reducer,
      home: homeSlice.reducer,
    },
    devTools: process.env.NODE_ENV !== 'production', // Enable Redux DevTools in development
  });

// Create a wrapper to wrap your app with Redux
export const wrapper = createWrapper(makeStore);
