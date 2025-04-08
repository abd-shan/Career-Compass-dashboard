import { Typography, Box, useTheme, Divider } from "@mui/material";
import { token} from "../Theme";

const Header = ({ title, subtitle }) => {
  const theme = useTheme();
  const colors = token(theme.palette.mode);
  return (
    <Box mb="30px" sx={{
      padding:"10px 10px 10px 10px",
      m:"5px 5px 15px 5px"}}>
      <Typography
        variant="h2"
        color={colors.grey[100]}
        fontWeight="bold"
        sx={{ m: "0 0 5px 0" }}
      >
        {title}
      </Typography>
      <Typography variant="h3" color={colors.greenAccent[400]}>
        {subtitle}
      </Typography>
      <Divider/>
    </Box>
  );
};

export default Header;
