import React, {useEffect, useRef, useState} from 'react';
import ArrowSvg from "../../StatsPage/UpperStats/ArrowSvg";
import {
    select,
    selectContent,
    selectContentHeader,
    selectList
} from './customselect.scss'
import ReactDOM from "react-dom";

interface ICustomSelect {
    selected: string,
    lists: string[]
}

function CustomSelect(props: ICustomSelect) {

    const {
        selected,
        lists
    } = props

    const [isOpen, setIsOpen] = useState(false)
    const [selecter, setSelecter] = useState(selected)

    return (
        <div className={select}>
            <div className={selectContent} onClick={() => {
                setIsOpen(!isOpen)
            }}>
                <p className={selectContentHeader}>
                    {selecter}
                </p>
                <ArrowSvg rotate={isOpen ? 'down' : 'up'}/>
            </div>
            {isOpen &&
                <ul className={selectList}>
                    {lists.map((it) =>
                        <li key={Math.round(Math.random() * 100)} onClick={() => {
                            setSelecter(selecter !== it ? it : selected)
                            setIsOpen(false)
                        }}>
                            {selecter !== it ? it : selected}
                        </li>)}
                </ul>
            }
        </div>
    );
}

export default CustomSelect;