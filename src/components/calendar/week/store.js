import { createStore } from 'redux';

// Define the initial state of the store
const initialState = {
    events: [], // An array of events for the selected week
    selectedDate: new Date(), // The currently selected date
};

// Define the actions that can be performed on the store
export const actions = {
    SET_EVENTS: 'SET_EVENTS',
    SET_SELECTED_DATE: 'SET_SELECTED_DATE',
};

// Define the reducer that updates the state based on actions
function reducer(state = initialState, action) {
    switch (action.type) {
        case actions.SET_EVENTS:
            return { ...state, events: action.payload };
        case actions.SET_SELECTED_DATE:
            return { ...state, selectedDate: action.payload };
        default:
            return state;
    }
}

// Create the store with the reducer and initial state
const store = createStore(reducer);

export default store;