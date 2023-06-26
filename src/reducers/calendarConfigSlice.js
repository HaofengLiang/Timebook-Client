import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment';

export const calendarConfigSlice = createSlice({
  name: 'calendarConfig',
  initialState: {
    value: { date: moment().toISOString(), hiddenEmails: [] },
  },
  reducers: {
    saveDate: (state, action) => {
      state.value.date = action.payload;
    },
    updateHiddenEmail: (state, action) => {
      if (state.value.hiddenEmails.includes(action.payload)) {
        state.value.hiddenEmails = state.value.hiddenEmails.filter(
          (email) => action.payload !== email
        );
      } else {
        state.value.hiddenEmails.push(action.payload);
      }
    },
  },
});

export const { saveDate, updateHiddenEmail } = calendarConfigSlice.actions;

export default calendarConfigSlice.reducer;
