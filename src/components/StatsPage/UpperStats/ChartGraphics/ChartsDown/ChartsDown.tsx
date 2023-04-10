import React from 'react';
import {
    chartsdown,
} from './chartsdown.scss'
import ChartsWeekDay from "./ChartsWeekDay/ChartsWeekDay";

function ChartsDown() {
    return (
        <ul className={chartsdown}>
            <ChartsWeekDay weekdays={'Пн'} line={5}/>
            <ChartsWeekDay weekdays={'Вт'} line={5}/>
            <ChartsWeekDay weekdays={'Ср'} line={5}/>
            <ChartsWeekDay weekdays={'Чт'} line={5}/>
            <ChartsWeekDay weekdays={'Пт'} line={5}/>
            <ChartsWeekDay weekdays={'Сб'} line={5}/>
            <ChartsWeekDay weekdays={'Вс'} line={5}/>
        </ul>
    );
}

export default ChartsDown;