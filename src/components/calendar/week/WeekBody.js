import { TableCell, TableBody, TableRow } from "@mui/material";
import React from 'react';
import './Weekday.css';
import Weekday from "./Weekday";

export default function WeekBody({ events, days, onDateTimeSelect }) {
    return (
        <TableBody>
            <TableRow key={"datetime"} className='Item'>
                <TableCell key={'datetime-header'} className="tableCell">
                    <Weekday />
                </TableCell>
                {days.map((day) =>
                    <TableCell key={day.format("MM-DD-yyyy") + '-datetime-body'} className="tableCell" align="center">
                        <Weekday day={day} events={events} onDateTimeSelect={onDateTimeSelect} />
                    </TableCell>)
                }
            </TableRow >
        </TableBody>
    );
}
