const getEnvKey = (key: string) => import.meta.env[key] as string;
export const envKey = {
  VITE_WEATHER_API_KEY: getEnvKey("VITE_WEATHER_API_KEY"),
} as const satisfies Record<string, string>;

export const styles = {
  shadow: { main: "0px 3px 6px #00000029" },
} as const;
