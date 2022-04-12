import { TextField } from '@mui/material';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../actions';

const ActionWeight = () => {
  const dispatch = useDispatch();

  const actionWeight = useSelector((st) => st.alignmentReducer.actionWeight);

  const setActionWeight = useCallback(
    (data) => {
      dispatch(actions.setActionWeight(data));
    },
    [dispatch],
  );

  const handleChange = (e) => {
    const value = e.target.value === '' ? 0 : e.target.value;
    setActionWeight(parseInt(value));
  };

  return (
    <TextField
      value={actionWeight.toString()}
      type="number"
      onChange={handleChange}
      label="Action weight"
      id="filled-start-adornment"
      sx={{ m: 1, width: '25ch' }}
      variant="outlined"
    />
  );
};

export default ActionWeight;
