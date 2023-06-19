import { List, ListItem, ListItemText, Box, Modal } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { DrawerHeader } from './MuiComponents';
import { default as Collapse } from './CollapseComponet';
import { useState } from 'react';
import ServiceForm from './ServiceForm';
import { addCalendar, getEvents } from '../../reducers/eventsSlice';
import { useDispatch } from 'react-redux';
import moment from 'moment';

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
}) {
  const drawerList = ['Home', 'Profile', 'Subscriptions'];
  const [serviceFormOpen, setServiceFormOpen] = useState(false);
  const dispatch = useDispatch();

  const calendarAddHandler = async (userEmail) => {
    dispatch(addCalendar(userEmail))
      .then((res) => dispatch(getEvents(moment())))
      .catch((err) => {});
    setServiceFormOpen(false);
  };

  // const calendarDeleteHandler = async (userEmail) => {
  //   dispatch(deleteCalendar(userEmail));
  //   setServiceFormOpen(false);
  // };

  const collapseLists = {
    'My calendars': {
      checkboxes: ['Birthdays', 'Reminders', 'Tasks'],
      services: {},
    },
    'Other calendars': {
      checkboxes: ['Holidays in United States'],
      services: {
        subscribe: {
          text: 'Subscribe to calendar',
          action: () => {
            console.log('Subscribe to calendar');
            setServiceFormOpen(true);
          },
        },
        create: {
          text: 'Create new calendar',
          action: () => {
            console.log('Create new calendar');
          },
        },
        browse: {
          text: 'Browse calendars of interest',
          action: () => {
            console.log('Browse calendars of interest');
          },
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
          <ServiceForm onSubmit={calendarAddHandler} />
        </Box>
      </Modal>
    </>
  );
}
