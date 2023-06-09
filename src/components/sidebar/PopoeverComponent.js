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

  const handlePopoever = (e) => {
    e.stopPropagation();
    setPopovereOpen(null);
  };

  const handleService = (service, e) => {
    e.stopPropagation();
    switch (service) {
      case 'Subscribe to calendar':
        console.log('called subscribe');
        break;
      case 'Create new calendar':
        console.log('called create');
        break;
      case 'Browse calendars of interest':
        console.log('called browse');
        break;
      default:
        break;
    }
  };
  return (
    <>
      <AddIcon className="addIcon" onClick={addIconOnclick} />
      <Popover
        id="addIcon-popover"
        open={!!popoverOpen}
        anchorEl={popoverOpen}
        onClose={handlePopoever}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        {Object.values(services).map((service) => {
          return (
            <ListItemButton
              key={'serviceItem-' + service}
              onClick={handleService.bind(this, service)}
            >
              <ListItemText
                key={'serviceItemText-' + service}
                primary={service}
              />
            </ListItemButton>
          );
        })}
      </Popover>
    </>
  );
}
