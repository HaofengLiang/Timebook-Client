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

    const updateEventsByWeek = async (newDateTime) => {
        await fetchEventsByWeek(newDateTime);
        setSelectedDateTime(newDateTime);
        console.log(newDateTime.format('MM-DD-YYYY'));
    }

    const selectNextWeekHandler = () => {
        const newDateTime = moment(selectedDateTime).add(1, 'week');
        updateEventsByWeek(newDateTime);
    }

    const selectPreviousWeekHandler = () => {
        const newDateTime = moment(selectedDateTime).subtract(1, 'week');
        updateEventsByWeek(newDateTime);
    }

    const eventAddHandler = (event) => {
        saveEvent(event);
        setEvents([...events, event]);
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
