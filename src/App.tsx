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

    return (
        <div className="main">
            <h1>Todo List</h1>
            {
                tasks === null ? (
                    <div className="no-tasks">
                        <span>You do not currently have any tasks saved, click the button below to add a new task</span>
                    </div>
                ) : (
                    <div className="tasks">
                        {
                            tasks.map(task => (
                                <TaskRow task={task} key={task.id}/>
                            ))
                        }
                    </div>
                )

            }
        </div>
    )
}

export default App
