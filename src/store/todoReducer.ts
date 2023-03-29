import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import React from "react";

export interface ITaskProps {
    id: string,
    task: string,
    tomato: number,
    setTodoText?: React.Dispatch<React.SetStateAction<string>>,
    todoText?: string
}

type TodoState = {
    list: ITaskProps[]
}

const initialState: TodoState = {
    list: [],
}

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addTodo(state, action: PayloadAction<string>) {
            state.list.push({
                id: Math.random().toString(36).substring(2, 9),
                task: action.payload,
                tomato: 1
            })
        },
        incTomato(state, action: PayloadAction<string>) {
            state.list = state.list.map((todo) => todo.id === action.payload ? {
                ...todo,
                tomato: todo.tomato += 1
            } : todo)
        },
        decTomato(state, action: PayloadAction<string>) {
            state.list = state.list.map((todo) => todo.id === action.payload ? {
                ...todo,
                tomato: todo.tomato !== 1 ? todo.tomato -= 1 : todo.tomato
            } : todo)
        },
        updateTask(state, action: PayloadAction<string>) {
            state.list = state.list.map((todo) => todo.task !== action.payload ? {
                ...todo,
                task: action.payload
            } : todo)
        },
        removeTodo(state, action: PayloadAction<string>) {
            state.list = state.list.filter((todo) => todo.id !== action.payload)
        }
    }
})

export const {addTodo, removeTodo, incTomato, decTomato, updateTask} = todoSlice.actions

export default todoSlice.reducer