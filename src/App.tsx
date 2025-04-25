import './App.css'
import {Task} from "./model/Task.tsx";
import _LocalStorage from "./util/LocalStorage.tsx";
import TaskRow from "./component/TaskRow.tsx";
import {useEffect, useState} from "react";


function App() {
    const [tasks, setTasks] = useState<Task[] | null>(null)

    useEffect(() => {
        const loadedTasks = _LocalStorage.loadTasks()

        if (loadedTasks !== null) {
            setTasks(loadedTasks)
        }
    }, [])

    const handleSaveTasks = (tasks : Task[]) => {
        setTasks(tasks)
        _LocalStorage.saveTasks(tasks)
    }

    const handleToggleComplete = (id : number)=> {
        if (tasks === null) return

        const updatedTasks = tasks.map(task => task.id === id ?
            {
                ...task,
                completed: !task.completed
            } : task)

        handleSaveTasks(updatedTasks)
    }

    const handleEdit = (id : number, text: string)=> {
        if (tasks === null) return

        const updatedTasks = tasks.map(task => task.id === id ?
            {
                ...task,
                text: text
            } : task)

        handleSaveTasks(updatedTasks)
    }

    return (
        <div className="main">
            <h1>Todo List</h1>
            {
                tasks === null || tasks.length === 0 ? (
                    <div className="no-tasks">
                        <span>You do not currently have any tasks saved, click the button below to add a new task</span>
                    </div>
                ) : (
                    <div className="tasks">
                        {
                            tasks.map(task => (
                                <TaskRow
                                    task={ task }
                                    key={ task.id }
                                    onComplete={ handleToggleComplete }
                                    onEdit={ handleEdit }
                                />
                            ))
                        }
                    </div>
                )

            }
        </div>
    )
}

export default App
