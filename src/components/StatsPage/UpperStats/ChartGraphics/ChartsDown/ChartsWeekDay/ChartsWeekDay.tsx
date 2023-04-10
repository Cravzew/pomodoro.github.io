import React from 'react';
import {
    weekday,
    weekdayLine,
    weekdayText
} from './chartsweekday.scss'

interface IChartsWeekDay {
    weekdays: string,
    line: number
}

function ChartsWeekDay(props: IChartsWeekDay) {

    const {
        weekdays,
        line
    } = props

    return (
        <li className={weekday}>
            <span className={weekdayText}>
                    {weekdays}
            </span>
            <div className={weekdayLine} style={{
                height: line + 'px',
                backgroundColor: `${line !== 5 ? 'var(--low-line)' : 'var(--line-dropdown)'}`
            }}></div>
        </li>
    );
}

export default ChartsWeekDay;