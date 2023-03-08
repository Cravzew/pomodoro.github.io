import React, {useEffect, useState} from 'react';
import {clearInterval} from "timers";

function App() {
    const [time, setTime] = useState(2 * 60)
    const [mount, setMount] = useState(false)

    function getPadTime(time: number) {
        return time.toString().padStart(2, '0')
    }

    const minutes = getPadTime(Math.floor(time / 60))
    const seconds = getPadTime(time - Number(minutes) * 60)

    useEffect(() => {
        const interval = setInterval(() => {
            if (mount) {
                setTime((time) => (time >= 1 ? time - 1 : 0))
            }
        }, 1000)
        return () => {
            clearInterval(interval)
        }
    }, [mount])

    function handleStart() {

    }

    function handlePause() {

    }

    function handleReset() {

    }

    return (
        <div>
            <div className="mb-10 p-10 flex justify-center container mx-auto border-solid border-2 border-sky-500">
                <span className="p-3 mr-5 border-solid border-2 border-sky-500">Задача</span>
                <span className="p-3 border-solid border-2 border-sky-500">Помидоров 1</span>
            </div>
            <div className="mb-10 p-10 flex justify-center container mx-auto border-solid border-2 border-sky-500">
                <span className="text-6xl font-bold">
                    {minutes}:{seconds}
                </span>
                <button className="ml-5 p-3 border-solid border-2 border-sky-500">+</button>
            </div>
            <div className="mb-10 p-10 flex justify-center container mx-auto border-solid border-2 border-sky-500">
                {mount ?
                    <button className="p-3 border-solid border-2 border-sky-500" onClick={handlePause}>Пауза</button>
                    :
                    <button className="p-3 mr-5 border-solid border-2 border-sky-500"
                            onClick={handleStart}>Старт</button>
                }
                <button className="p-3 border-solid border-2 border-sky-500" onClick={handlePause}>Стоп</button>
            </div>
            <div className="mb-10 p-10 container mx-auto border-solid border-2 border-sky-500">
                <div className="flex justify-center container mx-auto">
                    <input className="border-solid border-2 border-sky-500" type="text"/>
                    <button className="ml-1 border-solid border-2 border-sky-500">Добавить</button>
                </div>
                <ul className="border-solid border-2 border-sky-500 mt-3">
                    <li className="p-3">Задача</li>
                </ul>
            </div>
        </div>
    );
}

export default App;
