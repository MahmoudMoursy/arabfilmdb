// src/redux/moviesSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../api/axiosInstance';

// Async thunk to fetch movies
export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async () => {
    const response = await axiosInstance.get('/works/public');
    return response.data;
  }
);
export const fetchItemById = createAsyncThunk(
  'movies/fetchItemById',
  async (id) => {
    const response = await axiosInstance.get(`/works/${id}`); // عدّل المسار حسب الـ API
    return response.data;
  }
);
const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    allMovies: [],
    films: [],
    series: [],
    selectedItem: null, 
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
      })
      // case user id
       .addCase(fetchItemById.pending, (state) => {
          state.loading = true;
          state.error = null;
          state.selectedItem = null;
        })
        .addCase(fetchItemById.fulfilled, (state, action) => {
          state.loading = false;
          state.selectedItem = action.payload;
        })
        .addCase(fetchItemById.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
          state.selectedItem = null;
        });
  },
});

export default moviesSlice.reducer;
