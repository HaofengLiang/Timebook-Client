import React, { Fragment, useEffect, useState } from "react";
import WeekView from "./week/WeekView";
import EventForm from "../event/EventForm";
import { Modal, Box } from "@mui/material";
import { deleteEvent, fetchEventsByWeek, saveEvent } from "../../services/eventService";
import moment from "moment";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

export default function Calendar() {
    const [showForm, setShowForm] = useState(false);
    const [selectedDateTime, setSelectedDateTime] = useState(moment());
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState({});

    useEffect(() => {
        async function fetchData() {
            const events = await fetchEventsByWeek(selectedDateTime);
            setEvents(events);
        }

        fetchData();
    }, [selectedDateTime])

    const selectNextWeekHandler = () => {
        const newDateTime = moment(selectedDateTime).add(1, 'week');
        setSelectedDateTime(newDateTime);
    }

    const selectPreviousWeekHandler = () => {
        const newDateTime = moment(selectedDateTime).subtract(1, 'week');
        setSelectedDateTime(newDateTime);
    }

    const eventAddHandler = (event) => {
        const savedEvent = saveEvent(event);
        setEvents([...events.filter(item => item.id !== savedEvent.id), savedEvent]);
        setShowForm(false);
    }

    const eventDeleteHandler = async (event) => {
        const deletedEventId = await deleteEvent(event);
        setEvents(events.filter(item => item.id !== deletedEventId));
        setShowForm(false);
    }

    const eventSelectedHander = (event) => {
        setSelectedEvent(event);
        setShowForm(true);
    }

    return (
        <Fragment>
            <Modal open={showForm} onClose={() => setShowForm(false)}>
                <Box sx={style}>
                    <EventForm selectedEvent={selectedEvent} onSubmit={eventAddHandler} onDelete={eventDeleteHandler}/>
                </Box>
            </Modal>
            <WeekView
                onNextWeekClick={selectNextWeekHandler}
                onPreviousWeekClick={selectPreviousWeekHandler}
                onEventSelect={eventSelectedHander}
                selectedDate={selectedDateTime}
                events={events}
            />
        </Fragment>
    );
}
