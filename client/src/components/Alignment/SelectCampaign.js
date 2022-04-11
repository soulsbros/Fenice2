import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as actions from '../store/actions';
import { getCampaign, getCampaigns } from '../store/API';

const SelectCampaign = () => {
  const dispatch = useDispatch();

  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState('');

  const setCampaign = useCallback(
    (data) => {
      dispatch(actions.setCampaign(data));
    },
    [dispatch],
  );

  useEffect(() => {
    getCampaigns().then((data) => {
      setItems(data.data);
    });
  }, []);

  const handleChange = (e) => {
    setSelected(e.target.value);
    getCampaign(e.target.value).then((item) => {
      setCampaign(item.data);
    });
  };

  return (
    <>
      {items.length > 0 ? (
        <select name="campaigns" onChange={handleChange} value={selected}>
          <option hidden>Choose campaign</option>
          {items.map((el) => (
            <option key={el.name} value={el._id}>{`${el.name} - ${el.act}`}</option>
          ))}
        </select>
      ) : null}
    </>
  );
};

export default SelectCampaign;
