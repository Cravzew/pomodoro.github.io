import React from 'react';
import InfoComponent from "./InfoComponent/InfoComponent";
import {
    downstats
} from './donwstats.scss'

function DownStats() {

    const time = 80
    const hours = Math.floor(time / 60)
    const minutes = time - hours * 60

    return (
        <div className={downstats}>
            <InfoComponent type={'focus'} title={'Фокус'} infotext={1} prefix={'%'}/>
            <InfoComponent type={'timer'} title={'Время на паузе'} hours={hours} postfix={'ч'} minutes={minutes}
                           prefix={'м'}
            />
            <InfoComponent type={'stops'} title={'Остановки'} infotext={3}/>
        </div>
    );
}

export default DownStats;