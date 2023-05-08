import React, { Fragment, useState } from "react";
import WeekView from "./week/WeekView";
import EventForm from "../event/EventForm";
import { Modal, Box } from "@mui/material";
import { fetchEvents, saveEvent } from "../../services/eventService";
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
    const [events, setEvents] = useState(fetchEvents());

    const today = moment();

    const eventAddHandler = (event) => {
        saveEvent(event);
        setEvents([...events, event]);
        setShowForm(false);
    }

    const dateTimeSelectedHander = (dateTime) => {
        setSelectedDateTime(dateTime);
        setShowForm(true);
    }

    return (
        <Fragment>
            <Modal open={showForm} onClose={() => setShowForm(false)}>
                <Box sx={style}>
                    <EventForm startDateTime={selectedDateTime} onSubmit={eventAddHandler} />
                </Box>
            </Modal>
            <WeekView onDateTimeSelect={dateTimeSelectedHander} selectedDate={today} events={events} />
        </Fragment>
    );
}
