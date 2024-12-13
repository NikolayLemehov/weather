import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { PersistConfig, persistReducer, persistStore, PersistedState } from "redux-persist";
import { openWeatherApi } from "@store/services/openWeatherApi.ts";
import { citiesReducer } from "@store/slices/cities.slice.ts";
import { migrations } from "@store/migration.ts";

const rootReducer = combineReducers({
  cities: citiesReducer,
  [openWeatherApi.reducerPath]: openWeatherApi.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const persistConfig: PersistConfig<RootState> = {
  key: "root",
  storage,
  whitelist: ["cities"],
  version: 5,
  migrate: (state: PersistedState, currentVersion: number) => {
    if (!state) return Promise.resolve(undefined);

    let migratedState = { ...state };

    const configVersion = persistConfig?.version ?? 0;
    for (let i = currentVersion; i <= configVersion; i++) {
      const migration = migrations[i];
      if (!migration) break;
      migratedState = migration(migratedState) as NonNullable<PersistedState>;
    }

    return Promise.resolve(migratedState);
  },
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
