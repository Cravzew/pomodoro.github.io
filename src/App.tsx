import React, {useEffect} from 'react';
import Header from "./components/Header/header";
import Page from "./components/Other/Page/Page";
import Timer from "./components/MainPage/Timer/timer";
import Todo from "./components/MainPage/Todo/Todo";
import {useAppDispatch} from "./store/store";
import {pushNewAdd} from "./store/dataReducer";

function App() {

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(pushNewAdd())
    }, [])

    return (
        <>
            <Header/>
            <Page>
                <Todo/>
                <Timer/>
            </Page>
        </>
    );
}

export default App;