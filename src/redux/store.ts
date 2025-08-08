import { configureStore } from "@reduxjs/toolkit";
import { episodesApi } from "./services/episodes";
import { searchApi } from "./services/search";
import { showsApi } from "./services/shows";

export const store = configureStore({
  reducer: {
    [showsApi.reducerPath]: showsApi.reducer,
    [episodesApi.reducerPath]: episodesApi.reducer,
    [searchApi.reducerPath]: searchApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      showsApi.middleware,
      episodesApi.middleware,
      searchApi.middleware,
    ),
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
