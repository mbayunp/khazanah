import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PublicLayout from '../components/layout/PublicLayout';
import Home from '../pages/public/Home';
import Program from '../pages/public/Program';
import Jofisah from '../pages/public/Jofisah';
import Sholehah from '../pages/public/Sholehah';
import Contact from '../pages/public/Contact';
import ProgramDetail from '../pages/public/ProgramDetail';


const PublicRoutes: React.FC = () => {
    return (
        <Routes>
            <Route element={<PublicLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/program" element={<Program />} />
                <Route path="/program/:slug" element={<ProgramDetail />} />
                <Route path="/jofisah" element={<Jofisah />} />
                <Route path="/sholehah" element={<Sholehah />} />
                <Route path="/kontak" element={<Contact />} />
            </Route>
        </Routes>
    );
};

export default PublicRoutes;