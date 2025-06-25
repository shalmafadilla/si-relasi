import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../item/Layout";

const Overview = () => {
  const [stats, setStats] = useState({
    onGoingEvents: 0,
    totalMembers: 0,
    activeMembers: 0,
    joinedMembers: 0,
    undocumentedEvents: 0,
  });

  useEffect(() => {
    fetchOverview();
  }, []);

  const fetchOverview = async () => {
    try {
      const response = await axios.get("http://localhost:5000/overview");
      setStats(response.data);
    } catch (error) {
      console.error("Gagal mengambil data overview:", error);
    }
  };

  return (
    
    <Layout>
  <style>
    {`
      .overview-wrapper {
        display: flex;
        flex-wrap: wrap;
        gap: 32px;
      }

      .card-overview {
        flex: 1 1 calc(50% - 16px); /* 2 kolom */
        min-width: 250px;
        color: #8c7a67;
        background-color: #fdf8f3;
        border-radius: 26px;
        box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
        padding: 1rem;
      }

      .card-title {
        color: #453a39;
        font-weight: 600;
      }
    `}
  </style>

  <div className="container mt-5" >
    <h3 className="mb-4">Dashboard Admin</h3>

    <div className="overview-wrapper" style={{padding: "0 17px"}}>
      <div className="card-overview" style={{backgroundColor: "#bdcda9"}}>
        <div className="card-body">
          <h5 className="card-title">Kegiatan On Going</h5>
          <p className="card-text fs-4" style={{color: "#fdf8f3"}}>{stats.onGoingEvents} Kegiatan</p>
        </div>
      </div>

      <div className="card-overview" style={{backgroundColor: "#bdcda9"}}>
        <div className="card-body" >
          <h5 className="card-title">Member</h5>
          <p className="card-text fs-4" style={{color: "#fdf8f3"}}>{stats.totalMembers} Orang</p>
        </div>
      </div>

      <div className="card-overview">
        <div className="card-body">
          <h5 className="card-title">Member Aktif</h5>
          <p className="card-text fs-4">{stats.activeMembers} Orang</p>
        </div>
      </div>

      <div className="card-overview">
        <div className="card-body">
          <h5 className="card-title">Partisipan</h5>
          <p className="card-text fs-4">{stats.joinedMembers} Orang</p>
        </div>
      </div>

      <div className="card-overview" style={{backgroundColor: "#bdcda9"}}>
        <div className="card-body">
          <h5 className="card-title" >Belum Ada Dokumentasi</h5>
          <p className="card-text fs-4" style={{color: "#fdf8f3"}}>{stats.undocumentedEvents} Kegiatan</p>
        </div>
      </div>
    </div>
  </div>
</Layout>

  );
};

export default Overview;
