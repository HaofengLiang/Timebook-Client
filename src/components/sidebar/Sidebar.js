import { List, ListItem, ListItemText, styled, useTheme } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
//import {IconButton, ChevronLeftIcon, ChevronRightIcon, ListItemButton, ListItemIcon, HomeIcon, PeopleIcon, AccountCircleIcon} from '@mui/icons-material';

export default function Sidebar({ handleDrawerClose, drawerOpen }) {
  const drawerWidth = 220;
  const theme = useTheme();
  const drawerList = ['Home', 'Profile', 'Subscriptions'];
  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  }));
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
      <List>
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
      </List>
    </Drawer>
  );
}
