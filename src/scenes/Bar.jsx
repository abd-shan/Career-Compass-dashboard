import { Box } from "@mui/material";
import Header from "../components/Header";
import BarChart from "../components/BarChart";

const Bar = () => {
  return (
    <Box >
      <Header title="Employees" subtitle="Simple Bar Chart for numbers of employees in evey zone" />
      <Box height="75vh">
        <BarChart />
      </Box>
    </Box>
  );
};

export default Bar;
