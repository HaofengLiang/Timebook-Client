import moment from "moment";

export function fetchEvents() {
    // TODO: Call actual service to fetch events.
    return [
        {
            id: 1,
            title: "Pratice on BFS",
            start: moment().startOf('day').add(9, "hours"),
            end: moment().startOf('day').add(11, "hours"),
            description: "Go to leetcode.com and pratice BFS algorithm.",
            priority: 0,
        },
        {
            id: 2,
            title: "Pratice on DFS",
            start: moment().startOf('day').add(11, "hours"),
            end: moment().startOf('day').add(12, "hours"),
            description: "Go to leetcode.com and pratice DFS algorithm.",
            priority: 0,
        },
        // {
        //     id: 3,
        //     title: "Pratice on Graph",
        //     start: "05-04-2023 09:00:00",
        //     end: "05-04-2023 10:00:00",
        //     description: "Go to leetcode.com and pratice Graph algorithm.",
        //     priority: 0,
        // },
        // {
        //     id: 4,
        //     title: "Pratice on Array",
        //     start: "05-04-2023 14:00:00",
        //     end: "05-04-2023 14:15:00",
        //     description: "Go to leetcode.com and pratice Array algorithm.",
        //     priority: 0,
        // },
        // {
        //     id: 5,
        //     title: "Pratice on LinkedList",
        //     start: "05-05-2023 09:00:00",
        //     end: "05-05-2023 10:00:00",
        //     description: "Go to leetcode.com and pratice LinkedList algorithm.",
        //     priority: 0,
        // }
    ]
}

export function saveEvent(event) {
    // TODO: Call actual service to save event.
    console.log("Saving event...")
    console.log(event);
}