import React from 'react';
import {todoForm, todoFormInput, todoFormButton, tasks, todoTime} from './todoform.scss'
import TodoTask from "./TodoTask/TodoTask";

function TodoForm() {
    return (
        <div className={todoForm}>
            <form>
                <input className={todoFormInput} placeholder="Название задачи"/>
                <button className={todoFormButton}>
                    Добавить
                </button>
            </form>
            <ul className={tasks}>
                <TodoTask/>
                <TodoTask/>
                <TodoTask/>
            </ul>
            <p className={todoTime}>1 час 15 минут</p>
        </div>
    );
}

export default TodoForm;