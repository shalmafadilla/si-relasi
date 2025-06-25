import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../item/style.css";
import banner from "../assets/banner.jpg";
import {
  FaRegCalendarAlt,
  FaRegClock,
  FaMapMarkerAlt,
  FaUserFriends,
  FaTwitter,
  FaInstagram,
  FaWhatsapp,
  FaFire,
} from "react-icons/fa";
import "@fontsource/poppins";

const Homepage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    gender: "Perempuan",
  });
  const [isHovered, setIsHovered] = useState(false);
  const [events, setEvents] = useState([]);
  const [message, setMessage] = useState("");
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [loginMessage, setLoginMessage] = useState("");

  useEffect(() => {
    if (loginMessage) {
      const timeout = setTimeout(() => setLoginMessage(""), 5000);
      return () => clearTimeout(timeout);
    }
  }, [loginMessage]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get("http://localhost:5000/events");
        setEvents(res.data);
      } catch (error) {
        console.error("Gagal mengambil data event:", error);
      }
    };
    fetchEvents();
  }, []);

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/register", form);
      setMessage(res.data.msg);
      setForm({
        name: "",
        email: "",
        password: "",
        phone: "",
        address: "",
        gender: "Perempuan",
      });
    } catch (err) {
      setMessage(err.response?.data?.msg || "Terjadi kesalahan.");
    }
  };

  const handleLoginChange = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };
  
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/login", loginForm);
      alert("Login berhasil!");
    setLoginForm({ email: "", password: "" });
      localStorage.setItem("user", JSON.stringify(res.data.user));
  
      // Tutup modal login
      const modal = window.bootstrap?.Modal.getInstance(
        document.getElementById("loginModal")
      );
      modal?.hide();
  
      // Bersihkan backdrop & scroll lock
      document.body.classList.remove("modal-open");
      document.querySelector(".modal-backdrop")?.remove();
  
      // Delay agar transisi modal selesai
      setTimeout(() => {
        const role = res.data.user.role?.trim().toLowerCase();
        if (role === "admin") {
          navigate("/admin");
        } else if (role === "member") {
          navigate("/users");
        } else {
          navigate("/dashboard");
        }
      }, 300);
    } catch (err) {
      const msg = err.response?.data?.msg || "Terjadi kesalahan saat login.";
      setLoginMessage(`❌ ${msg}`);
    }
  };
  
  

  return (
    <div className="">
      {/* NAVBAR */}
      <section className="navbar">
        <div className="logo">
          <span style={{ color: "#453a39" }}>Volun</span>
          <i>Vibes</i>
        </div>
        <ul className="navLinks">
          <li>
            <a href="#home">Home</a>
          </li>
          <li>
            <a href="#activities">Activities</a>
          </li>
          <li>
            <a href="#regist">Register</a>
          </li>
          <li>
            <a href="#footer">Contact</a>
          </li>
        </ul>
      </section>

      {/* HERO */}
      <section id="home" className="hero-section">
        <img src={banner} alt="Banner" className="hero-images" />
        <div className="hero-text">
          <h1>
            <b>Selamat Datang di Website VolunVibes Kota Malang</b>
          </h1>
          <p>Bersama kita buat perubahan positif!</p>
        </div>
      </section>

      {/* KEGIATAN YANG AKAN DATANG */}
      <section id="activities" style={{ backgroundColor: "#fdf8f3" }}>
        <h1>
          Mari Bersiap! Kegiatan yang Akan Datang <FaFire />{" "}
        </h1>
        <div className="event-container">
          {events.length === 0 ? (
            <h4>Tidak tersambung dengan database.</h4>
          ) : (
            events
              .filter((event) => event.status === "On_going")
              .map((event) => (
                <div className="card" style={{ width: "25rem" }} key={event.id}>
                  <div className="card-header"></div>
                  <div className="card-body">
                    <h5 className="card-title">{event.tittle}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">
                      {event.description}
                    </h6>
                    <p>
                      <FaRegCalendarAlt /> {event.day}, {event.date}
                    </p>
                    <p>
                      <FaRegClock /> {event.time} WIB
                    </p>
                    <p>
                      <FaMapMarkerAlt />{" "}
                      {event.lokasi?.kecamatan || "Tidak ada lokasi"}
                    </p>
                    <p>
                      <FaUserFriends /> {event.kuota} peserta
                    </p>
                  </div>
                </div>
              ))
          )}
        </div>
      </section>

      {/* RIWAYAT */}
      <section className="history">
        <h1>Kegiatan yang Sudah Berlangsung</h1>
        <div className="history-container">
          {events.length === 0 ? (
            <h4>Tidak tersambung dengan database.</h4>
          ) : (
            events
              .filter((event) => event.status === "Closed")
              .map((event) => (
                <div
                  className="history-card"
                  style={{ width: "25rem" }}
                  key={event.id}
                >
                  <div className="history-card-header"></div>
                  <div className="card-body">
                    <h5 className="card-title">{event.tittle}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">
                      {event.description}
                    </h6>
                    <p>
                      <FaRegCalendarAlt /> {event.day}, {event.date}
                    </p>
                    <p>
                      <FaRegClock /> {event.time} WIB
                    </p>
                    <p>
                      <FaMapMarkerAlt />{" "}
                      {event.lokasi?.kecamatan || "Tidak ada lokasi"}
                    </p>
                    <p>
                      <FaUserFriends /> {event.kuota} peserta
                    </p>
                  </div>
                </div>
              ))
          )}
        </div>
      </section>

      {/* FORM REGISTRASI */}
      <section
  id="regist"
  style={{ backgroundColor: "#bdcda9", padding: "40px 80px 0 80px" }}
>
  <h2>
    Gabung <span style={{ color: "#453a39" }}>Volun</span>
    <i style={{ color: "#8c7a67" }}>Vibes</i> Sekarang!
  </h2>

  <div className="register-section">
    {/* FORM REGISTRASI */}
    <form onSubmit={onSubmit} className="register-form">
      <input
        style={{ backgroundColor: "#fdf8f3" }}
        type="text"
        name="name"
        placeholder="Nama Lengkap"
        value={form.name}
        onChange={onChange}
        required
      />
      <input
        style={{ backgroundColor: "#fdf8f3" }}
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={onChange}
        required
      />
      <input
        style={{ backgroundColor: "#fdf8f3" }}
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={onChange}
        required
      />
      <input
        style={{ backgroundColor: "#fdf8f3" }}
        type="text"
        name="phone"
        placeholder="Nomor Telepon"
        value={form.phone}
        onChange={onChange}
        required
      />
      <input
        style={{ backgroundColor: "#fdf8f3" }}
        type="text"
        name="address"
        placeholder="Alamat"
        value={form.address}
        onChange={onChange}
        required
      />
      <select
        style={{ backgroundColor: "#fdf8f3" }}
        name="gender"
        value={form.gender}
        onChange={onChange}
        required
      >
        <option style={{ backgroundColor: "#fdf8f3" }} value="Perempuan">
          Perempuan
        </option>
        <option style={{ backgroundColor: "#fdf8f3" }} value="Laki-laki">
          Laki-laki
        </option>
      </select>
      <button type="submit">Daftar</button>

      {message && (
        <p style={{ color: message.includes("❌") ? "red" : "green" }}>
          {message}
        </p>
      )}

      <p>
        Sudah punya akun?{" "}
        <a
          href="#loginModal"
          data-bs-toggle="modal"
          data-bs-target="#loginModal"
          style={{ color: "#1436de", textDecoration: "none" }}
        >
          Login
        </a>
      </p>
    </form>
  </div>

  {/* MODAL LOGIN */}
  <div
    className="modal fade"
    id="loginModal"
    tabIndex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div className="modal-dialog" style={{ maxWidth: "800px" }}>
      <div className="modal-content" style={{ padding: "0px 15px" }}>
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">Login</h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>

        <form onSubmit={handleLoginSubmit} style={{ width: "100%" }}>
          <div
            className="modal-body overflow-auto"
            style={{ textAlign: "justify", maxHeight: "550px" }}
          >
            <div className="mb-3">
              <label htmlFor="loginEmail" className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="loginEmail"
                name="email"
                value={loginForm.email}
                onChange={handleLoginChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="loginPassword" className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="loginPassword"
                name="password"
                value={loginForm.password}
                onChange={handleLoginChange}
                required
              />
            </div>
            <button type="submit" className="btn w-100" onMouseEnter={() => setIsHovered(true)}
  onMouseLeave={() => setIsHovered(false)}
  style={{
    backgroundColor: isHovered ? "#909f7e" : "#5e4a45",
    color: "#fdf8f3",
    transition: "0.3s ease",
  }}>Login</button>

            {loginMessage && (
              <div
                className={`alert ${
                  loginMessage.includes("✅") ? "alert-success" : "alert-danger"
                } mt-3`}
                role="alert"
              >
                {loginMessage}
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  </div>
</section>

      {/* SECTION:FOOTER */}
      <section id="footer" style={{ paddingTop: "30px" }}>
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-6 col-md-2 mb-3">
              <h5>Section</h5>
              <ul className="nav flex-column">
                <li className="nav-item mb-2">
                  <a href="#home" className="nav-link p-0 text-muted">
                    Home
                  </a>
                </li>
                <li className="nav-item mb-2">
                  <a href="#activities" className="nav-link p-0 text-muted">
                    Activities
                  </a>
                </li>
                <li className="nav-item mb-2">
                  <a href="#regist" className="nav-link p-0 text-muted">
                    Register
                  </a>
                </li>
                <li className="nav-item mb-2">
                  <a href="#footer" className="nav-link p-0 text-muted">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-md-5 offset-md-1 mb-3">
              <form>
                <h5>Contact Us</h5>
                <p>Masukkan pesan kepada kami</p>
                <div className="d-flex flex-column flex-sm-row w-100 gap-2">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Masukkan pesan disini..."
                    required
                  />
                  <button className="btn btn-primary" type="submit">
                    Kirim
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="d-flex flex-column flex-sm-row justify-content-between py-4 my-4 border-top">
            <p>VolunVibes 2025 &copy; All Rights Reserved.</p>
            <ul className="list-unstyled d-flex gap-3">
              <li>
                <a className="text-muted" href="https://x.com/">
                  <FaTwitter size={20} />
                </a>
              </li>
              <li>
                <a className="text-muted" href="https://www.instagram.com/">
                  <FaInstagram size={20} />
                </a>
              </li>
              <li>
                <a className="text-muted" href="wa.me/0859171641589">
                  <FaWhatsapp size={20} />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
