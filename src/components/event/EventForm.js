import { Button, Grid, TextField, Typography } from "@mui/material";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { Fragment, useEffect, useState } from 'react';


export default function EventForm({ onSubmit, selectedEvent }) {
    const [title, setTitle] = useState(selectedEvent.title);
    const [startDateTime, setStartDateTime] = useState(selectedEvent.startDateTime);
    const [endDateTime, setEndDateTime] = useState(selectedEvent.endDateTime);
    const [description, setDescription] = useState(selectedEvent.description);
    const [priority, setPriority] = useState(selectedEvent.priority);
    const [buttonDisabled, setButtonDisabled] = useState(true);

    const onSubmitHandler = (e) => {
        e.preventDefault();

        if(!title.trim() || !description.trim() || priority < 0)
        alert('Ha I got you trying to bypass the required fields, you cannot save your event with empty fields');

        else{
            const event = {
                id: selectedEvent.id,
                title,
                startDateTime,
                endDateTime,
                description,
                priority
            }
            onSubmit(event);
        }
    }

    useEffect(()=>{
        //if title,description input is empty then setButtonDiabled to true
        if(!title.trim() || !description.trim() || priority < 0)
        setButtonDisabled(true);
        else
        setButtonDisabled(false);

    },[title, description, priority]);

    return (
        <Fragment>
            <Typography id="event-form-title" variant="h5" component="h2">
                Event:
            </Typography>
            <LocalizationProvider dateAdapter={AdapterMoment}>
                <form onSubmit={onSubmitHandler}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="Title"
                                required
                                fullWidth
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <DateTimePicker
                                label="Start"
                                required
                                value={startDateTime}
                                onChange={(dateTime) => { setStartDateTime(dateTime) }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <DateTimePicker
                                label="End"
                                required
                                value={endDateTime}
                                onChange={(dateTime) => setEndDateTime(dateTime)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Description"
                                fullWidth
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Priority"
                                fullWidth
                                value={priority}
                                onChange={(e) => setPriority(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" color="primary" type="submit" disabled={buttonDisabled}>Save</Button>
                        </Grid>
                    </Grid>
                </form>
            </LocalizationProvider>
        </Fragment>

    );
}