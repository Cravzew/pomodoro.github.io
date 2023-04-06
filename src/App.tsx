import React from 'react';
import Header from "./components/Header/header";
import Page from "./components/Other/Page/Page";
import Timer from "./components/MainPage/Timer/timer";
import Todo from "./components/MainPage/Todo/Todo";

function App() {
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