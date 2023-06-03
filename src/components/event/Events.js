import React from 'react';
import { ListItem, ListItemButton } from '@mui/material';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import moment from 'moment';
import { useSelector } from 'react-redux';
import './Events.css';

const MINUTES_PER_DAY = 1440;
const TOTAL_HEIGHT_IN_VH = 240;

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

function compareEventTimeFn(a, b) {
  const startDiff = moment(a.startDateTime).diff(moment(b.startDateTime));
  if (startDiff !== 0) {
    return startDiff;
  }

  return moment(b.endDateTime).diff(moment(a.endDateTime));
}

function getEventWidthMap(events) {
  if (!events || events.length === 0) {
    return {};
  }

  const popLastElementToMap = (stack, map) => {
    map[stack.at(-1).id.toString()] = 90 / stack.length + '%';
    stack.pop();
  };

  events.sort(compareEventTimeFn);

  const widthMap = {};
  const stack = [];
  for (const event of events) {
    while (
      stack.length &&
      moment(stack.at(-1).endDateTime).isBefore(moment(event.endDateTime))
    ) {
      popLastElementToMap(stack, widthMap);
    }

    stack.push(event);
  }

  while (stack.length > 0) {
    popLastElementToMap(stack, widthMap);
  }

  return widthMap;
}

export default function Events({ day, onEventSelect }) {
  const events = useSelector((state) =>
    state.events.value.filter((item) => item.startDateTime.isSame(day, 'day'))
  );

  const eventWidthMap = getEventWidthMap(events);
  const eventItems = events.map((event) => {
    const positionDiff =
      (moment(event.endDateTime).diff(moment(event.startDateTime), 'minutes') /
        MINUTES_PER_DAY) *
      TOTAL_HEIGHT_IN_VH;
    const startPosition =
      (moment(event.startDateTime).diff(
        moment(event.startDateTime).startOf('day'),
        'minutes'
      ) /
        MINUTES_PER_DAY) *
      TOTAL_HEIGHT_IN_VH;

    return (
      <LightTooltip
        title={
          <>
            <div className="eventTitle">{event.title}</div>
            <div className="eventTime">
              {event.startDateTime.format('hh:mm A')} -{' '}
              {event.endDateTime.format('hh:mm A')}
            </div>
            <div className="eventDescription">{event.description}</div>
          </>
        }
        placement="top"
      >
        <ListItem
          key={event.id + '-list-item'}
          className="eventItem"
          style={{
            width: eventWidthMap[event.id.toString()],
            height: positionDiff + 'vh',
            top: startPosition + 'vh',
          }}
        >
          <ListItemButton
            className="eventButton"
            onClick={() => onEventSelect(event)}
          >
            <div className="event">
              <div className="eventTitle">{event.title}</div>
            </div>
          </ListItemButton>
        </ListItem>
      </LightTooltip>
    );
  });

  return eventItems;
}
