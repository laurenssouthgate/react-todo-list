import React, {ReactNode} from "react";
import './Modal.css'

type ModalProps = {
    isOpen: boolean
    onClose: () => void
    children: ReactNode
}
export default function Modal({ isOpen, onClose, children } : ModalProps) {
    const handleClickOverlay = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) onClose()
    }

    return (
        isOpen &&
        <div className="modal-overlay" onClick={ handleClickOverlay }>
            <div className="modal">
                <button type="button" className="close-modal" onClick={ onClose }>X</button>
                {
                    children
                }
            </div>
        </div>

    )
}