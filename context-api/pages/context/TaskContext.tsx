import React, { createContext, useContext, useState, ReactNode } from "react";

interface Task {
    id: number;
    name: string;
    date: number;
}

interface TaskContextType {
    tasks: Task[];
    addTask: (name: string) => void;
    deleteTask: (id: number) => void;
    updateTask: (id: number, name: string) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
    const [tasks, setTasks] = useState<Task[]>([]);

    const addTask = (name: string) =>
        setTasks((prev) => [...prev, { id: prev.length + 1, name, date: Date.now() }]);

    const deleteTask = (id: number) =>
        setTasks((prev) => prev.filter((task) => task.id !== id));

    const updateTask = (id: number, name: string) => {
        setTasks(prevTasks =>
            prevTasks.map(task =>
                task.id === id ? { ...task, name } : task
            )
        );
    };

    return (
        <TaskContext.Provider value={{ tasks, addTask, deleteTask, updateTask }}>
            {children}
        </TaskContext.Provider>
    );
};

export const useTaskContext = () => {
    const context = useContext(TaskContext);
    if (!context) throw new Error("useTaskContext must be used within TaskProvider");
    return context;
};