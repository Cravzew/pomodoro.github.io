import React from 'react';
import {header, headerContainer, headerContainerLink, headerContainerList} from './header.scss'
import {Link} from "react-router-dom";
import LogoSvg from "./LogoSvg";
import Theme from "./Theme/Theme";
import Settings from "./Settings/settings";
import StatsNav from "./StatsNav/StatsNav";

function Header() {
    return (
        <header className={header}>
            <div className={headerContainer}>
                <Link className={headerContainerLink} to="/">
                    <LogoSvg/>
                    <span>
                        pomodoro_box
                    </span>
                </Link>
                <nav>
                    <ul className={headerContainerList}>
                        <Theme/>
                        <Settings/>
                        <StatsNav/>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;