import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import React from "react";
import todo from "../components/MainPage/Todo/Todo";

export interface ITaskProps {
    id: string,
    task: string,
    tomato: number,
    isComplete: boolean,
}

type TodoState = {
    list: ITaskProps[]
}

const initialState: TodoState = {
    list: JSON.parse(localStorage.getItem('todos')) || [],
}

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addTodo(state, action: PayloadAction<string>) {
            state.list.push({
                id: Math.random().toString(36).substring(2, 9),
                task: action.payload,
                tomato: 1,
                isComplete: false
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
        incTimerTomato(state, action: PayloadAction<number>) {
            state.list = state.list.map((todo) => todo.tomato !== action.payload ? {
                ...todo,
                tomato: action.payload
            } : todo)
        },
        updateTask(state, action: PayloadAction<string>) {
            state.list = state.list.map((todo) => todo.task !== action.payload ? {
                ...todo,
                task: action.payload
            } : todo)
        },
        completeTask(state, action: PayloadAction<boolean>) {
            state.list = state.list.map((todo) => todo.isComplete !== action.payload ? {
                ...todo,
                isComplete: action.payload
            } : todo)
        },
        removeTodo(state, action: PayloadAction<string>) {
            state.list = state.list.filter((todo) => todo.id !== action.payload)
        }
    }
})

export const {addTodo, removeTodo, incTomato, decTomato, updateTask, incTimerTomato, completeTask} = todoSlice.actions

export default todoSlice.reducer