import { createSlice } from '@reduxjs/toolkit'

const getTheme = () => {
    const userMedia = window.matchMedia('(prefers-color-scheme: light)')
    if (userMedia.matches) return 'light'

    return 'dark'
}

const initialState = getTheme()

export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        set: (state, action) => action.payload,
    },
})

export const { set } = themeSlice.actions

export default themeSlice.reducer