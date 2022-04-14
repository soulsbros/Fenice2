import { TextField } from '@mui/material';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../actions';

const ReasonInput = () => {
  const dispatch = useDispatch();

  const { reasonInput } = useSelector((st) => st.alignmentReducer);

  const setReasonInput = useCallback(
    (data) => {
      dispatch(actions.setReasonInput(data));
    },
    [dispatch],
  );

  const handleChange = (e) => {
    setReasonInput(e.target.value);
  };

  return (
    <TextField
      value={reasonInput}
      label="Action reason"
      onChange={handleChange}
      sx={{ m: 1, width: 'calc(75% - 16px)' }}
    />
  );
};

export default ReasonInput;
