import { Box, useTheme } from "@mui/material";
import { Area, AreaChart, LabelList, XAxis, YAxis } from "recharts";
import { useSelector } from "react-redux";

import { selectIsWarmWeather } from "@/components/WeatherCard/weather.selectors.ts";

type ChartDataItem = {
  date: string;
  pv: number;
};
type Props = { data: ChartDataItem[] };

export const TemperatureChart = ({ data }: Props) => {
  const { palette: p } = useTheme();
  const isWarmWeather = useSelector(selectIsWarmWeather);
  const color = isWarmWeather ? p.warm.graph : p.cold.graph;

  return (
    <Box
      sx={{
        fontFamily: "Jost, Arial, sans-serif",
        "& .recharts-label": {
          fontSize: "6px",
          lineHeight: "8px",
          fill: p.grey[100],
        },
        "& .recharts-cartesian-axis-tick-value": {
          fontSize: "8px",
          lineHeight: "12px",
          fill: p.grey[100],
        },
        "& .recharts-cartesian-axis-line, & .recharts-cartesian-axis-tick-line": {
          display: "none",
        },
      }}
    >
      <AreaChart width={310} height={80} data={data} margin={{ top: 15, right: 10, left: -50, bottom: 0 }}>
        <defs>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="15%" stopColor={color} stopOpacity={0.8} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="date" name="Time" dy={-5} />
        <YAxis name="Time" tickCount={0} />
        <Area type="monotone" dataKey="pv" stroke={color} fillOpacity={1} fill="url(#colorPv)">
          <LabelList dataKey="pv" position="top" />
        </Area>
      </AreaChart>
    </Box>
  );
};
