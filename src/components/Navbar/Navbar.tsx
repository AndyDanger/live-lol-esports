import './styles/navbarStyle.css'
import { ReactComponent as LoLLogoSVG } from '../../assets/images/league-of-legends.svg';

import { Link } from "react-router-dom";
import { ThemeToggler } from "./ThemeToggler";
import { SoundToggler } from "./SoundToggler";
import { SidebarToggle } from "../Sidebar/Sidebar";

export function Navbar() {
    return (
        <nav className="navbar-container">
            <div className="navbar-left">
                <SidebarToggle />
            </div>
            <div className="navbar-logo-container">
                <Link className="navbar-logo" to="/">
                    <LoLLogoSVG className="navbar-icon-img" />
                    <h2 className="navbar-icon">Live Esports</h2>
                </Link>
            </div>
            <div className="settings-container">
                <SoundToggler />
                <ThemeToggler />
            </div>
        </nav>
    );
}