import "./Weekday.css";
import React from "react";
import moment from "moment";
import WeekBody from "./WeekBody";
import { TableContainer, Table, TableHead, TableRow, TableCell } from "@mui/material";

function DayHeader({ day }) {
    // Render the day names at the top of the week view
    return (
        <div className="dayHeader">
            <span>{day.format('dddd')}</span>
            <span>{day.format('D')}</span>
        </div>);
}

export default function WeekView({ selectedDate, events, onDateTimeSelect }) {
    const days = [0, 1, 2, 3, 4, 5, 6].map((dayOffset) =>
        moment(selectedDate).startOf('week').add(dayOffset, 'day')
    )

    return (
        <div>
            <h1>Weekday</h1>
            <TableContainer sx={{ height: '85vh' }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell key='day-header' className="tableCell"></TableCell>
                            {days.map((day) => (
                                <TableCell
                                    key={day.format('mm-dd-yyyy') + 'header'}
                                    className="tableCell"
                                    align="center"
                                >
                                    <DayHeader day={day} />
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <WeekBody events={events} days={days} onDateTimeSelect={onDateTimeSelect} />
                </Table>
            </TableContainer>
        </div>
    );
}