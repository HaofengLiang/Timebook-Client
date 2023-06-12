import {
  Collapse,
  Checkbox,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import { default as Popover } from './PopoeverComponent';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useState } from 'react';

export default function CollapseComponet({
  collapseHeader,
  collapseItems,
  services = {},
}) {
  const [collapseOpen, setCollapseOpen] = useState(false);

  const handleCollapse = (e) => {
    setCollapseOpen((previousCollapseOpen) => !previousCollapseOpen);
  };

  return (
    <>
      <ListItemButton onClick={handleCollapse}>
        <ListItemText primary={collapseHeader} />
        {Object.keys(services).length > 0 && <Popover services={services} />}
        {collapseOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={collapseOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {collapseItems.map((item) => {
            return (
              <ListItem key={'collapseItem-' + item}>
                <Checkbox key={'checkbox-' + item} />
                <ListItemText key={'listItemText' + item} primary={item} />
              </ListItem>
            );
          })}
        </List>
      </Collapse>
    </>
  );
}
