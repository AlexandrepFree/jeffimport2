import React from "react";
import { S } from "../styles.js";

export default function ScreenLayout({ children, footer }) {
  return (
    <>
      <div className="pb-scroll" style={S.screen}>{children}</div>
      {footer && <div style={S.stickyFooter}>{footer}</div>}
    </>
  );
}
