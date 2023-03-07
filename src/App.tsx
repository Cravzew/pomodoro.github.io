import React, {useState} from 'react';

function App() {
    const [time, setTime] = useState(2 * 60)
    const [mount, setMount] = useState(false)

    function getPadTime(time: number): string {
        return time.toString().padStart(2, '0')
    }

    const minutes = getPadTime(Math.floor(time / 60))
    const seconds = getPadTime(time - Number(minutes) * 60)

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
                    <li>Задача</li>
                </ul>
            </div>
        </div>
    );
}

export default App;
