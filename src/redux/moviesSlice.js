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
    // Limit to first 20 items to avoid too many requests
    const limitedIds = workIds.slice(0, 20);

    const ratingsPromises = limitedIds.map(async (workId) => {
      try {
        const response = await axiosInstance.get(`/ratings/average/${workId}`);
        return { workId, rating: response.data };
      } catch (error) {
        return { workId, rating: { average: 0, count: 0 } };
      }
    });

    // Use allSettled to not fail if one request fails
    const results = await Promise.allSettled(ratingsPromises);
    return results
      .filter(result => result.status === 'fulfilled')
      .map(result => result.value);
  }
);

export const fetchItemById = createAsyncThunk(
  'movies/fetchItemById',
  async (id) => {
    const response = await axiosInstance.get(`/works/public/${id}`); // Use public endpoint
    return response.data;
  }
);



// Fetch all movies
export const fetchFilms = createAsyncThunk(
  'movies/fetchFilms',
  async () => {
    const response = await axiosInstance.get('/works/movies');
    return response.data;
  }
);

// Fetch all series
export const fetchSeries = createAsyncThunk(
  'movies/fetchSeries',
  async () => {
    const response = await axiosInstance.get('/works/series');
    return response.data;
  }
);

// Fetch latest movies
export const fetchLatestMovies = createAsyncThunk(
  'movies/fetchLatestMovies',
  async () => {
    const response = await axiosInstance.get('/works/movies/latest');
    return response.data;
  }
);

// Fetch latest series
export const fetchLatestSeries = createAsyncThunk(
  'movies/fetchLatestSeries',
  async () => {
    const response = await axiosInstance.get('/works/series/latest');
    return response.data;
  }
);

const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    allMovies: [],
    films: [],
    series: [],
    latestMovies: [],
    latestSeries: [],
    selectedItem: null,
    loading: false,
    filmsLoading: false,
    seriesLoading: false,
    latestMoviesLoading: false,
    latestSeriesLoading: false,
    error: null,
    ratings: {},
    ratingsLoading: false,
  },
  reducers: {},
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

      // Fetch Films
      .addCase(fetchFilms.pending, (state) => {
        state.filmsLoading = true;
        state.error = null;
      })
      .addCase(fetchFilms.fulfilled, (state, action) => {
        state.filmsLoading = false;
        state.films = action.payload;
      })
      .addCase(fetchFilms.rejected, (state, action) => {
        state.filmsLoading = false;
        state.error = action.error.message;
      })

      // Fetch Series
      .addCase(fetchSeries.pending, (state) => {
        state.seriesLoading = true;
        state.error = null;
      })
      .addCase(fetchSeries.fulfilled, (state, action) => {
        state.seriesLoading = false;
        state.series = action.payload;
      })
      .addCase(fetchSeries.rejected, (state, action) => {
        state.seriesLoading = false;
        state.error = action.error.message;
      })

      // Fetch Latest Movies
      .addCase(fetchLatestMovies.pending, (state) => {
        state.latestMoviesLoading = true;
        state.error = null;
      })
      .addCase(fetchLatestMovies.fulfilled, (state, action) => {
        state.latestMoviesLoading = false;
        state.latestMovies = action.payload;
      })
      .addCase(fetchLatestMovies.rejected, (state, action) => {
        state.latestMoviesLoading = false;
        state.error = action.error.message;
      })

      // Fetch Latest Series
      .addCase(fetchLatestSeries.pending, (state) => {
        state.latestSeriesLoading = true;
        state.error = null;
      })
      .addCase(fetchLatestSeries.fulfilled, (state, action) => {
        state.latestSeriesLoading = false;
        state.latestSeries = action.payload;
      })
      .addCase(fetchLatestSeries.rejected, (state, action) => {
        state.latestSeriesLoading = false;
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
      })
  },
});

export default moviesSlice.reducer;
