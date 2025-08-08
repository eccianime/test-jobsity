import { configureStore } from "@reduxjs/toolkit";
import { episodesApi } from "./services/episodes";
import { showsApi } from "./services/shows";

export const store = configureStore({
  reducer: {
    [showsApi.reducerPath]: showsApi.reducer,
    [episodesApi.reducerPath]: episodesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(showsApi.middleware, episodesApi.middleware),
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
