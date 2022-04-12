import { Box, Button, Grid, Toolbar } from '@mui/material';
import React, { useCallback, useEffect } from 'react';
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
  const actionWeight = useSelector((st) => st.alignmentReducer.actionWeight);
  const reasonInput = useSelector((st) => st.alignmentReducer.reasonInput);
  const selectedChars = useSelector((st) => st.alignmentReducer.selectedChars);

  const addAction = useCallback(
    (data) => {
      dispatch(actions.addAction(data));
    },
    [dispatch],
  );

  const setReasonInput = useCallback(
    (data) => {
      dispatch(actions.setReasonInput(data));
    },
    [dispatch],
  );

  const handleClick = (actionType) => {
    let val = actionWeight;

    if (actionType === 'Good' || actionType === 'Lawful') {
      val = -actionWeight;
    }
    let action = {
      charsId: selectedChars,
      action: {
        type: actionType,
        timestamp: new Date(),
        reason: reasonInput,
        value: val,
      },
      campaign: campaign.id,
    };

    addAction(action);
    setReasonInput('');
  };

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
              <Grid item xs={4}>
                <ActionWeight />
                <ReasonInput />
              </Grid>
              <Grid item xs={4}>
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
              <Grid item xs={4}>
                <Box sx={{ flexGrow: 1 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Button variant="contained" onClick={() => handleClick('Lawful')}>
                        Lawful action
                      </Button>
                    </Grid>
                    <Grid item xs={6}>
                      <Button variant="contained" onClick={() => handleClick('Chaotic')}>
                        Chaotic action
                      </Button>
                    </Grid>
                    <Grid item xs={6}>
                      <Button variant="contained" onClick={() => handleClick('Good')}>
                        Good action
                      </Button>
                    </Grid>
                    <Grid item xs={6}>
                      <Button variant="contained" onClick={() => handleClick('Evil')}>
                        Evil action
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </>
      ) : null}
    </Box>
  );
};

export default Alignment;
