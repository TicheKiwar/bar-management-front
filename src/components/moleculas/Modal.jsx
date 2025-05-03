import React from "react";
import { BtnCerrar } from "../atomos/BtnCerrar";

export const Modal = ({ children, onClose, title, size = "md", closeOnClickOutside = true }) => {
  const sizeStyles = {
    sm: { maxWidth: "400px" },
    md: { maxWidth: "600px" },
    lg: { maxWidth: "800px" },
    xl: { maxWidth: "1000px" },
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget || closeOnClickOutside) {
      onClose();
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: "20px",
      }}
      onClick={handleBackdropClick}
    >
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "8px",
          width: "100%",
          ...sizeStyles[size],
          position: "relative",
          maxHeight: "90vh",
          overflowY: "auto",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
        }}
      >
        <div
          style={{
            position: "sticky",
            top: 0,
            backgroundColor: "white",
            zIndex: 10,
            borderBottom: "1px solid #e2e8f0",
            padding: "16px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {title && <h2 style={{ margin: 0, fontSize: "1.25rem", fontWeight: 600 }}>{title}</h2>}
          {onClose && <BtnCerrar onClick={onClose} />}
        </div>
        <div style={{ padding: "24px" }}>{children}</div>
      </div>
    </div>
  );
};
