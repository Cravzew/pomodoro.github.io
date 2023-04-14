import React from 'react';
import {todaycard, todaycardHeader, todaycardText} from './todaycard.scss'

interface ITodayCard {
    date: string,
    number?: number
}

function TodayCard({date, number}: ITodayCard) {

    const hours = Math.floor(number / 60 / 60);
    const minutes = Math.floor(number / 60) - (hours * 60);
    const seconds = number % 60;

    return (
        <div className={todaycard}>
            <h3 className={todaycardHeader}>{date}</h3>
            {number ?
                <p className={todaycardText}>Вы работали над задачами в течение <span>
                    {hours ? `${hours} часов\u00A0` : ''}
                    {minutes ? `${minutes} минут\u00A0` : ''}
                    {hours === 0 ? `${seconds} секунд\u00A0` : ''}
                </span></p>
                :
                <p className={todaycardText}>Нет данных</p>
            }
        </div>
    );
}

export default TodayCard;