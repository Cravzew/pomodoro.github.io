import React, {SetStateAction, useEffect, useState} from 'react';
import {upper, upperDown, upperDownLeft, upperUp, upperUpHeader} from './upperstats.scss'
import CustomSelect from "../../Other/CustomSelect/CustomSelect";
import TodayCard from "./TodayCard/TodayCard";
import TomatoCard from "./TomatoCard/TomatoCard";
import ChartGraphics from "./ChartGraphics/ChartGraphics";
import moment from "moment"
import {itemsType} from "../../../store/dataReducer";

export enum ChartMode {
    CurrentWeek,
    LastWeek,
    TwoWeeksAgo
}

export const ChartModes = [
    {
        name: 'Эта неделя',
        value: ChartMode.CurrentWeek
    },
    {
        name: 'Прошедшая неделя',
        value: ChartMode.LastWeek
    },
    {
        name: '2 недели назад',
        value: ChartMode.TwoWeeksAgo
    }
];

interface IUpperStats {
    setSelectedDate: React.Dispatch<SetStateAction<string>>,
    selectedDayName: string,
    selectedDate: string,
    statDay: itemsType
}

function UpperStats(props: IUpperStats) {

    const {
        setSelectedDate,
        selectedDayName,
        selectedDate,
        statDay
    } = props

    const [selectedChartMode, setSelectedChartMode] = useState<ChartMode>(ChartMode.CurrentWeek);

    const workSecData = statDay.work_sec
    const tomatoesTodayData = statDay.tomatoesToday

    useEffect(() => {
        switch (selectedChartMode) {
            case ChartMode.CurrentWeek:
                setSelectedDate(moment().format('YYYY-MM-DD'));
                break;
            case ChartMode.LastWeek:
                setSelectedDate(moment().subtract(7, 'days').format('YYYY-MM-DD'));
                break;
            case ChartMode.TwoWeeksAgo:
                setSelectedDate(moment().subtract(14, 'days').format('YYYY-MM-DD'));
                break;
        }
    }, [selectedChartMode]);

    const handleSelectedDateHandler = (selectedDate: string) => {
        setSelectedDate(selectedDate);
    }
    const handleSelectMode = (selectedMode: ChartMode) => {
        setSelectedChartMode(selectedMode);
    }

    return (
        <div className={upper}>
            <div className={upperUp}>
                <h2 className={upperUpHeader}>Ваша активность</h2>
                <CustomSelect lists={ChartModes} handleSelectMode={handleSelectMode}
                              selectedChartMode={selectedChartMode}/>
            </div>
            <div className={upperDown}>
                <div className={upperDownLeft}>
                    <TodayCard
                        date={selectedDayName.substring(0, 1).toUpperCase() + selectedDayName.substring(1, selectedDayName.length).toLowerCase()}
                        number={workSecData}/>
                    <TomatoCard tomato={tomatoesTodayData}/>
                </div>
                <ChartGraphics selectedChartMode={selectedChartMode} selectedDate={selectedDate}
                               changeSelectedDate={handleSelectedDateHandler}/>
            </div>
        </div>
    );
}

export default UpperStats;