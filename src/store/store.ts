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
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector