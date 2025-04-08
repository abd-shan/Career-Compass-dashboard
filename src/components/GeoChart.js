import React from 'react';
import { Box, useTheme } from '@mui/material';
import { GeoJSON, MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { geoFeatures } from '../data/mockGeoFeatures';
import { token } from '../Theme';

const GeoChart = ({ isDashboard }) => {
  const theme = useTheme();
  const colors = token(theme.palette.mode) ;

  const mapStyle = {
    width: '100%',
    height: '100%',
    borderRadius: '10px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.50)',
    border: `1px solid ${colors ? colors.primary[500] : 'grey'}`,
  };

  return (
    <Box sx={{ ...mapStyle }}>
      <MapContainer
        center={[34.8, 38]}
        zoom={7}
        scrollWheelZoom={false}
        style={{ height: '100%', borderRadius: '10px' }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <GeoJSON
          data={geoFeatures}
          style={() => ({
            color: colors ? colors.greenAccent[500] : 'blue',
            weight: 1,
            fillColor: colors ? colors.primary[300] : 'transparent',
            fillOpacity: 0.5,
          })}
        />
      </MapContainer>
    </Box>
  );
};

export default GeoChart;
