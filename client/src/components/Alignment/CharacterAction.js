import { Checkbox, FormControlLabel } from '@mui/material';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../actions';

const CharacterAction = ({ character }) => {
  const dispatch = useDispatch();
  const selectedChars = useSelector((state) => state.alignmentReducer.selectedChars);
  const setSelectedChar = useCallback(
    (data) => {
      dispatch(actions.setSelectedChar(data));
    },
    [dispatch],
  );

  const handleChangeSelectedChars = (event, value) => {
    let newSelectedChar = selectedChars;
    if (value) {
      newSelectedChar.push(character._id);
    } else {
      newSelectedChar = newSelectedChar.filter((charId) => charId !== character._id);
    }
    setSelectedChar(newSelectedChar);
  };

  return (
    <FormControlLabel
      control={<Checkbox onChange={handleChangeSelectedChars} />}
      label={`${character.name} ${character.lastname}`}
    />
  );
};

export default CharacterAction;
