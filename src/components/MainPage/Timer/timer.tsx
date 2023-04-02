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
    timerEmpty
} from './timer.scss'
import {initialBreak, initialLongBreak, initialTime} from "../../../constants/time";
import {useAppSelector} from "../../../store/store";
import IncTimeSvg from "./incTimeSvg";
import {getPadTime} from "../../../utils/getPadTime";

function Timer() {

    const [time, setTime] = useState(initialTime)
    const [tomato, setTomato] = useState(1)
    const [mount, setMount] = useState(1)
    const [pauseCount, setPauseCount] = useState(1)
    const [state, setState] = useState('null') //  null / pause / work / break / long-break /

    const todo = useAppSelector(state => state.todo.list)

    const workState = state === 'work' || state === 'break' || state === 'long-break'
    const breakState = state === 'break' || state === 'long-break'

    const minutes = getPadTime(Math.floor(time / 60))
    const seconds = getPadTime(time - Number(minutes) * 60)

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
        <section className={timer}>
            {todo.length !== 0 ?
                <div>
                    <div className={timerHeader}>
                        <p className={timerHeaderTask}>{todo[0].task}</p>
                        <p className={timerHeaderTomato}>Помидор {todo[0].tomato}</p>
                    </div>
                    <div className={timerBody}>
                        <div className={timerBodyTimer}>
                            <p>{minutes}:{seconds}</p>
                            <button>
                                <IncTimeSvg/>
                            </button>
                        </div>
                        <p className={timerBodyTask}>{todo[0].task}</p>
                        <div className={timerBodyForm}>
                            <button>Старт</button>
                            <button>Стоп</button>
                        </div>
                    </div>
                </div>
                :
                <div className={timerEmpty}>

                </div>
            }
        </section>
    );
}

export default Timer;