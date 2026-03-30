import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Lock, Zap } from 'lucide-react';
// Import logo khazanah
import khazanahLogo from '../assets/logo.png';

const Footer: React.FC = () => {
    // Cek apakah admin sudah login dengan melihat ketersediaan token
    const isLoggedIn = !!localStorage.getItem('khazanah_token');

    return (
        <footer className="bg-khazanah-dark text-white py-16 border-t-[6px] border-khazanah-gold">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* 4 Kolom Utama */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-12">

                    {/* Kolom 1: Brand */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 mb-4">
                            {/* Ganti Inisial 'K' dengan Image Logo */}
                            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center p-1 border border-khazanah-gold overflow-hidden">
                                <img 
                                    src={khazanahLogo} 
                                    alt="Logo Khazanah" 
                                    className="w-full h-full object-contain"
                                />
                            </div>
                            <span className="font-bold text-2xl text-white">Khazanah</span>
                        </div>
                        <p className="text-khazanah-light/80 text-sm leading-relaxed pr-4">
                            Platform komunitas digital Muslim berkembang pesat di Indonesia. Menyebarkan spirit persatuan dan keberagaman dalam Islam untuk generasi muda.
                        </p>
                    </div>

                    {/* Kolom 2: Menu */}
                    <div>
                        <h4 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-khazanah-gold"></span>
                            Menu Utama
                        </h4>
                        <ul className="space-y-3 text-sm text-khazanah-light">
                            <li><Link to="/" className="hover:text-khazanah-gold transition-colors">Home</Link></li>
                            <li><Link to="/program" className="hover:text-khazanah-gold transition-colors">Program</Link></li>
                            <li><Link to="/jofisah" className="hover:text-khazanah-gold transition-colors">Jofisah</Link></li>
                            <li><Link to="/sholehah" className="hover:text-khazanah-gold transition-colors">Sholehah</Link></li>
                            <li><Link to="/kontak" className="hover:text-khazanah-gold transition-colors">Kontak</Link></li>

                            {/* Tombol Dinamis Admin */}
                            <li className="pt-4 mt-6 border-t border-khazanah-green/30">
                                {isLoggedIn ? (
                                    <Link
                                        to="/admin/dashboard"
                                        className="w-full flex items-center justify-center gap-2 bg-khazanah-gold/20 border border-khazanah-gold/50 hover:bg-khazanah-gold hover:shadow-lg hover:shadow-khazanah-gold/20 text-white px-4 py-3 rounded-xl transition-all duration-300 font-semibold"
                                    >
                                        <Zap size={16} /> Dashboard Admin
                                    </Link>
                                ) : (
                                    <Link
                                        to="/admin/login"
                                        className="w-full flex items-center justify-center gap-2 bg-khazanah-green/20 border border-khazanah-green/50 hover:bg-khazanah-green hover:shadow-lg hover:shadow-khazanah-green/20 text-white px-4 py-3 rounded-xl transition-all duration-300 font-semibold"
                                    >
                                        <Lock size={16} /> Login Admin
                                    </Link>
                                )}
                            </li>
                        </ul>
                    </div>

                    {/* Kolom 3: Program / Komunitas */}
                    <div>
                        <h4 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-khazanah-gold"></span>
                            Komunitas
                        </h4>
                        <ul className="space-y-3 text-sm text-khazanah-light">
                            <li><a href="#" className="hover:text-khazanah-gold transition-colors">Kajian Rutin</a></li>
                            <li><a href="#" className="hover:text-khazanah-gold transition-colors">Kelas Online</a></li>
                            <li><a href="#" className="hover:text-khazanah-gold transition-colors">Event Offline</a></li>
                            <li><a href="#" className="hover:text-khazanah-gold transition-colors">Pendaftaran Leader</a></li>
                        </ul>
                    </div>

                    {/* Kolom 4: Kontak */}
                    <div>
                        <h4 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-khazanah-gold"></span>
                            Hubungi Kami
                        </h4>
                        <ul className="space-y-4 text-sm text-khazanah-light">
                            <li className="flex items-start gap-3">
                                <Phone size={20} className="text-khazanah-gold shrink-0 mt-0.5" />
                                <span>+62 812 3456 7890 <br /> <span className="text-xs opacity-70">(WhatsApp Only)</span></span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Mail size={20} className="text-khazanah-gold shrink-0 mt-0.5" />
                                <span>halo@khazanahalwahda.com</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <MapPin size={20} className="text-khazanah-gold shrink-0 mt-0.5" />
                                <span>Jakarta, Indonesia</span>
                            </li>
                        </ul>
                    </div>

                </div>

                {/* Bottom: Copyright & Social Media */}
                <div className="pt-8 border-t border-khazanah-green/50 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="text-sm text-khazanah-light/60">
                        &copy; {new Date().getFullYear()} Khazanah Alwahda Kreatif. All rights reserved.
                    </div>
                    <div className="flex gap-4">
                        <a href="#" className="w-10 h-10 rounded-full bg-khazanah-green flex items-center justify-center text-white hover:bg-khazanah-gold transition-colors font-bold text-sm">IG</a>
                        <a href="#" className="w-10 h-10 rounded-full bg-khazanah-green flex items-center justify-center text-white hover:bg-khazanah-gold transition-colors font-bold text-sm">TT</a>
                        <a href="#" className="w-10 h-10 rounded-full bg-khazanah-green flex items-center justify-center text-white hover:bg-khazanah-gold transition-colors font-bold text-sm">YT</a>
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;