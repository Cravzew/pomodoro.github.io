import React from 'react';
import {upper, upperDown, upperDownLeft, upperUp, upperUpHeader} from './upperstats.scss'
import CustomSelect from "../../Other/CustomSelect/CustomSelect";
import TodayCard from "./TodayCard/TodayCard";
import TomatoCard from "./TomatoCard/TomatoCard";
import ChartGraphics from "./ChartGraphics/ChartGraphics";
import {getDay} from "date-fns";
import {useAppSelector} from "../../../store/store";

function UpperStats() {

    const selectList = ['Прошедшая неделя', '2 недели назад']

    const days = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];

    const data = useAppSelector(state => state.data.stats)

    return (
        <div className={upper}>
            <div className={upperUp}>
                <h2 className={upperUpHeader}>Ваша активность</h2>
                <CustomSelect selected={'Эта неделя'} lists={selectList}/>
            </div>
            <div className={upperDown}>
                <div className={upperDownLeft}>
                    <TodayCard date={days[getDay(new Date()) - 1]}
                               number={data.map(i => i.work_sec).reduce((a, b) => a + b)}/>
                    <TomatoCard tomato={data.map(i => i.tomatoesToday).reduce((a, b) => a + b)}/>
                </div>
                <ChartGraphics/>
            </div>
        </div>
    );
}

export default UpperStats;