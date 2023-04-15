import React, {useEffect} from 'react';
import {charts, chartsdown, chartsup, weekday, weekdayLine, weekdayText} from './chartgraphics.scss'
import {ChartMode} from "../UpperStats";
import moment from "moment";
import {useAppSelector} from "../../../../store/store";
import ChartsLine from "./ChartsLine/ChartsLine";

type IChartGraphics = {
    selectedDate: string,
    selectedChartMode: ChartMode,
    changeSelectedDate: (selectedDate: string) => void
}

type weekDay = {
    date: string,
    name: string,
    active: boolean,
    workSec: number
}

let weekdays: weekDay[] = [];
let maxWorkSec = 0

function ChartGraphics({selectedDate, changeSelectedDate, selectedChartMode}: IChartGraphics) {

    const statItems = useAppSelector(state => state.data.stats);

    useEffect(() => {
        weekdays = [];
        let subtractDays = 0;

        switch (selectedChartMode) {
            case ChartMode.CurrentWeek:
                subtractDays = 0
                break;
            case ChartMode.LastWeek:
                subtractDays = 7
                break;
            case ChartMode.TwoWeeksAgo:
                subtractDays = 14;
                break;
        }

        for (let dayNumber = 0; dayNumber < 7; dayNumber++) {
            let weekDayDate = moment().subtract(subtractDays, 'days').weekday(dayNumber).format('YYYY-MM-DD');
            let weekDayName = moment().subtract(subtractDays, 'days').weekday(dayNumber).format('ddd');
            let workSec = 0;

            let foundStatItem = statItems.find(item => item.date === weekDayDate);

            if (foundStatItem) {
                workSec = foundStatItem.work_sec;
            }

            weekdays.push({
                date: weekDayDate,
                name: weekDayName,
                active: selectedDate === weekDayDate,
                workSec: workSec
            })
        }

        maxWorkSec = weekdays.reduce((prev, current) => prev > current.workSec ? prev : current.workSec, 0);

    }, [selectedDate, selectedChartMode]);

    function calcHeight(sec: number, maxSec: number) {
        let maxHeight = 365;
        let height = maxHeight / maxSec * sec;

        return height > 0 ? height : 5;
    }

    return (
        <div className={charts}>
            <div className={chartsup}>
                <ChartsLine number={maxWorkSec}/>
                <ChartsLine number={maxWorkSec / 4 * 3}/>
                <ChartsLine number={maxWorkSec / 4 * 2}/>
                <ChartsLine number={maxWorkSec / 4}/>
            </div>
            <ul className={chartsdown}>
                {weekdays.map(item => {
                    return (
                        <li key={Math.round(Math.random() * 10000)} className={weekday} onClick={() => {
                            changeSelectedDate(item.date)
                        }}>
                            <span className={weekdayText} style={{
                                color: `${item.active ? 'var(--header-text)' : 'var(--placeholder-text)'}`
                            }}>{item.name}</span>
                            <div className={weekdayLine} style={{
                                height: calcHeight(item.workSec, maxWorkSec) + 'px',
                                backgroundColor: `${item.active ? (calcHeight(item.workSec, maxWorkSec) > 5 && 'var(--header-text') : (calcHeight(item.workSec, maxWorkSec) > 5 && 'var(--low-line)')}`
                            }}/>
                        </li>
                    )
                })}
            </ul>
        </div>
    );
}

export default ChartGraphics;