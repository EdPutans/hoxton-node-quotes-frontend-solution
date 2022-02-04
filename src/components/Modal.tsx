import React from "react";
import "./index.css";

export type Props = { children: any; handleClose: () => void };

const Modal: React.FunctionComponent<Props> = ({ handleClose, children }) => {
  const onClose = (event: React.SyntheticEvent) => {
    const target = event.target as React.SyntheticEvent["target"] & {
      id: string;
    };

    if (target?.id !== "modal") return;
    handleClose();
  };
  return (
    <div id="modal" className="quote-modal" onClick={onClose}>
      <div className="quote-modal-content">{children}</div>
    </div>
  );
};

export default Modal;
