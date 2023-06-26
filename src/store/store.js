import { configureStore } from '@reduxjs/toolkit';
import eventsReducer from '../reducers/eventsSlice';
import calendarConfigSliceReducer from '../reducers/calendarConfigSlice';

export default configureStore({
  reducer: {
    events: eventsReducer,
    calendarConfig: calendarConfigSliceReducer,
  },
});
