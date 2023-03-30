import React, {ChangeEvent, useState} from 'react';
import {
    tasksItem,
    tasksItemContent,
    tasksItemContentTomato,
    tasksItemContentText,
    tasksDropdown,
    tasksDropdownItem
} from './todotask.scss'
import DotSvg from "./DotSvg";
import {decTomato, incTomato, ITaskProps, updateTask} from "../../../../../store/todoReducer";
import {Dropdown} from "./Dropdown/dropdown";
import {useAppDispatch} from "../../../../../store/store";
import IncSvg from "./Dropdown/IncSvg";
import DecSvg from "./Dropdown/DecSvg";
import EditSvg from "./Dropdown/EditSvg";
import DelSvg from "./Dropdown/DelSvg";

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
                <ul className={tasksDropdown}>
                    <li className={tasksDropdownItem}>
                        <IncSvg/>
                        <button onClick={() => dispatch(incTomato(id))}>Увеличить</button>
                    </li>
                    <li className={tasksDropdownItem}>
                        <DecSvg/>
                        <button onClick={() => dispatch(decTomato(id))}>Уменьшить</button>
                    </li>
                    <li className={tasksDropdownItem}>
                        <EditSvg/>
                        <button onClick={() => setIsEdit(!isEdit)}>Редактировать</button>
                    </li>
                    <li className={tasksDropdownItem}>
                        <DelSvg/>
                        <button onClick={() => setModalDelete(true)}>Удалить</button>
                    </li>
                </ul>
            </Dropdown>
        </li>
    );
}

export default TodoTask;