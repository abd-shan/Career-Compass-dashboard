import { Box, useTheme } from "@mui/material";
import GeoChart from "../components/GeoChart";
import Header from "../components/Header";
import { token } from "../Theme";

const Geography = () => {
  const theme = useTheme();
  const colors = token(theme.palette.mode);
  return (
    <Box m="20px">
      <Header title="Geography" subtitle="Simple Geography Chart" />

      <Box
        height="75vh"
        border={`1px solid ${colors.grey[100]}`}
        borderRadius="4px"
      >
        <GeoChart />
      </Box>
    </Box>
  );
};

export default Geography;
