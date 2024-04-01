import { useState } from "react";

const Modal = ({ open, close, children }) => {
  return (
    <>
      {open && (
        <div
          style={{
            position: "absolute",
            top: 0,
            backgroundColor: "#f2f2f2",
            width: "100vw",
            height: "100vh",
            padding: 12,
            borderRadius: 4,
          }}
        >
          <button onClick={close}>fechar</button>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
