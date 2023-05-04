import React, { useState } from "react";
import { Provider } from "react-redux";
import WeekView from "./week/WeekView";
import EventForm from "../event/EventForm";
import store from "./week/store";
import { Button, Modal, Box, Typography } from "@mui/material";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

export default function Calendar() {
    const [showForm, setShowForm] = useState(false);

    return (
        <Provider store={store}>
            <Button onClick={() => setShowForm(true)}>Show</Button>
            <Modal open={showForm} onClose={() => setShowForm(false)}>
                <Box sx={style}>
                    <EventForm />
                </Box>
            </Modal>
            <WeekView selectedDate={'2023-05-03'} />
        </Provider>
    );
}
