import moment from "moment";

export function fetchEvents() {
    // TODO: Call actual service to fetch events.

    const today = moment().startOf('day');
    const tomorrow = moment(today).add(1, "day");
    const yesterday = moment(today).subtract(1, "day");

    return [
        {
            id: 1,
            title: "Pratice on BFS",
            start: moment(today).add(9, "hours"),
            end: moment(today).add(11, "hours"),
            description: "Go to leetcode.com and pratice BFS algorithm.",
            priority: 0,
        },
        {
            id: 2,
            title: "Pratice on DFS",
            start: moment(today).add(11, "hours"),
            end: moment(today).add(12, "hours"),
            description: "Go to leetcode.com and pratice DFS algorithm.",
            priority: 0,
        },
        {
            id: 3,
            title: "Pratice on Graph",
            start: moment(yesterday).add(9, "hours"),
            end: moment(yesterday).add(10, "hours"),
            description: "Go to leetcode.com and pratice Graph algorithm.",
            priority: 0,
        },
        {
            id: 4,
            title: "Pratice on Array",
            start: moment(yesterday).add(14, "hours"),
            end: moment(yesterday).add(14, "hours").add(30, "minutes"),
            description: "Go to leetcode.com and pratice Array algorithm.",
            priority: 0,
        },
        {
            id: 5,
            title: "Pratice on LinkedList",
            start: moment(tomorrow).add(9, "hours"),
            end: moment(tomorrow).add(14, "hours"),
            description: "Go to leetcode.com and pratice LinkedList algorithm.",
            priority: 0,
        }
    ]
}

export function saveEvent(event) {
    // TODO: Call actual service to save event.
    console.log("Saving event...")
    console.log(event);
}