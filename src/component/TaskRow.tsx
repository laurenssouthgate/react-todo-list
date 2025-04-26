import {Task} from "../model/Task.tsx";
import {ChangeEvent, useState} from "react";
import tick from "../assets/tick.svg"
import undo from "../assets/undo.svg"
import edit from "../assets/edit.svg"
import save from "../assets/save.svg"
import deleteIcon from "../assets/delete.svg"

import './TaskRow.css'

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
            <div className="buttons">
                <button
                    type="button"
                    data-action="mark-done"
                    className="button button--square"
                    onClick={handleComplete}>
                    <img src={ task.completed ? undo : tick } alt="Mark completed" width={ 16 } />
                </button>
                <button
                    type="button"
                    data-action="edit"
                    className="button button--square"
                    onClick={handleEdit}>
                    <img src={ editing ? save : edit } alt="Edit task" width={ 16 } />
                </button>
                <button
                    type="button"
                    data-action="delete"
                    className="button button--square"
                    onClick={handleDelete}
                >
                    <img src={ deleteIcon } alt="Edit task" width={16}/>
                </button>
            </div>
        </div>
    )
}