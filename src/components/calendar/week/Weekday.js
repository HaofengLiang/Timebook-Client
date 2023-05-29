import "./Weekday.css"
import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { useSelector } from 'react-redux'
import moment from 'moment';
import Events from "../../event/Events";

// function Event({ event }) {
//     return (
//         <div className="event">
//             <div className="eventTitle">{event.title}</div>
//             <div className="eventTime">{event.startDateTime.format('hh:mm A')} - {event.endDateTime.format('hh:mm A')}</div>
//             <div className="eventDescription">{event.description}</div>
//         </div>
//     );
// };

export default function WeekDay({ day, onEventSelect, isHeader }) {
    // const events = useSelector((state) => state.events.value.filter(item => item.startDateTime.isSame(day, "day")));
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

        // const event = events?.find(event =>
        //     event.startDateTime.isSame(dateTime) || event.startDateTime.isBetween(dateTime, moment(dateTime).add(minsPerSection, 'minutes'))
        // );  
        
        let rowSpan = 1;
        // if (event) {
        //     const startDateTime = moment(event.startDateTime);
        //     const endDateTime = moment(event.endDateTime);
        //     const minsDiff = endDateTime.diff(startDateTime, 'minutes');
        //     rowSpan = minsDiff === 0 ? 1 : Math.ceil(minsDiff / minsPerSection);
        // }

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

        i += rowSpan;
    };

    return (
        <div>
            <List className="dayBody">
                {listItems}
            </List>
            <List className="eventsList">
                <Events day={day} onEventSelect={onEventSelect}/>
            </List>
        </div>
    );

};