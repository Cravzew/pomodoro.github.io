import React, {ChangeEvent, useState} from 'react';
import {tasksItem, tasksItemContent, tasksItemContentTomato, tasksItemContentText} from './todotask.scss'
import DotSvg from "./DotSvg";
import {decTomato, incTomato, ITaskProps, updateTask} from "../../../../../store/todoReducer";
import {Dropdown} from "./Dropdown/dropdown";
import {useAppDispatch} from "../../../../../store/store";

function TodoTask({id, task, tomato}: ITaskProps) {

    const [text, setText] = useState(task)

    const [isEdit, setIsEdit] = useState(false)
    const [modalDelete, setModalDelete] = useState(false)

    const dispatch = useAppDispatch()

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        setText(event.target.value)
    }

    function handleBlur() {
        if (text.length <= 3) return
        setIsEdit(false)
        dispatch(updateTask(text))
    }

    return (
        <li className={tasksItem} key={id}>
            <div className={tasksItemContent}>
                <p className={tasksItemContentTomato}>
                    {tomato}
                </p>
                {isEdit ?
                    <input
                        value={text}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    :
                    <p className={tasksItemContentText}>
                        {text}
                    </p>
                }
            </div>
            <Dropdown button={
                <button>
                    <DotSvg/>
                </button>
            }>
                <button className="mb-5 cursor-pointer" onClick={() => dispatch(incTomato(id))}>Увеличить</button>
                <button className="mb-5 cursor-pointer" onClick={() => dispatch(decTomato(id))}>Уменьшить</button>
                <button className="mb-5 cursor-pointer" onClick={() => setIsEdit(!isEdit)}>Редактировать</button>
                <button className="cursor-pointer" onClick={() => setModalDelete(true)}>Удалить</button>
            </Dropdown>
        </li>
    );
}

export default TodoTask;