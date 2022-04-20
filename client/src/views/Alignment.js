import { Box, Grid, Toolbar } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../actions';
import ActionHistory from '../components/Alignment/ActionHistory';
import ActionHistoryDialog from '../components/Alignment/ActionHistoryDialog';
import ActionWeight from '../components/Alignment/ActionWeight';
import AlignmentActions from '../components/Alignment/AlignmentActions';
import Canvas from '../components/Alignment/Canvas';
import CharacterAction from '../components/Alignment/CharacterAction';
import ReasonInput from '../components/Alignment/ReasonInput';
import TopBar from '../components/Alignment/TopBar';

const Alignment = () => {
  const dispatch = useDispatch();

  const characters = useSelector((st) => st.alignmentReducer.characters);
  const campaign = useSelector((st) => st.generalReducer.selectedCampaign);
  const isDm = useSelector((st) => st.userReducer.dm);
  const isAdmin = useSelector((st) => st.userReducer.admin);

  useEffect(() => {
    if (campaign && campaign.label !== null) {
      dispatch(actions.getCharactersByCampaign(campaign.id));
    }
  }, [campaign, dispatch]);

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Toolbar />
      <TopBar />
      {campaign && campaign.label !== null ? (
        <>
          <Canvas />
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                {isDm || isAdmin ? (
                  <>
                    <ActionWeight />
                    <ReasonInput />
                  </>
                ) : null}
                <ActionHistory />
              </Grid>
              {isDm || isAdmin ? (
                <>
                  <Grid item xs={3}>
                    <Box sx={{ flexGrow: 1 }}>
                      {characters &&
                        characters
                          .sort((a, b) => {
                            return a.name.localeCompare(b.name);
                          })
                          .map((char) => (
                            <Grid key={char._id} item xs={6}>
                              <CharacterAction key={char.name} character={char} />
                            </Grid>
                          ))}
                    </Box>
                  </Grid>
                  <Grid item xs={3}>
                    <AlignmentActions />
                  </Grid>
                </>
              ) : null}
            </Grid>
          </Box>
          <ActionHistoryDialog />
        </>
      ) : null}
    </Box>
  );
};

export default Alignment;
