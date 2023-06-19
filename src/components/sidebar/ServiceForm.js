import { TextField, Grid, Button } from '@mui/material';
import { useState } from 'react';
export default function ServiceForm({ onSubmit }) {
  const [calendarName, setCalendarName] = useState('');
  const onSubmitHandler = (e) => {
    e.preventDefault();
    onSubmit(calendarName);
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <Grid container spacing={2}>
        <Grid item sx={8}>
          <TextField
            label="Add calendar"
            value={calendarName}
            type="email"
            onChange={(e) => setCalendarName(e.target.value)}
          />
        </Grid>
        <Grid item xs={2}>
          <Button variant="contained" color="primary" type="submit">
            Add
          </Button>
        </Grid>
        <Grid item xs={2}>
          <Button variant="contained" color="primary" onClick="">
            Delete
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
