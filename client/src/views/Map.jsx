import {
  Card,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';
import React, { useEffect } from 'react';
import markerBlue from '../img/markerBlue.png';
import markerGreen from '../img/markerGreen.png';
import markerRed from '../img/markerRed.png';
import markerYellow from '../img/markerYellow.png';
import { futureItineraryPoints, itineraryPoints, mapLocations } from '../util/mapLocations';

const Map = () => {
  // Markers
  const markers = { Red: markerRed, Blue: markerBlue, Yellow: markerYellow, Green: markerGreen };

  let map;
  useEffect(() => {
    // -- Map object --

    // eslint-disable-next-line
    map = L.map('map').setView([47.428545, -7.69043], 5);
    const mapOptions = {
      tms: true,
      updateWhenIdle: false,
      updateInterval: 50,
      keepBuffer: 4,
      maxZoom: 9,
    };

    // -- Tiles and controls --

    // eslint-disable-next-line no-undef
    L.tileLayer('https://pathfinderwiki.com/maps/golarion-tile/tiles/{z}/{x}/{y}', {
      ...mapOptions,
      attribution:
        'Map data &copy; <a href="https://www.dungeonetics.com/golarion-geography">John Mechalas</a>, <a href="https://paizo.com/community/communityuse">Paizo CUP</a>',
    }).addTo(map);

    // eslint-disable-next-line no-undef
    L.tileLayer('https://pathfinderwiki.com/maps/golarion-tile/tiles-relief/{z}/{x}/{y}', {
      ...mapOptions,
      opacity: 0.15,
      maxNativeZoom: 6,
    }).addTo(map);

    // eslint-disable-next-line no-undef
    L.control
      .scale({
        position: 'topright',
        maxWidth: 100,
      })
      .addTo(map);

    // -- Locations --

    const fullLocationList = mapLocations.lore
      .concat(mapLocations.itinerary)
      .concat(mapLocations.futureItinerary);

    fullLocationList.forEach((el) => {
      // eslint-disable-next-line no-undef
      const marker = L.marker(el.position, {
        // eslint-disable-next-line no-undef
        icon: L.icon({
          iconUrl: `https://lafenice.soulsbros.ch/img/marker${el.marker}.png`,
          iconSize: [25, 40],
          iconAnchor: [12.5, 40],
          popupAnchor: [2, -22],
        }),
      }).addTo(map);
      marker.bindPopup(`<b>${el.name}</b><br>${el.description}`);
    });

    // -- Path --

    // eslint-disable-next-line no-undef
    L.polyline(itineraryPoints, { color: '#4380c2' }).addTo(map);

    // eslint-disable-next-line no-undef
    L.polyline(futureItineraryPoints, { color: '#ea881c' }).addTo(map);

    // -- Event handlers --

    const onMapClick = (e) => {
      console.info(`Position: [${e.latlng.lat}, ${e.latlng.lng}]`);
      navigator.clipboard.writeText(`[${e.latlng.lat}, ${e.latlng.lng}],`);
    };

    map.on('click', onMapClick);
  }, [mapLocations]);

  const focusMap = (position) => {
    map.flyTo(position);
  };

  return (
    <>
      <div id="map" style={{ height: '70vh' }}></div>

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

export default Map;
