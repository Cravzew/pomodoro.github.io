import React from 'react';
import {
    todaycard,
    todaycardHeader,
    todaycardTime,
    todaycardText
} from './todaycard.scss'

interface ITodayCard {
    date: string,
    text?: string
}

function TodayCard({date, text}: ITodayCard) {

    return (
        <div className={todaycard}>
            <h3 className={todaycardHeader}>{date}</h3>
            {text ?
                <p className={todaycardText}>Вы работали над задачами в течение <span
                    style={{color: 'var(--header-text)', fontWeight: '700'}}>{text}</span></p>
                :
                <p className={todaycardText}>Нет данных</p>
            }
        </div>
    );
}

export default TodayCard;