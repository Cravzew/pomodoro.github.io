import React from 'react';
import {upper, upperDown, upperDownLeft, upperUp, upperUpHeader} from './upperstats.scss'
import CustomSelect from "../../Other/CustomSelect/CustomSelect";
import TodayCard from "./TodayCard/TodayCard";
import TomatoCard from "./TomatoCard/TomatoCard";
import ChartGraphics from "./ChartGraphics/ChartGraphics";
import {format, getDay} from "date-fns";
import {useAppSelector} from "../../../store/store";

function UpperStats() {

    const selectList = ['Прошедшая неделя', '2 недели назад']

    const days = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];

    const dateNow = format(new Date(), 'dd/MM/yyyy')

    const data = useAppSelector(state => state.data.stats)

    const workSecData = data.map(i => i.date === dateNow ? {
        ...i,
        work_sec: i.work_sec
    } : i)[0]['work_sec']

    const tomatoesTodayData = data.map(i => i.date === dateNow ? {
        ...i,
        tomatoesToday: i.tomatoesToday
    } : i)[0]['tomatoesToday']

    return (
        <div className={upper}>
            <div className={upperUp}>
                <h2 className={upperUpHeader}>Ваша активность</h2>
                <CustomSelect selected={'Эта неделя'} lists={selectList}/>
            </div>
            <div className={upperDown}>
                <div className={upperDownLeft}>
                    <TodayCard date={days[getDay(new Date()) - 1]}
                               number={workSecData}/>
                    <TomatoCard tomato={tomatoesTodayData}/>
                </div>
                <ChartGraphics/>
            </div>
        </div>
    );
}

export default UpperStats;