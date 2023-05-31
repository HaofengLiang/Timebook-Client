import "./Weekday.css"
import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import moment from 'moment';
import Events from "../../event/Events";

export default function WeekDay({ day, onEventSelect, isHeader }) {
    const heightPerRowInVH = 5;
    const hrs = 24;
    const minsPerSection = 30;
    const numOfSections = hrs * (60 / minsPerSection);
    let i = 0;
    const listItems = [];

    while (i < numOfSections) {
        const dateTime = moment(day).startOf('day').add(i * minsPerSection, 'minutes');

        const newEvent = {
            title:'',
            startDateTime: dateTime,
            endDateTime: moment(dateTime).add(minsPerSection, 'minutes'),
            description:'',
            priority:0
        }; 

        listItems.push(
            isHeader ?
                <ListItem key={dateTime.format('hh-mm-A') + "list-item"} className='datetimeHeader' style={{ height: heightPerRowInVH + "vh" }}>
                    <ListItemText primary={dateTime.format('hh:mm A')} />
                </ListItem> 
                :
                <ListItem key={dateTime.format('MM-DD-yyyy-hh-mm-A') + "-list-item"} className='datetimeItem' style={{ height: heightPerRowInVH + "vh" }}>
                    <ListItemButton onClick={() => onEventSelect(newEvent)} className="datetimeButton"></ListItemButton>
                </ListItem >
        );

        i += 1;
    };

    return (
        <div>
            <List className="dayBody">
                {listItems}
                <Events day={day} onEventSelect={onEventSelect}/>
            </List>
        </div>
    );

};