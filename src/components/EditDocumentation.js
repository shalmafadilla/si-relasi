import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../item/Layout';

const EditDocumentation = () => {
  const [event, setEvent] = useState('');
  const [description, setDescription] = useState('');
  const [urlPict, setUrlPict] = useState('');
  const [events, setEvents] = useState([]);

  const navigate = useNavigate();
  const { id } = useParams();

// eslint-disable-next-line react-hooks/exhaustive-deps
useEffect(() => {getDocumentationById(); getAllEvents();}, []);

  const getDocumentationById = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/documentations/${id}`);
      const doc = res.data;
      setEvent(doc.event);
      setDescription(doc.description);
      setUrlPict(doc.url_pict);
    } catch (error) {
      console.error('Gagal memuat data dokumentasi:', error);
    }
  };

  const getAllEvents = async () => {
    try {
      const res = await axios.get('http://localhost:5000/events');
      setEvents(res.data);
    } catch (error) {
      console.error('Gagal memuat data event:', error);
    }
  };

  const updateDocumentation = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/documentations/${id}`, {
        event,
        description,
        url_pict: urlPict,
      });
      navigate('/documentations');
    } catch (error) {
      console.error('Gagal mengupdate dokumentasi:', error.response?.data || error.message);
    }
  };

  return (
    <Layout>
      <div style={{ backgroundColor: '#fdf8f3', minHeight: '100vh', padding: '40px' }}>
        <h3 style={{ color: '#453a39', marginBottom: '20px' }}>Edit Dokumentasi Kegiatan</h3>
        <form onSubmit={updateDocumentation} style={{ maxWidth: '600px' }}>
          <div className="mb-3">
            <label className="form-label">Pilih Kegiatan</label>
            <select
              className="form-select"
              value={event}
              onChange={(e) => setEvent(e.target.value)}
              required
            >
              <option value="">-- Pilih Event --</option>
              {events.map((ev) => (
                <option key={ev.id} value={ev.id}>
                  {ev.tittle}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Deskripsi</label>
            <textarea
              className="form-control"
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>

          <div className="mb-3">
            <label className="form-label">URL Gambar</label>
            <input
              type="text"
              className="form-control"
              value={urlPict}
              onChange={(e) => setUrlPict(e.target.value)}
              placeholder="Sesuaikan format: https://drive.google.com/file/d/---ID---/preview"
              required
            />
          </div>

          <button type="submit" className="btn btn-success">
            Simpan
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default EditDocumentation;
