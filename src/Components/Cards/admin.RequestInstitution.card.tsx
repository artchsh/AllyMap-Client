import React, { useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import LoadingButton from '@mui/lab/LoadingButton';
import Typography from '@mui/material/Typography';

import { axiosAuth as axios, notification } from '@utils';
import { type RequestInstitutionCard_Props } from '@declarations';
import { API } from '@config';

export default function AdminRequestInstitutionCard({
  id, name, address, description, link, imagePath, userID,
}: RequestInstitutionCard_Props) {
  // States
  const [loading, setLoading] = useState<boolean>(false);

  // Functions
  function acceptRequest() {
    setLoading(true);
    axios.post(`${API.baseURL}/institutions/request/accept`, {
      query: {
        _id: id,
      },
    }).then((res) => {
      if (!res.data.err) {
        window.location.reload();
      } else {
        notification.custom.error(res.data.err);
      }
    });
  }

  function declineRequest() {
    setLoading(true);
    axios.post(`${API.baseURL}/institutions/request/decline`, {
      query: {
        _id: id,
      },
    }).then((res) => {
      if (!res.data.err) {
        window.location.reload();
      } else {
        notification.custom.error(res.data.err);
      }
    });
  }
  useEffect(() => {
    setLoading(false);
  }, []);
  return (
    <Card sx={{ width: '95vw', maxWidth: 500 }} square>
      <CardHeader title={name} subheader={`ID пользователя: ${userID}`} />
      {imagePath != undefined && imagePath != '' && <CardMedia component="img" height="240" image={imagePath} />}
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Адрес:
          {' '}
          {address}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <LoadingButton size="small" variant="contained" onClick={() => { window.open(link, '_blank'); }}>ССЫЛКА</LoadingButton>
        <>
          <LoadingButton color="success" size="small" variant="contained" loading={loading} onClick={() => { acceptRequest(); }}>Принять</LoadingButton>
          <LoadingButton color="error" size="small" variant="contained" loading={loading} onClick={() => { declineRequest(); }}>Отклонить</LoadingButton>
        </>
      </CardActions>
    </Card>
  );
}
