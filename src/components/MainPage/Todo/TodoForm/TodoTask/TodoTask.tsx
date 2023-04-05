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