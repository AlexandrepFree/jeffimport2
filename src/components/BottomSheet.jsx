import React, { useEffect } from "react";
import { S } from "../styles.js";

export default function BottomSheet({ onClose, children }) {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div style={S.sheetOverlay} onClick={onClose}>
      <div style={S.sheetBody} onClick={(e) => e.stopPropagation()}>
        <div style={S.sheetHandle} />
        {children}
      </div>
    </div>
  );
}
