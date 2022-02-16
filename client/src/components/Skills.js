import {
  Autocomplete,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';

const Skills = () => {
  const [campaign, setCampaign] = useState('');

  const handleChange = (event) => {
    setCampaign(event.target.value);
  };

  const options = ['Ride', 'Tumble'];

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Toolbar />
      <Typography variant="h6" gutterBottom>
        Skill checks
      </Typography>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel>Campaign</InputLabel>
        <Select value={campaign} onChange={handleChange} label="Campaign">
          <MenuItem value={1}>Campaign 1</MenuItem>
          <MenuItem value={2}>Campaign 2</MenuItem>
          <MenuItem value={3}>Campaign 3</MenuItem>
        </Select>
      </FormControl>
      <Autocomplete
        disablePortal
        options={options}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Skill" />}
      />
    </Box>
  );
};

export default Skills;
