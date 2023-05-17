import moment from "moment";
import axios from "axios";
import { Auth } from 'aws-amplify';

const apiUrl = 'http://localhost:8080/v1';

function transformEvent(event) {
    return {
        ...event,
        startDateTime: moment.utc(event.startDateTime).local(),
        endDateTime: moment.utc(event.endDateTime).local()
    }
}

async function getAuthToken() {
    const session = await Auth.currentSession();
    return 'Bearer ' + session.getIdToken().getJwtToken();
}

axios.interceptors.request.use(
    async config => {
        config.headers.authorization = await getAuthToken();
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export async function fetchEvents() {
    let weekEvents = [];
    await axios.get(`${apiUrl}/events`).then(res => {
        weekEvents = res.data;
        weekEvents.map(event => transformEvent(event));
    }).catch(
        error => console.log(error)
    );
    return weekEvents;
}

export async function fetchEventsByWeek(date) {
    let weekEvents = [];

    await axios.get(`${apiUrl}/calendar/week/${date.format('YYYY-MM-DD')}`).then(res => {
        weekEvents = res.data;
        weekEvents.forEach(event => transformEvent(event));
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