import React from 'react';
import InfoComponent from "./InfoComponent/InfoComponent";
import {downstats} from './donwstats.scss'
import {useAppSelector} from "../../../store/store";

function DownStats() {

    const data = useAppSelector(state => state.data.stats)

    // Фокус - 25 минут (отводится времени) : 30 минут (сколько затратил всего) * 100%
    const workTime = localStorage.getItem('work-time')
    const workSec = data.map(i => i.work_sec).reduce((a, b) => a + b)
    const pauseSec = data.map(i => i.pause_sec).reduce((a, b) => a + b)
    const allSec = workSec + pauseSec
    const focus = (JSON.parse(workTime) * 60) / allSec * 10

    return (
        <div className={downstats}>
            <InfoComponent type={'focus'} title={'Фокус'} infotext={Math.round(focus)} prefix={'%'}/>
            <InfoComponent type={'timer'} title={'Время на паузе'}
                           infotext={data.map(i => i.pause_sec).reduce((a, b) => a + b)}/>
            <InfoComponent type={'stops'} title={'Остановки'}
                           infotext={data.map(i => i.stop_count).reduce((a, b) => a + b)}/>
        </div>
    );
}

export default DownStats;