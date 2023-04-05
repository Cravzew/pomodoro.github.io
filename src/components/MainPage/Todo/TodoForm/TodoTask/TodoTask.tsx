import React, {ChangeEvent, useRef, useState} from 'react';
import {
    tasksItem,
    tasksItemContent,
    tasksItemContentTomato,
    tasksItemContentText,
    tasksDropdown,
    tasksDropdownItem,
    modalDialogBody,
    modalDialogButton,
    modalDialogCancel,
} from './todotask.scss'
import DotSvg from "./DotSvg";
import {decTomato, incTomato, ITaskProps, removeTodo, updateTask} from "../../../../../store/todoReducer";
import {Dropdown} from "./Dropdown/dropdown";
import {useAppDispatch} from "../../../../../store/store";
import IncSvg from "./Dropdown/IncSvg";
import DecSvg from "./Dropdown/DecSvg";
import EditSvg from "./Dropdown/EditSvg";
import DelSvg from "./Dropdown/DelSvg";
import Modal from "../../../../Other/Modal/modal";

function TodoTask({id, task, tomato}: ITaskProps) {

    const [text, setText] = useState(task)

    const [isEdit, setIsEdit] = useState(false)
    const [modalDelete, setModalDelete] = useState(false)

    const dispatch = useAppDispatch()

    const ref = useRef<HTMLLIElement>(null)

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        setText(event.target.value)
    }

    function handleBlur() {
        if (text.length <= 3) return
        setIsEdit(false)
        dispatch(updateTask({id: id, task: text}))
    }

    function handleDelete() {
        dispatch(removeTodo(id))
    }

    setTimeout(() => {
        ref.current.classList.add('show')
    }, 10)

    return (
        <li className={tasksItem} key={id} id="tasksItem" ref={ref}>
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
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_35_103)">
                                <path
                                    d="M9 1.5C4.8675 1.5 1.5 4.8675 1.5 9C1.5 13.1325 4.8675 16.5 9 16.5C13.1325 16.5 16.5 13.1325 16.5 9C16.5 4.8675 13.1325 1.5 9 1.5ZM9 15C5.6925 15 3 12.3075 3 9C3 5.6925 5.6925 3 9 3C12.3075 3 15 5.6925 15 9C15 12.3075 12.3075 15 9 15Z"
                                    fill={tomato !== 1 ? '#A8B64F' : '#C4C4C4'}/>
                                <path d="M5.25 8.25H8.25H9.75H12.75V9.75H9.75H8.25H5.25V8.25Z"
                                      fill={tomato !== 1 ? '#A8B64F' : '#C4C4C4'}/>
                            </g>
                            <defs>
                                <clipPath id="clip0_35_103">
                                    <rect width="18" height="18" fill="white"/>
                                </clipPath>
                            </defs>
                        </svg>
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
            {modalDelete &&
                <Modal setModal={setModalDelete} title={'Удалить задачу'} footer={
                    <button id="cancel" className={modalDialogCancel}
                            onClick={() => setModalDelete(false)}>Отмена</button>
                }>
                    <div className={modalDialogBody}>
                        <button className={modalDialogButton} onClick={handleDelete}>Удалить</button>
                    </div>
                </Modal>
            }
        </li>
    );
}

export default TodoTask;