import {Task} from "../model/Task.tsx";
import {ChangeEvent, useState} from "react";

type TaskRowProps = {
    task: Task
    onComplete: (id: number) => void
    onEdit: (id: number, updatedText: string) => void
    onDelete: (id: number) => void
}
export default function TaskRow({ task, onComplete, onEdit, onDelete } : TaskRowProps) {
    const [editing, setEditing] = useState<boolean>(false)
    const [updatedText, setUpdatedText] = useState<string>(task.text)

    const changeHandler = (e : ChangeEvent<HTMLInputElement>) => {
        setUpdatedText(e.target.value)
    }

    const handleComplete = () => {
        onComplete(task.id)
    }

    const handleEdit = () => {
        setEditing(editing => !editing)

        if (editing) {
            onEdit(task.id, updatedText)
        }
    }

    const handleDelete = () => {
        onDelete(task.id)
    }

    return (
        <div
            className="task"
            data-id={ task.id }
            data-completed={ task.completed }>
            {
                editing ?
                    (
                        <input
                            type="text"
                            id="text"
                            value={ updatedText }
                            onChange={ changeHandler }
                        />
                    ) : (
                        <span className="text">{ task.text }</span>
                    )
            }
            <button
                type="button"
                data-action="mark-done"
                onClick={ handleComplete }>
                Completed
            </button>
            <button
                type="button"
                data-action="edit"
                onClick={ handleEdit }>
                Edit
            </button>
            <button
                type="button"
                data-action="delete"
                onClick={ handleDelete }
                >
                Delete
            </button>
        </div>
    )
}