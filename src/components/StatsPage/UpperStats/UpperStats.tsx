import React from 'react';
import ArrowSvg from "./ArrowSvg";
import {
    upper,
    upperDown,
    upperUp,
    upperUpDropdown,
    upperUpHeader
} from './upperstats.scss'

function UpperStats() {
    return (
        <div className={upper}>
            <div className={upperUp}>
                <h2 className={upperUpHeader}>Ваша активность</h2>
                <div className={upperUpDropdown}>
                    <div>
                        <p>
                            Эта неделя
                        </p>
                        <ArrowSvg/>
                    </div>
                </div>
            </div>
            <div className={upperDown}>
                <div>
                    <div>
                        Понедельник
                    </div>
                    <div>
                        У вас 2 помидора
                    </div>
                </div>
                <div>
                    Диаграмка
                </div>
            </div>
        </div>
    );
}

export default UpperStats;