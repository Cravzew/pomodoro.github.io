import React from 'react';
import Todo from "./components/Todo/todo";
import Timer from "./components/Timer/timer";

export interface ITaskProps {
    id: string,
    task: string,
    tomato: number,
    setTodoText?: React.Dispatch<React.SetStateAction<string>>,
    todoText?: string
}

function App() {

    return (
        <div>
            <Timer/>
            <Todo/>
        </div>
    );
}

export default App;
