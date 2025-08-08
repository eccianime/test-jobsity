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
    getEpisodeDetails: builder.query<EpisodeProps, { episodeId: string }>({
      query: ({ episodeId }) => ({
        url: `episodes/${episodeId}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetEpisodesListQuery, useGetEpisodeDetailsQuery } =
  episodesApi;
