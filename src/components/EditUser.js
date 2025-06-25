import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../item/Layout.js";

const EditUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("Perempuan");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [status, setStatus] = useState("Aktif");

  const navigate = useNavigate();
  const { id } = useParams();

// eslint-disable-next-line react-hooks/exhaustive-deps
useEffect(() => {getUserById();}, []);

  const getUserById = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/users/${id}`);
      const user = response.data;
      setName(user.name);
      setEmail(user.email);
      setGender(user.gender);
      setPhone(user.phone);
      setAddress(user.address);
      setStatus(user.status);
    } catch (error) {
      console.error("Gagal memuat data user:", error);
    }
  };

  const updateUser = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/users/${id}`, {
        name,
        email,
        password: password || undefined, // hanya kirim jika diisi
        gender,
        phone,
        address,
        status,
      });
      navigate("/users");
    } catch (error) {
      console.error(
        "Gagal mengupdate user:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <Layout>
      <div
        style={{
          minHeight: "100vh",
          padding: "40px",
        }}
      >
        <h3 style={{ color: "#453a39", marginBottom: "20px" }}>Edit Relawan</h3>
        <form onSubmit={updateUser} style={{ maxWidth: "600px" }}>
          <div className="mb-3">
            <label className="form-label" style={{ color: "#8c7a67" }}>
              Nama
            </label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nama Lengkap"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label" style={{ color: "#8c7a67" }}>
              Email
            </label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Aktif"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label" style={{ color: "#8c7a67" }}>
              Password Baru (Opsional)
            </label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Kosongkan jika tidak ingin ubah password"
            />
          </div>

          <div className="mb-3">
            <label className="form-label" style={{ color: "#8c7a67" }}>
              Jenis Kelamin
            </label>
            <select
              className="form-select"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="Laki-laki">Laki-laki</option>
              <option value="Perempuan">Perempuan</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label" style={{ color: "#8c7a67" }}>
              Nomor Telepon
            </label>
            <input
              type="text"
              className="form-control"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="08xxxxxxxxxx"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label" style={{ color: "#8c7a67" }}>
              Alamat
            </label>
            <input
              type="text"
              className="form-control"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Alamat Lengkap"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label" style={{ color: "#8c7a67" }}>
              Status
            </label>
            <select
              className="form-select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Aktif">Aktif</option>
              <option value="Tidak Aktif">Tidak Aktif</option>
            </select>
          </div>

          <button
            type="submit"
            className="btn"
            style={{ backgroundColor: "#909f7e", color: "#fff" }}
          >
            Simpan
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default EditUser;
