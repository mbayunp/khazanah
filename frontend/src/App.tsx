import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PublicRoutes from './routes/PublicRoutes';
import LoginAdmin from './pages/admin/LoginAdmin';
import RegisterAdmin from './pages/admin/RegisterAdmin'; // <-- Import halaman Register
import Dashboard from './pages/admin/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        {/* Rute Publik (Home, Program, Jofisah, Sholehah, Kontak) */}
        <Route path="/*" element={<PublicRoutes />} />

        {/* Rute Auth & Admin (Tanpa Navbar Publik) */}
        <Route path="/admin/login" element={<LoginAdmin />} />
        <Route path="/admin/register" element={<RegisterAdmin />} /> {/* <-- Tambahkan ini */}
        <Route path="/admin/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;