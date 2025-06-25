import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Layout from '../item/Layout';

const AddDocumentation = () => {
  const [event, setEvent] = useState('');
  const [description, setDescription] = useState('');
  const [urlPict, setUrlPict] = useState('');
  const [events, setEvents] = useState([]);

  const navigate = useNavigate();

  // Ambil daftar event untuk dropdown
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get('http://localhost:5000/events');
        setEvents(res.data);
      } catch (err) {
        console.error('❌ Gagal mengambil daftar event', err);
      }
    };
    fetchEvents();
  }, []);

  const saveDocumentation = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/documentation', {
        event: parseInt(event),
        description,
        url_pict: urlPict,
      });
      alert('✅ Dokumentasi berhasil disimpan!');
      navigate('/documentation');
    } catch (err) {
      console.error('❌ Gagal menyimpan dokumentasi', err.response?.data || err.message);
    }
  };
  

  return (
    <Layout>
      <div style={{minHeight: "100vh", padding: "40px" }}>
        <h3 style={{color: "#8c7a67", marginBottom: "20px" }}>Tambah Dokumentasi</h3>
        <form onSubmit={saveDocumentation} style={{ maxWidth: "600px" }}>
          
          <div className="mb-3">
            <label className="form-label" style={{ color: "#8c7a67" }}>Pilih Event</label>
            <select
              className="form-select"
              value={event}
              onChange={(e) => setEvent(e.target.value)}
              required
            >
              <option value="">-- Pilih Event --</option>
              {events.map((evt) => (
                <option key={evt.id} value={evt.id}>
                  {evt.tittle}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label" style={{ color: "#8c7a67" }}>Deskripsi Dokumentasi</label>
            <textarea
              className="form-control"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Contoh: Dokumentasi kegiatan bersih pantai"
              rows={3}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label" style={{ color: "#8c7a67" }}>URL Gambar</label>
            <input
              type="text"
              className="form-control"
              value={urlPict}
              onChange={(e) => setUrlPict(e.target.value)}
              placeholder="Format Penulisan: https://drive.google.com/file/d/---FILE_ID---/preview"
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

export default AddDocumentation;
