import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import { saveEvent as saveEventApi, deleteEvent as deleteEventApi, fetchEventsByWeek } from "../services/eventService";
import moment from "moment";

// export const SET_USER = "SET_USER";
// export const GET_USER = "GET_USER";

function transformEvent(event) {
    return {
        ...event,
        startDateTime: moment.utc(event.startDateTime).local(),
        endDateTime: moment.utc(event.endDateTime).local()
    }
}

export const saveEvent = createAsyncThunk('events/savedEvent', async (event) => {
    const response = await saveEventApi(event);
    return response.data;
})

export const getEvents = createAsyncThunk('events/getEvents', async (date) => {
    const response = await fetchEventsByWeek(date);
    return response.data;
})

export const deleteEvent = createAsyncThunk('events/deleteEvent', async(eventId) => {
    const response = await deleteEventApi(eventId);
    return response.data;
})

export const resetActionStatus = createAction('events/resetActionStatus')

export const eventsSlice = createSlice({
    name: 'events',
    initialState: {
        value:[],
        status:'idle',
        error: null
    },
    reducers: {},
    extraReducers(builder) {
        builder
        .addCase(getEvents.pending, (state, action) => {
          state.status = 'loading'
        })
        .addCase(getEvents.fulfilled, (state, action) => {
          state.status = 'succeeded'
          state.value = action.payload.map(event => transformEvent(event));
        })
        .addCase(getEvents.rejected, (state, action) => {
          state.status = 'failed'
          state.error = action.error.message
        })       
        .addCase(saveEvent.pending, (state, action) => {
          state.status = 'loading'
        })
        .addCase(saveEvent.fulfilled, (state, action) => {
          state.status = 'succeeded'
          state.value = [...state.value.filter(item => item.id !== action.payload.id), transformEvent(action.payload)]
        })
        .addCase(saveEvent.rejected, (state, action) => {
          state.status = 'failed'
          state.error = action.error.message
        })
        .addCase(deleteEvent.pending, (state, action) => {
          state.status = 'loading'
        })
        .addCase(deleteEvent.fulfilled, (state, action) => {
          state.status = 'succeeded'
          state.value = state.value.filter(item => item.id !== action.payload)
        })
        .addCase(deleteEvent.rejected, (state, action) => {
          state.status = 'failed'
          state.error = action.error.message
        })
        .addCase(resetActionStatus, (state, action) => {
          state.status = 'idle'
          state.error = null
        })
      }
})

export default eventsSlice.reducer;
