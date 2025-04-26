import Modal from "./common/Modal.tsx";
import React, {useState} from "react";
import {Task} from "../model/Task.tsx";
import add from "../assets/add.svg"
import './NewTaskModal.tsx.css'

type NewTaskModalProps = {
    isOpen: boolean
    onClose: () => void
    onAdd: (newTask: Task) => void
}

export default function NewTaskModal({ isOpen, onClose, onAdd } : NewTaskModalProps) {
    const [text, setText] = useState<string>('')

    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value)
    }

    const handleAdd = () => {
        if (!text.trim()) return

        const newTask : Task = {
            id: Date.now(),
            text: text,
            completed: false
        }

        onAdd(newTask)
        setText('')
        onClose()
    }

    return (
        <Modal isOpen={ isOpen } onClose={ onClose }>
            <div className="new-task-modal">
                <h2>Add a new task</h2>
                <input
                    type="text"
                    value={ text }
                    onChange={ handleChange }
                    placeholder="Enter task details"
                />
                <button
                    type="button"
                    className="button"
                    onClick={ handleAdd }>
                    <img src={ add } alt="Add New Task" width={ 12 } /> Add task
                </button>
            </div>
        </Modal>
    )
}