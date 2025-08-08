import { axiosBaseQuery } from "@/config/axios";
import { EpisodeProps } from "@/types/schema";
import { createApi } from "@reduxjs/toolkit/query/react";

export const episodesApi = createApi({
  reducerPath: "episodesApi",
  baseQuery: axiosBaseQuery({
    baseUrl: process.env.EXPO_PUBLIC_API_URL as string,
  }),
  endpoints: (builder) => ({
    getEpisodesList: builder.query<EpisodeProps[], { showId: string }>({
      query: ({ showId }) => ({
        url: `shows/${showId}/episodes`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetEpisodesListQuery } = episodesApi;
