import CloseIcon from '@mui/icons-material/Close';
import {
  AppBar,
  Dialog,
  DialogContent,
  Grid,
  IconButton,
  ListItemText,
  Toolbar,
  Typography,
  Zoom,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCharactersByCampaignName } from '../api';
import CampaignSelector from '../components/CampaignSelector';
import CharacterDetails from '../components/CharacterDetails';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Zoom ref={ref} {...props} />;
});

const Characters = () => {
  const campaign = useSelector((st) => st.generalReducer.selectedCampaign);
  const dialogOpen = useSelector((st) => st.charactersReducer.detailsDialogOpen);
  const characterData = useSelector((st) => st.charactersReducer.selectedCharacter);
  const [characters, setCharacters] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    let mapCampaigns = async () => {
      let result = campaign ? await getCharactersByCampaignName(campaign.label) : null;
      setCharacters(result?.data || []);
    };
    mapCampaigns();
  }, [campaign]);

  const closeDialog = () =>
    dispatch({
      type: 'SET_DETAILS_DIALOG_OPEN',
      payload: false,
    });

  return (
    <>
      <Typography variant="h6" mb={2}>
        Characters
      </Typography>

      <CampaignSelector />

      <Grid container>
        {characters.map((el) => (
          <CharacterDetails key={el._id} data={el} viewMode={characters.length} />
        ))}
      </Grid>

      <Dialog
        open={dialogOpen}
        onClose={closeDialog}
        TransitionComponent={Transition}
        fullWidth
        maxWidth={'md'}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={closeDialog} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {`${characterData?.name} ${characterData?.lastname}`}
            </Typography>
          </Toolbar>
        </AppBar>

        <DialogContent sx={{ p: 6 }}>
          <Grid item xs={12}>
            <img
              src={`https://lafenice.soulsbros.ch/img/pg/${characterData?.externalId}.jpg`}
              alt="character portrait"
              style={{
                width: '100%',
              }}
            />
          </Grid>

          <Grid container justifyContent={'space-between'} sx={{ marginY: 2 }}>
            <Grid item>
              <ListItemText
                primary={<b>{`${characterData?.name} ${characterData?.lastname}`}</b>}
                secondary={'Character name'}
              />
            </Grid>
            <Grid item>
              <ListItemText
                primary={characterData?.race}
                secondary={'Race'}
                sx={{ textAlign: 'center' }}
              />
            </Grid>
            <Grid item>
              <ListItemText
                primary={characterData?.class}
                secondary={'Class'}
                sx={{ textAlign: 'center' }}
              />
            </Grid>
            <Grid item>
              <ListItemText
                primary={characterData?.actualAlignment}
                secondary={'Alignment'}
                sx={{ textAlign: 'center' }}
              />
            </Grid>
            <Grid item>
              <ListItemText
                primary={characterData?.playerName}
                secondary={'Player name'}
                sx={{ textAlign: 'right' }}
              />
            </Grid>
          </Grid>

          <Typography>{characterData?.backstory}</Typography>

          <Typography>{characterData?.character}</Typography>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Characters;
