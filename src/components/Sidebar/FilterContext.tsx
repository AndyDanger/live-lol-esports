import React, { createContext, useContext, useState, ReactNode } from "react";

export type MatchStatus = "live" | "upcoming" | "recent";

interface FilterState {
    matchStatus: Set<MatchStatus>;
    leagues: Set<string>;
    availableLeagues: string[];
    toggleMatchStatus: (status: MatchStatus) => void;
    toggleLeague: (league: string) => void;
    setAvailableLeagues: (leagues: string[]) => void;
}

const FilterContext = createContext<FilterState | undefined>(undefined);

export function FilterProvider({ children }: { children: ReactNode }) {
    const [matchStatus, setMatchStatus] = useState<Set<MatchStatus>>(new Set());
    const [leagues, setLeagues] = useState<Set<string>>(new Set());
    const [availableLeagues, setAvailableLeagues] = useState<string[]>([]);

    const toggleMatchStatus = (status: MatchStatus) => {
        setMatchStatus((prev) => {
            const next = new Set(prev);
            if (next.has(status)) {
                next.delete(status);
            } else {
                next.add(status);
            }
            return next;
        });
    };

    const toggleLeague = (league: string) => {
        setLeagues((prev) => {
            const next = new Set(prev);
            if (next.has(league)) {
                next.delete(league);
            } else {
                next.add(league);
            }
            return next;
        });
    };

    return (
        <FilterContext.Provider
            value={{
                matchStatus,
                leagues,
                availableLeagues,
                toggleMatchStatus,
                toggleLeague,
                setAvailableLeagues,
            }}
        >
            {children}
        </FilterContext.Provider>
    );
}

export function useFilters() {
    const context = useContext(FilterContext);
    if (!context) {
        throw new Error("useFilters must be used within a FilterProvider");
    }
    return context;
}