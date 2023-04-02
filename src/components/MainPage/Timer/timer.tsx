import React, {useEffect, useState} from 'react';
import {
    timer,
    timerHeader,
    timerHeaderTomato,
    timerHeaderTask,
    timerBody,
    timerBodyTimer,
    timerBodyTask,
    timerBodyForm,
    grayButton,
    redButton,
    greenButton
} from './timer.scss'
import {initialBreak, initialLongBreak, initialTime} from "../../../constants/time";
import {useAppDispatch, useAppSelector} from "../../../store/store";
import IncTimeSvg from "./incTimeSvg";
import {getPadTime} from "../../../utils/getPadTime";
import {incTimerTomato, incTomato} from "../../../store/todoReducer";

function Timer() {

    const [time, setTime] = useState(initialTime)
    const [mount, setMount] = useState(1)
    const [pauseCount, setPauseCount] = useState(1)
    const [state, setState] = useState('null') //  null / pause / work / break / long-break /

    const tomato = 1

    const todo = useAppSelector(state => state.todo.list)
    const dispatch = useAppDispatch()

    const workState = state === 'work' || state === 'break' || state === 'long-break'
    const breakState = state === 'break' || state === 'long-break'

    const minutes = getPadTime(Math.floor(time / 60))
    const seconds = getPadTime(time - Number(minutes) * 60)

    function stateWork(): void {
        setState('work')
        setMount(mount + 1)
        if (time === 0) {
            setTime(initialTime)
            dispatch(incTimerTomato(tomato + 1))
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
            dispatch(incTimerTomato(tomato))
            setPauseCount(pauseCount + 1)
        }
        if (state === name) {
            return stateWork()
        }
    }

    function handleReset() {
        setTime(initialTime)
        dispatch(incTimerTomato(1))
        setState('null')
        setMount(1)
        setPauseCount(1)
    }

    function handlePlus() {
        // setTomato(tomato + 1)
        dispatch(incTimerTomato(tomato + 1))
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

    return (
        <section className={timer}>
            {todo.length !== 0 &&
                <div>
                    <div className={timerHeader} style={{
                        backgroundColor: `${state === 'work' ? 'var(--button-red-default-bg)' : ''} ${state === 'break' || state === 'long-break' ? 'var(--button-green-default-bg)' : ''}`
                    }}>
                        <p className={timerHeaderTask}>{todo[0].task}</p>
                        <p className={timerHeaderTomato}>Помидор {todo[0].tomato}</p>
                    </div>
                    <div className={timerBody}>
                        <div className={timerBodyTimer}>
                            <p>{minutes}:{seconds}</p>
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
                                        handleReset()
                                        alert('Дело сделано')
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