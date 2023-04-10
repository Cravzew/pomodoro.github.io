import React from 'react';
import {
    charts
} from './chartgraphics.scss'
import ChartsUp from "./ChartsUp/ChartsUp";
import ChartsDown from "./ChartsDown/ChartsDown";

function ChartGraphics() {
    return (
        <div className={charts}>
            <ChartsUp/>
            <ChartsDown/>
        </div>
    );
}

export default ChartGraphics;