import React from 'react';
import ArrowSvg from "../../StatsPage/UpperStats/ArrowSvg";
import {
    dropdown,
    dropdownContent,
    dropdownContentHeader
} from './customselect.scss'

function CustomSelect() {
    return (
        <div className={dropdown}>
            <div className={dropdownContent}>
                <p className={dropdownContentHeader}>
                    Эта неделя
                </p>
                <ArrowSvg/>
            </div>
        </div>
    );
}

export default CustomSelect;