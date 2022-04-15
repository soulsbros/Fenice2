import Close from '@mui/icons-material/Close';
import {
  AppBar,
  Dialog,
  DialogContent,
  Grid,
  IconButton,
  List,
  ListItemText,
  Slide,
  Toolbar,
  Typography
} from '@mui/material';
import { Box } from '@mui/system';
import { format } from 'date-fns';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../actions';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ActionHistoryDialog = () => {
  const dispatch = useDispatch();

  const characters = useSelector((st) => st.alignmentReducer.characters);
  const showActionHistory = useSelector((st) => st.alignmentReducer.showActionHistory);
  const [gridSize, setGridSize] = useState(6);

  useEffect(() => {
    const gridSize = 12 / characters.length;
    setGridSize(gridSize);
  }, [characters]);

  const setShowActionHistory = useCallback(
    (data) => {
      dispatch(actions.setShowActionHistory(data));
    },
    [dispatch],
  );

  const getHistories = () => {
    const history = [];
    characters.forEach((char) => {
      char = {
        id: char._id,
        name: char.name,
        history: char.actionsHistory.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)),
      };
      history.push(char);
    });
    return history;
  };

  return (
    <Dialog
      fullScreen
      open={showActionHistory}
      onClose={() => setShowActionHistory(false)}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => setShowActionHistory(false)}
            aria-label="close"
          >
            <Close />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Action History
          </Typography>
        </Toolbar>
      </AppBar>
      <DialogContent>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            {characters &&
              getHistories().map((char) => (
                <Grid key={char.id} item xs={gridSize}>
                  <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                    {char.name}
                  </Typography>
                  <List>
                    {char.history.map((action) => (
                      <ListItemText
                        key={action.timestamp}
                        primary={`${action.type} - ${format(
                          new Date(action.timestamp),
                          'dd.MM.yyyy HH:mm:ss',
                        )}`}
                        secondary={`${action.reason || '(none)'} - ${Math.abs(action.value)}`}
                      />
                    ))}
                  </List>
                </Grid>
              ))}
          </Grid>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ActionHistoryDialog;
