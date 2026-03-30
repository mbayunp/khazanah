// src/pages/admin/Dashboard.tsx
import React from 'react';
import { Users, CalendarDays, CheckCircle } from 'lucide-react';

const Dashboard: React.FC = () => {
    return (
        <div className="space-y-6">
            
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Selamat Datang, Admin! 👋</h1>
                <p className="text-gray-500">Berikut adalah ringkasan aktivitas program Khazanah hari ini.</p>
            </div>

            {/* Statistik Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center">
                        <CalendarDays size={28} />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500">Total Program</p>
                        <h3 className="text-2xl font-bold text-gray-800">12</h3>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-green-50 text-green-500 flex items-center justify-center">
                        <Users size={28} />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500">Total Pendaftar</p>
                        <h3 className="text-2xl font-bold text-gray-800">1,240</h3>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-khazanah-light/50 text-khazanah-gold flex items-center justify-center">
                        <CheckCircle size={28} />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500">Program Aktif</p>
                        <h3 className="text-2xl font-bold text-gray-800">3</h3>
                    </div>
                </div>
            </div>

            {/* Tempat untuk Tabel Data Terbaru (Nanti kita buat) */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mt-8 min-h-[300px] flex items-center justify-center">
                <p className="text-gray-400 font-medium">[ Area Tabel Pendaftar Terbaru ]</p>
            </div>

        </div>
    );
};

export default Dashboard;