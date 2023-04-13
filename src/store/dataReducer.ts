import {format} from "date-fns";
import {createSlice} from "@reduxjs/toolkit";

export interface itemsType {
    date: string,
    work_sec: number,
    pause_sec: number,
    isDone: number,
    stop_count: number,
    tomatoesToday: number
}

type itemsState = {
    stats: itemsType[]
}

const initialState: itemsState = {
    stats: JSON.parse(localStorage.getItem('stats')) || [{
        date: format(new Date(), 'dd/MM/yyyy'),
        work_sec: 0,
        pause_sec: 0,
        isDone: 0,
        stop_count: 0,
        tomatoesToday: 0,
    }]
}

export const dateSlice = createSlice({
    name: 'stats',
    initialState,
    reducers: {
        incWorkSec(state) {
            state.stats = state.stats.map((item) => item.date === format(new Date(), 'dd/MM/yyyy') ? {
                ...item,
                work_sec: item.work_sec += 1
            } : item)
        },
        incPauseSec(state) {
            state.stats = state.stats.map((item) => item.date === format(new Date(), 'dd/MM/yyyy') ? {
                ...item,
                pause_sec: item.pause_sec += 1
            } : item)
        },
        incComplete(state) {
            state.stats = state.stats.map((item) => item.date === format(new Date(), 'dd/MM/yyyy') ? {
                ...item,
                isDone: item.isDone += 1
            } : item)
        },
        incStopCount(state) {
            state.stats = state.stats.map((item) => item.date === format(new Date(), 'dd/MM/yyyy') ? {
                ...item,
                stop_count: item.stop_count += 1
            } : item)
        },
        incTomatoesToday(state) {
            state.stats = state.stats.map((item) => item.date === format(new Date(), 'dd/MM/yyyy') ? {
                ...item,
                tomatoesToday: item.tomatoesToday += 1
            } : item)
        },
    }
})

export const {incWorkSec, incPauseSec, incComplete, incStopCount, incTomatoesToday} = dateSlice.actions

export default dateSlice.reducer