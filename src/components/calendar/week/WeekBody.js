import { TableCell, TableBody, TableRow } from "@mui/material";
import React from 'react';
import './Weekday.css';
import WeekDay from "./Weekday";

export default function WeekBody({ events, days, onDateTimeSelect }) {
    console.log(events);
    return (
        <TableBody>
            <TableRow key={"datetime"} className='Item'>
                <TableCell key={'datetime-header'} className="tableCell">
                    <WeekDay isHeader />
                </TableCell>
                {days.map((day) =>
                    <TableCell key={day.format("MM-DD-yyyy") + '-datetime-body'} className="tableCell" align="center">
                        <WeekDay day={day} events={events?.filter(event => event.start.isSame(day, "day"))} onDateTimeSelect={onDateTimeSelect} />
                    </TableCell>)
                }
            </TableRow >
        </TableBody>
    );
}
