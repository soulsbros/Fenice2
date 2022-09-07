import { Button, Typography } from '@mui/material';
import React from 'react';

const Profile = () => {
  return (
    <>
      <Typography variant="h6" mb={2}>
        Profile
      </Typography>
      <Typography mb={2}>
        <Button
          variant="contained"
          onClick={() =>
            (location.href =
              'https://login.soulsbros.ch/?p=changePass&location=https://fenice2.soulsbros.ch')
          }
        >
          Change password
        </Button>
      </Typography>
      <Typography mb={2}>
        <Button
          variant="contained"
          onClick={() => (location.href = 'https://lafenice.soulsbros.ch/?page=profilo')}
        >
          Edit your characters
        </Button>
      </Typography>
      <Typography>
        <Button
          variant="contained"
          onClick={() =>
            (location.href = 'https://lafenice.soulsbros.ch/?page=registrazione&modificaUtente')
          }
        >
          Edit user info
        </Button>
      </Typography>
    </>
  );
};

export default Profile;
