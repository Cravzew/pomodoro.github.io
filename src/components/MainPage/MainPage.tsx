import React from 'react';
import {main, mainContainer} from './mainpage.scss'
import Todo from "./Todo/Todo";

function MainPage() {
    return (
        <main className={main}>
            <div className={mainContainer}>
                <Todo/>
            </div>
        </main>
    );
}

export default MainPage;