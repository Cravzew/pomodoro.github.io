import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import styles from './index.module.scss'
import {set} from "../../../store/themeReducer";
import {useAppSelector} from "../../../store/store";

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
        <div
            onClick={handleChange}
        >
            adsdsa
        </div>
    )
}

export default Theme