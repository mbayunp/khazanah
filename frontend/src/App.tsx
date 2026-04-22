import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PublicRoutes from './routes/PublicRoutes';
import LoginAdmin from './pages/admin/LoginAdmin';
import RegisterAdmin from './pages/admin/RegisterAdmin';
import AdminLayout from './components/layout/AdminLayout';
import Dashboard from './pages/admin/Dashboard';

// Import komponen program
import ProgramList from './pages/admin/programs/ProgramList';
import ProgramForm from './pages/admin/programs/ProgramForm';
import RuangAdmin from './pages/admin/RuangAdmin';
import ArticleAdmin from './pages/admin/ArticleAdmin';
import TasksAdmin from './pages/admin/TasksAdmin';
import SpeakersAdmin from './pages/admin/SpeakersAdmin';
<<<<<<< HEAD
import MembersAdmin from './pages/admin/MembersAdmin';
import LeadersAdmin from './pages/admin/LeadersAdmin';
=======
>>>>>>> 664b17580807ab2abe3415669c17297d2005b759

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<PublicRoutes />} />
<<<<<<< HEAD

        <Route path="/admin/login" element={<LoginAdmin />} />
        <Route path="/admin/register" element={<RegisterAdmin />} />

        {/* SEMUA RUTE DI DALAM SINI AKAN MEMILIKI SIDEBAR */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />

          {/* Rute CRUD Program */}
          <Route path="programs" element={<ProgramList />} />
          <Route path="programs/create" element={<ProgramForm />} />
          <Route path="programs/edit/:id" element={<ProgramForm />} />

          {/* Rute Ruang Curhat Admin */}
          <Route path="ruang" element={<RuangAdmin />} />

          {/* Rute Moderasi Artikel */}
          <Route path="articles" element={<ArticleAdmin />} />

          {/* Rute Manajemen Tugas */}
          <Route path="tasks" element={<TasksAdmin />} />

          {/* Rute Manajemen Pembicara */}
          <Route path="speakers" element={<SpeakersAdmin />} />

          {/* Rute Manajemen Anggota */}
          <Route path="members" element={<MembersAdmin />} />

          {/* Rute Manajemen Leaders */}
          <Route path="leaders" element={<LeadersAdmin />} />
=======
        
        <Route path="/admin/login" element={<LoginAdmin />} />
        <Route path="/admin/register" element={<RegisterAdmin />} />
        
        {/* SEMUA RUTE DI DALAM SINI AKAN MEMILIKI SIDEBAR */}
        <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            
            {/* Rute CRUD Program */}
            <Route path="programs" element={<ProgramList />} />
            <Route path="programs/create" element={<ProgramForm />} />
            <Route path="programs/edit/:id" element={<ProgramForm />} />

            {/* Rute Ruang Curhat Admin */}
            <Route path="ruang" element={<RuangAdmin />} />

            {/* Rute Moderasi Artikel */}
            <Route path="articles" element={<ArticleAdmin />} />

            {/* Rute Manajemen Tugas */}
            <Route path="tasks" element={<TasksAdmin />} />

            {/* Rute Manajemen Pembicara */}
            <Route path="speakers" element={<SpeakersAdmin />} />
>>>>>>> 664b17580807ab2abe3415669c17297d2005b759

        </Route>
      </Routes>
    </Router>
  );
}

export default App;