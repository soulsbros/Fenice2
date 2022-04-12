import { Checkbox, FormControlLabel } from '@mui/material';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import * as actions from '../../actions';

const CharacterAction = ({ character }) => {
  const dispatch = useDispatch();
  const setSelectedChar = useCallback(
    (data) => {
      dispatch(actions.addSelectedChar(data));
    },
    [dispatch],
  );
  return (
    <FormControlLabel
      control={<Checkbox onChange={() => setSelectedChar(character._id)} />}
      label={`${character.name.toUpperCase()} ${character.lastname.toUpperCase()}`}
    />
  );
};

export default CharacterAction;
