import React from 'react';
import {weekday, weekdayLine, weekdayText} from './chartsweekday.scss'

interface IChartsWeekDay {
    weekdays: string,
    line: number,
    active: boolean,
}

function ChartsWeekDay(props: IChartsWeekDay) {

    const {
        weekdays,
        line,
        active,
    } = props

    return (
        <li className={weekday}>
            <span className={weekdayText} style={{
                color: `${active ? 'var(--header-text)' : 'var(--placeholder-text)'}`
            }}>
                    {weekdays}
            </span>
            <div className={weekdayLine} style={{
                height: line + 'px',
                backgroundColor: `${line !== 5 ? (active ? 'var(--header-text)' : 'var(--low-line)') : 'var(--line-dropdown)'}`
            }}></div>
        </li>
    );
}

export default ChartsWeekDay;