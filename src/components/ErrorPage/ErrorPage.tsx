import React from 'react';
import Header from "../Header/header";
import {error} from './errorpage.scss'

function ErrorPage() {

    return (
        <>
            <Header/>
            <div className={error}>
                Ошибка. Что-то пошло не так :(
            </div>
        </>
    );
}

export default ErrorPage;