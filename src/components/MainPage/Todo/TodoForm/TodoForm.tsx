import React, {useState} from 'react';
import {tasks, todoForm, todoFormButton, todoFormInput, todoTime} from './todoform.scss'
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

    const allTomato = todo.length !== 0 ? todo.map(todo => todo.tomato).reduce((a, b) => a + b) : todo.length
    const time = allTomato * JSON.parse(localStorage.getItem('work-time'))

    const hours = Math.floor(time / 60)
    const minutes = time - hours * 60

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
                    <TodoTask key={todo.id} id={todo.id} task={todo.task} tomato={todo.tomato}
                              isComplete={todo.isComplete}/>
                )}
            </ul>
            <p className={todoTime}>{hours === 0 ? '' : `${hours} час`} {minutes === 0 ? '' : `${minutes} минут`}</p>
        </div>
    );
}

export default TodoForm;