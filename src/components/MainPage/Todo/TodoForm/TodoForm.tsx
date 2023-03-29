import React, {useState} from 'react';
import {todoForm, todoFormInput, todoFormButton, tasks, todoTime} from './todoform.scss'
import TodoTask from "./TodoTask/TodoTask";
import {addTodo} from "../../../../store/todoReducer";
import {useAppDispatch, useAppSelector} from "../../../../store/store";

function TodoForm() {

    const [userInput, setUserInput] = useState('')

    const todo = useAppSelector(state => state.todo.list)
    const dispatch = useAppDispatch()

    function handleSubmit(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        event.preventDefault()
        if (userInput.trim().length) {
            dispatch(addTodo(userInput))
            setUserInput('')
        }
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setUserInput(event.target.value)
    }

    return (
        <div className={todoForm}>
            <form>
                <input className={todoFormInput} placeholder="Название задачи" value={userInput}
                       onChange={handleChange}/>
                <button className={todoFormButton} onClick={handleSubmit}>
                    Добавить
                </button>
            </form>
            <ul className={tasks}>
                {todo.map((todo) =>
                    <TodoTask key={todo.id} id={todo.id} task={todo.task} tomato={todo.tomato}/>
                )}
            </ul>
            <p className={todoTime}>1 час 15 минут</p>
        </div>
    );
}

export default TodoForm;