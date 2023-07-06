import { TextField, Grid, Button, Box, Autocomplete } from '@mui/material';
import { useState } from 'react';
export default function ServiceForm({
  onSubmit,
  onDelete,
  onChange,
  calendarNames,
}) {
  const [calendarName, setCalendarName] = useState({ email: '' });
  const [inputValue, setInputValue] = useState('');

  const onSubmitHandler = (e) => {
    e.preventDefault();
    onSubmit(calendarName.email);
  };

  const onDeleteHandler = () => {
    onDelete(calendarName.email);
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <Grid container spacing={2}>
        <Autocomplete
          id="service-form-search-bar"
          sx={{ width: 300 }}
          options={calendarNames}
          autoHighlight
          getOptionLabel={(option) => option.email}
          renderOption={(props, option) => (
            <Box component="li" sx={4} {...props}>
              {option.email}
            </Box>
          )}
          inputValue={inputValue}
          onInputChange={(e, newInput) => {
            setInputValue(newInput);
            onChange(newInput);
          }}
          value={calendarName}
          onChange={(e, newCalendarName) => {
            setCalendarName(newCalendarName);
            onChange();
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Add calendar"
              type="email"
              inputProps={{
                ...params.inputProps,
              }}
            />
          )}
        />
        <Grid item xs={2}>
          <Button variant="contained" color="primary" type="submit">
            Add
          </Button>
        </Grid>
        <Grid item xs={2}>
          <Button variant="contained" color="primary" onClick={onDeleteHandler}>
            Delete
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
