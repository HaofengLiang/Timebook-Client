import { List, ListItem, ListItemText } from '@mui/material';
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

export default function Sidebar({
  handleDrawerClose,
  drawerOpen,
  drawerWidth,
}) {
  const drawerList = ['Home', 'Profile', 'Subscriptions'];

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
  );
}
