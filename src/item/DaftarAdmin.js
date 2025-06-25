import React, { useState } from "react";
import axios from "axios";

const AddAdminUser = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    gender: "Perempuan",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/users", { ...form, role: "Admin" });
      setMessage("✅ Registrasi Admin berhasil");
      setForm({
        name: "",
        email: "",
        password: "",
        phone: "",
        address: "",
        gender: "Perempuan",
      });
    } catch (error) {
      setMessage(error.response?.data?.message || "❌ Terjadi kesalahan");
    }
  };

  const containerStyle = {
    maxWidth: "500px",
    margin: "40px auto",
    padding: "30px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#fdfdfd"
  };

  const labelStyle = {
    display: "block",
    marginBottom: "6px",
    fontWeight: "bold"
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    boxSizing: "border-box"
  };

  const buttonStyle = {
    width: "100%",
    padding: "12px",
    backgroundColor: "#28a745",
    color: "#fff",
    fontWeight: "bold",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  };

  const messageStyle = {
    padding: "10px",
    backgroundColor: "#e9ecef",
    borderRadius: "5px",
    marginBottom: "15px",
    color: "#333",
    textAlign: "center"
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Form Tambah Admin</h2>
      {message && <div style={messageStyle}>{message}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label style={labelStyle}>Nama</label>
          <input type="text" name="name" value={form.name} onChange={handleChange} required style={inputStyle} />
        </div>

        <div>
          <label style={labelStyle}>Email</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} required style={inputStyle} />
        </div>

        <div>
          <label style={labelStyle}>Password</label>
          <input type="password" name="password" value={form.password} onChange={handleChange} required style={inputStyle} />
        </div>

        <div>
          <label style={labelStyle}>Telepon</label>
          <input type="text" name="phone" value={form.phone} onChange={handleChange} required style={inputStyle} />
        </div>

        <div>
          <label style={labelStyle}>Alamat</label>
          <input type="text" name="address" value={form.address} onChange={handleChange} required style={inputStyle} />
        </div>

        <div>
          <label style={labelStyle}>Jenis Kelamin</label>
          <select name="gender" value={form.gender} onChange={handleChange} required style={inputStyle}>
            <option value="Perempuan">Perempuan</option>
            <option value="Laki-laki">Laki-laki</option>
          </select>
        </div>

        <button type="submit" style={buttonStyle}>Tambah Admin</button>
      </form>
    </div>
  );
};

export default AddAdminUser;
