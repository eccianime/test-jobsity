import { axiosBaseQuery } from "@/config/axios";
import { SearchResultProps } from "@/types/schema";
import { createApi } from "@reduxjs/toolkit/query/react";

export const searchApi = createApi({
  reducerPath: "searchApi",
  baseQuery: axiosBaseQuery({
    baseUrl: process.env.EXPO_PUBLIC_API_URL as string,
  }),
  endpoints: (builder) => ({
    getShowsByTerm: builder.query<SearchResultProps[], { searchTerm: string }>({
      query: ({ searchTerm }) => ({
        url: `search/shows?q=${searchTerm}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetShowsByTermQuery } = searchApi;
