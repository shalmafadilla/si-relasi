import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import { IoEnterOutline } from "react-icons/io5";
import Layout from '../item/Layout';

const ListEvent = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        getEvents();
    }, []);

    const getEvents = async () => {
        try {
            const response = await axios.get('http://localhost:5000/events');
            setEvents(response.data);
        } catch (error) {
            console.error("Gagal mengambil data event:", error);
        }
    };

    const deleteEvent = async (id) => {
        const confirmDelete = window.confirm("Apakah kamu yakin ingin menghapus event ini?");
        if (!confirmDelete) return;
      
        try {
          await axios.delete(`http://localhost:5000/events/${id}`);
          alert("✅ Event berhasil dihapus");
          getEvents(); // Refresh daftar event
        } catch (error) {
          console.error("Gagal menghapus event:", error);
          alert("❌ Gagal menghapus event. Silakan coba lagi.");
        }
      };

    return (
        <Layout>
        <div className="container mt-5">
                        <h3 className="mb-4">Daftar Kegiatan</h3>
                        <div className="d-flex justify-content-end mb-3">
                            <Link to="/events/addEvent" className='btn btn-success'>
                                <IoEnterOutline /> Tambah Kegiatan
                            </Link>
                        </div>
            <div className="table-responsive">
                <table className="table table-striped table-bordered align-middle">
                    <thead className="table-dark">
                        <tr>
                            <th scope="col">No</th>
                            <th scope="col">Judul</th>
                            <th scope="col">Deskripsi</th>
                            <th scope="col">Lokasi</th>
                            <th scope="col">Hari</th>
                            <th scope="col">Tanggal</th>
                            <th scope="col">Waktu</th>
                            <th scope="col">Kuota</th>
                            <th scope="col">Status</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {events.map((event, index) => (
                            <tr key={event.id}>
                                <td>{index + 1}</td>
                                <td>{event.tittle}</td>
                                <td>{event.description}</td>
                                <td>{event.location_name || event.location}</td>
                                <td>{event.day}</td>
                                <td>{event.date}</td>
                                <td>{event.time}</td>
                                <td>{event.kuota}</td>
                                <td className={event.status === 'On_going' ? 'text-success' : 'text-danger'}>
                                    {event.status}
                                </td>
                                <td>
                                    <div className="d-flex gap-2">
                                        <Link to={`/events/editEvent/${event.id}`} className="btn btn-sm btn-primary">Edit</Link>
                                        <button onClick={() => deleteEvent(event.id)} className="btn btn-sm btn-danger">Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div></Layout>
    );
};

export default ListEvent;
