import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
    return (
        <footer className="bg-khazanah-dark text-white py-16 border-t-[6px] border-khazanah-gold">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* 4 Kolom Utama */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-12">

                    {/* Kolom 1: Brand */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 bg-khazanah-gold rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-xs">K</span>
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

                            {/* Tombol Login Admin - Diubah menjadi Kotak Panjang */}
                            <li className="pt-4 mt-6 border-t border-khazanah-green/30">
                                <Link
                                    to="/admin/login"
                                    className="w-full flex items-center justify-center gap-2 bg-khazanah-green/20 border border-khazanah-green/50 hover:bg-khazanah-green hover:shadow-lg hover:shadow-khazanah-green/20 text-white px-4 py-3 rounded-xl transition-all duration-300 font-semibold"
                                >
                                    <span className="text-sm">🔒</span> Login Admin
                                </Link>
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
                                <span className="text-khazanah-gold text-lg">📞</span>
                                <span>+62 812 3456 7890 <br /> (WhatsApp Only)</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-khazanah-gold text-lg">✉️</span>
                                <span>halo@khazanahalwahda.com</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-khazanah-gold text-lg">📍</span>
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
                        <a href="#" className="w-10 h-10 rounded-full bg-khazanah-green flex items-center justify-center text-white hover:bg-khazanah-gold transition-colors">IG</a>
                        <a href="#" className="w-10 h-10 rounded-full bg-khazanah-green flex items-center justify-center text-white hover:bg-khazanah-gold transition-colors">TT</a>
                        <a href="#" className="w-10 h-10 rounded-full bg-khazanah-green flex items-center justify-center text-white hover:bg-khazanah-gold transition-colors">YT</a>
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;