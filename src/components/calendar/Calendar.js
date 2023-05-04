import React from "react";
import { Provider } from "react-redux";
import WeekView from "./week/WeekView";
import EventForm from "../event/EventForm";
import store from "./week/store";

export default function Calendar() {
    return (
        <Provider store={store}>
            <EventForm />
            <WeekView selectedDate={'2023-05-03'} />
        </Provider>
    );
}
