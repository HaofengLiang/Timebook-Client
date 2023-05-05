import { Button, TableCell, TableBody, TableRow, Typography } from "@mui/material";
import moment from 'moment';
import React from 'react';
import './Weekday.css';

function WeekCell({ events, day, minutesOfDay, onDateTimeSelect }) {
    const dateTime = moment(day).startOf('day').add(minutesOfDay, 'minutes');
    const event = events?.find((event) => { return moment(event.start).isBetween(dateTime, moment(dateTime).add(30, "minutes")) });

    if (event) {
        console.log(event);
    }

    let rowSpan = 1;
    if (event) {
        const eventStart = moment(event.start);
        const eventEnd = moment(event.end);
        const eventDuration = moment.duration(eventEnd.diff(eventStart));
        rowSpan = eventDuration.asMinutes() / 30;
    }

    return (
        <TableCell key={day.format('MM-DD-yyyy-h-mm-A') + '-cell'} className="tableCell" rowSpan={rowSpan}>
            <Button className="datetimeButton" onClick={() => onDateTimeSelect(dateTime)}>
                {event && event.title}
            </Button>
        </TableCell>);

}


export default function WeekBody({ events, days, onDateTimeSelect }) {
    const hrs = 24;
    const minsPerSection = 30;
    const numOfSections = hrs * (60 / minsPerSection);
    const rows = [...Array(numOfSections)].map((_, i) => {
        const minutesOfDay = i * minsPerSection;
        const time = moment().startOf('day').add(minutesOfDay, 'minutes');
        return (
            <TableRow key={i} className='Item'>
                <TableCell key={time.format('h-mm-A') + '-header'} className="tableCell">
                    <Typography id="event-form-title" variant="body1" component="h2">
                        {time.format('h:mm A')}
                    </Typography>
                </TableCell>
                {days.map((day) => <WeekCell events={events} day={day} minutesOfDay={minutesOfDay} onDateTimeSelect={onDateTimeSelect} />)}
            </TableRow >)
    });


    return (
        <TableBody>
            {rows}
        </TableBody>
    );
}
