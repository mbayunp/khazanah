import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('khazanah_token');
        navigate('/admin/login');
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold text-khazanah-dark mb-4">Selamat Datang di Dashboard Admin! 🎉</h1>
            <p className="text-gray-600 mb-8">Sistem Autentikasi Backend dan Frontend sudah terhubung.</p>
            <button onClick={handleLogout} className="bg-red-500 text-white px-6 py-2 rounded-lg font-bold">
                Logout
            </button>
        </div>
    );
};

export default Dashboard;