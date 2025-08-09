import { axiosBaseQuery } from "@/config/axios";
import { PeopleDetailedProps } from "@/types/schema";
import { createApi } from "@reduxjs/toolkit/query/react";

export const peopleApi = createApi({
  reducerPath: "peopleApi",
  baseQuery: axiosBaseQuery({
    baseUrl: process.env.EXPO_PUBLIC_API_URL as string,
  }),
  endpoints: (builder) => ({
    getPeopleDetails: builder.query<PeopleDetailedProps, { peopleId: string }>({
      query: ({ peopleId }) => ({
        url: `people/${peopleId}?embed=castcredits`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetPeopleDetailsQuery } = peopleApi;
