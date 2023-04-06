import React from 'react';
import ArrowSvg from "./ArrowSvg";
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

function UpperStats() {
    return (
        <div className={upper}>
            <div className={upperUp}>
                <h2 className={upperUpHeader}>Ваша активность</h2>
                <CustomSelect/>
            </div>
            <div className={upperDown}>
                <div className={upperDownLeft}>
                    <TodayCard date={'Понедельник'} text={'51 минут'}/>
                    <TomatoCard tomato={15}/>
                </div>
                <div>
                    Диаграмка
                </div>
            </div>
        </div>
    );
}

export default UpperStats;