import React, { Fragment, useEffect, useState } from "react";
import WeekView from "./week/WeekView";
import EventForm from "../event/EventForm";
import { Modal, Box, CircularProgress, Backdrop } from "@mui/material";
import { saveEvent, getEvents, deleteEvent } from "../../reducers/eventsSlice";
import { useDispatch, useSelector } from "react-redux";
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
    const [selectedEvent, setSelectedEvent] = useState({});
    const dispatch = useDispatch();
    const today = moment();
    const eventActionStatus = useSelector((state) => state.events.status);

    useEffect(() => {
        dispatch(getEvents(today));
    },[dispatch])

    const selectNextWeekHandler = () => {
        const newDateTime = moment(selectedDateTime).add(1, 'week');
        setSelectedDateTime(newDateTime);
    }

    const selectPreviousWeekHandler = () => {
        const newDateTime = moment(selectedDateTime).subtract(1, 'week');
        setSelectedDateTime(newDateTime);
    }

    const eventAddHandler = async (event) => {
        dispatch(saveEvent(event));
        setShowForm(false);
    }

    const eventSelectedHander = (event) => {
        setSelectedEvent(event);
        setShowForm(true);
    }

    const eventDeleteHandler = async (event) => {
        dispatch(deleteEvent(event.id));
        setShowForm(false);
    }

    return (
        <Fragment>
            <Backdrop open={eventActionStatus === 'loading'}
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <CircularProgress color="inherit" />
            </Backdrop>
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
            />
        </Fragment>
    );
}
