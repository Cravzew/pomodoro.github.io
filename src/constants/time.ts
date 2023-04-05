const workTime = localStorage.getItem('work-time')
const breakTime = localStorage.getItem('break-time')
const longBreakTime = localStorage.getItem('long-break-time')
export const initialTime = Number(workTime) * 60
export const initialBreak = Number(breakTime) * 60
export const initialLongBreak = Number(longBreakTime) * 60
