import React, { useState } from "react";
import { Provider } from "react-redux";
import WeekView from "./week/WeekView";
import EventForm from "../event/EventForm";
import store from "./week/store";
import { Modal, Box } from "@mui/material";
import { saveEvent } from "../../services/eventService";
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

    const today = moment();

    const eventAddHandler = (event) => {
        saveEvent(event);
        setShowForm(false);
    }

    const dateTimeSelectedHander = (dateTime) => {
        setSelectedDateTime(dateTime);
        setShowForm(true);
    }

    return (
        <Provider store={store}>
            <Modal open={showForm} onClose={() => setShowForm(false)}>
                <Box sx={style}>
                    <EventForm startDateTime={selectedDateTime} onSubmit={eventAddHandler} />
                </Box>
            </Modal>
            <WeekView onDateTimeSelect={dateTimeSelectedHander} selectedDate={today} />
        </Provider>
    );
}
