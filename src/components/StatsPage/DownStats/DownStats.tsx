import React from 'react';
import InfoComponent from "./InfoComponent/InfoComponent";
import {downstats} from './donwstats.scss'
import {itemsType} from "../../../store/dataReducer";

function DownStats({statDay}: {statDay: itemsType}) {

    const workSec = statDay.work_sec
    const pauseSec = statDay.pause_sec
    const allSec = workSec * pauseSec
    let focus = Math.floor(100 - (100 / allSec));

    if (focus < 0 || isNaN(focus)) {
        focus = 0;
    }

    const stopCount = statDay.stop_count

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