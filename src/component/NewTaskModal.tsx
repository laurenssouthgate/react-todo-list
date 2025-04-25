import Modal from "./common/Modal.tsx";
import React, {useState} from "react";
import {Task} from "../model/Task.tsx";

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
            <h2>Add a new task</h2>
            <input
                type="text"
                value={ text }
                onChange={ handleChange }
            />
            <button
                type="button"
                onClick={ handleAdd }
            >
                Add task
            </button>
        </Modal>
    )
}