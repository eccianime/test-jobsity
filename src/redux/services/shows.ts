import { axiosBaseQuery } from "@/config/axios";
import { ShowProps } from "@/types/schema";
import { createApi } from "@reduxjs/toolkit/query/react";

export const showsApi = createApi({
  reducerPath: "showsApi",
  baseQuery: axiosBaseQuery({
    baseUrl: process.env.EXPO_PUBLIC_API_URL as string,
  }),
  endpoints: (builder) => ({
    getShows: builder.query<ShowProps[], { page: number }>({
      query: ({ page }) => ({
        url: `shows?page=${page}`,
        method: "GET",
      }),
    }),
    getShowDetails: builder.query<ShowProps, { showId: string }>({
      query: ({ showId }) => ({
        url: `shows/${showId}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetShowsQuery,
  useGetShowDetailsQuery,
  useLazyGetShowsQuery,
} = showsApi;
