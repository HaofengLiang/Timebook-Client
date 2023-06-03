import { configureStore } from '@reduxjs/toolkit';
import eventsReducer from '../reducers/eventsSlice';

export default configureStore({
  reducer: {
    events: eventsReducer,
  },
});
