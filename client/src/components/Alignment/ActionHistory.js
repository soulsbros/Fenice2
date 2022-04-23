import { Button } from '@mui/material';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import * as actions from '../../actions';

const ActionHistory = () => {
  const dispatch = useDispatch();

  const setShowActionHistory = useCallback(
    (data) => {
      dispatch(actions.setShowActionHistory(data));
    },
    [dispatch],
  );
  return (
    <Button variant="outlined" sx={{ margin: 1 }} onClick={() => setShowActionHistory(true)}>
      {' '}
      Actions history
    </Button>
  );
};

export default ActionHistory;
