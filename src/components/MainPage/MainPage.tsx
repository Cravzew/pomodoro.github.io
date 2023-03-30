import React from 'react';
import {main, mainContainer} from './mainpage.scss'
import Todo from "./Todo/Todo";
import Timer from "./Timer/timer";

function MainPage() {
    return (
        <main className={main}>
            <div className={mainContainer}>
                <Todo/>
                <Timer/>
            </div>
        </main>
    );
}

export default MainPage;