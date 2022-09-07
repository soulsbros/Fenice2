import Close from '@mui/icons-material/Close';
import School from '@mui/icons-material/School';
import Warning from '@mui/icons-material/Warning';
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
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import CampaignSelector from '../components/CampaignSelector';
import { findSkill, getWikiURL, skills } from '../util/pf2skills';

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
    const url = getWikiURL(skillName);
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
    <>
      <Typography variant="h6" gutterBottom>
        Skill checks (Pathfinder 2e)
      </Typography>
      <CampaignSelector />
      <Autocomplete
        disablePortal
        options={skillOptions}
        onChange={handleSkillChange}
        sx={{ width: 300, display: 'inline-block', margin: 2, backgroundColor: 'white' }}
        renderInput={(params) => <TextField {...params} color="secondary" label="Skill" />}
      />

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

      {skill && campaign.label != null && (
        <Typography sx={{ mt: 4 }}>
          The best character for <b>{skill}</b> in {campaign.label} is: Place Holder
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
    </>
  );
};

export default Skills;
