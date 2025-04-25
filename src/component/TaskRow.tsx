import {Task} from "../model/Task.tsx";
import {ChangeEvent, useState} from "react";

type TaskRowProps = {
    task: Task
    onComplete: (id: number) => void
    onEdit: (id: number, updatedText: string) => void
}
export default function TaskRow({ task, onComplete, onEdit } : TaskRowProps) {
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

    return (
        <div className="task" data-completed={ task.completed }>
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
            //TODO add icons to buttons
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
        </div>
    )
}