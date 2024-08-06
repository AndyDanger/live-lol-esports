import './styles/scheduleStyle.css'

import { getScheduleResponse } from "../../utils/LoLEsportsAPI";
import { EventCard } from "./EventCard";
import { useEffect, useState } from "react";

import { Schedule, ScheduleEvent } from "../types/baseTypes";

export function EventsSchedule() {
    const [liveEvents, setLiveEvents] = useState<ScheduleEvent[]>([])
    const [last7DaysEvents, setlast7DaysEvents] = useState<ScheduleEvent[]>([])
    const [next7DaysEvents, setNext7DaysEvents] = useState<ScheduleEvent[]>([])

    useEffect(() => {
        getScheduleResponse().then(response => {
            let schedule: Schedule = response.data.data.schedule
            console.groupCollapsed(`Scheduled Matches: ${schedule.events.length}`)
            console.table(schedule.events)
            console.groupEnd()
            setLiveEvents(schedule.events.filter(filterLiveEvents))
            setlast7DaysEvents(schedule.events.filter(filterByLast7Days))
            setNext7DaysEvents(schedule.events.filter(filterByNext7Days))
        }).catch(error =>
            console.error(error)
        )
    }, [])

    document.title = "LoL Live Esports";

    let scheduledEvents = [
        {
            emptyMessage: 'No Live Matches',
            scheduleEvents: liveEvents,
            title: 'Live Matches',
        },
        {
            emptyMessage: 'No Upcoming Matches',
            scheduleEvents: next7DaysEvents,
            title: 'Upcoming Matches',
        },
        {
            emptyMessage: 'No Recent Matches',
            scheduleEvents: last7DaysEvents,
            title: 'Recent Matches',
        }
    ]

    return (
        <div className="orders-container">
            {scheduledEvents.map(scheduledEvent => (
                <EventCards key={scheduledEvent.title} emptyMessage={scheduledEvent.emptyMessage} scheduleEvents={scheduledEvent.scheduleEvents} title={scheduledEvent.title} />
            ))}
        </div>
    );
}

type EventCardProps = {
    emptyMessage: string;
    scheduleEvents: ScheduleEvent[];
    title: string;
}

function EventCards({ emptyMessage, scheduleEvents, title }: EventCardProps) {
    if (scheduleEvents !== undefined && scheduleEvents.length !== 0) {
        return (
            <div>
                <h2 className="games-of-day">{title}</h2>
                <div className="games-list-container">
                    <div className="games-list-items">
                        {scheduleEvents.sort((a, b) => {
                            return (new Date(a.startTime).getTime() - new Date(b.startTime).getTime()) || a.league.name.localeCompare(b.league.name)
                        }).map(scheduleEvent => {
                            return scheduleEvent.league.slug !== "tft_esports" ? (
                                <EventCard
                                    key={`${scheduleEvent.match.id}_${scheduleEvent.startTime}`}
                                    scheduleEvent={scheduleEvent}
                                />
                            ) : null
                        })
                        }
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <h2 className="games-of-day">{emptyMessage}</h2>
        );
    }
}

function filterLiveEvents(scheduleEvent: ScheduleEvent) {
    return scheduleEvent.match !== undefined && (scheduleEvent.state === "inProgress" || (scheduleEvent.state === "unstarted" && ((scheduleEvent.match.teams[0].result && scheduleEvent.match.teams[0].result.gameWins > 0 && !scheduleEvent.match.teams[0].result.outcome) || scheduleEvent.match.teams[0].result && scheduleEvent.match.teams[1].result.gameWins > 0 && !scheduleEvent.match.teams[1].result.outcome)));
}

function filterByLast7Days(scheduleEvent: ScheduleEvent) {
    if (scheduleEvent.state === "completed" || (scheduleEvent.match !== undefined && (scheduleEvent.match.teams[0].result && scheduleEvent.match.teams[0].result.outcome))) {
        let minDate = new Date();
        let maxDate = new Date()
        minDate.setDate(minDate.getDate() - 7)
        maxDate.setHours(maxDate.getHours() - 1)
        let eventDate = new Date(scheduleEvent.startTime)

        if (eventDate.valueOf() > minDate.valueOf() && eventDate.valueOf() < maxDate.valueOf()) {

            if (scheduleEvent.match === undefined) return false
            if (scheduleEvent.match.id === undefined) return false

            return true;
        } else {
            console.log(`here`)
            return false;
        }
    } else {
        return false
    }
}

function filterByNext7Days(scheduleEvent: ScheduleEvent) {
    if (scheduleEvent.state === "inProgress" || (scheduleEvent.state === "completed" && (scheduleEvent.match.teams[0].result && scheduleEvent.match.teams[0].result.gameWins > 0) || (scheduleEvent.match.teams[1].result && scheduleEvent.match.teams[1].result.gameWins > 0))) {
        return
    }
    let minDate = new Date();
    let maxDate = new Date()
    minDate.setHours(minDate.getHours() - 1)
    maxDate.setDate(maxDate.getDate() + 7)
    let eventDate = new Date(scheduleEvent.startTime)

    if (eventDate.valueOf() > minDate.valueOf() && eventDate.valueOf() < maxDate.valueOf()) {

        if (scheduleEvent.match === undefined) return false
        if (scheduleEvent.match.id === undefined) return false

        return true;
    } else {
        return false;
    }
}