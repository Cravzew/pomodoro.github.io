import React from 'react';
import {
    chartsline
} from './chartsline.scss'

interface IChartsLine {
    minutes: number
    hours: number
}

function ChartsLine(props: IChartsLine) {

    const {
        hours,
        minutes
    } = props

    return (
        <div className={chartsline}>
            <span>{hours === 0 ? '' : `${hours} ч`} {minutes} мин</span>
        </div>
    );
}

export default ChartsLine;