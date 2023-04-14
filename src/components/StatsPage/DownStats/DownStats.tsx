import React from 'react';
import InfoComponent from "./InfoComponent/InfoComponent";
import {downstats} from './donwstats.scss'
import {useAppSelector} from "../../../store/store";
import {format} from "date-fns";

function DownStats() {

    const data = useAppSelector(state => state.data.stats)
    const dateNow = format(new Date(), 'dd/MM/yyyy')

    // Фокус - 25 минут (отводится времени) : 30 минут (сколько затратил всего) * 100%

    const workTime = localStorage.getItem('work-time')

    const workSec = data.map(i => i.date === dateNow ? {
        ...i,
        work_sec: i.work_sec
    } : i)[0]['work_sec']

    const pauseSec = data.map(i => i.date === dateNow ? {
        ...i,
        pause_sec: i.pause_sec
    } : i)[0]['pause_sec']

    const allSec = workSec * pauseSec + 1

    const focus = Math.floor(100 - (100 / allSec));

    const stopCount = data.map(i => i.date === dateNow ? {
        ...i,
        stop_count: i.stop_count
    } : i)[0]['stop_count']

    return (
        <div className={downstats}>
            <InfoComponent type={'focus'} title={'Фокус'} infotext={focus} prefix={'%'}/>
            <InfoComponent type={'timer'} title={'Время на паузе'}
                           infotext={pauseSec}/>
            <InfoComponent type={'stops'} title={'Остановки'}
                           infotext={stopCount}/>
        </div>
    );
}

export default DownStats;