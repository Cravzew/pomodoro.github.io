import React from 'react';
import {todo, todoDescr, todoDescrHeader, todoDescrItem} from './todo.scss'
import TodoForm from "./TodoForm/TodoForm";

function Todo() {
    return (
        <section className={todo}>
            <div className={todoDescr}>
                <h1 className={todoDescrHeader}>Ура! Теперь можно начать работать:</h1>
                <ul>
                    <li className={todoDescrItem}>
                        Выберите категорию и напишите название текущей задачи
                    </li>
                    <li className={todoDescrItem}>
                        Запустите таймер («помидор»)
                    </li>
                    <li className={todoDescrItem}>
                        Работайте пока «помидор» не прозвонит
                    </li>
                    <li className={todoDescrItem}>
                        Сделайте короткий перерыв (3-5 минут)
                    </li>
                    <li className={todoDescrItem}>
                        Продолжайте работать «помидор» за «помидором», пока задача не будут выполнена. Каждые 4
                        «помидора» делайте длинный перерыв (15-30 минут).
                    </li>
                </ul>
            </div>
            <TodoForm/>
        </section>
    );
}

export default Todo;