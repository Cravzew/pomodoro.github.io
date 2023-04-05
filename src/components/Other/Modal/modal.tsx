import React from 'react';
import ReactDOM from "react-dom";
import {
    model,
    modelDialog,
    modelDialogBody,
    modelDialogClose,
    modelDialogContent,
    modelDialogHeader,
    modelDialogTitle,
    modelDialogFooter
} from './modal.scss'
import ModalCloseSvg from "./ModalCloseSvg";

interface IModalProps {
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
        setModal
    } = props

    function handleClose(e: React.MouseEvent) {
        if (e.target === document.getElementById('overlay') || e.target === document.getElementById('close') || e.target === document.getElementById('cancel')) {
            setModal(false)
        }
    }

    const modal = document.getElementById('modal')
    if (!modal) return null

    return ReactDOM.createPortal((
            <div className={model} id="overlay" onClick={handleClose}>
                <div className={modelDialog}>
                    <div className={modelDialogContent}>
                        <button className={modelDialogClose} onClick={handleClose} id="close">
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