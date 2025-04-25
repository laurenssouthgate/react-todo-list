import {Task} from "../model/Task.tsx";

export enum StorageKeys {
    TODO_KEY = 'TODO'
}
class LocalStorage {
    saveTasks(tasks: Task[]) {
        localStorage.setItem(StorageKeys.TODO_KEY, JSON.stringify(tasks))
    }

    loadTasks() : Task[] | null {
        const tasks = localStorage.getItem(StorageKeys.TODO_KEY)
        return tasks ? JSON.parse(tasks) as Task[] : null
    }
}

const _LocalStorage = new LocalStorage()
export default _LocalStorage