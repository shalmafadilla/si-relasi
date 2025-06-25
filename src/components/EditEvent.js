import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../item/Layout.js';

const EditEvent = () => {
  const [tittle, setTittle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [day, setDay] = useState('Senin');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [kuota, setKuota] = useState('');
  const [status, setStatus] = useState('On_going');
  const [locations, setLocations] = useState([]);

  const navigate = useNavigate();
  const { id } = useParams();

// eslint-disable-next-line react-hooks/exhaustive-deps
useEffect(() => {getEventById(); getAllLocations(); }, []);

  const getEventById = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/events/${id}`);
      const event = res.data;
      setTittle(event.tittle);
      setDescription(event.description);
      setLocation(event.location);
      setDay(event.day);
      setDate(event.date);
      setTime(event.time);
      setKuota(event.kuota);
      setStatus(event.status);
    } catch (error) {
      console.error('Gagal memuat data event:', error);
    }
  };

  const getAllLocations = async () => {
    try {
      const res = await axios.get('http://localhost:5000/lokasi');
      setLocations(res.data);
    } catch (error) {
      console.error('Gagal memuat data lokasi:', error);
    }
  };

  const updateEvent = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/events/${id}`, {
        tittle,
        description,
        location,
        day,
        date,
        time,
        kuota,
        status
      });
      navigate('/events');
    } catch (error) {
      console.error('Gagal mengupdate event:', error.response?.data || error.message);
    }
  };

  return (
    <Layout>
      <div style={{  minHeight: "100vh", padding: "40px" }}>
        <h3 style={{ color: "#453a39", marginBottom: "20px" }}>Edit Kegiatan</h3>
        <form onSubmit={updateEvent} style={{ maxWidth: "600px" }}>

          <div className="mb-3">
            <label className="form-label">Judul Kegiatan</label>
            <input type="text" className="form-control" value={tittle}
              onChange={(e) => setTittle(e.target.value)} required />
          </div>

          <div className="mb-3">
            <label className="form-label">Deskripsi</label>
            <textarea className="form-control" rows="3" value={description}
              onChange={(e) => setDescription(e.target.value)} required />
          </div>

          <div className="mb-3">
            <label className="form-label">Lokasi</label>
            <select className="form-select" value={location}
              onChange={(e) => setLocation(e.target.value)} required>
              <option value="">-- Pilih Lokasi --</option>
              {locations.map((loc) => (
                <option key={loc.id} value={loc.id}>
                  {loc.kecamatan}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Hari</label>
            <select className="form-select" value={day}
              onChange={(e) => setDay(e.target.value)} required>
              {["Senin", "Selasa", "Rabu", "Kamis", "Jum'at", "Sabtu", "Minggu"].map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Tanggal</label>
            <input type="date" className="form-control" value={date}
              onChange={(e) => setDate(e.target.value)} required />
          </div>

          <div className="mb-3">
            <label className="form-label">Waktu</label>
            <input type="time" className="form-control" value={time}
              onChange={(e) => setTime(e.target.value)} required />
          </div>

          <div className="mb-3">
            <label className="form-label">Kuota</label>
            <input type="number" className="form-control" value={kuota}
              onChange={(e) => setKuota(e.target.value)} required />
          </div>

          <div className="mb-3">
            <label className="form-label">Status</label>
            <select className="form-select" value={status}
              onChange={(e) => setStatus(e.target.value)}>
              <option value="On_going">On_going</option>
              <option value="Closed">Closed</option>
            </select>
          </div>

          <button type="submit" className="btn btn-success">Simpan</button>
        </form>
      </div>
    </Layout>
  );
};

export default EditEvent;
