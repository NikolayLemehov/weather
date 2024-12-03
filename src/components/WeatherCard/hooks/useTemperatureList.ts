import dayjs from "dayjs";
import { useMemo } from "react";
import { WeatherData } from "@common/types.ts";

type WeatherItem = WeatherData["list"][number];
type Grouped = Record<string, WeatherItem[]>;
type GroupedData = {
  data: Grouped;
  list: string[];
};
type ReturnItem = {
  date: string;
  pv: number;
};
const transformDate = (s: string) => dayjs(s).format("DD.MM");

export const useTemperatureList = (weatherData: WeatherData | null): ReturnItem[] =>
  useMemo(() => {
    const groupedData = weatherData?.list.reduce(
      (acc, it) => {
        const date = it.dt_txt.split(" ")[0];
        if (date === undefined) return acc;
        if (!acc.data[date]) {
          acc.data[date] = [];
          acc.list.push(date);
        }
        acc.data[date].push(it);

        return acc;
      },
      {
        data: {},
        list: [],
      } as GroupedData
    );
    const d = groupedData?.data;

    return (
      groupedData?.list.map((it: string): ReturnItem => {
        const kelvin =
          (d?.[it]?.reduce((acc: number, item: WeatherItem) => acc + item.main.temp, 0) ?? 0) / (d?.[it]?.length ?? 1);

        return {
          date: transformDate(it),
          pv: kelvin,
        };
      }) ?? []
    );
  }, [weatherData?.list]);
