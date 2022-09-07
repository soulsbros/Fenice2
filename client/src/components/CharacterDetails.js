import { Card, Grid, ListItemText } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';

const CharacterDetails = ({ data }) => {
  const dispatch = useDispatch();

  const openDialog = () => {
    dispatch({
      type: 'SET_SELECTED_CHARACTER',
      payload: data,
    });

    dispatch({
      type: 'SET_DETAILS_DIALOG_OPEN',
      payload: true,
    });
  };

  return (
    <Grid item xs={4}>
      <Card sx={{ m: 2, p: '20px 50px', cursor: 'pointer' }} onClick={openDialog}>
        <img
          src="https://lafenice.soulsbros.ch/img/pg/106.jpg"
          alt="character"
          style={{
            maxWidth: '100%',
          }}
        />

        <Grid container justifyContent={'space-between'}>
          <Grid item>
            <ListItemText
              primary={<b>{`${data.name} ${data.lastname}`}</b>}
              secondary={'Character name'}
            />
          </Grid>
          <Grid item>
            <ListItemText
              primary={'Placeholders'}
              secondary={'Race'}
              sx={{ textAlign: 'center' }}
            />
          </Grid>
          <Grid item>
            <ListItemText
              primary={'Holder of places'}
              secondary={'Class'}
              sx={{ textAlign: 'center' }}
            />
          </Grid>
          <Grid item>
            <ListItemText
              primary={'Place Holder'}
              secondary={'Player name'}
              sx={{ textAlign: 'right' }}
            />
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
};

export default CharacterDetails;
