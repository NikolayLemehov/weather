const getEnvKey = (key: string) => import.meta.env[key] as string;
export const envKey = {
  VITE_WEATHER_API_KEY: getEnvKey("VITE_WEATHER_API_KEY"),
} as const satisfies Record<string, string>;
