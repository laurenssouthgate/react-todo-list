import './App.css'
import {Task} from "./model/Task.tsx";
import _LocalStorage from "./util/LocalStorage.tsx";
import TaskRow from "./component/TaskRow.tsx";
import {useEffect, useState} from "react";
import add from "./assets/add.svg"
import NewTaskModal from "./component/NewTaskModal.tsx";


function App() {
    const [tasks, setTasks] = useState<Task[] | null>(null)
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

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

    const handleEdit = (id: number, text: string)=> {
        if (tasks === null) return

        const updatedTasks = tasks.map(task => task.id === id ?
            {
                ...task,
                text: text
            } : task)

        handleSaveTasks(updatedTasks)
    }

    const handleDelete = (id: number)=> {
        if (tasks === null) return

        const filteredTasks = tasks.filter(task => task.id !== id)
        setTasks(filteredTasks)
        _LocalStorage.saveTasks(filteredTasks)
    }

    const handleNewTask = (task: Task) => {
        const updatedTasks = tasks !== null ? [...tasks, task] : [task]

        handleSaveTasks(updatedTasks)
    }

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    return (
        <div className="main">
            <div className='task-window'>
                <h1>Todo Handler</h1>
                {
                    tasks === null || tasks.length === 0 ? (
                        <div className="no-tasks" onClick={ handleOpenModal }>
                            <span>You do not currently have any tasks saved, click to add a new task</span>
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
                                        onDelete={ handleDelete }
                                    />
                                ))
                            }
                        </div>
                    )

                }
                <button
                    className="button"
                    onClick={ handleOpenModal }>
                    <img src={ add } alt="Add New Task" width={ 12 } /> Add New Task
                </button>
                {
                    isModalOpen &&
                    <NewTaskModal
                        isOpen={ isModalOpen }
                        onClose={ handleCloseModal }
                        onAdd={ handleNewTask } />
                }
            </div>

        </div>
    )
}

export default App
