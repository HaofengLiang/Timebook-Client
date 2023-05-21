import React, { Fragment, useEffect, useState } from "react";
import WeekView from "./week/WeekView";
import EventForm from "../event/EventForm";
import { Modal, Box } from "@mui/material";
import { saveEvent, getEvents  } from "../../reducers/eventsSlice";
import { useDispatch } from "react-redux";
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
    const [selectedEvent, setSelectedEvent] = useState({});
    const dispatch = useDispatch();
    const today = moment();

    useEffect(() => {
        dispatch(getEvents(today));
    },[dispatch, today])

    const eventAddHandler = async (event) => {
        dispatch(saveEvent(event));
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
            <WeekView onEventSelect={eventSelectedHander} selectedDate={today} />
        </Fragment>
    );
}
