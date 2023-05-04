import { Button, TextField, Typography } from "@mui/material";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { Fragment, useState } from 'react';
import moment from "moment";


export default function EventForm() {
    const startDateTime = moment().isBefore(moment().startOf('hour').add(30, "minutes"))
        ? moment().startOf('hour') : moment().startOf('hour').add(30, "minutes")

    console.log(startDateTime.format('MM-DD-yyyy hh:mm:ss'))

    const [title, setTitle] = useState('');
    const [start, setStart] = useState(startDateTime);
    const [end, setEnd] = useState(moment(startDateTime).add(30, "minutes"));
    const [description, setDescription] = useState();
    const [priority, setPriority] = useState(0);

    const onSubmitHandler = (e) => {
        e.preventDefault();

        const event = {
            title,
            start,
            end,
            description,
            priority
        }
        console.log(event);
    }

    return (
        <Fragment>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                Text in a modal
            </Typography>
            <LocalizationProvider dateAdapter={AdapterMoment}>
                <form onSubmit={onSubmitHandler}>
                    <TextField
                        label="Title"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <DateTimePicker
                        label="Start"
                        required
                        value={start}
                        onChange={(dateTime) => { setStart(dateTime) }}
                    />
                    <DateTimePicker
                        label="End"
                        required
                        value={end}
                        onChange={(dateTime) => setEnd(dateTime)}
                    />

                    <TextField
                        label="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <TextField
                        label="Priority"
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                    />
                    <Button variant="contained" color="primary" type="submit">Save</Button>
                </form>
            </LocalizationProvider>
        </Fragment >
    );
}