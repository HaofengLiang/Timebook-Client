import "./WeekView.css";
import React from "react";
import moment from "moment";
import WeekDay from "./Weekday";
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from "@mui/material";

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
                </Table>
            </TableContainer>
        </div>
    );
}