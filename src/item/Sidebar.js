import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaDatabase,
  FaUsers,
  FaIdCard,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaSignInAlt,
  FaPhotoVideo,
  FaSignOutAlt
} from "react-icons/fa";

const Sidebar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("id");
    navigate("/");
  };

  return (
    <aside
      className="shadow-sm position-fixed"
      style={{
        minHeight: "100vh",
        width: "250px",
        color: "#fdf8f3",
        backgroundColor: "#8c7a67",
        position: "relative", // Untuk footer absolute
      }}
    >
      <style>
        {`
          .nav-link.active {
            font-weight: bold;
            background-color: #909f7e;
            color: #fdf8f3;
            border-radius: 0.375rem;
            padding: 6px 9px
          }
          .nav-link:hover {
            background-color: #909f7e;
            color: #fdf8f3;
            border-radius: 0.375rem;
            padding: 6px 9px
          }
        `}
      </style>

      <div className="d-flex align-items-center p-3 border-bottom">
        <h2 className="m-0 fs-4 fw-bold">
          Volun<i style={{ color: "#453a39" }}>Vibes</i>
        </h2>
      </div>

      <nav className="flex-column p-4" style={{ paddingBottom: "80px" }}>
      <NavLink
          to="/admin"
          className="nav-link d-flex align-items-center gap-3 mb-3"
          style={{ padding: "6px 9px" }}
        >
          <FaDatabase /> Overview
        </NavLink>
        <NavLink
          to="/users"
          className="nav-link d-flex align-items-center gap-3 mb-3"
          style={{ padding: "6px 9px" }}
        >
          <FaUsers /> Relawan
        </NavLink>
        <NavLink
          to="/admins"
          className="nav-link d-flex align-items-center gap-3 mb-3"
          style={{ padding: "6px 9px" }}
        >
        <FaIdCard /> Admin
        </NavLink>
        <NavLink
          to="/events"
          className="nav-link d-flex align-items-center gap-3 mb-3"
          style={{ padding: "6px 9px" }}
        >
          <FaCalendarAlt /> Kegiatan
        </NavLink>
        <NavLink
          to="/location"
          className="nav-link d-flex align-items-center gap-3 mb-3"
          style={{ padding: "6px 9px" }}
        >
          <FaMapMarkerAlt /> Lokasi
        </NavLink>
        <NavLink
          to="/joined"
          className="nav-link d-flex align-items-center gap-3 mb-3"
          style={{ padding: "6px 9px" }}
        >
          <FaSignInAlt /> Bergabung
        </NavLink>
        <NavLink
          to="/documentation"
          className="nav-link d-flex align-items-center gap-3 mb-3"
          style={{ padding: "6px 9px" }}
        >
          <FaPhotoVideo /> Dokumentasi
        </NavLink>
        <NavLink
        to="/"
          onClick={handleLogout}
          className="nav-link d-flex align-items-center gap-3 mb-3 bg-danger"
          style={{ padding: "6px 9px" }}
        >
          <FaSignOutAlt /> LogOut
        </NavLink>
      </nav>

      <footer
        className="text-center"
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          padding: "10px",
          backgroundColor: "#7a6857",
          fontSize: "12px",
        }}
      >
        <p className="m-0">VolunVibes 2024 &copy; All Rights Reserved.</p>
      </footer>
    </aside>
  );
};

export default Sidebar;
