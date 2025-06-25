import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Layout from '../item/Layout';

const AddEvent = () => {
  const [tittle, setTittle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [day, setDay] = useState("Senin");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [kuota, setKuota] = useState("");
  const [locations, setLocations] = useState([]);

  const navigate = useNavigate();

  // Ambil lokasi dari backend
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const res = await axios.get("http://localhost:5000/lokasi");
        setLocations(res.data);
      } catch (error) {
        console.error("Gagal mengambil lokasi:", error);
      }
    };

    fetchLocations();
  }, []);

  const saveEvent = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/events", {
        tittle,
        description,
        location: parseInt(location),
        day,
        date,
        time,
        kuota: parseInt(kuota),
      });
      navigate("/events");
    } catch (error) {
      console.error("Gagal menambahkan event:", error.response?.data || error.message);
    }
  };

  return (
    <Layout>
      <div style={{ minHeight: "100vh", padding: "40px" }}>
        <h3 style={{ color: "#8c7a67", marginBottom: "20px" }}>Tambah Kegiatan</h3>
        <form onSubmit={saveEvent} style={{ maxWidth: "600px" }}>
          <div className="mb-3">
            <label className="form-label" style={{ color: "#8c7a67" }}>Judul Kegiatan</label>
            <input
              type="text"
              className="form-control"
              value={tittle}
              onChange={(e) => setTittle(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label" style={{ color: "#8c7a67" }}>Deskripsi</label>
            <textarea
              className="form-control"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label" style={{ color: "#8c7a67" }}>Lokasi</label>
            <select
              className="form-select"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            >
              <option value="">-- Pilih Lokasi --</option>
              {locations.map((loc) => (
                <option key={loc.id} value={loc.id}>
                  {loc.kecamatan}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label" style={{ color: "#8c7a67" }}>Hari</label>
            <select
              className="form-select"
              value={day}
              onChange={(e) => setDay(e.target.value)}
              required
            >
              <option value="Senin">Senin</option>
              <option value="Selasa">Selasa</option>
              <option value="Rabu">Rabu</option>
              <option value="Kamis">Kamis</option>
              <option value="Jum'at">Jum'at</option>
              <option value="Sabtu">Sabtu</option>
              <option value="Minggu">Minggu</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label" style={{ color: "#8c7a67" }}>Tanggal</label>
            <input
              type="date"
              className="form-control"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label" style={{ color: "#8c7a67" }}>Waktu</label>
            <input
              type="time"
              className="form-control"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label" style={{ color: "#8c7a67" }}>Kuota</label>
            <input
              type="number"
              className="form-control"
              value={kuota}
              onChange={(e) => setKuota(e.target.value)}
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
      </div>
    </Layout>
  );
};

export default AddEvent;
