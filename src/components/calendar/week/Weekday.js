import "./Weekday.css"
import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import moment from 'moment';

function Event({ event }) {
    return (
        <div className="event">
            <div className="eventTitle">{event.title}</div>
            <div className="eventTime">{event.startDateTime.format('hh:mm A')} - {event.endDateTime.format('hh:mm A')}</div>
            <div className="eventDescription">{event.description}</div>
        </div>
    );
};

export default function WeekDay({ events, day, onDateTimeSelect, isHeader }) {
    const heightPerRowInVH = 5;
    const hrs = 24;
    const minsPerSection = 30;
    const numOfSections = hrs * (60 / minsPerSection);
    let i = 0;
    const listItems = [];
    while (i < numOfSections) {
        const dateTime = moment(day).startOf('day').add(i * minsPerSection, 'minutes');

        const event = events?.find(event =>
            event.startDateTime.isSame(dateTime) || event.startDateTime.isBetween(dateTime, moment(dateTime).add(minsPerSection, 'minutes'))
        );

        let rowSpan = 1;
        if (event) {
            const startDateTime = moment(event.startDateTime);
            const endDateTime = moment(event.endDateTime);
            rowSpan = endDateTime.diff(startDateTime, 'minutes') / minsPerSection;
        }

        listItems.push(
            isHeader ?
                <ListItem key={dateTime.format('hh-mm-A') + "list-item"} className='datetimeHeader' style={{ height: heightPerRowInVH + "vh" }}>
                    <ListItemText primary={dateTime.format('hh:mm A')} />
                </ListItem> :
                <ListItem key={dateTime.format('MM-DD-yyyy-hh-mm-A') + "-list-item"} className='datetimeItem' style={{ height: (rowSpan * heightPerRowInVH) + "vh" }}>
                    <ListItemButton onClick={() => onDateTimeSelect(dateTime)} className="datetimeButton">
                        {event && <Event event={event} />}
                    </ListItemButton>
                </ListItem >
        );

        i += rowSpan;
    };

    return (
        <List className="dayBody">
            {listItems}
        </List>
    );

};