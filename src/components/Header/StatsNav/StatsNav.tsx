import React from 'react';
import StatsIconSvg from "./StatsIconSvg";
import {Link} from "react-router-dom";

function StatsNav() {
    return (
        <li>
            <button>
                <Link to={`stats`}>
                    <StatsIconSvg/>
                    <span>
                    Статистика
                </span>
                </Link>
            </button>
        </li>
    );
}

export default StatsNav;