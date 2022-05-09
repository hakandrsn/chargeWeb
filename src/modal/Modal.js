import React from "react";
import ReactDOM from "react-dom"
import "./Modal.css"
import close from "../assets/icons/close.svg"

const Modal = (props) => {
    const { onDismiss, content, actions, title } = props
    return ReactDOM.createPortal(<div
        onClick={onDismiss}
        className="modal-main">
        <div
            //e.stop.. tıklandığında ana divden ayrı çalışır
            onClick={(e) => e.stopPropagation()}
            className="modal-container">
                <img onClick={onDismiss} alt="close" className="position-absolute" style={{right:20}} src={close} width={24}/>
            <div className="modal-title">{title}</div>
            <div className="modal-contentt">
                {content}
            </div>
            <div className="modal-actions">
                {actions}
            </div>
        </div>
    </div>,
    document.getElementById("modal")
    );

}
export default Modal