
import React, { useMemo } from "react";
import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import moment from "moment";
import { useSelector } from "react-redux";
import "./Events.css";

function Event({ event }) {
    return (
        <div className="event">
            <div className="eventTitle">{event.title}</div>
            <div className="eventTime">{event.startDateTime.format('hh:mm A')} - {event.endDateTime.format('hh:mm A')}</div>
            <div className="eventDescription">{event.description}</div>
        </div>
    );
}; 

export default function Events({ day, onEventSelect }) {    
    const events = useSelector((state) => state.events.value.filter(item => item.startDateTime.isSame(day, "day")));
    // const event = events?.find(event =>
    //     event.startDateTime.isSame(dateTime) || event.startDateTime.isBetween(dateTime, moment(dateTime).add(30, 'minutes'))
    // );  
    const positionMapping = events.map(event => {
        const startDateTime = moment(event.startDateTime);
        const endDateTime = moment(event.endDateTime);
        const minsDiff = endDateTime.diff(startDateTime, 'minutes');
        const startPosition = moment(event.startDateTime).diff(moment(event.startDateTime).startOf('day'), 'minutes')/ 1440 * 240;
        // const startPosition = moment(event.startDateTime).minute() / 1440 * 240;
            console.log(startPosition)
        return (
            <ListItem key={ event?.id  + "-list-item"} className='datetimeItem' style={{ height: (minsDiff * 5) + "vh", top: startPosition + "vh" }}>
                <ListItemButton onClick={() => onEventSelect(event)} className="datetimeButton">
                    <div className="event">
                        <div className="eventTitle">{event.title}</div>
                        <div className="eventTime">{event.startDateTime.format('hh:mm A')} - {event.endDateTime.format('hh:mm A')}</div>
                        <div className="eventDescription">{event.description}</div>
                    </div> 
                </ListItemButton>
            </ListItem >
        )
    })

    return(
        <div>
            {positionMapping}
        </div>
    )
}
