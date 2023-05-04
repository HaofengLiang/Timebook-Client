import moment from 'moment';

// Actions
const SET_CURRENT_WEEK_START = 'weekView/SET_CURRENT_WEEK_START';
const FETCH_WEEK_EVENTS = 'weekView/FETCH_WEEK_EVENTS';

// Action creators
export function setCurrentWeekStart(currentWeekStart) {
    return {
        type: SET_CURRENT_WEEK_START,
        payload: currentWeekStart,
    };
}

export function fetchWeekEvents() {
    return {
        type: FETCH_WEEK_EVENTS,
        payload: fetchEvents(
            moment().startOf('week'),
            moment().startOf('week').add(6, 'days')
        ),
    };
}

// Reducer
const initialState = {
    currentWeekStart: moment().startOf('week'),
    events: [],
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_CURRENT_WEEK_START:
            return {
                ...state,
                currentWeekStart: action.payload,
            };
        case FETCH_WEEK_EVENTS:
            return {
                ...state,
                events: action.payload,
            };
        default:
            return state;
    }
}
