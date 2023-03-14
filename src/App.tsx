import React from 'react';
import Todo from "./components/Todo/todo";
import Timer from "./components/Timer/timer";

export interface ITaskProps {
    id: string,
    task: string
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
