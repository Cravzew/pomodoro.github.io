import React, {useRef} from 'react';
import ReactDOM from "react-dom";
import {useAppDispatch} from "../../../../constants/hooks";
import {removeTodo} from "../../../../store/todoReducer";

function ModalDelete(props: { id: string, setModalDelete: React.Dispatch<React.SetStateAction<boolean>> }) {
    const {
        id,
        setModalDelete
    } = props

    const ref = useRef<HTMLDivElement>(null)

    const dispatch = useAppDispatch()

    function handleDelete() {
        dispatch(removeTodo(id))
    }

    const modal = document.getElementById('modal')
    if (!modal) return null

    return ReactDOM.createPortal((
            <div className="bg-black absolute inset-0 flex justify-center items-center" style={{
                backgroundColor: 'rgba(0,0,0,0.5)'
            }} id="overlay" ref={ref} onClick={(e) => {
                if (e.target === document.getElementById('overlay') || e.target === document.getElementById('close') || e.target === document.getElementById('cancel')) {
                    setModalDelete(false)
                }
            }}>
                <div id="header" className="flex flex-col p-5 opacity-1 bg-amber-50 relative">
                    <h1 className="text-zinc-900 mb-3">Удалить задачу</h1>
                    <button id="close" className="absolute text-zinc-900 top-0 right-1">X
                    </button>
                    <button className="block mb-3 p-2 text-white bg-red-600" onClick={handleDelete}>Удалить</button>
                    <button id="cancel" className="block text-zinc-900 underline">Отмена</button>
                </div>
            </div>
        ), modal
    );
}

export default ModalDelete;