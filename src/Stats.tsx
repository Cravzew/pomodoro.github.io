import React, {useEffect, useState} from 'react';
import Header from "./components/Header/header";
import Page from "./components/Other/Page/Page";
import UpperStats from "./components/StatsPage/UpperStats/UpperStats";
import DownStats from "./components/StatsPage/DownStats/DownStats";
import {useAppSelector} from "./store/store";
import {itemsType} from "./store/dataReducer";
import moment from 'moment'
import 'moment/locale/ru';

moment().locale('ru')

const emptyStatDay: itemsType = {
    date: moment().format('YYYY-MM-DD'),
    work_sec: 0,
    pause_sec: 0,
    isDone: 0,
    stop_count: 0,
    tomatoesToday: 0,
}

function Stats() {

    const statItems = useAppSelector(state => state.data.stats);
    const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'));
    const [statDay, setStatDay] = useState(emptyStatDay);
    const [selectedDayName, setSelectedDayName] = useState(moment().format('dddd'));

    useEffect(() => {
        setSelectedDayName(moment(selectedDate).format('dddd'));

        const foundStatItem = statItems.find(item => item.date === selectedDate);

        if (foundStatItem) {
            setStatDay(foundStatItem);
        } else {
            setStatDay({
                date: selectedDate,
                work_sec: 0,
                pause_sec: 0,
                isDone: 0,
                stop_count: 0,
                tomatoesToday: 0,
            });
        }

    }, [selectedDate]);

    return (
        <>
            <Header/>
            <Page padTop={'88px'}>
                <section style={{
                    width: '100%'
                }}>
                    <UpperStats statDay={statDay} setSelectedDate={setSelectedDate} selectedDayName={selectedDayName} selectedDate={selectedDate}/>
                    <DownStats statDay={statDay}/>
                </section>
            </Page>
        </>
    );
}

export default Stats;