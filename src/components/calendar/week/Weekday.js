import "./Weekday.css"
import { Box, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import moment from 'moment';

export default function Weekday({ events, day, onDateTimeSelect }) {
    const hrs = 24;
    const minsPerSection = 30;
    const numOfSections = hrs * (60 / minsPerSection);
    const listItems = [...Array(numOfSections)].map((_, i) => {
        const dateTime = moment(day).startOf('day').add(i * minsPerSection, 'minutes');
        return (
            <ListItem key={i} className='Item'>
                {day
                    ? <ListItemButton onClick={() => onDateTimeSelect(dateTime)}></ListItemButton>
                    : <ListItemText primary={dateTime.format('h:mm A')} />}
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