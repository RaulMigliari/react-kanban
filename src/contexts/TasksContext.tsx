import { createContext, useEffect, useState, type ReactNode } from "react";
import type { Task } from "../entities/Task";
import { tasksService } from "../services/api";

export interface TasksContextData {
    task: Task[],
    createTask: (attributes: Omit<Task, "id">) => Promise<void>
    updateTask: (id: number, attributes: Partial<Omit<Task, "id">>) => Promise<void>
    deleteTask: (id: number) => Promise<void>
}

export const TasksContext = createContext({} as TasksContextData)

interface TasksContextProviderProps {
    children: ReactNode
}

export const TasksContextProvider: React.FC<TasksContextProviderProps> = ({children}) => {

    const [tasks, setTasks] = useState<Task[]>([])

    useEffect(() => {
        tasksService.fetchTasks().then((data) => setTasks(data))
    }, [])

    const createTask = async (attributes: Omit<Task, "id">) => {

        const newTask = await tasksService.createTask(attributes)

        setTasks((currentState) => [...currentState, newTask])
    }

    const updateTask = async (id: number, attributes: Partial<Omit<Task, "id">>) => {

    }

    const deleteTask = async (id: number) => {
        
    }

    return (
        <TasksContext.Provider value={{tasks, createTask, updateTask, deleteTask}}>
            {children}
        </TasksContext.Provider>
    )
}