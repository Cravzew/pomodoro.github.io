import React from 'react';
import {chartsline} from './chartsline.scss'

interface IChartsLine {
    number: number
}

function ChartsLine(props: IChartsLine) {

    const {
        number
    } = props

    const hours = Math.floor(number / 60 / 60);
    const minutes = Math.floor(number / 60) - (hours * 60);
    const seconds = number % 60;

    return (
        <div className={chartsline}>
            <span>
                {hours ? `${hours} ч` : ''}
                {minutes ? `${minutes} мин` : ''}
                {hours === 0 ? `${seconds} сек` : ''}
            </span>
        </div>
    );
}

export default ChartsLine;