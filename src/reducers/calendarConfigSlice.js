import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment';

export const calendarConfigSlice = createSlice({
  name: 'calendarConfig',
  initialState: {
    value: { date: moment().toISOString(), hiddenEmails: [], userEmail: '' },
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
    setUserEmail: (state, action) => {
      state.value.userEmail = action.payload;
    },
  },
});

export const { saveDate, updateHiddenEmail, setUserEmail } =
  calendarConfigSlice.actions;

export default calendarConfigSlice.reducer;
