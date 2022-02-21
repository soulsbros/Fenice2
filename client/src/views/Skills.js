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
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCampaigns } from '../api';
import skills from '../util/skills';
import Close from '@mui/icons-material/Close';

const Skills = () => {
  const dispatch = useDispatch();
  const campaign = useSelector((st) => st.generalReducer.selectedCampaign);
  const [skill, setSkill] = useState('');
  const [campaignOptions, setCampaignOptions] = useState([]);
  const [open, setOpen] = useState(false);
  const [wikiURL, setWikiURL] = useState('');

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

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
        <Typography gutterBottom>
          The best character for <b>{skill}</b> in {campaign} is: Place Holder
        </Typography>
      )}
      {skill && (
        <Typography>
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
