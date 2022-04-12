import { Box, Grid, Toolbar } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../actions';
import ActionWeight from '../components/Alignment/ActionWeight';
import Canvas from '../components/Alignment/Canvas';
import CharacterAction from '../components/Alignment/CharacterAction';
import ReasonInput from '../components/Alignment/ReasonInput';
import TopBar from '../components/Alignment/TopBar';

const Alignment = () => {
  const dispatch = useDispatch();

  const characters = useSelector((st) => st.alignmentReducer.characters);
  const campaign = useSelector((st) => st.generalReducer.selectedCampaign);

  useEffect(() => {
    if (campaign && campaign.label !== null) {
      dispatch(actions.getCharactersByCampaign(campaign.id));
    }
  }, [campaign, dispatch]);

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Toolbar />
      <TopBar />
      {campaign && campaign.label !== null ? <Canvas /> : null}
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <ActionWeight />
            <ReasonInput />
          </Grid>
          <Grid item xs={8}>
            {campaign && campaign.label !== null ? (
              <>
                {characters &&
                  characters
                    .sort((a, b) => {
                      return a.name.localeCompare(b.name);
                    })
                    .map((char) => <CharacterAction key={char.name} character={char} />)}
              </>
            ) : null}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Alignment;
