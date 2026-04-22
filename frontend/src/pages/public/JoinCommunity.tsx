import React from 'react';
import { Users, Heart, ShieldCheck, Star } from 'lucide-react';
import sholehahLogo from '../../assets/sholehah.png';
import jofisahLogo from '../../assets/jofisah.png';
import khazanahLogo from '../../assets/logo.png'; // Pastikan logo ini yang Hijau-Emas asli

const JoinCommunity: React.FC = () => {
    return (
        <div className="bg-gray-50 min-h-screen pt-32 pb-20 selection:bg-khazanah-gold/20 selection:text-khazanah-dark font-sans text-gray-800">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header Section */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
                        Pilih <span className="text-transparent bg-clip-text bg-gradient-to-r from-khazanah-green to-khazanah-gold">Ruang</span> Tumbuhmu
                    </h1>
                    <p className="text-lg text-gray-600 leading-relaxed font-medium">
                        Setiap perjalanan dimulai dengan satu langkah. Pilih komunitas yang paling sesuai dengan kebutuhanmu saat ini untuk bertumbuh bersama ribuan pemuda Muslim lainnya.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">

                    {/* CARD 1: SHOLEHAH STORY */}
                    <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-pink-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col group">
                        <div className="w-20 h-20 bg-pink-50 rounded-2xl flex items-center justify-center mb-8 border border-pink-100 group-hover:scale-110 transition-transform overflow-hidden">
                            <img src={sholehahLogo} alt="Sholehah Story" className="w-full h-full object-contain p-2 rounded-xl" />
                        </div>
                        <h2 className="text-2xl font-extrabold text-gray-900 mb-4 tracking-tight">Sahabat Sholehah</h2>
                        <p className="text-gray-600 mb-8 flex-grow leading-relaxed font-medium">
                            Wadah khusus muslimah untuk saling menguatkan, berbagi cerita inspiratif, dan belajar menjadi sebaik-baiknya perhiasan dunia.
                        </p>
                        <a
                            href="/join-sholehah"
                            target="_blank"
                            rel="noreferrer"
                            className="w-full bg-pink-500 text-white py-4 rounded-2xl font-bold text-center hover:bg-pink-600 transition shadow-lg shadow-pink-100 flex items-center justify-center gap-2 group"
                        >
                            Gabung Sekarang <Heart size={18} fill="currentColor" className="group-hover:scale-110 transition-transform" />
                        </a>
                    </div>

                    {/* CARD 2: JOFISAH ID */}
                    <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-teal-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col group">
                        <div className="w-20 h-20 bg-teal-50 rounded-2xl flex items-center justify-center mb-8 border border-teal-100 group-hover:scale-110 transition-transform overflow-hidden">
                            <img src={jofisahLogo} alt="Jofisah ID" className="w-full h-full object-contain p-2 rounded-xl" />
                        </div>
                        <h2 className="text-2xl font-extrabold text-gray-900 mb-4 tracking-tight">Sobat Jofisah</h2>
                        <p className="text-gray-600 mb-8 flex-grow leading-relaxed font-medium">
                            Fokus pada pengembangan diri (self-growth), edukasi pra-nikah, dan ukhuwah bagi kamu yang ingin bertumbuh dalam ketaatan.
                        </p>
                        <a
                            href="/join-jofisah"
                            target="_blank"
                            rel="noreferrer"
                            className="w-full bg-teal-600 text-white py-4 rounded-2xl font-bold text-center hover:bg-teal-700 transition shadow-lg shadow-teal-100 flex items-center justify-center gap-2 group"
                        >
                            Gabung Sekarang <Users size={18} className="group-hover:scale-110 transition-transform" />
                        </a>
                    </div>

                    {/* --- PERBAIKAN LOGO: KHAZANAH LEADERS (VIP/SPECIAL) --- */}
                    <div className="relative bg-khazanah-dark rounded-[2.5rem] p-8 shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col group overflow-hidden border-2 border-khazanah-gold/30">
                        {/* Efek Kilau/Glow */}
                        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-48 h-48 bg-khazanah-gold opacity-10 rounded-full blur-[100px]"></div>

                        {/* BAGIAN YANG DIPERBAIKI: BG Putih & Tanpa Opacity */}
                        <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mb-8 border-2 border-khazanah-gold/40 shadow-xl group-hover:scale-110 transition-transform overflow-hidden relative z-10 shadow-black/20">
                            {/* Logo asli yang Hijau-Emas, tanpa 'opacity-80' atau efek 'mix-blend' */}
                            <img src={khazanahLogo} alt="Khazanah" className="w-full h-full object-contain p-3 rounded-xl" />
                        </div>

                        <div className="inline-block bg-khazanah-gold text-khazanah-dark text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-4 w-max relative z-10">
                            Open Recruitment 2026
                        </div>

                        <h2 className="text-2xl font-extrabold text-white mb-4 relative z-10 tracking-tight">Khazanah Leaders</h2>
                        <p className="text-khazanah-light/70 mb-8 flex-grow leading-relaxed font-medium relative z-10">
                            Jadilah penggerak kebaikan! Ambil peran sebagai Leader untuk mengelola komunitas dan memberikan dampak lebih luas bagi umat.
                        </p>
                        <a
                            href="/join-leader"
                            target="_blank"
                            rel="noreferrer"
                            className="w-full bg-khazanah-gold text-khazanah-dark py-4 rounded-2xl font-black text-center hover:bg-yellow-400 transition shadow-xl shadow-black/40 flex items-center justify-center gap-2 relative z-10 group"
                        >
                            Apply as Leader <ShieldCheck size={18} className="group-hover:scale-110 transition-transform" />
                        </a>
                    </div>

                </div>

                {/* Footer Info */}
                <div className="mt-20 text-center bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm">
                    <div className="inline-flex p-3 rounded-full bg-khazanah-light text-khazanah-green mb-4">
                        <Star size={24} fill="currentColor" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Masih Bingung Pilih yang Mana?</h3>
                    <p className="text-gray-500 mb-0 font-medium">
                        Kamu bisa mengikuti ketiganya! Mulailah dengan bergabung sebagai member (Sholehah/Jofisah) terlebih dahulu untuk merasakan atmosfer komunitas kami.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default JoinCommunity;