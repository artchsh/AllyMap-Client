/* eslint-disable no-restricted-globals */
import React, { useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import LoadingButton from '@mui/lab/LoadingButton';
import Typography from '@mui/material/Typography';

import { axiosAuth as axios, notification } from '@utils';
import { type UserCard_Props } from '@declarations';
import { API } from '@config';

export default function UserCard({
  id, login, inviteCode, acceptCode,
}: UserCard_Props) {
  // States
  const [loading, setLoading] = useState<boolean>(false);

  // Functions
  function remove() {
    axios.post(`${API.baseURL}/users/remove`, { query: { id } }).then((res) => {
      if (!res.data.err) {
        location.reload();
      } else {
        notification.custom.error(res.data.err);
      }
    });
  }

  useEffect(() => {
    setLoading(false);
  }, []);
  return (
    <Card sx={{ width: '95vw', maxWidth: 250 }} square>
      <CardHeader title={login} />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          ID:
          {' '}
          {id}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Invite Code:
          {' '}
          {inviteCode}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Accept Code:
          {' '}
          {acceptCode}
        </Typography>
      </CardContent>
      <CardActions>
        <LoadingButton color="error" size="small" variant="contained" fullWidth loading={loading} onClick={() => { remove(); }}>Удалить</LoadingButton>
      </CardActions>
    </Card>
  );
}
