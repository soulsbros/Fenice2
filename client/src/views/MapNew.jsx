import {
  Card,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';
import React from 'react';
import markerBlue from '../img/markerBlue.png';
import markerGreen from '../img/markerGreen.png';
import markerRed from '../img/markerRed.png';
import markerYellow from '../img/markerYellow.png';
import { mapLocations } from '../util/mapLocations';

const MapNew = () => {
  // Markers
  const markers = { Red: markerRed, Blue: markerBlue, Yellow: markerYellow, Green: markerGreen };

  const baseUrl = 'https://pf-wikis.github.io/mapping/#location=6.91/';

  const focusMap = (position) => {
    document.getElementById('map').src = `${baseUrl}${position[0]}/${position[1]}`;
  };

  return (
    <>
      <iframe
        id="map"
        title="Map"
        src="https://pf-wikis.github.io/mapping"
        width="100%"
        height="50%"
      ></iframe>

      <Grid container sx={{ justifyContent: 'space-between' }}>
        <Grid item xs={6}>
          <Card sx={{ m: 2 }}>
            <Typography variant="h6" sx={{ p: 1 }}>
              Our itinerary
            </Typography>
            <List>
              {mapLocations.itinerary.concat(mapLocations.futureItinerary).map((el) => (
                <ListItem alignItems="flex-start" key={el.name}>
                  <ListItemAvatar
                    style={{ cursor: 'pointer' }}
                    onClick={() => focusMap(el.position)}
                  >
                    <img src={markers[el.marker]} alt="marker" style={{ width: '25px' }} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={el.dateVisited ? `${el.name} (${el?.dateVisited})` : el.name}
                    secondary={el.description}
                  />
                </ListItem>
              ))}
            </List>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card sx={{ m: 2 }}>
            <Typography variant="h6" sx={{ p: 1 }}>
              Lore locations
            </Typography>
            <List>
              {mapLocations.lore.map((el) => (
                <ListItem alignItems="flex-start" key={el.name}>
                  <ListItemAvatar
                    style={{ cursor: 'pointer' }}
                    onClick={() => focusMap(el.position)}
                  >
                    <img src={markers[el.marker]} alt="marker" style={{ width: '25px' }} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={el.dateVisited ? `${el.name} (${el?.dateVisited})` : el.name}
                    secondary={el.description}
                  />
                </ListItem>
              ))}
            </List>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default MapNew;
