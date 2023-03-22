import React, {useEffect, useState} from 'react';
import {initialBreak, initialLongBreak, initialTime} from "../../constants/time";
import {getPadTime} from "../../utils/getPadTime";
import {useAppSelector} from "../../constants/hooks";

function Timer() {

    const [time, setTime] = useState(initialTime)
    const [tomato, setTomato] = useState(1)
    const [mount, setMount] = useState(1)
    const [pauseCount, setPauseCount] = useState(1)
    const [state, setState] = useState('null') //  null / pause / work / break / long-break /

    const todo = useAppSelector(state => state.todos.list)

    const minutes = getPadTime(Math.floor(time / 60))
    const seconds = getPadTime(time - Number(minutes) * 60)

    const workState = state === 'work' || state === 'break' || state === 'long-break'
    const breakState = state === 'break' || state === 'long-break'

    function stateWork(): void {
        setState('work')
        setMount(mount + 1)
        if (time === 0) {
            setTime(initialTime)
            setTomato(tomato + 1)
            setPauseCount(pauseCount + 1)
        }
        if (mount % 4 === 0) {
            return stateBreak('long-break', initialLongBreak)
        }
        if (state === 'work') {
            return stateBreak('break', initialBreak)
        }
    }

    function stateBreak(name: string, initial: number): void {
        setState(name)
        setMount(mount + 1)
        if (time === 0) {
            setTime(initial)
            setTomato(tomato)
            setPauseCount(pauseCount + 1)
        }
        if (state === name) {
            return stateWork()
        }
    }

    function handleReset() {
        setTime(initialTime)
        setTomato(1)
        setState('null')
        setMount(1)
        setPauseCount(1)
    }

    useEffect(() => {
            const interval = setInterval(() => {
                if (workState) {
                    setTime((time) => (time >= 1 ? time - 1 : 0))
                }
            }, 1000)
            if (time === 0) {
                stateWork()
            }
            return () => {
                clearInterval(interval)
            }
        }, [time, state, tomato, workState]
    )

    return (
        <div>
            <div className="mt-10 mb-10 p-10 flex justify-center container mx-auto border-solid border-2 border-sky-500">
                {todo.length !== 0 ?
                    <div className="flex">
                        <span className="p-3 mr-5 border-solid border-2 border-sky-500">{todo[0].task}</span>
                        <span
                            className="p-3 mr-5 border-solid border-2 border-sky-500">Помидоров {todo[0].tomato}</span>
                    </div>
                    :
                    undefined
                }
                <span className="p-3 mr-5 border-solid border-2 border-sky-500">Вызов {mount}</span>
                <span className="p-3 mr-5 border-solid border-2 border-sky-500">Счётчик пауз {pauseCount}</span>
                <span className="p-3 border-solid border-2 border-sky-500">Состояние {state}</span>
            </div>
            {todo.length !== 0 ?
                <div>

                    <div
                        className={`mb-10 p-10 flex justify-center container mx-auto border-solid border-2 ${state === 'null' && 'border-sky-500'} ${state === 'work' && 'border-red-500'} ${(pauseCount % 4 === 0 || pauseCount % 2 === 0) ? 'border-green-500' : 'border-red-500'} ${(state === 'break' || state === 'long-break') && 'border-green-500'}`}>
                <span
                    className={`text-6xl font-bold  ${(state === 'null' || state === 'pause') && 'text-white-500'} ${state === 'work' && 'text-red-500'} ${(state === 'break' || state === 'long-break') && 'text-green-500'}`}>
                    {minutes}:{seconds}
                </span>
                        <button className="ml-5 p-3 border-solid border-2 border-sky-500"
                                onClick={() => {
                                    setTomato(tomato + 1)
                                    setTime(time + 60)
                                }}>+
                        </button>
                    </div>
                    <div
                        className="mb-10 p-10 flex justify-center container mx-auto border-solid border-2 border-sky-500">
                        {state === 'null' &&
                            <button
                                className="p-3 mr-5 border-solid border-2 border-green-500"
                                onClick={stateWork}>
                                Старт
                            </button>
                        }
                        {state !== 'null' && (workState ?
                                <button className="p-3 mr-5 border-solid border-2 border-green-500"
                                        onClick={() => {
                                            if (state === 'work') {
                                                setState('pause')
                                            } else {
                                                setState('pause-break')
                                            }
                                        }}>Пауза
                                </button>
                                :
                                <button className="p-3 mr-5 border-solid border-2 border-green-500"
                                        onClick={() => {
                                            if (pauseCount % 4 === 0) {
                                                setState('long-break')
                                            } else if (pauseCount % 2 === 0) {
                                                setState('break')
                                            } else {
                                                setState('work')
                                            }
                                        }
                                        }>Продолжить
                                </button>
                        )}
                        {state === 'null' &&
                            <button className={`p-3 border-solid border-2 border-gray-500`}
                                    onClick={handleReset} disabled>Стоп
                            </button>
                        }
                        {state !== 'null' && (state === 'work' &&
                            <button className={`p-3 border-solid border-2 border-red-500`}
                                    onClick={handleReset}>Стоп
                            </button>
                        )}
                        {state !== 'null' && (state === 'pause' &&
                            <button className={`p-3 border-solid border-2 border-red-500`}
                                    onClick={() => {
                                        handleReset()
                                        alert('Дело сделано')
                                    }}>Сделано
                            </button>
                        )}
                        {state !== 'null' && (breakState &&
                            <button className={`p-3 border-solid border-2 border-red-500`}
                                    onClick={() => {
                                        setTime(0)
                                    }}>Пропустить
                            </button>
                        )}
                        {state !== 'null' && (state === 'pause-break' &&
                            <button className={`p-3 border-solid border-2 border-red-500`}
                                    onClick={() => {
                                        setTime(0)
                                    }}>Пропустить
                            </button>
                        )}
                    </div>
                </div>
                :
                <div className="block text-center mb-10">
                    Нету задачи
                </div>
            }
        </div>
    );
}

export default Timer;