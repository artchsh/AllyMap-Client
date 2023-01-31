/* eslint-disable react/jsx-no-bind */
import React, { useState, useEffect } from 'react';

import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import {
  red, yellow, green, grey,
} from '@mui/material/colors';
import Box from '@mui/material/Box';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Autocomplete from '@mui/material/Autocomplete';

import { axiosAuth as axios, notification } from '@utils';
import { API } from '@config';
import {
  type Institution_Data, type EditInstitutionDialog_Props, type UserComments_Props, type Comments_Props, type Comment_Props, type InstitutionCard_Props,
} from '@declarations';

const ExpandMore = styled((props: { expand: boolean, children?: React.ReactNode, onClick?: () => void }) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }: { theme: any, expand: boolean }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const cities: string[] = ['Алматы', 'Астана', 'Шымкент'];
function EditInstitutionDialog(props: EditInstitutionDialog_Props) {
  // Setups
  const { open, institutionID, institutionTitle } = props;

  // States
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [link, setLink] = useState<string>('');
  const [imagePath, setImagePath] = useState<string>('');
  const [disableSaveButton, setDisableSaveButton] = useState<boolean>(true);

  // Functions
  function getInstitutionData() {
    axios.post(`${API.baseURL}/institutions/find`, { query: { _id: institutionID } }).then((res) => {
      if (!res.data.err) {
        const institution: Institution_Data = res.data[0];
        setTitle(institution.title);
        setDescription(institution.description);
        setAddress(institution.address);
        setLink(institution.link);
        setImagePath(institution.imagePath);
        setCity(institution.city);
      } else {
        notification.custom.error(res.data.err);
      }
    });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    axios.post(`${API.baseURL}/institutions/edit`, {
      query: {
        _id: institutionID,
      },
      updated: {
        title: data.get('title'),
        description: data.get('description'),
        address: data.get('address'),
        link: data.get('link'),
        imagePath: data.get('imagePath'),
      },
    })
      .then((res) => {
        if (!res.data.err) {
          window.location.reload();
        } else {
          notification.custom.error(res.data.err);
        }
      });
  }

  function loadInputs() {
    document.getElementById('title').value = title;
    document.getElementById('description').value = description;
    document.getElementById('address').value = address;
    document.getElementById('link').value = link;
    document.getElementById('imagePath').value = imagePath;
    document.getElementById('imagePath').value = city;
    setDisableSaveButton(false);
  }

  useEffect(() => {
    getInstitutionData();
  }, []);

  return (
    <Dialog open={open}>
      <DialogTitle>
        Реадактировать заведение
        {institutionTitle}
      </DialogTitle>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ margin: 1 }}>
        <TextField
          InputLabelProps={{ shrink: true }}
          margin="normal"
          required
          fullWidth
          id="title"
          label="Название заведения"
          name="title"
        />
        <TextField
          InputLabelProps={{ shrink: true }}
          margin="normal"
          required
          fullWidth
          name="description"
          label="Описание"
          id="description"
        />
        <Autocomplete
          options={cities}
          onInputChange={(event, newInputValue) => { setCity(newInputValue); }}
          className="mt-3 w-full rounded-3xl"
          renderInput={(params) => <TextField variant="outlined" {...params} label="Город" id="city" />}
        />
        <TextField
          InputLabelProps={{ shrink: true }}
          margin="normal"
          required
          fullWidth
          name="address"
          label="Адрес"
          id="address"
        />
        <TextField
          InputLabelProps={{ shrink: true }}
          margin="normal"
          required
          fullWidth
          name="link"
          label="Ссылка"
          id="link"
        />
        <TextField
          InputLabelProps={{ shrink: true }}
          margin="normal"
          required
          fullWidth
          name="imagePath"
          label="Путь к картинке"
          id="imagePath"
        />
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <Button type="submit" color="success" fullWidth variant="contained" sx={{ mt: 2, mb: 2, mr: 1 }} disabled={disableSaveButton}>
            Сохранить
          </Button>
          <Button type="button" fullWidth variant="contained" onClick={() => { loadInputs(); }} sx={{ mt: 2, mb: 2, ml: 1 }}>
            Загрузить текущие настройки...
          </Button>
        </div>
      </Box>
    </Dialog>
  );
}

