import {
  AppBar,
  Autocomplete,
  Button,
  Dialog,
  IconButton,
  Slide,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { findSkill, skills } from '../util/skills';
import Close from '@mui/icons-material/Close';
import Warning from '@mui/icons-material/Warning';
import School from '@mui/icons-material/School';
import CampaignSelector from '../components/CampaignSelector';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Skills = () => {
  const campaign = useSelector((st) => st.generalReducer.selectedCampaign);
  const [skill, setSkill] = useState('');

  const [open, setOpen] = useState(false);
  const [wikiURL, setWikiURL] = useState('');

  const handleDialogOpen = () => {
    const skillName = skill
      .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
      })
      .replace(/\s+/g, '');
    const url = `https://www.d20srd.org/srd/skills/${skillName}.htm`;
    setWikiURL(url);
    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
  };

  const handleSkillChange = (event) => {
    // TODO API request to calculate best character
    setSkill(event.target.innerText);
  };

  const skillOptions = skills.map((el) => el.name);

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Toolbar />
      <Typography variant="h6" gutterBottom>
        Skill checks
      </Typography>
      <CampaignSelector />
      <Autocomplete
        disablePortal
        options={skillOptions}
        onChange={handleSkillChange}
        sx={{ width: 300, display: 'inline-block', margin: 2 }}
        renderInput={(params) => <TextField {...params} color="secondary" label="Skill" />}
      />
      {skill && campaign && (
        <Typography gutterBottom>
          The best character for <b>{skill}</b> in {campaign} is: Place Holder
        </Typography>
      )}
      {skill && (
        <Typography component="div">
          {findSkill(skill).armorPenalty && (
            <Typography gutterBottom>
              <Warning />
              <span style={{ verticalAlign: 'super', marginLeft: 5 }}>Armor penalty applies</span>
            </Typography>
          )}
          {findSkill(skill).requiresTraining && (
            <Typography gutterBottom>
              <School />
              <span style={{ verticalAlign: 'super', marginLeft: 5 }}> Requires training</span>
            </Typography>
          )}
          <Button onClick={handleDialogOpen} variant="outlined">
            Open wiki page
          </Button>
        </Typography>
      )}
      <Dialog fullScreen open={open} onClose={handleDialogClose} TransitionComponent={Transition}>
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleDialogClose} aria-label="close">
              <Close />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {skill}
            </Typography>
          </Toolbar>
        </AppBar>
        <iframe title="wikiPage" src={wikiURL} height="100%" />
      </Dialog>
    </Box>
  );
};

export default Skills;
