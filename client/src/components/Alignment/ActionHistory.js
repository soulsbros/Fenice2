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
    <Button variant="outlined" onClick={() => setShowActionHistory(true)}>
      {' '}
      Action History
    </Button>
  );
};

export default ActionHistory;
