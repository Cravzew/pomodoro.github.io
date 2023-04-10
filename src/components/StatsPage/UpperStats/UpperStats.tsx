import React from 'react';
import {
    upper,
    upperDown,
    upperUp,
    upperUpHeader,
    upperDownLeft
} from './upperstats.scss'
import CustomSelect from "../../Other/CustomSelect/CustomSelect";
import TodayCard from "./TodayCard/TodayCard";
import TomatoCard from "./TomatoCard/TomatoCard";
import ChartGraphics from "./ChartGraphics/ChartGraphics";

function UpperStats() {

    const selectList = ['Прошедшая неделя', '2 недели назад']

    return (
        <div className={upper}>
            <div className={upperUp}>
                <h2 className={upperUpHeader}>Ваша активность</h2>
                <CustomSelect selected={'Эта неделя'} lists={selectList}/>
            </div>
            <div className={upperDown}>
                <div className={upperDownLeft}>
                    <TodayCard date={'Понедельник'} text={'51 минут'}/>
                    <TomatoCard tomato={15}/>
                </div>
                <ChartGraphics/>
            </div>
        </div>
    );
}

export default UpperStats;