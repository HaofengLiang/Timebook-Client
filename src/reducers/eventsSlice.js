import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { saveEvent as saveEventApi, fetchEventsByWeek } from "../services/eventService";
import moment from "moment";

// export const GET_EVETN = "GET_EVENTS";
// export const DELETE_EVENT = "DELETE_EVENT";
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
      }
})

export default eventsSlice.reducer;
