import { Button, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../actions';

const CharacterAction = ({ character }) => {
  const dispatch = useDispatch();

  const { actionWeight } = useSelector((st) => st.alignmentReducer);
  const { campaign } = useSelector((st) => st.alignmentReducer);
  const { reasonInput } = useSelector((st) => st.alignmentReducer);

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
      charId: character._id,
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

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography>
        {`${character.name.toUpperCase()} ${character.lastname.toUpperCase()}`}
      </Typography>
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
  );
};

export default CharacterAction;
