import { useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { token } from "../Theme";
import { useQuery } from "@tanstack/react-query";
import api from '../api/Api';

const BarChart = ({ isDashboard = false }) => {
  const theme = useTheme();
  const colors = token(theme.palette.mode);

  // Fetch data from the API
  const { data: apiData, isLoading } = useQuery({
    queryKey: ['employeeCountByGovernorate'],
    queryFn: async () => {
      const response = await api.get('superAdmin/countEmployeesByGovernorate');
      return response.data;
    },
  });

  // Transform API data into the format required by the bar chart
  const chartData = apiData ? Object.keys(apiData).map((key) => ({
    governorate: key,
    count: apiData[key],
  })) : [];

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <ResponsiveBar
      data={chartData}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: colors.grey[100],
            },
          },
          legend: {
            text: {
              fill: colors.grey[100],
            },
          },
          ticks: {
            line: {
              stroke: colors.grey[100],
              strokeWidth: 1,
            },
            text: {
              fill: colors.grey[100],
            },
          },
        },
        legends: {
          text: {
            fill: colors.grey[100],
          },
        },
      }}
      keys={["count"]}
      indexBy="governorate"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={{ scheme: "nivo" }}
      borderColor={{
        from: "color",
        modifiers: [["darker", "1.6"]],
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "Governorate",
        legendPosition: "middle",
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "Number of Employees",
        legendPosition: "middle",
        legendOffset: -40,
        tickValues: [0, 1, 2, 3, 4, 5],
      }}
      enableLabel={false}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      legends={[
        {
          dataFrom: "keys",
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: "left-to-right",
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: "hover",
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      role="application"
      barAriaLabel={function (e) {
        return e.id + ": " + e.formattedValue + " in governorate: " + e.indexValue;
      }}
    />
  );
};

export default BarChart;
