import {ITaskProps} from "../App";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {generateRandomIndex} from "../utils/generateRandomIndex";

type TodoState = {
    list: ITaskProps[]
}

const initialState: TodoState = {
    list: [
        {
            id: Math.random().toString(36).substring(2, 9),
            task: 'Сделать помодоро'
        },
        {
            id: Math.random().toString(36).substring(2, 9),
            task: 'Доделать таймер'
        },
    ]
}

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addTodo(state, action: PayloadAction<string>) {
            state.list.push({
                id: generateRandomIndex,
                task: action.payload
            })
        },
        removeTodo(state, action: PayloadAction<string>) {
            state.list = state.list.filter(todo => todo.id !== action.payload)
        }
    }
})

export const { addTodo, removeTodo } = todoSlice.actions

export default todoSlice.reducer