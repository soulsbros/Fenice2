import { Autocomplete, TextField, Toolbar, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import skills from '../util/skills';

const Skills = () => {
  const [campaign, setCampaign] = useState('');
  const [skill, setSkill] = useState('');

  const handleCampaignChange = (event) => {
    setCampaign(event.target.innerText);
  };
  const handleSkillChange = (event) => {
    // TODO API request to calculate best character
    setSkill(event.target.innerText);
  };

  // TODO dynamically load campaigns with an useEffect

  const campaignOptions = ['Campaign 1', 'Campaign 2'];
  const skillOptions = skills.map((el) => {
    return el.name;
  });

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Toolbar />
      <Typography variant="h6" gutterBottom>
        Skill checks
      </Typography>
      <Autocomplete
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
        sx={{ width: 300, display: 'inline-block', marginBottom: 2, marginLeft: 2 }}
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
