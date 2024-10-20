import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const testingApi = createApi({
  reducerPath: "testingApi",
  tagTypes: ["Testing"],
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com",
  }),
  endpoints: (builder) => ({
    getData: builder.query({
      query: (input) => `/${input}`,
      providesTags: ["Testing"],
    }),
  }),
});

export const { useLazyGetDataQuery } = testingApi;
