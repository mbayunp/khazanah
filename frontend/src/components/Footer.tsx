import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Lock, LayoutDashboard, Heart } from 'lucide-react';
import khazanahLogo from '../assets/logo.png';

const Footer: React.FC = () => {
    // Cek apakah admin sudah login dengan melihat ketersediaan token
    const isLoggedIn = !!localStorage.getItem('khazanah_token');

    return (
        <footer className="bg-emerald-dark text-white relative overflow-hidden pt-20 pb-10 border-t border-gold/20">
            {/* Ambient background decoration */}
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-emerald/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* 4 Kolom Utama */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">

                    {/* Kolom 1: Brand & Quote */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center p-1.5 border border-white/20 overflow-hidden shadow-premium">
                                <img 
                                    src={khazanahLogo} 
                                    alt="Logo Khazanah" 
                                    className="w-full h-full object-contain filter invert"
                                />
                            </div>
                            <span className="font-outfit font-bold text-2xl tracking-wide bg-gradient-to-r from-white via-white to-gold bg-clip-text text-transparent">
                                Khazanah
                            </span>
                        </div>
                        <p className="text-emerald-soft/85 text-sm font-outfit leading-relaxed pr-4">
                            Platform komunitas digital Muslim berkembang pesat di Indonesia. Menyebarkan spirit persatuan dan keberagaman dalam Islam untuk generasi muda.
                        </p>
                        {/* Islamic Quote */}
                        <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                            <p className="text-xs italic text-gold font-medium">"Sebaik-baik manusia adalah yang paling bermanfaat bagi orang lain."</p>
                            <p className="text-[10px] text-emerald-soft/60 mt-1 font-bold">— HR. Ahmad</p>
                        </div>
                    </div>

                    {/* Kolom 2: Quick Links */}
                    <div>
                        <h4 className="text-white font-outfit font-bold text-lg mb-6 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-gold"></span>
                            Eksplorasi
                        </h4>
                        <ul className="space-y-3.5 text-sm font-outfit text-emerald-soft/80">
                            <li><Link to="/" className="hover:text-gold transition-colors duration-200">Beranda</Link></li>
                            <li><Link to="/program" className="hover:text-gold transition-colors duration-200">Program Kreatif</Link></li>
                            <li><Link to="/jofisah" className="hover:text-gold transition-colors duration-200">Sobat Jofisah</Link></li>
                            <li><Link to="/sholehah" className="hover:text-gold transition-colors duration-200">Sahabat Sholehah</Link></li>
                            <li><Link to="/kontak" className="hover:text-gold transition-colors duration-200">Kontak Kami</Link></li>
                        </ul>
                    </div>

                    {/* Kolom 3: Komunitas */}
                    <div>
                        <h4 className="text-white font-outfit font-bold text-lg mb-6 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-gold"></span>
                            Ruang Komunitas
                        </h4>
                        <ul className="space-y-3.5 text-sm font-outfit text-emerald-soft/80">
                            <li><Link to="/ruang" className="hover:text-gold transition-colors duration-200">Ruang Curhat Publik</Link></li>
                            <li><Link to="/artikel" className="hover:text-gold transition-colors duration-200">Artikel & Dakwah</Link></li>
                            <li><Link to="/submit-article" className="hover:text-gold transition-colors duration-200">Kirim Karya Tulis</Link></li>
                            <li><Link to="/join" className="hover:text-gold transition-colors duration-200">Pendaftaran Member</Link></li>
                        </ul>
                    </div>

                    {/* Kolom 4: Hubungi Kami */}
                    <div className="space-y-6">
                        <div>
                            <h4 className="text-white font-outfit font-bold text-lg mb-6 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-gold"></span>
                                Hubungi Kami
                            </h4>
                            <ul className="space-y-4 text-sm font-outfit text-emerald-soft/80">
                                <li className="flex items-start gap-3">
                                    <Phone size={18} className="text-gold shrink-0 mt-0.5" />
                                    <span>+62 812 3456 7890 <br /> <span className="text-xs text-emerald-soft/60">(WhatsApp Only)</span></span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Mail size={18} className="text-gold shrink-0 mt-0.5" />
                                    <span>halo@khazanahalwahda.com</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <MapPin size={18} className="text-gold shrink-0 mt-0.5" />
                                    <span>Jakarta, Indonesia</span>
                                </li>
                            </ul>
                        </div>
                        {/* Admin Action Button */}
                        <div className="pt-2">
                            {isLoggedIn ? (
                                <Link
                                    to="/admin/dashboard"
                                    className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-4 py-2.5 rounded-xl transition-all duration-300 font-outfit font-bold text-xs"
                                >
                                    <LayoutDashboard size={14} className="text-gold" /> Dashboard Admin
                                </Link>
                            ) : (
                                <Link
                                    to="/admin/login"
                                    className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-4 py-2.5 rounded-xl transition-all duration-300 font-outfit font-bold text-xs"
                                >
                                    <Lock size={14} className="text-gold" /> Login Admin
                                </Link>
                            )}
                        </div>
                    </div>

                </div>

                {/* Bottom Footer */}
                <div className="pt-8 mt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-sm font-outfit text-emerald-soft/60 flex items-center gap-1.5 text-center md:text-left">
                        &copy; {new Date().getFullYear()} Khazanah Alwahda Kreatif. Developed with
                        <Heart size={12} className="text-roseSholehah fill-roseSholehah" />
                        for Muslim Ummah.
                    </div>
                    {/* Social Media Link */}
                    <div className="flex gap-3">
                        {['Instagram', 'TikTok', 'YouTube'].map((social) => (
                            <a
                                key={social}
                                href={`https://${social.toLowerCase()}.com`}
                                target="_blank"
                                rel="noreferrer"
                                className="px-4 py-2 text-xs font-outfit font-bold rounded-xl bg-white/5 border border-white/10 hover:border-gold hover:text-gold text-emerald-soft transition-all duration-300"
                            >
                                {social}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;