import React, {useRef} from 'react';
import ReactDOM from "react-dom";
import {removeTodo} from "../../../../store/todoReducer";
import {useAppDispatch} from "../../../../store/store";
import {
    model,
    modelDialog,
    modelDialogBody,
    modelDialogClose,
    modelDialogContent,
    modelDialogFooter,
    modelDialogHeader,
    modelDialogTitle,
    modelDialogButton,
    modelDialogCancel
} from './modaldelete.scss'
import ModalCloseSvg from "./ModalCloseSvg";

function ModalDelete(props: { id: string, setModalDelete: (boolean: boolean) => void }) {
    const {
        id,
        setModalDelete
    } = props

    const ref = useRef<HTMLDivElement>(null)

    const dispatch = useAppDispatch()

    function handleDelete() {
        dispatch(removeTodo(id))
    }

    function handleClose(e: React.MouseEvent) {
        if (e.target === document.getElementById('overlay') || e.target === document.getElementById('close') || e.target === document.getElementById('cancel')) {
            setModalDelete(false)
        }
    }

    const modal = document.getElementById('modal')
    if (!modal) return null

    return ReactDOM.createPortal((
            <div className={model} id="overlay" ref={ref} onClick={handleClose}>
                <div className={modelDialog}>
                    <div className={modelDialogContent}>
                        <button className={modelDialogClose} onClick={handleClose} id="close">
                            <ModalCloseSvg/>
                        </button>
                        <div className={modelDialogHeader}>
                            <h1 className={modelDialogTitle}>Удалить задачу</h1>
                        </div>
                        <div className={modelDialogBody}>
                            <button className={modelDialogButton} onClick={handleDelete}>Удалить</button>
                        </div>
                        <div className={modelDialogFooter}>
                            <button id="cancel" className={modelDialogCancel} onClick={handleClose}>Отмена</button>
                        </div>
                    </div>
                </div>
            </div>
        ), modal
    );
}

export default ModalDelete;