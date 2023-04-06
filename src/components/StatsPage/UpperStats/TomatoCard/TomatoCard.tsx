import React from 'react';
import {
    tomatocard,
    tomatocardEmpty,
    tomatocardNumber,
    tomatocardNumberTomato,
    tomatocardNumberText
} from './tomatocard.scss'
import TomatoNumberSvg from "./TomatoNumberSvg";
import TomatoEmptySvg from "./TomatoEmptySvg";

function TomatoCard({tomato}: { tomato?: number }) {
    return (
        <div className={tomatocard}>
            {tomato ?
                <div className={tomatocardNumber}>
                    <div className={tomatocardNumberTomato}>
                        <TomatoNumberSvg/>
                        <span>x {tomato}</span>
                    </div>
                    <p className={tomatocardNumberText}>
                        {tomato} помидора
                    </p>
                </div>
                :
                <div className={tomatocardEmpty}>
                    <TomatoEmptySvg/>
                </div>
            }
        </div>
    );
}

export default TomatoCard;