import React from 'react';
import ReactDOM from "react-dom";
import {
    model,
    modelDialog,
    modelDialogBody,
    modelDialogClose,
    modelDialogContent,
    modelDialogFooter,
    modelDialogHeader,
    modelDialogTitle,
} from './modal.scss'
import ModalCloseSvg from "./ModalCloseSvg";

interface IModalProps {
    isActive: boolean
    title: string,
    children: React.ReactNode,
    footer: React.ReactNode,
    setModal: (value: boolean) => void
}

function Modal(props: IModalProps) {

    const {
        title,
        children,
        footer,
        setModal,
        isActive
    } = props

    function handleClose(e: React.MouseEvent) {
        if (e.target === document.getElementById('overlay')) {
            setModal(false)
        }
    }

    const modal = document.getElementById('modal')
    if (!modal) return null

    return ReactDOM.createPortal((
            <div className={model} id="overlay" onClick={handleClose}>
                <div className={modelDialog}>
                    <div className={modelDialogContent}>
                        <button className={modelDialogClose} onClick={() => setModal(false)} id="close">
                            <ModalCloseSvg/>
                        </button>
                        <div className={modelDialogHeader}>
                            <h1 className={modelDialogTitle}>{title}</h1>
                        </div>
                        <div className={modelDialogBody}>
                            {children}
                        </div>
                        <div className={modelDialogFooter}>
                            {footer}
                        </div>
                    </div>
                </div>
            </div>
        ), modal
    );
}

export default Modal;