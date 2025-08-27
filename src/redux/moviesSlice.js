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

// Async thunk to fetch average ratings for all works
export const fetchAverageRatings = createAsyncThunk(
  'movies/fetchAverageRatings',
  async (workIds) => {
    const ratingsPromises = workIds.map(async (workId) => {
      try {
        const response = await axiosInstance.get(`/ratings/average/${workId}`);
        return { workId, rating: response.data };
      } catch (error) {
        console.error(`Error fetching rating for work ${workId}:`, error);
        return { workId, rating: { average: 0, count: 0 } };
      }
    });
    
    const ratings = await Promise.all(ratingsPromises);
    return ratings;
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
    ratings: {}, // Store ratings data
    ratingsLoading: false,
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
      // Fetch average ratings
      .addCase(fetchAverageRatings.pending, (state) => {
        state.ratingsLoading = true;
      })
      .addCase(fetchAverageRatings.fulfilled, (state, action) => {
        state.ratingsLoading = false;
        // Convert array to object for easier access
        action.payload.forEach(({ workId, rating }) => {
          state.ratings[workId] = rating;
        });
      })
      .addCase(fetchAverageRatings.rejected, (state, action) => {
        state.ratingsLoading = false;
        console.error('Error fetching ratings:', action.error.message);
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
