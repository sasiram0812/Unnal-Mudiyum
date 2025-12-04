
// src/components/MainLayout.jsx
import React from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import "./Layout.css";

function MainLayout({ children, pageTitle }) {
  return (
    <div className="layout-root">
      <Sidebar active={pageTitle || ""} />
      <div className="layout-main">
        <Topbar title={pageTitle} />
        <div className="layout-content">{children}</div>
      </div>
    </div>
  );
}

export default MainLayout;
