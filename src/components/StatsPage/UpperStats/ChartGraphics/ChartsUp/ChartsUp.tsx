import React from 'react';
import ChartsLine from "./ChartsLine/ChartsLine";
import {
    chartsup
} from './chartsup.scss'

function ChartsUp() {
    return (
        <div className={chartsup}>
            <ChartsLine minutes={0} hours={0}/>
            <ChartsLine minutes={0} hours={0}/>
            <ChartsLine minutes={0} hours={0}/>
            <ChartsLine minutes={0} hours={0}/>
        </div>
    );
}

export default ChartsUp;