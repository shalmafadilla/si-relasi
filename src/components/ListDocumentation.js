import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { IoEnterOutline } from "react-icons/io5";
import Layout from "../item/Layout";

const ListDocumentation = () => {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    getDocumentation();
  }, []);

  const getDocumentation = async () => {
    try {
      const response = await axios.get("http://localhost:5000/documentation");
      setDocs(response.data);
    } catch (error) {
      console.error("Gagal mengambil data dokumentasi:", error);
    }
  };

  const deleteDocumentation = async (id) => {
    const isConfirmed = window.confirm("Apakah kamu yakin ingin menghapus dokumentasi ini?");
    if (!isConfirmed) return;
  
    try {
      await axios.delete(`http://localhost:5000/documentation/${id}`);
      alert("✅ Dokumentasi berhasil dihapus!");
      getDocumentation();
    } catch (error) {
      console.log(error);
      alert("❌ Terjadi kesalahan saat menghapus dokumentasi.");
    }
  };
  

  return (
    <Layout>
      <div className="container mt-5">
        <h3 className="mb-4">Daftar Dokumentasi</h3>
        <div className="d-flex justify-content-end mb-3">
          <Link
            to="/documentation/addDocumentation"
            className="btn btn-success"
          >
            <IoEnterOutline /> Tambah Dokumentasi
          </Link>
        </div>
        <div className="table-responsive">
          <table className="table table-striped table-bordered align-middle">
            <thead className="table-dark">
              <tr>
                <th scope="col">No</th>
                <th scope="col">Hari</th>
                <th scope="col">Tanggal</th>
                <th scope="col">Kegiatan</th>
                <th scope="col">Deskripsi</th>
                <th scope="col">Gambar</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {docs.map((doc, index) => (
                <tr key={doc.id}>
                  <td>{index + 1}</td>
                  <td>{doc.relatedEvent?.day || "-"}</td>
                  <td>{doc.relatedEvent?.date || "-"}</td>
                  <td>{doc.relatedEvent?.tittle || "-"}</td>
                  <td>{doc.description}</td>
                  <td>
                    <iframe
                      src={doc.url_pict}
                      alt={`Dokumentasi ${index + 1}`}
                      style={{ width: "100px", height: "auto" }}
                      title="Dokumentasi 1"
                    />
                  </td>
                  <td>
                    <div className="d-flex gap-2">
                      <Link
                        to={`/documentation/editDocumentation/${doc.id}`}
                        className="btn btn-sm btn-primary"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => deleteDocumentation(doc.id)}
                        className="btn btn-sm btn-danger"
                      >
                        Delete
                      </button>
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

export default ListDocumentation;
