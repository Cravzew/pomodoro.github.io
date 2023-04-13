import React from 'react';
import ChartsLine from "./ChartsLine/ChartsLine";
import {chartsup} from './chartsup.scss'
import {useAppSelector} from "../../../../../store/store";

function ChartsUp() {

    const data = useAppSelector(state => state.data.stats)
    const time = data.map(i => i.work_sec).reduce((a, b) => a + b)

    return (
        <div className={chartsup}>
            <ChartsLine number={time}/>
            <ChartsLine number={Math.floor(time / 2)}/>
            <ChartsLine number={Math.floor(time / 3)}/>
            <ChartsLine number={Math.floor(time / 4)}/>
        </div>
    );
}

export default ChartsUp;