import React from 'react';
import Sidebar from './Sidebar';

const AdminLayout = ({ children }) => {
    return (
        <div className="d-flex" >
            {/* Sidebar */}
            
                <Sidebar />

            {/* Main Content */}
            <div className="container flex-grow-1" style={{color: "#8c7a67" , marginLeft: "250px" }}>
                {children}
            </div>
        </div>
    );
};

export default AdminLayout;
