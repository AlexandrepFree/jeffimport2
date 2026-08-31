import React from "react";
import BottomSheet from "./BottomSheet.jsx";
import { S } from "../styles.js";

export default function ConfirmSheet({ title, message, confirmLabel = "Confirmer", cancelLabel = "Annuler", onConfirm, onClose }) {
  return (
    <BottomSheet onClose={onClose}>
      <h3 style={S.sheetTitle}>{title}</h3>
      <div style={S.sheetSub}>{message}</div>
      <div style={S.sheetActions}>
        <button style={S.sheetActionGhost} onClick={onClose}>{cancelLabel}</button>
        <button style={S.sheetActionDanger} onClick={onConfirm}>{confirmLabel}</button>
      </div>
    </BottomSheet>
  );
}
