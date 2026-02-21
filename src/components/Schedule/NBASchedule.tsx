import './styles/scheduleStyle.css'
import { EventCard } from "./EventCard";
import { ScheduleEvent } from "../types/baseTypes";

export function NBASchedule() {

    // Mock Data for NBA
    const liveEvents: ScheduleEvent[] = [
        {
            startTime: new Date(),
            state: "inProgress",
            type: "match",
            league: { name: "NBA Regular Season", slug: "nba" },
            match: {
                id: "nba-1",
                teams: [
                    { code: "LAL", image: "https://cdn.nba.com/logos/nba/1610612747/primary/L/logo.svg", name: "Lakers", result: { gameWins: 105 }, record: { wins: 30, losses: 15 } },
                    { code: "BOS", image: "https://cdn.nba.com/logos/nba/1610612738/primary/L/logo.svg", name: "Celtics", result: { gameWins: 98 }, record: { wins: 35, losses: 10 } }
                ],
                strategy: { count: 1, type: "bestOf" }
            }
        }
    ];

    const upcomingEvents: ScheduleEvent[] = [
        {
            startTime: new Date(new Date().getTime() + 86400000), // Tomorrow
            state: "unstarted",
            type: "match",
            league: { name: "NBA Regular Season", slug: "nba" },
            match: {
                id: "nba-2",
                teams: [
                    { code: "GSW", image: "https://cdn.nba.com/logos/nba/1610612744/primary/L/logo.svg", name: "Warriors", result: { gameWins: 0 }, record: { wins: 25, losses: 20 } },
                    { code: "PHX", image: "https://cdn.nba.com/logos/nba/1610612756/primary/L/logo.svg", name: "Suns", result: { gameWins: 0 }, record: { wins: 28, losses: 18 } }
                ],
                strategy: { count: 1, type: "bestOf" }
            }
        }
    ];

    const recentEvents: ScheduleEvent[] = [
         {
            startTime: new Date(new Date().getTime() - 86400000), // Yesterday
            state: "completed",
            type: "match",
            league: { name: "NBA Regular Season", slug: "nba" },
            match: {
                id: "nba-3",
                teams: [
                    { code: "MIA", image: "https://cdn.nba.com/logos/nba/1610612748/primary/L/logo.svg", name: "Heat", result: { gameWins: 110, outcome: "win" }, record: { wins: 22, losses: 22 } },
                    { code: "NYK", image: "https://cdn.nba.com/logos/nba/1610612752/primary/L/logo.svg", name: "Knicks", result: { gameWins: 102, outcome: "loss" }, record: { wins: 26, losses: 19 } }
                ],
                strategy: { count: 1, type: "bestOf" }
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
