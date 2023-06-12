import AddIcon from '@mui/icons-material/Add';
import { Popover, ListItemButton, ListItemText } from '@mui/material';
import { useState } from 'react';
import './Sidebar.css';

export default function PopoverComponent({ services }) {
  const [popoverOpen, setPopovereOpen] = useState(null);
  const [serviceFormOpen, setServiceFormOpen] = useState(false);

  const addIconOnclick = (e) => {
    e.stopPropagation();
    setPopovereOpen(e.target);
  };

  const handlePopover = (e) => {
    e.stopPropagation();
    setPopovereOpen(null);
  };

  return (
    <>
      <AddIcon className="addIcon" onClick={addIconOnclick} />
      <Popover
        id="addIcon-popover"
        open={!!popoverOpen}
        anchorEl={popoverOpen}
        onClose={handlePopover}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        {Object.values(services).map((service) => {
          return (
            <ListItemButton
              key={'serviceItem-' + service.text}
              onClick={(e) => {
                e.stopPropagation();
                service.action();
              }}
            >
              <ListItemText
                key={'serviceItemText-' + service.text}
                primary={service.text}
              />
            </ListItemButton>
          );
        })}
      </Popover>
    </>
  );
}
