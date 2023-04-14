import React from 'react';
import {chartsdown,} from './chartsdown.scss'
import ChartsWeekDay from "./ChartsWeekDay/ChartsWeekDay";

function ChartsDown() {

    const days = [
        {day: "Пн", line: Math.round(Math.random() * 336)},
        {day: "Вт", line: Math.round(Math.random() * 336)},
        {day: "Ср", line: Math.round(Math.random() * 336)},
        {day: "Чт", line: Math.round(Math.random() * 336)},
        {day: "Пт", line: Math.round(Math.random() * 336)},
        {day: "Сб", line: Math.round(Math.random() * 336)},
        {day: "Вс", line: Math.round(Math.random() * 336)}
    ]

    return (
        <ul className={chartsdown}>
            {days.map(i =>
                <ChartsWeekDay key={Math.random().toString(36).substring(2, 15)} weekdays={i.day} line={i.line}
                               active={i === days[new Date().getDay() - 1]}/>
            )}
        </ul>
    );
}

export default ChartsDown;