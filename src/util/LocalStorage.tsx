import {Task} from "../model/Task.tsx";

export enum StorageKeys {
    TODO_KEY = 'TODO'
}

export const filterTasks = (tasks: Task[], id: number) : Task[] => {
     return tasks.filter(task => task.id === id)
}

class LocalStorage {
    saveTasks(tasks: Task[]) {
        localStorage.setItem(StorageKeys.TODO_KEY, JSON.stringify(tasks))
    }

    loadTasks() : Task[] | null {
        const tasks = localStorage.getItem(StorageKeys.TODO_KEY)
        return tasks ? JSON.parse(tasks) as Task[] : null
    }

    deleteTask(id: number) {
        const tasks = this.loadTasks()

        if (tasks === null) return
        const filteredTasks = filterTasks(tasks, id)
        this.saveTasks(filteredTasks)
    }
}

const _LocalStorage = new LocalStorage()
export default _LocalStorage