import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const PublicLayout: React.FC = () => {
    return (
        <div className="flex flex-col min-h-screen font-sans text-gray-800 bg-white">
            {/* Navbar selalu di atas */}
            <Navbar />

            {/* Konten halaman yang berubah-ubah akan masuk ke dalam Outlet ini */}
            <main className="flex-grow">
                <Outlet />
            </main>

            {/* Footer selalu di bawah */}
            <Footer />
        </div>
    );
};

export default PublicLayout;