import React, { useState, useEffect } from "react";
import axios from "axios";

import Layout from "../item/Layout";

const ListLocation = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    getLocations();
  }, []);

  const getLocations = async () => {
    try {
      const response = await axios.get("http://localhost:5000/lokasi");
      setLocations(response.data);
    } catch (error) {
      console.error("Gagal mengambil data lokasi:", error);
    }
  };

  return (
    <Layout>
      <div className="container mt-5">
                      <h3 className="mb-4">Lokasi Kegiatan</h3>
                      </div>
        <div className="table-responsive">
          <table className="table table-striped table-bordered align-middle">
            <thead className="table-dark">
              <tr>
                <th scope="col">No</th>
                <th scope="col">Kecamatan</th>
              </tr>
            </thead>
            <tbody>
              {locations.map((lokasi, index) => (
                <tr key={lokasi.id}>
                  <td>{index + 1}</td>
                  <td>{lokasi.kecamatan}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    </Layout>
  );
};

export default ListLocation;
