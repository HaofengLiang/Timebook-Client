import moment from "moment";
import axios from "axios";


export async function fetchEvents() {
    let weekEvents = [];
    await axios.get('http://localhost:8080/v1/events').then(res => {
        weekEvents = res.data;
        weekEvents.forEach(event => {
            event.startDateTime = moment(event.startDateTime);
            event.endDateTime = moment(event.endDateTime)
        })
    }).catch(
        error => console.log(error)
    );
    return weekEvents;
}

export function saveEvent(event) {
    // TODO: Call actual service to save event.
    console.log("Saving event...")
    console.log(event);
}