import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://arabfilmsserver.onrender.com/api',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      headers.set('Content-Type', 'application/json');
      return headers;
    }
  }),
  tagTypes: ['Works', 'Ratings'],
  endpoints: (builder) => ({
    getWorks: builder.query({
      query: () => '/works/public',
      providesTags: ['Works'],
    }),
    getWorkById: builder.query({
      query: (id) => `/works/public/${id}`,
      providesTags: (result, error, id) => [{ type: 'Works', id }],
    }),
    // Batch ratings endpoint (preferred if backend supports it)
    // Client-side batching using queryFn since backend batch endpoint is missing
    getRatingsForWorks: builder.query({
      async queryFn(ids, _queryApi, _extraOptions, fetchWithBQ) {
        if (!ids || ids.length === 0) return { data: {} };

        const promises = ids.map((id) => fetchWithBQ(`/ratings/average/${id}`));
        const results = await Promise.all(promises);

        const ratingsMap = {};
        results.forEach((result, index) => {
          if (result.data) {
            ratingsMap[ids[index]] = result.data;
          } else {
            // Handle error or empty response for individual items if needed
            ratingsMap[ids[index]] = { average: 0, count: 0 };
          }
        });

        return { data: ratingsMap };
      },
      providesTags: ['Ratings'],
    }),
    // Fallback single rating endpoint (RTK Query will cache/dedupe per id)
    getRating: builder.query({
      query: (id) => `/ratings/average/${id}`,
      providesTags: (result, error, id) => [{ type: 'Ratings', id }],
    }),
  }),
});

export const {
  useGetWorksQuery,
  useGetWorkByIdQuery,
  useGetRatingsForWorksQuery,
  useGetRatingQuery,
} = api;

export default api;
