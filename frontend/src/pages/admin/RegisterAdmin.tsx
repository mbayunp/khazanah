import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import logo from '../../assets/logo.png';

const RegisterAdmin: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password })
            });

            const data = await response.json();

            if (response.ok) {
                Swal.fire({
                    icon: 'success',
                    title: 'Pendaftaran Berhasil!',
                    text: 'Akun Admin telah dibuat. Silakan login untuk melanjutkan.',
                    confirmButtonColor: '#18703E'
                }).then(() => {
                    navigate('/admin/login');
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Pendaftaran Gagal',
                    text: data.message || 'Terjadi kesalahan saat mendaftar.',
                    confirmButtonColor: '#18703E'
                });
            }
        } catch (error) {
            console.error('Error:', error);
            Swal.fire({
                icon: 'error',
                title: 'Koneksi Terputus',
                text: 'Tidak dapat terhubung ke server backend.',
                confirmButtonColor: '#18703E'
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-khazanah-light/30 px-4 py-12">

            {/* Tombol Kembali ke Beranda */}
            <Link
                to="/"
                className="absolute top-6 left-6 md:top-10 md:left-10 flex items-center gap-2 text-gray-600 hover:text-khazanah-green transition-colors font-medium bg-white px-5 py-2.5 rounded-full shadow-sm border border-gray-100 hover:shadow-md z-10"
            >
                <span className="text-xl leading-none">&larr;</span> Beranda
            </Link>

            <div className="bg-white p-8 md:p-10 rounded-2xl shadow-xl shadow-khazanah-green/10 w-full max-w-md border border-khazanah-green/10">
                <div className="text-center mb-8">
                    <img
                        src={logo}
                        alt="Logo Khazanah"
                        className="h-16 mx-auto mb-4 object-contain"
                    />
                    <h2 className="text-2xl font-bold text-khazanah-dark">Daftar Admin Baru</h2>
                    <p className="text-gray-500 text-sm mt-2">Buat akun untuk mengakses Dashboard Khazanah</p>
                </div>

                <form onSubmit={handleRegister} className="space-y-5">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Nama Lengkap</label>
                        <input
                            type="text"
                            placeholder="Masukkan nama"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-khazanah-gold bg-gray-50 focus:bg-white transition-all"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            placeholder="admin@khazanah.id"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-khazanah-gold bg-gray-50 focus:bg-white transition-all"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            placeholder="Minimal 6 karakter"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-khazanah-gold bg-gray-50 focus:bg-white transition-all"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full text-white p-4 rounded-xl font-bold transition-all shadow-md ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-khazanah-green hover:bg-khazanah-dark shadow-khazanah-green/30'
                            }`}
                    >
                        {isLoading ? 'Memproses...' : 'Daftar Sekarang'}
                    </button>
                </form>

                <p className="text-center text-sm text-gray-500 mt-6">
                    Sudah punya akun?{' '}
                    <Link to="/admin/login" className="text-khazanah-gold font-bold hover:underline">
                        Login di sini
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterAdmin;