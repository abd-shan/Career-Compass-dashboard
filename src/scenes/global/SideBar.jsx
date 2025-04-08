import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import { AdminPanelSettingsOutlined } from "@mui/icons-material";
import ContactOutlinedIcon from "@mui/icons-material/ContactPhoneOutlined";
import CalenderOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlinedIcon from "@mui/icons-material/HelpOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import LineChartOutlinedIcon from "@mui/icons-material/StackedLineChartOutlined";
import PieChartOutlinedIcon from "@mui/icons-material/PieChartOutlined";
import WorkOutlinedIcon from "@mui/icons-material/WorkOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import FactoryOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import AddBoxIcon from "@mui/icons-material/AddBox";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswerOutlined";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import { token } from "../../Theme";
import { useEffect, useState } from "react";
import { MenuItem, Menu, Sidebar } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import api from '../../api/Api';
import { useQuery } from "@tanstack/react-query";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = token(theme.palette.mode);
  const [hovered, setHovered] = useState(false);

  const handleMenuItemHover = (isHovering) => {
    setHovered(isHovering);
  };

  return (
    <Link to={to} style={{ textDecoration: 'none', color: 'inherit' }}>
      <MenuItem
        style={{
          padding: "5px 35px 5px 20px",
          backgroundColor: hovered ? colors.primary[500] : colors.primary[600],
          color: selected === title ? colors.greenAccent[500] : colors.grey[100],
          cursor: "pointer"
        }}
        onMouseEnter={() => handleMenuItemHover(true)}
        onMouseLeave={() => handleMenuItemHover(false)}
        onClick={() => setSelected(title)}
        icon={icon}
      >
        <Typography>{title}</Typography>
      </MenuItem>
    </Link>
  );
};

const SideBar = ({ toggleSidebar }) => {
  const theme = useTheme();
  const colors = token(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const [manager, setManager] = useState(false);

  const handleCollapse = () => {
    setIsCollapsed(!isCollapsed);
    toggleSidebar();
  };

  const fetchData = async () => {
    try {
      const response = await api.get('superAdmin/getMyInfo');
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return {};  // في حالة حدوث خطأ، تعيين بيانات افتراضية
    }
  };

  const { data: profile = {} } = useQuery({
    queryKey: ['profile'],
    queryFn: fetchData,
    onSuccess: (data) => {
      setManager(data.manager === 1);
    }
  });

  useEffect(() => {
    if (profile && typeof profile.manager !== 'undefined') {
      setManager(profile.manager === 1);
    }
  }, [profile]);

  console.log("Manager status: " + manager);

  return (
    <Box>
      <Sidebar collapsed={isCollapsed}
        sx={{
          height: "140vh",
          backgroundColor: `${colors.primary[600]}`
        }}
      >
        <Menu iconShape="square"
          style={{ backgroundColor: `${colors.primary[600]}` }}
          sx={{ padding: "10px 0 10px 0" }}
        >
          <MenuItem
            sx={{ padding: "30px 0 50px 0" }}
            onClick={handleCollapse}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              backgroundColor: colors.primary[600],
              margin: "0px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                sx={{
                  backgroundColor: `${colors.primary[600]}`
                }}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="25px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  ADMINS
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="5px" sx={{ padding: "10px 0 10px 0", backgroundColor: `${colors.primary[600]}` }} >
              <Box textAlign="center">
                <Typography
                  variant="h3"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  {profile.name}
                </Typography>
                <Typography
                  variant="h5"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  {profile.email}
                </Typography>
                <Typography variant="p" color={colors.greenAccent[700]}>
                  {profile.manager ? "Manager" : "Admin"}
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"} sx={{ backgroundColor: colors.primary[600], height: "100%" }}>
            <Item
              title="Dashboard"
              to="/home/dashboard"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Divider />

            <Item
              title="Requests"
              to="/home/requests"
              icon={<AddCircleOutlineIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Divider />

            <Item
              title="Jobs"
              to="/home/jobs"
              icon={<WorkOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Divider />

            <Item
              title="Companies"
              to="/home/companies"
              icon={<FactoryOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Divider />

            <Item
              title="Employees"
              to="/home/employees"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Divider />

            <Item
              title="Add static"
              to="/home/add-category"
              icon={<AddBoxIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Divider />

            <Item
              title="Add exam"
              to="/home/add-exam"
              icon={<QuestionAnswerIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Divider />

            <Item
              title="Our team"
              to="/home/team"
              icon={<ContactsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Divider />

            <Item
              title="Calendar"
              to="/home/calendar"
              icon={<CalenderOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Divider />

            <Item
              title="pie"
              to="/home/pie"
              icon={<PieChartOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Divider />

            {/* <Item
              title="line"
              to="/home/line"
              icon={<LineChartOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Divider /> */}

            <Item
              title="bar Chart"
              to="/home/bar"
              icon={<BarChartOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            {profile.manager && (
              <>
                <Divider />
                <Item
                  title="Add Admin"
                  to="/home/newAdmin"
                  icon={<AdminPanelSettingsOutlined />}
                  selected={selected}
                  setSelected={setSelected}
                />
              </>
            )}
            <Divider />

            <Item
              title="Notifications"
              to="/home/notification"
              icon={<HelpOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </Sidebar>
    </Box>
  );
};

export default SideBar;
