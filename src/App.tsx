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
import ClutchBanner from './clutch_banner_2692x826.png';
import MobileClutchBanner from './clutch_banner_mobile.png';

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
                            <a className='desktopClutchBanner' href="https://www.clutch.app/signup?affiliateCode=weedpicks" rel="noopener noreferrer" target="_blank">
                              <img src={ClutchBanner} width="100%" height="auto" loading="lazy" />
                            </a>
                            <a className='mobileClutchBanner' href="https://www.clutch.app/signup?affiliateCode=weedpicks" rel="noopener noreferrer" target="_blank">
                              <img src={MobileClutchBanner} width="100%" height="auto" loading="lazy" />
                            </a>
                        </div>
                        <Footer />
                    </div>
                </HashRouter>
            </SidebarProvider>
        </FilterProvider>
    );
}

export default App;
