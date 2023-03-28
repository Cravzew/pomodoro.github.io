import React from 'react';
import {header, headerContainer, headerContainerLink} from './header.scss'
import {Link} from "react-router-dom";
import LogoSvg from "./LogoSvg";
import Theme from "./Theme/Theme";

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
                    <Theme/>
                </nav>
            </div>
        </header>
    );
}

export default Header;