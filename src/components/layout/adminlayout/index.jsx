// src/layouts/AdminLayout.jsx
import { Outlet } from "react-router-dom";
import Navbar from "../navbar"; // sua navbar existente
import './adminlayout.css'

export default function AdminLayout() {
  return (
    <div className="admin-layout">
      <Navbar />
      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
}
