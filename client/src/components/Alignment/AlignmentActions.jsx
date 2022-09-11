import { Box, Button, Grid } from '@mui/material';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../actions';

const AlignmentActions = () => {
  const dispatch = useDispatch();

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

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container justifyContent="center" style={{ marginBottom: '10px' }}>
        <Grid item xs={6}>
          <Button variant="contained" onClick={() => handleClick('Good')} fullWidth>
            Good action
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={2} style={{ marginBottom: '10px' }}>
        <Grid item md={6}>
          <Button variant="contained" onClick={() => handleClick('Lawful')} fullWidth>
            Lawful action
          </Button>
        </Grid>
        <Grid item xs={6} sx={{ textAlign: 'right' }}>
          <Button variant="contained" onClick={() => handleClick('Chaotic')} fullWidth>
            Chaotic action
          </Button>
        </Grid>
      </Grid>
      <Grid container justifyContent="center">
        <Grid item xs={6} sx={{ textAlign: 'right' }}>
          <Button variant="contained" onClick={() => handleClick('Evil')} fullWidth>
            Evil action
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AlignmentActions;
