import {configureStore} from '@reduxjs/toolkit'
import themeReducer from "./themeReducer";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import todoReducer from "./todoReducer";
import dataReducer from "./dataReducer";

export const store = configureStore({
    reducer: {
        theme: themeReducer,
        todo: todoReducer,
        data: dataReducer
    },
    preloadedState: loadFromLocalStorage()
})

function saveToLocalStorage(state: RootState) {
    try {
        const serializedState = JSON.stringify(state);
        if (typeof window !== 'undefined') {
            localStorage.setItem("persistentState", serializedState);
        }
    } catch (e) {
        console.warn(e);
    }
}

function loadFromLocalStorage() {
    try {
        if (typeof window !== 'undefined') {
            const serializedState = localStorage.getItem("persistentState");
            if (serializedState === null) return undefined;
            return JSON.parse(serializedState);
        }
    } catch (e) {
        console.warn(e);
        return undefined;
    }
}

store.subscribe(() => saveToLocalStorage(store.getState()));

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector