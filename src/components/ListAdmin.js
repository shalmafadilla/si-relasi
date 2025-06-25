import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import { IoEnterOutline } from "react-icons/io5";
import Layout from '../item/Layout';

const ListUser = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        try {
            const response = await axios.get('http://localhost:5000/users');
            // Filter hanya user dengan role 'member'
            const members = response.data.filter(user => user.role === 'Admin');
            setUsers(members);
        } catch (error) {
            console.error("Gagal mengambil data user:", error);
        }
    };

    const deleteUser = async (id) => {
        const isConfirmed = window.confirm("Apakah kamu yakin ingin menghapus member ini?");
        if (!isConfirmed) return;

        try {
            await axios.delete(`http://localhost:5000/users/${id}`);
            alert("✅ Member berhasil dihapus!");
            getUsers();
        } catch (error) {
            console.log(error);
            alert("❌ Terjadi kesalahan saat menghapus member.");
        }
    };

    return (
        <Layout>
            <div className="container mt-5">
                <h3 className="mb-4">Daftar Admin</h3>
                <div className="d-flex justify-content-end mb-3">
                    <Link to="/admins/addAdmin" className='btn btn-success'>
                        <IoEnterOutline /> Tambah Admin
                    </Link>
                </div>

                <div className="table-responsive">
                    <table className="table table-striped table-bordered align-middle">
                        <thead className="table-dark">
                            <tr>
                                <th>No</th>
                                <th>Nama</th>
                                <th>Email</th>
                                <th>Jenis Kelamin</th>
                                <th>Telepon</th>
                                <th>Alamat</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={user.id}>
                                    <td>{index + 1}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.gender}</td>
                                    <td>{user.phone}</td>
                                    <td>{user.address}</td>
                                    <td className={user.status === 'Aktif' ? 'text-success' : 'text-danger'}>
                                        {user.status}
                                    </td>
                                    <td>
                                        <div className="d-flex gap-2">
                                            <Link to={`/users/editUser/${user.id}`} className="btn btn-sm btn-primary">Edit</Link>
                                            <button onClick={() => deleteUser(user.id)} className="btn btn-sm btn-danger">Delete</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </Layout>
    );
};

export default ListUser;
