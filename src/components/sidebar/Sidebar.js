import { List, ListItem, ListItemText } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { DrawerHeader } from "./MuiComponents";

export default function Sidebar({
  handleDrawerClose,
  drawerOpen,
  drawerWidth,
}) {
  const drawerList = ["Home", "Profile", "Subscriptions"];

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
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
                    case "Home":
                      return <HomeIcon />;
                    case "Subscriptions":
                      return <PeopleIcon />;
                    case "Profile":
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
