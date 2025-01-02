import { MigrationManifest } from "redux-persist/es/types";
import { PersistedState } from "redux-persist";

const defaultPersistState = { version: 0, rehydrated: false };
export const migrations: MigrationManifest = {
  0: (state) => {
    return { ...state, _persist: state?._persist ?? defaultPersistState };
  },
  1: (state) => {
    if (!state) return { _persist: defaultPersistState };

    return {
      ...state,
      something: "something",
    };
  },
  2: (state) => {
    if (!state) return { _persist: defaultPersistState };

    return {
      ...state,
      something: "something",
    };
  },
  3: (state) => {
    const s = state as (NonNullable<PersistedState> & { cities: object }) | undefined;
    if (!s) return { _persist: defaultPersistState };

    return {
      ...s,
      cities: { ...s.cities, something: "something" },
    };
  },
  4: (state) => {
    const s = state as (NonNullable<PersistedState> & { cities: object }) | undefined;
    if (!s) return { _persist: defaultPersistState };

    return {
      ...s,
      cities: { ...s.cities, something: "" },
    };
  },
  5: (state) => {
    const s = state as (NonNullable<PersistedState> & { cities: { something: unknown } }) | undefined;
    if (!s) return { _persist: defaultPersistState };

    delete s.cities.something;

    return s;
  },
  6: (state) => {
    const s = state as
      | (NonNullable<PersistedState> & { cities: { citiesMap: Record<string, { isAddedByGeoLocation: boolean }> } })
      | undefined;
    if (!s) return { _persist: defaultPersistState };
    for (const city of Object.values(s.cities.citiesMap)) {
      city.isAddedByGeoLocation = false;
    }

    return s;
  },
};
