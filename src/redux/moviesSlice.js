// src/redux/moviesSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../api/axiosInstance';

// Async thunk to fetch movies
export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async () => {
    const response = await axiosInstance.get('/works');
    return response.data;
  }
);

const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    allMovies: [],
    films: [],
    series: [],
    loading: false,
    error: null,
  },
  reducers: {
    // optional synchronous actions here if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.allMovies = action.payload;
        state.films = action.payload.filter(item => item.type === 'film');
        state.series = action.payload.filter(item => item.type === 'series');
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default moviesSlice.reducer;
