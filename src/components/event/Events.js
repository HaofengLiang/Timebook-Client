
import React from "react";
import { ListItem, ListItemButton } from '@mui/material';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import moment from "moment";
import { useSelector } from "react-redux";
import "./Events.css";

const LightTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.white,
      color: 'rgba(0, 0, 0, 0.87)',
      boxShadow: theme.shadows[1],
      fontSize: 11,
    },
  }));

export default function Events({ day, onEventSelect }) {    
    const events = useSelector((state) => state.events.value.filter(item => item.startDateTime.isSame(day, "day")));

    const eventItems = events.map(event => {
        const positionDiff =
          (moment(event.endDateTime).diff(
            moment(event.startDateTime),
            'minutes'
          ) /
            1440) *
          240;
        const startPosition =
          (moment(event.startDateTime).diff(
            moment(event.startDateTime).startOf('day'),
            'minutes'
          ) /
            1440) *
          240;

        return (
            <LightTooltip title={
                <>
                    <div className="eventTitle">{event.title}</div>
                    <div className="eventTime">{event.startDateTime.format('hh:mm A')} - {event.endDateTime.format('hh:mm A')}</div>
                    <div className="eventDescription">{event.description}</div>
                </>
            } placement="top">
                <ListItem key={ event.id  + "-list-item"} className='eventItem' style={{ height: positionDiff + "vh", top: startPosition + "vh" }}>
                    <ListItemButton onClick={() => onEventSelect(event)}>
                        <div className="event">
                            <div className="eventTitle">{event.title}</div>
                        </div> 
                    </ListItemButton>
                </ListItem >
            </LightTooltip>
        )
    })

    return eventItems;
}
