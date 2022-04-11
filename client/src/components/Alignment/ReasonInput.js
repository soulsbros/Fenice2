import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../store/actions';

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
    <div>
      <label htmlFor="reasonInput" style={{ display: 'block' }}>
        Action Reason
      </label>
      <input
        id="reasonInput"
        type="text"
        className="inputText"
        onChange={handleChange}
        value={reasonInput}
      />
    </div>
  );
};

export default ReasonInput;
