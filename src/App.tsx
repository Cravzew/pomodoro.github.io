import React, {useEffect, useState} from 'react';

interface ITaskProps {
    id: string,
    task: string
}

function App() {
    function getPadTime(time: number) {
        return time.toString().padStart(2, '0')
    }

    const initialTime = 3
    const initialBreak = 3
    const initialLongBreak = 3

    const [time, setTime] = useState(initialTime)
    const [tomato, setTomato] = useState(1)
    const [state, setState] = useState('null') //  null / pause / work / break / long-break /
    const [todo, setTodo] = useState<ITaskProps[]>([
        {id: '111', task: 'Доделать помодоро'},
        {id: '121', task: 'Сделать таймер'},
    ])
    const [userInput, setUserInput] = useState('')

    const minutes = getPadTime(Math.floor(time / 60))
    const seconds = getPadTime(time - Number(minutes) * 60)

    const workState = state === 'work' || state === 'break' || state === 'long-break'

    useEffect(() => {
            const interval = setInterval(() => {
                if (workState) {
                    setTime((time) => (time >= 1 ? time - 1 : 0))
                }
            }, 1000)
            if (time === 0) {
                if (tomato % 4 === 0) {
                    breakState('long-break', initialLongBreak)
                } else {
                    if (state === 'long-break') {
                        breakState('work', initialTime)
                    } else {
                        breakState('break', initialBreak)
                    }
                }
            }
            return () => {
                clearInterval(interval)
            }
        }, [time, state, tomato, workState]
    )

    function breakState(name: string, initial: number) {
        setState(name)
        if (time === 0) {
            setTime(initial)
            setTomato(tomato + 1)
        }
        if (state === name) {
            return handleStart()
        }
    }

    function handleStart() {
        if (time === 0) setTime(initialTime)
        setState('work')
    }

    function handlePause() {
        setState('pause')
    }

    function handleReset() {
        setTime(initialTime)
        setTomato(1)
        setState('null')
    }

    function handleAddTomato() {
        setTomato(tomato + 1)
        setTime(time + 60)
    }

    function handleSubmit() {
        const newItem: ITaskProps = {
            id: Math.random().toString(36).substring(2, 9),
            task: userInput
        }
        setTodo([...todo, newItem])
    }

    function handleDelete(id: string) {
        setTodo([...todo.filter((todo) => todo.id !== id)])
    }

    return (
        <div>
            <div className="mb-10 p-10 flex justify-center container mx-auto border-solid border-2 border-sky-500">
                {todo.length !== 0 ?
                    <span className="p-3 mr-5 border-solid border-2 border-sky-500">{todo[0].task}</span>
                    :
                    undefined
                }
                <span className="p-3 mr-5 border-solid border-2 border-sky-500">Помидоров {tomato}</span>
                <span className="p-3 mr-5 border-solid border-2 border-sky-500">Список задач {todo.length}</span>
                <span className="p-3 border-solid border-2 border-sky-500">Состояние {state}</span>
            </div>
            <div
                className={`mb-10 p-10 flex justify-center container mx-auto border-solid border-2 ${state === 'null' && 'border-sky-500'} ${state === 'work' && 'border-red-500'} ${state === 'pause' && 'border-red-500'} ${(state === 'break' || state === 'long-break') && 'border-green-500'}`}>
                <span
                    className={`text-6xl font-bold ${state === 'null' && 'text-white-500'} ${state === 'pause' && 'text-red-500'} ${(state === 'break' || state === 'long-break') && 'text-green-500'}`}>
                    {minutes}:{seconds}
                </span>
                <button className="ml-5 p-3 border-solid border-2 border-sky-500"
                        onClick={handleAddTomato}>+
                </button>
            </div>
            <div className="mb-10 p-10 flex justify-center container mx-auto border-solid border-2 border-sky-500">
                {state === 'null' &&
                    <button
                        className="p-3 mr-5 border-solid border-2 border-green-500"
                        onClick={() => breakState('work', initialTime)
                        }>
                        Старт
                    </button>
                }
                {state !== 'null' && (workState ?
                    <button className="p-3 mr-5 border-solid border-2 border-green-500"
                            onClick={handlePause}>Пауза</button>
                    :
                    <button className="p-3 mr-5 border-solid border-2 border-green-500"
                            onClick={() =>
                                (tomato % 1 === 0 ? breakState('work', initialTime) : handleStart) ||
                                (tomato % 2 === 0 ? breakState('break', initialBreak) : handleStart) ||
                                (tomato % 4 === 0 ? breakState('long-break', initialLongBreak) : handleStart)
                            }>Продолжить</button>)

                }
                {state === 'null' &&
                    <button className={`p-3 border-solid border-2 border-gray-500`}
                            onClick={handleReset} disabled>Стоп
                    </button>
                }
                {state !== 'null' && (state === 'work' ?
                        <button className={`p-3 border-solid border-2 border-red-500`}
                                onClick={handleReset}>Стоп
                        </button>
                        : (state === 'break' || state === 'long-break' ?
                                <button className="p-3 mr-5 border-solid border-2 border-red-500"
                                        onClick={() => setTime(0)}>Пропустить</button>
                                :
                                <button className="p-3 mr-5 border-solid border-2 border-red-500"
                                        onClick={() => setTime(0)}>Сделано</button>
                        )
                )}
            </div>
            <div className="mb-10 p-10 container mx-auto border-solid border-2 border-sky-500">
                <div className="flex justify-center container mx-auto">
                    <input
                        className="p-2 border-solid border-2 border-sky-500"
                        type="text"
                        onChange={(e) => setUserInput(e.target.value)}
                        value={userInput}
                    />
                    <button
                        className="p-2 ml-3 border-solid border-2 border-sky-500"
                        onClick={handleSubmit}
                    >Добавить
                    </button>
                </div>
                <ul className="mt-3">
                    {todo.map((todo) =>
                        <li className="flex justify-between p-3 border-solid border-2 border-sky-500 mb-3"
                            key={todo.id}>
                            {todo.task}
                            <button onClick={() => handleDelete(todo.id)}>
                                X
                            </button>
                        </li>)}
                </ul>
            </div>
        </div>
    );
}

export default App;
