import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Layout from '../item/Layout.js';

const AddUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("Perempuan"); 
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const navigate = useNavigate();

  const saveUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/users', {
        name,
        email,
        password,
        gender,
        phone,
        address
      });
      navigate("/users");
    } catch (error) {
      console.error("Error saat menambahkan user:", error.response?.data || error.message);
    }
    
  };

  return (
    <Layout>
    <div style={{minHeight: "100vh", padding: "40px" }}>
      <h3 style={{ color: "#8c7a67", marginBottom: "20px" }}>Tambah Relawan</h3>
      <form onSubmit={saveUser} style={{ maxWidth: "600px" }}>
        <div className="mb-3">
          <label className="form-label" style={{ color: "#8c7a67" }}>Nama</label>
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
          <label className="form-label" style={{ color: "#8c7a67" }}>Email</label>
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
          <label className="form-label" style={{ color: "#8c7a67" }}>Password</label>
          <input 
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label" style={{ color: "#8c7a67" }}>Jenis Kelamin</label>
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
          <label className="form-label" style={{ color: "#8c7a67" }}>Nomor Telepon</label>
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
          <label className="form-label" style={{ color: "#8c7a67" }}>Alamat</label>
          <input 
            type="text"
            className="form-control"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Alamat Lengkap"
            required
          />
        </div>

        <button
          type="submit"
          className="btn"
          style={{ backgroundColor: "#909f7e", color: "#fff" }}
        >
          Simpan
        </button>
      </form>
    </div></Layout>
  );
};

export default AddUser;
