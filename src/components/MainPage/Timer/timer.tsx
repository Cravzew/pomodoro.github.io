import React, {useEffect, useState} from 'react';
import {
    grayButton,
    greenButton,
    redButton,
    timer,
    timerBody,
    timerBodyForm,
    timerBodyTask,
    timerBodyTimer,
    timerHeader,
    timerHeaderTask,
    timerHeaderTomato,
} from './timer.scss'
import {initialBreak, initialLongBreak, initialTime} from "../../../constants/time";
import {useAppDispatch, useAppSelector} from "../../../store/store";
import IncTimeSvg from "./incTimeSvg";
import {getPadTime} from "../../../utils/getPadTime";
import {completeTask, incTimerTomato, removeTodo} from "../../../store/todoReducer";
import {incComplete, incPauseSec, incStopCount, incTomatoesToday, incWorkSec} from "../../../store/dataReducer";

function Timer() {

    const [time, setTime] = useState(initialTime)
    const [mount, setMount] = useState(1)
    const [pauseCount, setPauseCount] = useState(1)
    const [state, setState] = useState('null') //  null / pause / work / break / long-break / pause-break

    const todo = useAppSelector(state => state.todo.list)
    const stats = useAppSelector(state => state.data.stats)

    const dispatch = useAppDispatch()

    const tomato = todo.length === 0 ? 1 : todo[0].tomato

    const workState = state === 'work' || state === 'break' || state === 'long-break'
    const breakState = state === 'break' || state === 'long-break'

    const minutes = getPadTime(Math.floor(time / 60))
    const seconds = getPadTime(time - Number(minutes) * 60)

    useEffect(() => {
        localStorage.setItem('stats', JSON.stringify(stats))
    }, [stats])

    function stateWork(): void {
        setState('work')
        setMount(mount + 1)
        if (time === 0) {
            setTime(initialTime)
            dispatch(incTimerTomato({id: todo[0].id, tomato: tomato + 1}))
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
            dispatch(incTimerTomato({id: todo[0].id, tomato: tomato}))
            setPauseCount(pauseCount + 1)
            dispatch(incTomatoesToday())
        }
        if (state === name) {
            return stateWork()
        }
    }

    function handleReset() {
        setTime(initialTime)
        dispatch(incTimerTomato({id: todo[0].id, tomato: 1}))
        setState('null')
        setMount(1)
        setPauseCount(1)
        dispatch(incStopCount())
    }

    function handleComplete() {
        dispatch(completeTask({id: todo[0].id, isComplete: true}))
        setTime(initialTime)
        setState('null')
        setMount(1)
        setPauseCount(1)
        dispatch(removeTodo(todo[0].id))
        dispatch(incComplete())
        dispatch(incTomatoesToday())
    }

    function handlePlus() {
        dispatch(incTimerTomato({id: todo[0].id, tomato: tomato + 1}))
        setTime(time + 60)
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
        }, [time, state, workState]
    )

    useEffect(() => {
        const interval = setInterval(() => {
            if (state === 'work') {
                dispatch(incWorkSec())
            }
            if (state === 'pause') {
                dispatch(incPauseSec())
            }
        }, 1000)

        return () => {
            clearInterval(interval)
        }
    }, [state])

    return (
        <section className={timer}>
            {todo.length !== 0 &&
                <div>
                    <div
                        className={`${timerHeader} ${state === 'null' ? 'bg-default' : ''} ${state === 'work' ? 'bg-red' : ''} ${(pauseCount % 4 === 0 || pauseCount % 2 === 0) ? 'bg-green' : 'bg-red'} ${(state === 'break' || state === 'long-break') ? 'bg-green' : ''}`}>
                        <p className={timerHeaderTask}>{todo[0].task}</p>
                        <p className={timerHeaderTomato}>{`${(state === 'work' || state === 'null') ? 'Помидор' : 'Перерыв'}`} {todo[0].tomato}</p>
                    </div>
                    <div className={timerBody}>
                        <div className={timerBodyTimer}>
                            <p className={`${state === 'null' ? 'text-default' : ''} ${state === 'pause' ? 'text-default' : ''} ${state === 'pause-break' ? 'text-default' : ''} ${state === 'work' ? 'text-red' : ''} ${(state === 'break' || state === 'long-break') ? 'text-green' : ''}`}>
                                {minutes}:{seconds}
                            </p>
                            <button onClick={handlePlus}>
                                <IncTimeSvg/>
                            </button>
                        </div>
                        <p className={timerBodyTask}>{todo[0].task}</p>
                        <div className={timerBodyForm}>
                            {state === 'null' &&
                                <button
                                    className={greenButton}
                                    onClick={stateWork}>
                                    Старт
                                </button>
                            }
                            {state !== 'null' && (workState ?
                                    <button
                                        className={greenButton}
                                        onClick={() => {
                                            if (state === 'work') {
                                                setState('pause')
                                            } else {
                                                setState('pause-break')
                                            }
                                            dispatch(incStopCount())
                                        }}>Пауза
                                    </button>
                                    :
                                    <button
                                        className={greenButton}
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
                                <button
                                    className={grayButton}
                                    onClick={handleReset} disabled>Стоп
                                </button>
                            }
                            {state !== 'null' && (state === 'work' &&
                                <button
                                    className={redButton}
                                    onClick={handleReset}>Стоп
                                </button>
                            )}
                            {state !== 'null' && (state === 'pause' &&
                                <button
                                    className={redButton}
                                    onClick={() => {
                                        handleComplete()
                                    }}>Сделано
                                </button>
                            )}
                            {state !== 'null' && (breakState &&
                                <button
                                    className={redButton}
                                    onClick={() => {
                                        setTime(0)
                                    }}>Пропустить
                                </button>
                            )}
                            {state !== 'null' && (state === 'pause-break' &&
                                <button
                                    className={redButton}
                                    onClick={() => {
                                        setTime(0)
                                    }}>Пропустить
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            }
        </section>
    );
}

export default Timer;