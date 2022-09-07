import { Grid, List, ListItem, ListItemAvatar, ListItemText, Toolbar } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect } from 'react';
import mapLocations from '../util/mapLocations';

const Map = () => {
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

    mapLocations.forEach((el) => {
      // eslint-disable-next-line no-undef
      const marker = L.marker(el.position, {
        // eslint-disable-next-line no-undef
        icon: L.icon({
          iconUrl: `/img/marker${el.marker}.png`,
          iconSize: [25, 40],
          iconAnchor: [12.5, 40],
          popupAnchor: [2, -22],
        }),
      }).addTo(map);
      marker.bindPopup(`<b>${el.name}</b><br>${el.description}`);
    });

    // -- Path --

    const latlngs = [
      mapLocations[4].position,
      mapLocations[5].position,
      mapLocations[6].position,
      mapLocations[7].position,
      mapLocations[8].position,
    ];

    // eslint-disable-next-line no-undef
    L.polyline(latlngs, { color: '#4380c2' }).addTo(map);

    // -- Event handlers --

    const onMapClick = (e) => {
      console.info('Position: ' + e.latlng);
    };

    map.on('click', onMapClick);
  }, [mapLocations]);

  const focusMap = (position) => {
    map.flyTo(position);
  };

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Toolbar />

      <div id="map" style={{ height: '70vh' }}></div>

      <Grid container sx={{ justifyContent: 'space-between' }}>
        <Grid item>
          <List>
            {mapLocations.map((el) => (
              <ListItem alignItems="flex-start" key={el.name}>
                <ListItemAvatar style={{ cursor: 'pointer' }} onClick={() => focusMap(el.position)}>
                  <img src={`/img/marker${el.marker}.png`} alt="marker" style={{ width: '25px' }} />
                </ListItemAvatar>
                <ListItemText
                  primary={el.dateVisited ? `${el.name} (${el?.dateVisited})` : el.name}
                  secondary={el.description}
                />
              </ListItem>
            ))}
          </List>
        </Grid>
        <Grid item sx={{ mt: 2 }}>
          Red = lore, blue = visited, yellow = next destination
        </Grid>
      </Grid>
    </Box>
  );
};

export default Map;
