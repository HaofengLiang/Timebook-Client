
import React from "react";
import { ListItem, ListItemButton } from '@mui/material';
import moment from "moment";
import { useSelector } from "react-redux";
import "./Events.css";

export default function Events({ day, onEventSelect }) {    
    const events = useSelector((state) => state.events.value.filter(item => item.startDateTime.isSame(day, "day")));

    const positionMapping = events.map(event => {
        const startDateTime = moment(event.startDateTime);
        const endDateTime = moment(event.endDateTime);
        const positionDiff = endDateTime.diff(startDateTime, 'minutes')/ 1440 * 240;
        const startPosition = moment(event.startDateTime).diff(moment(event.startDateTime).startOf('day'), 'minutes')/ 1440 * 240;

        return (
            <ListItem key={ event?.id  + "-list-item"} className='eventItem' style={{ height: positionDiff + "vh", top: startPosition + "vh" }}>
                <ListItemButton onClick={() => onEventSelect(event)}>
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
