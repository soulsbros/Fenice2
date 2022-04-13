import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  List,
  ListItem,
  ListItemText,
  Slide,
  Typography
} from '@mui/material';
import { Box } from '@mui/system';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../actions';

const ActionHistoryDialog = () => {
  const dispatch = useDispatch();

  const characters = useSelector((st) => st.alignmentReducer.characters);
  const showActionHistory = useSelector((st) => st.alignmentReducer.showActionHistory);

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

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
      <DialogTitle>Action History</DialogTitle>
      <DialogContent>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            {characters &&
              getHistories().map((char) => (
                <Grid key={char.id} item xs={6}>
                  <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                    {char.name}
                  </Typography>
                  <List>
                    {char.history.map((action) => (
                      <ListItem key={action.timestamp}>
                        <ListItemText
                          primary={`${action.type} - ${action.timestamp}`}
                          secondary={action.reason}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Grid>
              ))}
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={() => setShowActionHistory(false)}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ActionHistoryDialog;
