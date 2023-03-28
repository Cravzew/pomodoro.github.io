import React from 'react'
import {useDispatch} from 'react-redux'
import {set} from "../../../store/themeReducer";
import {useAppSelector} from "../../../store/store";
import SunSvg from "./SunSvg";
import MoonSvg from "./MoonSvg";
import {buttonContainer} from './theme.scss'

const Theme = () => {
    const theme = useAppSelector(state => state.theme)
    const dispatch = useDispatch()

    React.useEffect(() => {
        document.documentElement.dataset.theme = theme
        localStorage.setItem('theme', theme)
    }, [theme])

    const handleChange = () => {
        const next = theme === 'dark' ? 'light' : 'dark'
        dispatch(set(next))
    }

    return (
        <button
            onClick={handleChange}
        >
            {theme === 'light' ?
                <div className={buttonContainer}>
                    <SunSvg/>
                    <span>
                    Светлая тема
                    </span>
                </div>
                :
                <div className={buttonContainer}>
                    <MoonSvg/>
                    <span>
                    Тёмная тема
                    </span>
                </div>
            }
        </button>
    )
}

export default Theme