import "./Weekday.css"
import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import moment from 'moment';

// q: why the list key is repeated?
// a: https://stackoverflow.com/questions/28329382/understanding-unique-keys-for-array-children-in-react-js
export default function Weekday({ events, day, onDateTimeSelect }) {
    const hrs = 24;
    const minsPerSection = 30;
    const numOfSections = hrs * (60 / minsPerSection);
    const listItems = [...Array(numOfSections)].map((_, i) => {
        const dateTime = moment(day).startOf('day').add(i * minsPerSection, 'minutes');
        return day ?
            <ListItem key={dateTime.format('MM-DD-yyyy-hh-mm-A') + "-list-item"} className='datetimeItem' >
                <ListItemButton onClick={() => onDateTimeSelect(dateTime)} className="datetimeButton"></ListItemButton>
            </ListItem > :
            <ListItem key={dateTime.format('hh-mm-A') + "list-item"} className='datetimeItem datetimeHeader'>
                <ListItemText primary={dateTime.format('hh:mm A')} />
            </ListItem>
    });

    return (
        <List className="dayBody">
            {listItems}
        </List>
    );

};