import React from 'react';
import ActionWeight from './ActionWeight';
import ReasonInput from './ReasonInput';
import SelectCampaign from './SelectCampaign';

const TopBar = () => {
  return (
    <div id="topBar">
      <div className="title">D&D Alignment</div>
      <div className="toolBar">
        <SelectCampaign />
        <ActionWeight />
        <ReasonInput />
      </div>
    </div>
  );
};

export default TopBar;
