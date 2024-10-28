import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import qs from 'qs';

export const fetchHomeData = createAsyncThunk(
  'home/fetchData',
  async (_, { rejectWithValue }) => {
    const querytwo = qs.stringify(
      {
        populate: [
          'customer',
          'customer.logos',
          'how_we_work',
          'how_we_work.content_card',
          'Testimonials',
          'metaDescription',
          'Title',
          'faq',
          'Slider',
          'advantage',
          'support_section',
          'services',
          'video_section',
        ],
      },
      {
        encodeValuesOnly: true,
      }
    );

    const url = decodeURIComponent(
      `${process.env.NEXT_PUBLIC_mainurl}/api/homes?${querytwo}`
    );

    try {
      const response = await axios.get(url, {
        headers: { 'Content-Type': 'application/json' },
      });
      const data = response.data.data[0];
      if (data) {
        return {
          id: data.id,
          ...data.attributes,
          api: 'home',
        };
      }
      return rejectWithValue(error.response.data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
