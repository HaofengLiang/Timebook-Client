import { List, ListItem, ListItemText, Box, Modal } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Alert from '@mui/material/Alert';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { DrawerHeader } from './MuiComponents';
import { default as Collapse } from './CollapseComponet';
import { useState } from 'react';
import ServiceForm from './ServiceForm';
import { getEvents } from '../../reducers/eventsSlice';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { addCalendar, deleteCalendar } from '../../services/eventService';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default function Sidebar({
  handleDrawerClose,
  drawerOpen,
  drawerWidth,
  userEmail,
}) {
  const drawerList = ['Home', 'Profile', 'Subscriptions'];
  const [serviceFormOpen, setServiceFormOpen] = useState(false);
  const [isAlertShow, setIsAlertShow] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const dispatch = useDispatch();
  const dateTime = useSelector((state) =>
    moment(state.calendarConfig.value.date)
  );

  const allEvents = useSelector((state) => state.events.value);
  const calendarToggles = [
    ...new Set(
      allEvents
        .filter((event) => event.email !== userEmail)
        .map((event) => event.email)
    ),
  ];

  const calendarAddHandler = async (userEmail) => {
    try {
      await addCalendar(userEmail);
      dispatch(getEvents(dateTime));
      setServiceFormOpen(false);
    } catch (error) {
      setIsAlertShow(true);
      setAlertMessage('Fail to Subcribed.');
    }
  };

  const calendarDeleteHandler = async (userEmail) => {
    try {
      await deleteCalendar(userEmail);
      dispatch(getEvents(dateTime));
      setServiceFormOpen(false);
    } catch (error) {
      setIsAlertShow(true);
      setAlertMessage('Fail to Unsubcribed.');
    }
  };

  const collapseLists = {
    'My calendars': {
      checkboxes: ['Birthdays', 'Reminders', 'Tasks'],
      services: {},
    },
    'Other calendars': {
      checkboxes: calendarToggles,
      services: {
        subscribe: {
          text: 'Subscribe to calendar',
          action: () => {
            setServiceFormOpen(true);
          },
        },
        create: {
          text: 'Create new calendar',
          action: () => {},
        },
        browse: {
          text: 'Browse calendars of interest',
          action: () => {},
        },
      },
    },
  };

  return (
    <>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={drawerOpen}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        <List disablePadding>
          {drawerList.map((item) => (
            <ListItem key={item} disablePadding>
              <ListItemButton onClick={handleDrawerClose}>
                <ListItemIcon>
                  {(() => {
                    switch (item) {
                      case 'Home':
                        return <HomeIcon />;
                      case 'Subscriptions':
                        return <PeopleIcon />;
                      case 'Profile':
                        return <AccountCircleIcon />;
                      default:
                        return null;
                    }
                  })()}
                </ListItemIcon>
                <ListItemText primary={item} />
              </ListItemButton>
            </ListItem>
          ))}
          {Object.keys(collapseLists).map((list) => {
            return (
              <Collapse
                key={'collapse-' + list}
                collapseHeader={list}
                collapseItems={collapseLists[list].checkboxes}
                services={collapseLists[list].services}
              />
            );
          })}
        </List>
      </Drawer>
      <Modal open={serviceFormOpen} onClose={() => setServiceFormOpen(false)}>
        <Box sx={style}>
          <ServiceForm
            onSubmit={calendarAddHandler}
            onDelete={calendarDeleteHandler}
            onChange={() => {
              setIsAlertShow(false);
            }}
          />
          {isAlertShow && (
            <Alert severity="error">
              <strong>{alertMessage}</strong>
            </Alert>
          )}
        </Box>
      </Modal>
    </>
  );
}
