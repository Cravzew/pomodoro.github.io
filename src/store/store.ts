import { configureStore } from '@reduxjs/toolkit'
import todoReducer from "./todoReducer";
import tomatoReducer from "./tomatoReducer";
// ...

export const store = configureStore({
    reducer: {
        todos: todoReducer,
        tomato: tomatoReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch