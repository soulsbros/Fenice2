import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../store/actions';

const ActionWeight = () => {
  const dispatch = useDispatch();

  const { actionWeight } = useSelector((st) => st.alignmentReducer);

  const setActionWeight = useCallback(
    (data) => {
      dispatch(actions.setActionWeight(data));
    },
    [dispatch],
  );

  const handleChange = (e) => {
    setActionWeight(parseInt(e.target.value));
  };

  return (
    <div>
      <label htmlFor="actionWeight" style={{ display: 'block' }}>
        Action weight
      </label>
      <input
        id="actionWeight"
        type="number"
        className="inputText"
        onChange={handleChange}
        value={actionWeight}
      />
    </div>
  );
};

export default ActionWeight;
