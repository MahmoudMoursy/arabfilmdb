// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from './moviesSlice';
import userReducer from './userData';
import { api } from './apiSlice';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    movies: moviesReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
