import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { PersistConfig, persistReducer, persistStore } from "redux-persist";
import { openWeatherApi } from "@store/services/openWeatherApi.ts";
import { citiesReducer } from "@store/slices/cities.slice.ts";

const rootReducer = combineReducers({
  cities: citiesReducer,
  [openWeatherApi.reducerPath]: openWeatherApi.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const persistConfig: PersistConfig<RootState> = {
  key: "root",
  storage,
  whitelist: ["cities"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(openWeatherApi.middleware),
});

const persistor = persistStore(store);

export { store, persistor };
export type AppDispatch = typeof store.dispatch;
