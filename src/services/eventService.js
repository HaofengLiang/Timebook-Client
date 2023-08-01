import moment from 'moment';
import axios from 'axios';
// import { Auth } from 'aws-amplify';

// const apiUrl = 'http://localhost:8080/v1';

function transformEvent(event) {
  return {
    ...event,
    startDateTime: moment.utc(event.startDateTime).local(),
    endDateTime: moment.utc(event.endDateTime).local(),
  };
}

// async function getAuthToken() {
//   const session = await Auth.currentSession();
//   return 'Bearer ' + session.getIdToken().getJwtToken();
// }

// axios.interceptors.request.use(
//   async (config) => {
//     config.headers.authorization = await getAuthToken();
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

export async function fetchEvents() {
  let weekEvents = [];
  await axios
    .get(`/events`)
    .then((res) => {
      weekEvents = res.data.map((event) => transformEvent(event));
    })
    .catch((error) => console.log(error));
  return weekEvents;
}

export async function fetchEventsByWeek(date) {
  return axios.get(`/calendar/week/${date.format('YYYY-MM-DD')}`);
}

export function saveEvent(event) {
  return axios.post(`/events`, event);
}

export function deleteEvent(eventId) {
  return axios.delete(`/events/${eventId}`);
}

export async function addCalendar(email) {
  return axios.post(`/subscribe`, { email });
}

export async function deleteCalendar(email) {
  return axios.post(`/unsubscribe`, { email });
}
