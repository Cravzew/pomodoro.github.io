import React from 'react';
import {tasksItem, tasksItemContent, tasksItemContentTomato, tasksItemContentText} from './todotask.scss'
import DotSvg from "./DotSvg";

function TodoTask() {
    return (
        <li className={tasksItem}>
            <div className={tasksItemContent}>
                <p className={tasksItemContentTomato}>
                    1
                </p>
                <p className={tasksItemContentText}>
                    Сверстать сайт
                </p>
            </div>
            <button>
                <DotSvg/>
            </button>
        </li>
    );
}

export default TodoTask;