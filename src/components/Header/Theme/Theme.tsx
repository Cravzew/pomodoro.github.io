import React from 'react'
import {set} from "../../../store/themeReducer";
import {useAppDispatch, useAppSelector} from "../../../store/store";
import SunSvg from "./SunSvg";
import MoonSvg from "./MoonSvg";

const Theme = () => {
    const theme = useAppSelector(state => state.theme)
    const dispatch = useAppDispatch()

    React.useEffect(() => {
        document.documentElement.dataset.theme = theme
        localStorage.setItem('theme', theme)
    }, [theme])

    const handleChange = () => {
        const next = theme === 'dark' ? 'light' : 'dark'
        dispatch(set(next))
    }

    return (
        <li>
            <button
                onClick={handleChange}
            >
                {theme === 'light' ?
                    <div>
                        <SunSvg/>
                        <span>
                    Светлая тема
                    </span>
                    </div>
                    :
                    <div>
                        <MoonSvg/>
                        <span>
                    Тёмная тема
                    </span>
                    </div>
                }
            </button>
        </li>
    )
}

export default Theme