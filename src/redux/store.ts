import { configureStore } from "@reduxjs/toolkit";
import { episodesApi } from "./services/episodes";
import { peopleApi } from "./services/people";
import { searchApi } from "./services/search";
import { showsApi } from "./services/shows";

export const store = configureStore({
  reducer: {
    [showsApi.reducerPath]: showsApi.reducer,
    [episodesApi.reducerPath]: episodesApi.reducer,
    [searchApi.reducerPath]: searchApi.reducer,
    [peopleApi.reducerPath]: peopleApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      showsApi.middleware,
      episodesApi.middleware,
      searchApi.middleware,
      peopleApi.middleware,
    ),
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
