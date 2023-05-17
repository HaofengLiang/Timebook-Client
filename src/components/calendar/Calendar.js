import React, { Fragment, useEffect, useState } from "react";
import WeekView from "./week/WeekView";
import EventForm from "../event/EventForm";
import { Modal, Box } from "@mui/material";
import { fetchEventsByWeek, saveEvent } from "../../services/eventService";
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
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState({});
    const today = moment();

    useEffect(() => {
        async function fetchData() {
            const events = await fetchEventsByWeek(moment());
            setEvents(events);
        }

        fetchData()
    }, [])

    const eventAddHandler = async (event) => {
        const savedEvent = await saveEvent(event);
        setEvents([...events.filter(item => item.id !== savedEvent.id), savedEvent]);
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
                    <EventForm selectedEvent={selectedEvent} onSubmit={eventAddHandler} />
                </Box>
            </Modal>
            <WeekView onEventSelect={eventSelectedHander} selectedDate={today} events={events} />
        </Fragment>
    );
}
