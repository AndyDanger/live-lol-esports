import './styles/global.css'
import 'react-toastify/dist/ReactToastify.min.css';

import { Match } from "./components/Match/Match";
import { HashRouter, Switch, Route, Redirect } from "react-router-dom";
import { Footer } from "./components/Footer/Footer";
import { EventsSchedule } from "./components/Schedule/EventsSchedule";
import { ValorantSchedule } from "./components/Schedule/ValorantSchedule";
import { CS2Schedule } from "./components/Schedule/CS2Schedule";
import { NBASchedule } from "./components/Schedule/NBASchedule";
import { Navbar } from "./components/Navbar/Navbar";
import { useTheme } from './theme/ThemeContext'
import React from "react";

function App() {
    const { theme } = useTheme();

    return (
        <HashRouter basename="/">
            <div className="theme-container" style={{ ...theme as React.CSSProperties }}>
                <Navbar />
                <div className="container">
                    <Switch>
                        <Route path="/" exact component={EventsSchedule} />
                        <Route path="/valorant" component={ValorantSchedule} />
                        <Route path="/cs2" component={CS2Schedule} />
                        <Route path="/nba" component={NBASchedule} />
                        <Route path="/live/:gameid" component={Match} />
                        <Redirect to="/" />
                    </Switch>
                </div>
                <Footer />
            </div>
        </HashRouter>
    );
}

export default App;
