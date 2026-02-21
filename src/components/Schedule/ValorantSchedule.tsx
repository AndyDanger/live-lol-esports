import './styles/scheduleStyle.css'
import { EventCard } from "./EventCard";
import { ScheduleEvent } from "../types/baseTypes";

export function ValorantSchedule() {

    // Mock Data for Valorant
    const liveEvents: ScheduleEvent[] = [
        {
            startTime: new Date(),
            state: "inProgress",
            type: "match",
            league: { name: "VCT Americas", slug: "vct-americas" },
            match: {
                id: "val-1",
                teams: [
                    { code: "SEN", image: "https://static.lolesports.com/teams/sen-logo.png", name: "Sentinels", result: { gameWins: 1 }, record: { wins: 3, losses: 1 } },
                    { code: "100T", image: "https://static.lolesports.com/teams/100t-logo.png", name: "100 Thieves", result: { gameWins: 0 }, record: { wins: 2, losses: 2 } }
                ],
                strategy: { count: 3, type: "bestOf" }
            }
        }
    ];

    const upcomingEvents: ScheduleEvent[] = [
        {
            startTime: new Date(new Date().getTime() + 86400000), // Tomorrow
            state: "unstarted",
            type: "match",
            league: { name: "VCT EMEA", slug: "vct-emea" },
            match: {
                id: "val-2",
                teams: [
                    { code: "FNC", image: "https://static.lolesports.com/teams/fnc-logo.png", name: "Fnatic", result: { gameWins: 0 }, record: { wins: 4, losses: 0 } },
                    { code: "TL", image: "https://static.lolesports.com/teams/tl-logo.png", name: "Team Liquid", result: { gameWins: 0 }, record: { wins: 1, losses: 3 } }
                ],
                strategy: { count: 3, type: "bestOf" }
            }
        }
    ];

    const recentEvents: ScheduleEvent[] = [
         {
            startTime: new Date(new Date().getTime() - 86400000), // Yesterday
            state: "completed",
            type: "match",
            league: { name: "VCT Pacific", slug: "vct-pacific" },
            match: {
                id: "val-3",
                teams: [
                    { code: "DRX", image: "https://static.lolesports.com/teams/drx-logo.png", name: "DRX", result: { gameWins: 2, outcome: "win" }, record: { wins: 2, losses: 1 } },
                    { code: "T1", image: "https://static.lolesports.com/teams/t1-logo.png", name: "T1", result: { gameWins: 1, outcome: "loss" }, record: { wins: 1, losses: 2 } }
                ],
                strategy: { count: 3, type: "bestOf" }
            }
        }
    ];


    let scheduledEvents = [
        {
            emptyMessage: 'No Live Matches',
            scheduleEvents: liveEvents,
            title: 'Live Matches',
        },
        {
            emptyMessage: 'No Upcoming Matches',
            scheduleEvents: upcomingEvents,
            title: 'Upcoming Matches',
        },
        {
            emptyMessage: 'No Recent Matches',
            scheduleEvents: recentEvents,
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
                        {scheduleEvents.map(scheduleEvent => {
                            return (
                                <EventCard
                                    key={`${scheduleEvent.match.id}_${scheduleEvent.startTime}`}
                                    scheduleEvent={scheduleEvent}
                                />
                            )
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
