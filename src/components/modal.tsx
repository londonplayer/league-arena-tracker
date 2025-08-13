import React, { type ReactNode } from "react";
import "./Modal.css";

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	children: ReactNode;
}

export const Modal = ({ isOpen, onClose, children }: ModalProps) => {
	if (!isOpen) {
		return null;
	}

	const handleContentClick = (e: React.MouseEvent) => {
		e.stopPropagation();
	};

	return (
		<div className="modal-overlay" onClick={onClose}>
			<div className="modal-content" onClick={handleContentClick}>
				<button className="modal-close-button" onClick={onClose}>
					&times;
				</button>
				{children}
			</div>
		</div>
	);
};
