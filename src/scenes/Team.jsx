import { useState, useEffect } from "react";
import { Box, Typography, useTheme, Skeleton } from "@mui/material";
import { token } from "../Theme";
import Header from "../components/Header";
import api from "../api/Api";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import { DataGrid } from "@mui/x-data-grid";

const Team = () => {
    const theme = useTheme();
    const colors = token(theme.palette.mode);
    const [admins, setAdmins] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('superAdmin/admins');
                if (response.status !== 200) {
                    throw new Error('Network response was not ok');
                }

                setAdmins(response.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const columns = [
        { field: "id", headerName: "ID" },
        {
            field: "name",
            headerName: "Name",
            flex: 1,
            cellClassName: "name-column--cell",
        },
        {
            field: "age",
            headerName: "Age",
            type: "number",
            headerAlign: "left",
            align: "left",
        },
        {
            field: "email",
            headerName: "Email",
            flex: 1,
        },
        {
            field: "location",
            headerName: "Location",
            flex: 1,
        },
        {
            field: "manager",
            headerName: "Access Level",
            flex: 1,
            renderCell: ({ row: { manager } }) => {
                return (
                    <Box
                        width="100%"
                        m="0 auto"
                        p="5px"
                        display="flex"
                        justifyContent="center"
                        backgroundColor={
                            manager ? colors.greenAccent[600] : colors.greenAccent[700]
                        }
                        borderRadius="4px"
                    >
                        {manager ? <AdminPanelSettingsOutlinedIcon /> : <SecurityOutlinedIcon />}
                        <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
                            {manager ? "manager" : "admin"}
                        </Typography>
                    </Box>
                );
            },
        },
    ];

    return (
        <Box m="20px">
            <Header title="TEAM" subtitle="Managing the Team Members" />
            <Box
                m="40px 0 0 0"
                height="75vh"
                sx={{
                    "& .MuiDataGrid-root": {
                        border: "none",
                    },
                    "& .MuiDataGrid-cell": {
                        borderBottom: "none",
                    },
                    "& .name-column--cell": {
                        color: colors.greenAccent[300],
                    },
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: colors.blueAccent[700],
                        borderBottom: "none",
                    },
                    "& .MuiDataGrid-virtualScroller": {
                        backgroundColor: colors.primary[400],
                    },
                    "& .MuiDataGrid-footerContainer": {
                        borderTop: "none",
                        backgroundColor: colors.blueAccent[700],
                    },
                    "& .MuiCheckbox-root": {
                        color: `${colors.greenAccent[200]} !important`,
                    },
                }}
            >
                {isLoading ? (
                    <Box><br></br>
                    <br></br>
                    <br></br>
                        <Skeleton variant="rectangular" width={"90%"} height={40} animation="wave" sx={{ mb: 1 }} />
                        <Skeleton variant="rectangular" width={"90%"} height={30} animation="wave" sx={{ mb: 1 }} />
                        <Skeleton variant="text" width={"90%"} height={30} animation="wave" sx={{ mb: 1 }} />
                        <Skeleton variant="text" width={"90%"} height={30} animation="wave" sx={{ mb: 1 }} />
                        <Skeleton variant="rounded" width={"90%"} height={30} animation="wave" />
                    </Box>
                ) : (
                    error ? (
                        <Typography color="error">{error}</Typography>
                    ) : (
                        <DataGrid checkboxSelection rows={admins} columns={columns} />
                    )
                )}
            </Box>
        </Box>
    );
};

export default Team;
