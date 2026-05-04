import './styles/global.css'
import 'react-toastify/dist/ReactToastify.min.css';

import { Match } from "./components/Match/Match";
import { HashRouter, Switch, Route, Redirect } from "react-router-dom";
import { Footer } from "./components/Footer/Footer";
import { EventsSchedule } from "./components/Schedule/EventsSchedule";
import { Navbar } from "./components/Navbar/Navbar";
import { Sidebar, SidebarProvider } from "./components/Sidebar/Sidebar";
import { FilterProvider } from "./components/Sidebar/FilterContext";
import { useTheme } from './theme/ThemeContext'
import React from "react";

function App() {
    const { theme } = useTheme();

    return (
        <FilterProvider>
            <SidebarProvider>
                <HashRouter basename="/">
                    <div className="theme-container" style={{ ...(theme as React.CSSProperties) }}>
                        <Navbar />
                        <Sidebar />
                        <div className="container">
                            <Switch>
                                <Route path="/" exact component={EventsSchedule} />
                                <Route path="/live/:gameid" component={Match} />
                                <Redirect to="/" />
                            </Switch>
                        </div>
                        <Footer />
                    </div>
                </HashRouter>
            </SidebarProvider>
        </FilterProvider>
    );
}

export default App;
