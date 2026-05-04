import React, { useState, createContext, useContext, ReactNode } from "react";
import { useFilters, MatchStatus } from "./FilterContext";
import "./Sidebar.css";

const MATCH_STATUS_OPTIONS: { value: MatchStatus; label: string }[] = [
    { value: "live", label: "Live" },
    { value: "upcoming", label: "Upcoming" },
    { value: "recent", label: "Recent" },
];

interface SidebarContextType {
    isOpen: boolean;
    toggle: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen((prev) => !prev);

    return (
        <SidebarContext.Provider value={{ isOpen, toggle }}>
            {children}
        </SidebarContext.Provider>
    );
}

function useSidebar() {
    const context = useContext(SidebarContext);
    if (!context) {
        throw new Error("useSidebar must be used within a SidebarProvider");
    }
    return context;
}

export function SidebarToggle() {
    const { isOpen, toggle } = useSidebar();

    return (
        <button
            className="sidebar-toggle"
            onClick={toggle}
            aria-label="Toggle sidebar"
            aria-expanded={isOpen}
        >
            <span className={`hamburger ${isOpen ? "open" : ""}`}>
                <span className="line"></span>
                <span className="line"></span>
                <span className="line"></span>
            </span>
        </button>
    );
}

export function Sidebar() {
    const { isOpen, toggle } = useSidebar();
    const { matchStatus, leagues, availableLeagues, toggleMatchStatus, toggleLeague } = useFilters();

    return (
        <>
            <div className={`sidebar-overlay ${isOpen ? "visible" : ""}`} onClick={toggle} />

            <aside className={`sidebar ${isOpen ? "open" : ""}`}>
                <div className="sidebar-content">
                    <div className="filter-section">
                        <h3 className="filter-title">Match Status</h3>
                        <div className="filter-options">
                            {MATCH_STATUS_OPTIONS.map((option) => (
                                <label key={option.value} className="filter-checkbox">
                                    <input
                                        type="checkbox"
                                        checked={matchStatus.size === 0 || matchStatus.has(option.value)}
                                        onChange={() => toggleMatchStatus(option.value)}
                                    />
                                    <span className="checkmark"></span>
                                    <span className="filter-label">{option.label}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="filter-section">
                        <h3 className="filter-title">Leagues</h3>
                        <div className="filter-options">
                            {availableLeagues.length === 0 ? (
                                <p className="no-leagues">Loading leagues...</p>
                            ) : (
                                availableLeagues.map((league) => (
                                    <label key={league} className="filter-checkbox">
                                        <input
                                            type="checkbox"
                                            checked={leagues.size === 0 || leagues.has(league)}
                                            onChange={() => toggleLeague(league)}
                                        />
                                        <span className="checkmark"></span>
                                        <span className="filter-label">{league}</span>
                                    </label>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
}