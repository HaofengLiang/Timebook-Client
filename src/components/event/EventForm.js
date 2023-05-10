import { Button, Grid, TextField, Typography } from "@mui/material";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { Fragment, useState } from 'react';
import moment from "moment";


export default function EventForm({ onSubmit, start }) {
    start = moment(start).isBefore(moment(start).startOf('hour').add(30, "minutes"))
        ? moment(start).startOf('hour') : moment(start).startOf('hour').add(30, "minutes")

    const [title, setTitle] = useState('');
    const [startDateTime, setStartDateTime] = useState(start);
    const [endDateTime, setEndDateTime] = useState(moment(startDateTime).add(30, "minutes"));
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState(0);

    const onSubmitHandler = (e) => {
        e.preventDefault();

        const event = {
            title,
            startDateTime,
            endDateTime,
            description,
            priority
        }
        onSubmit(event);
    }

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
                            <Button variant="contained" color="primary" type="submit">Save</Button>
                        </Grid>
                    </Grid>
                </form>
            </LocalizationProvider>
        </Fragment>

    );
}