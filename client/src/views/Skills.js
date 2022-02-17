import { Autocomplete, TextField, Toolbar, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCampaigns } from '../api';
import skills from '../util/skills';

const Skills = () => {
  const dispatch = useDispatch();
  const campaign = useSelector((st) => st.generalReducer.selectedCampaign);
  const [skill, setSkill] = useState('');
  const [campaignOptions, setCampaignOptions] = useState([]);

  const handleCampaignChange = (event) => {
    dispatch({
      type: 'SET_CAMPAIGN',
      payload: event.target.innerText,
    });
  };
  const handleSkillChange = (event) => {
    // TODO API request to calculate best character
    setSkill(event.target.innerText);
  };

  useEffect(() => {
    let mapCampaigns = async () => {
      let result = await getAllCampaigns();
      setCampaignOptions(result.data.map((el) => el.name));
    };
    mapCampaigns();
  }, []);

  const skillOptions = skills.map((el) => el.name);

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Toolbar />
      <Typography variant="h6" gutterBottom>
        Skill checks
      </Typography>
      <Autocomplete
        value={campaign}
        disablePortal
        options={campaignOptions}
        onChange={handleCampaignChange}
        sx={{ width: 300, display: 'inline-block' }}
        renderInput={(params) => <TextField {...params} color="secondary" label="Campaign" />}
      />
      <Autocomplete
        disablePortal
        options={skillOptions}
        onChange={handleSkillChange}
        sx={{ width: 300, display: 'inline-block', margin: 2 }}
        renderInput={(params) => <TextField {...params} color="secondary" label="Skill" />}
      />
      {skill && campaign && (
        <Typography>
          The best character for <b>{skill}</b> in {campaign} is: Lenior
        </Typography>
      )}
    </Box>
  );
};

export default Skills;
