import React, {ChangeEvent, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../constants/hooks";
import {addTodo} from "../../store/todoReducer";
import TodoTask from "./TodoTask/todotask";

function Todo() {
    const [userInput, setUserInput] = useState('')

    const todo = useAppSelector(state => state.todos.list)
    const dispatch = useAppDispatch()

    function handleSubmit() {
        if (userInput.trim().length) {
            dispatch(addTodo(userInput))
            setUserInput('')
        }
    }

    return (
        <div className="mb-10 p-10 container mx-auto border-solid border-2 border-sky-500">
            <div className="flex justify-center container mx-auto">
                <input
                    className="p-2 border-solid border-2 border-sky-500"
                    type="text"
                    onChange={(e) => setUserInput(e.target.value)}
                    value={userInput}
                />
                <button
                    className="p-2 ml-3 border-solid border-2 border-sky-500"
                    onClick={handleSubmit}
                >Добавить
                </button>
            </div>
            <ul className="mt-3">
                {todo.map((todo) =>
                    <TodoTask key={todo.id} id={todo.id} task={todo.task} tomato={todo.tomato}/>
                )}
            </ul>
        </div>
    );
}

export default Todo;