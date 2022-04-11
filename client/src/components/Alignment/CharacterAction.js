import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../store/actions';

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
      campaign: campaign._id,
    };

    addAction(action);
    setReasonInput('');
  };

  return (
    <div id="charContainer">
      <div>{`${character.name.toUpperCase()} ${character.lastname.toUpperCase()}`}</div>
      <div style={{ display: 'flex' }}>
        <button onClick={() => handleClick('Lawful')}>Lawful action</button>
        <button onClick={() => handleClick('Chaotic')}>Chaotic action</button>
      </div>
      <div style={{ display: 'flex' }}>
        <button onClick={() => handleClick('Good')}>Good action</button>
        <button onClick={() => handleClick('Evil')}>Evil action</button>
      </div>
    </div>
  );
};

export default CharacterAction;
