import "./Weekday.css"
import { Box, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import moment from 'moment';

export default function Weekday({ events, day }) {
    const hrs = 24;
    const minsPerSection = 30;
    const numOfSections = hrs * (60 / minsPerSection);
    const listItems = [...Array(numOfSections)].map((_, i) => {
        const time = moment().startOf('day').add(i * minsPerSection, 'minutes');
        return (
            <ListItem key={i} className='Item'>
                {day
                    ? <ListItemButton></ListItemButton>
                    : <ListItemText primary={time.format('h:mm A')} />}
            </ListItem>);
    });

    return (
        <Box sx={{ height: '100%', width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            <List className="dayBody">
                {listItems}
            </List>
        </Box>
    );

};