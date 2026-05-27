import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import logo from '../../assets/logo.png';
import { API_ENDPOINTS } from '../../config/api';

const LoginAdmin: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch(`${API_ENDPOINTS.auth}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();

            if (response.ok) {
                Swal.fire({
                    icon: 'success',
                    title: 'Login Berhasil!',
                    text: 'Selamat datang kembali di Dashboard Khazanah.',
                    confirmButtonColor: '#18703E',
                    timer: 2000,
                    showConfirmButton: false
                }).then(() => {
                    localStorage.setItem('khazanah_token', data.token);
                    navigate('/admin/dashboard');
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Login Gagal',
                    text: data.message,
                    confirmButtonColor: '#18703E'
                });
            }
        } catch (error) {
            console.error(error);
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
        <div className="relative min-h-screen flex items-center justify-center bg-khazanah-light/30 px-4">

            {/* Tombol Kembali ke Beranda */}
            <Link
                to="/"
                className="absolute top-6 left-6 md:top-10 md:left-10 flex items-center gap-2 text-gray-600 hover:text-khazanah-green transition-colors font-medium bg-white px-5 py-2.5 rounded-full shadow-sm border border-gray-100 hover:shadow-md"
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
                    <h2 className="text-2xl font-bold text-khazanah-dark">Admin Login</h2>
                    <p className="text-gray-500 text-sm mt-2">Masuk untuk mengelola sistem Khazanah</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-5">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            placeholder="admin@khazanah.id"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-khazanah-green bg-gray-50 focus:bg-white transition-all"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            placeholder="Masukkan password Anda"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-khazanah-green bg-gray-50 focus:bg-white transition-all"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full text-white p-4 rounded-xl font-bold transition-all shadow-md ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-khazanah-green hover:bg-khazanah-dark shadow-khazanah-green/30'
                            }`}
                    >
                        {isLoading ? 'Memeriksa Kredensial...' : 'Masuk Sekarang'}
                    </button>
                </form>

                <p className="text-center text-sm text-gray-500 mt-6">
                    Belum punya akun?{' '}
                    <Link to="/admin/register" className="text-khazanah-green font-bold hover:underline">
                        Daftar di sini
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginAdmin;