import React from 'react';
import Navbar from './Navbar';


import { Outlet } from 'react-router-dom';
export default function Master() {
    return (
        <div className="sb-nav-fixed"> 
              <Navbar />
                <div id="layoutSidenav_content">
                    <main>
                      <Outlet />
                    </main>    
              </div>
        </div>
    );
}
