import React, {ChangeEvent, useState} from 'react';
import {Dropdown} from "../Dropdown/dropdown";
import ModalDelete from "./ModalDelete/modaldelete";
import {ITaskProps} from "../../../App";
import {useAppDispatch} from "../../../constants/hooks";
import {decTomato, incTomato, updateTask} from "../../../store/todoReducer";

function TodoTask({id, task, tomato}: ITaskProps) {

    const [text, setText] = useState(task)

    const [isModalDelete, setModalDelete] = useState(false)
    const [isEdit, setIsEdit] = useState(false)

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        setText(event.target.value)
    }

    function handleBlur() {
        if (text.length <= 3) return
        setIsEdit(false)
        dispatch(updateTask(text))
    }

    const dispatch = useAppDispatch()

    return (
        <li className="flex justify-between p-3 border-solid border-2 border-sky-500 mb-3"
            key={id}>
            <div className="flex">
                <span className="mr-5">
                    {tomato}
                </span>
                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                    }}
                >
                    {isEdit ?
                        <input
                            type="text"
                            value={text}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        :
                        <span>
                    {text}
                    </span>
                    }
                </form>
            </div>
            <Dropdown button={
                <button>
                    ...
                </button>
            }>
                <div className="mb-5 cursor-pointer" onClick={() => dispatch(incTomato(id))}>Увеличить</div>
                <div className="mb-5 cursor-pointer" onClick={() => dispatch(decTomato(id))}>Уменьшить</div>
                <div className="mb-5 cursor-pointer" onClick={() => setIsEdit(!isEdit)}>Редактировать</div>
                <div className="cursor-pointer" onClick={() => setModalDelete(true)}>Удалить</div>
            </Dropdown>
            {isModalDelete && (
                <ModalDelete id={id} setModalDelete={setModalDelete}/>
            )}
        </li>
    );
}

export default TodoTask;