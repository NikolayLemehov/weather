import { Box, useTheme } from "@mui/material";
import { Area, AreaChart, LabelList, XAxis, YAxis } from "recharts";

const chartData: Array<{ date: string; pv: number }> = [
  { date: "01.01", pv: 24 },
  { date: "02.01", pv: 23 },
  { date: "03.01", pv: 58 },
  { date: "04.01", pv: 39 },
  { date: "05.01", pv: 48 },
  { date: "06.01", pv: 38 },
  { date: "07.01", pv: 43 },
];

export const TemperatureChart = () => {
  const { palette: p } = useTheme();

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
      <AreaChart width={310} height={80} data={chartData} margin={{ top: 15, right: 10, left: -50, bottom: 0 }}>
        <defs>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="15%" stopColor={p.warm.graph} stopOpacity={0.8} />
            <stop offset="100%" stopColor={p.warm.graph} stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="date" name="Time" dy={-5} />
        <YAxis name="Time" tickCount={0} />
        <Area type="monotone" dataKey="pv" stroke={p.warm.graph} fillOpacity={1} fill="url(#colorPv)">
          <LabelList dataKey="pv" position="top" />
        </Area>
      </AreaChart>
    </Box>
  );
};
