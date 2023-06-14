import { TextField, Grid, Button } from '@mui/material';
import { useState } from 'react';
export default function ServiceForm() {
  const [calendarName, setCalendarName] = useState('');

  const onSubmitHandler = (e) => {
    e.preventDefault();
  };
  return (
    <form onSubmit={onSubmitHandler}>
      <Grid container spacing={2}>
        <Grid item sx={10}>
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
      </Grid>
    </form>
  );
}
