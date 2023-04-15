import React, {SetStateAction, useEffect, useRef, useState} from 'react';
import ArrowSvg from "../../StatsPage/UpperStats/ArrowSvg";
import {
    select,
    selectContent,
    selectContentHeader,
    selectList
} from './customselect.scss'
import ReactDOM from "react-dom";
import {ChartMode, ChartModes} from "../../StatsPage/UpperStats/UpperStats";

interface ICustomSelect {
    lists: { name: string; value: ChartMode; }[],
    handleSelectMode?: (selectedMode: ChartMode) => void,
    selectedChartMode?: ChartMode
}

function CustomSelect(props: ICustomSelect) {

    const {
        lists,
        handleSelectMode,
        selectedChartMode
    } = props


    const [isOpen, setIsOpen] = useState(false)

    const ref = useRef(null)

    useEffect(() => {
        function handleClick(event: MouseEvent) {
            if (event.target instanceof Node && !ref.current?.contains(event.target)) {
                setIsOpen(false)
            }
        }

        document.addEventListener('click', handleClick);

        return () => {
            document.removeEventListener('click', handleClick);
        }
    }, []);

    return (
        <div className={select} ref={ref}>
            <div className={selectContent} onClick={() => {
                setIsOpen(!isOpen)
            }}>
                <p className={selectContentHeader}>
                    {ChartModes.find(chartMode => chartMode.value === selectedChartMode)?.name}
                </p>
                <ArrowSvg rotate={isOpen ? 'down' : 'up'}/>
            </div>
            {isOpen &&
                <ul className={selectList}>
                    {lists.map((it) =>
                        <li key={Math.round(Math.random() * 100)} onClick={() => {
                            handleSelectMode(it.value)
                            setIsOpen(false)
                        }}>
                            {it.name}
                        </li>)}
                </ul>
            }
        </div>
    );
}

export default CustomSelect;