function UserComments({ userID, rate, comment }: UserComments_Props) {
  // States
  const [user, setUser] = useState<string>('');

  // Functions
  function getUser() {
    const query: { query: { _id: string } } = { query: { _id: userID } };
    axios.post(`${API.baseURL}/users/find`, query).then((response) => { if (!response.data.err) { setUser(response.data.login); } else { notification.custom.error(response.data.err); } });
  }

  useEffect(() => {
    getUser();
  }, []);
  return (
    <>
      <ListItem alignItems="flex-start">
        <ListItemText
          primary={`${user} - ${rate}`}
          secondary={(
            <>
              {comment}
            </>
          )}
        />
      </ListItem>
      <Divider />
    </>
  );
}

function Comments({ comments, expanded, id }: Comments_Props) {
  return (
    <Collapse in={expanded} timeout="auto" unmountOnExit>
      <CardContent>
        <Typography paragraph>Comments:</Typography>
        <List sx={{ width: '100%', maxWidth: '500px' }}>
          {comments.map(({
            rate, userID, institutionID, content,
          }, index: number) => (
            institutionID == id && <UserComments key={index} userID={userID} rate={rate} comment={content} />
          ))}
        </List>
      </CardContent>
    </Collapse>
  );
}

export default function AdminInstitutionCard({
  userID, id, name, address, description, link, imagePath,
}: InstitutionCard_Props) {
  // Setups
  if (userID == null) {
    localStorage.removeItem('token');
    location.reload();
  }

  // States
  const [showRate, setShowRate] = useState<string>('');
  const [showRateColor, setShowRateColor] = useState<string>('');
  const [comments, setComments] = useState<Comment_Props[]>([]);
  const [expanded, setExpanded] = useState<boolean>(false);
  const [openEditDialog, setOpenEditDialog] = useState<boolean>(false);

  // Handlers
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  // Functions
  function RemoveInstitutionCard() {
    axios.post(`${API.baseURL}/institutions/remove`, { query: { _id: id } }).then((response) => {
      if (!response.data.err) {
        window.location.reload();
      } else {
        notification.custom.error(response.data.err);
      }
    });
  }

  function EditInstitutionCard() {
    setOpenEditDialog(true);
  }

  function handleEditDialogClose() {
    setOpenEditDialog(false);
  }

  function getComments() {
    axios.post(`${API.baseURL}/comments/get`, {
      query: {
        institutionID: id,
      },
    }).then((response) => {
      if (!response.data.err) {
        const comments = response.data;
        setComments(comments);
        let sumRate = 0;
        let n = 0;
        for (let i = 0; i < comments.length; i++) {
          const { rate } = comments[i];
          sumRate += parseInt(rate);
          n++;
        }
        let average = (Math.ceil(sumRate / n * 10)) / 10;
        if (average > 0) {

        } else {
          average = 5;
        }

        if (average >= 8) {
          setShowRate(average.toString());
          setShowRateColor(green[800]);
        } else if (average >= 6) {
          setShowRate(average.toString());
          setShowRateColor(green[400]);
        } else if (average >= 4) {
          setShowRate(average.toString());
          setShowRateColor(yellow[800]);
        } else if (average >= 2) {
          setShowRate(average.toString());
          setShowRateColor(red[300]);
        } else if (average >= 0) {
          setShowRate(average.toString());
          setShowRateColor(red[800]);
        } else {
          setShowRate('X');
          setShowRateColor(grey[50]);
        }
      } else {
        notification.custom.error(response.data.err);
      }
    });
  }

  useEffect(() => {
    getComments();
  }, []);

  return (
    <Card sx={{ width: '95vw', maxWidth: '500px', marginBottom: -1.1 }}>
      <EditInstitutionDialog open={openEditDialog} onClose={handleEditDialogClose} institutionID={id} institutionTitle={name} />
      <CardHeader
        title={name}
        subheader={`ID пользователя: ${userID}`}
        avatar={(
          <Avatar sx={{ bgcolor: showRateColor }} aria-label="recipe">
            {' '}
            {showRate}
            {' '}
          </Avatar>
        )}
      />
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
      <CardActions disableSpacing>

        <Button size="small" onClick={() => { window.open(link, '_blank'); }}>ССЫЛКА</Button>
        <Button size="small" onClick={() => { RemoveInstitutionCard(); }}>УДАЛИТЬ</Button>
        <Button size="small" onClick={() => { EditInstitutionCard(); }}>РЕАДАКТИРОВАТЬ</Button>
        <ExpandMore expand={expanded} onClick={handleExpandClick} aria-expanded={expanded} aria-label="show more">
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Comments expanded={expanded} comments={comments} id={id} />
    </Card>
  );
}
