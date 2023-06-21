import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment';

export const calendarConfigSlice = createSlice({
  name: 'calendarConfig',
  initialState: {
    value: { date: moment().toISOString() },
  },
  reducers: {
    saveDate: (state, action) => {
      state.value.date = action.payload;
    },
  },
});

export const { saveDate } = calendarConfigSlice.actions;

export default calendarConfigSlice.reducer;
