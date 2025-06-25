import React, { useState, useEffect } from 'react';
import axios from "axios";
// import { Link } from 'react-router-dom';
import Layout from '../item/Layout';

const ListJoined = () => {
    const [joinedData, setJoinedData] = useState([]);

    useEffect(() => {
        getJoinedData();
    }, []);

    const getJoinedData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/joined');
            setJoinedData(response.data);
        } catch (error) {
            console.error("Gagal mengambil data joined:", error);
        }
    };

    const deleteJoined = async (id) => {
        const isConfirmed = window.confirm("Apakah kamu yakin ingin menghapus data ini?");
        if (!isConfirmed) return;
      
        try {
          await axios.delete(`http://localhost:5000/joined/${id}`);
          alert("✅ Data berhasil dihapus!");
          getJoinedData();
        } catch (error) {
          console.log(error);
          alert("❌ Terjadi kesalahan saat menghapus data.");
        }
      };

    return (
        <Layout>
        <div className="container mt-5">
            <h3 className="mb-4">Daftar Relawan yang Telah Bergabung Kegiatan</h3>
            <div className="table-responsive">
                <table className="table table-striped table-bordered align-middle">
                    <thead className="table-dark">
                        <tr>
                            <th scope="col">No</th>
                            <th scope="col">Nama Relawan</th>
                            <th scope="col">Email</th>
                            <th scope="col">Telepon</th>
                            <th scope="col">Alamat</th>
                            <th scope="col">Judul Kegiatan</th>
                            <th scope="col">Lokasi</th>
                            <th scope="col">Status</th>
                            <th scope="col">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {joinedData.map((item, index) => (
                            <tr key={item.id}>
                                <td>{index + 1}</td>
                                <td>{item.user?.name}</td>
                                <td>{item.user?.email}</td>
                                <td>{item.user?.phone}</td>
                                <td>{item.user?.address}</td>
                                <td>{item.event?.tittle}</td>
                                <td>{item.event?.lokasi?.kecamatan}</td>
                                <td className={item.event?.status === 'On_going' ? 'text-success' : 'text-danger'}>
                                    {item.event?.status}
                                </td>
                                <td>
                                <div className="d-flex gap-2">
                                            <button onClick={() => deleteJoined(item.id)} className="btn btn-sm btn-danger">Delete</button>
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

export default ListJoined;
