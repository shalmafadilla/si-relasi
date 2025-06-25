import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./item/Homepage.js";
import ListUser from "./components/ListUser.js";
import ListAdmin from "./components/ListAdmin.js";
import ListEvent from "./components/ListEvent.js";
import ListJoined from "./components/ListJoined.js";
import ListLocation from "./components/ListLocation.js";
import ListDocumentation from "./components/ListDocumentation.js";
import AddUser from "./components/AddUser.js";
import AddAdmin from "./components/AddAdmin.js";
import AddEvent from "./components/AddEvent.js";
import AddDocumentation from "./components/AddDocumentation.js";
import Overview from "./components/Overview.js";
import EditUser from "./components/EditUser.js";
import EditEvent from "./components/EditEvent.js";
import EditDocumentation from "./components/EditDocumentation.js";
import DaftarAdmin from "./item/DaftarAdmin.js"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/admin" element={<Overview/>}/>
        <Route path="/users" element={<ListUser />} />
        <Route path="/admins" element={<ListAdmin />} />
        <Route path="/events" element={<ListEvent />} />
        <Route path="/joined" element={<ListJoined />} />
        <Route path="/location" element={<ListLocation />} />
        <Route path="/documentation" element={<ListDocumentation />} />
        <Route path="/users/addUser" element={<AddUser/>} />
        <Route path="/admins/addAdmin" element={<AddAdmin/>} />
        <Route path="/users/editUser/:id" element={<EditUser/>} />
        <Route path="/events/editEvent/:id" element={<EditEvent/>} />
        <Route path="/documentation/editDocumentation/:id" element={<EditDocumentation/>} />
        <Route path="/events/addEvent" element={<AddEvent/>} />
        <Route path="/documentation/addDocumentation" element={<AddDocumentation/>} />
        <Route path="/daftarAdmin" element={<DaftarAdmin/>} />


        {/* Tambahkan route lain sesuai kebutuhan */}
      </Routes>
    </Router>
  );
}

export default App;
