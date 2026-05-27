import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Calendar, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/khazanah.png';

const Navbar: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isFiturOpen, setIsFiturOpen] = useState(false);
    const [hijriDate, setHijriDate] = useState('');
    const location = useLocation();

    useEffect(() => {
        const updateHijriDate = () => {
            try {
                const now = new Date();
                const formatted = new Intl.DateTimeFormat('id-ID-u-ca-islamic-umalqura', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                }).format(now);

                const cleanDate = formatted.replace(/\s*(AH|H)$/i, '').trim();
                setHijriDate(`${cleanDate} H`);
            } catch (error) {
                setHijriDate('10 Zulhijah 1447 H');
            }
        };

        updateHijriDate();

        const now = new Date();
        const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);
        const msUntilMidnight = tomorrow.getTime() - now.getTime();

        const midnightTimer = setTimeout(() => {
            updateHijriDate();
            setInterval(updateHijriDate, 24 * 60 * 60 * 1000);
        }, msUntilMidnight);
        return () => clearTimeout(midnightTimer);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsMobileMenuOpen(false);
        setIsFiturOpen(false);
    }, [location.pathname]);

    // Menu Utama
    const mainLinks = [
        { name: 'Home', href: '/' },
        { name: 'Program', href: '/program' },
        { name: 'Jofisah', href: '/jofisah' },
        { name: 'Sholehah', href: '/sholehah' },
        { name: 'Kontak', href: '/kontak' },
    ];

    // Menu Dropdown (Fitur Lainnya)
    const fiturLinks = [
        { name: 'Baca Artikel', href: '/artikel' },
        { name: 'Kirim Artikel', href: '/submit-article' },
        { name: 'Ruang Cerita', href: '/ruang' },
    ];

    const isLinkActive = (path: string) => {
        if (path === '/') return location.pathname === '/';
        return location.pathname.startsWith(path);
    };

    return (
        <>
            <nav
                className={`fixed w-full top-0 z-50 transition-all duration-500 ${isScrolled
                    ? 'backdrop-blur-md bg-white/70 border-b border-emerald-500/10 shadow-[0_10px_30px_rgba(0,0,0,0.03)] py-3'
                    : 'bg-transparent py-5'
                    }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center">

                        {/* Logo */}
                        <Link to="/" className="flex-shrink-0 flex items-center gap-3">
                            <img src={logo} alt="Khazanah Alwahda Kreatif" className="h-10 w-auto object-contain transition-transform hover:scale-105" />
                        </Link>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex space-x-1 lg:space-x-2 items-center">
                            {mainLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.href}
                                    className={`relative px-4 py-2 rounded-xl text-sm font-outfit font-semibold transition-all duration-300 ${isLinkActive(link.href)
                                        ? 'text-emerald font-bold'
                                        : 'text-gray-600 hover:text-emerald'
                                        }`}
                                >
                                    <span className="relative z-10">{link.name}</span>
                                    {isLinkActive(link.href) && (
                                        <motion.span
                                            layoutId="activeNavTab"
                                            className="absolute inset-0 bg-emerald/5 rounded-xl border border-emerald/5"
                                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                        />
                                    )}
                                </Link>
                            ))}

                            {/* Dropdown Fitur Lainnya (Desktop) */}
                            <div className="relative">
                                <button
                                    onClick={() => setIsFiturOpen(!isFiturOpen)}
                                    className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-outfit font-semibold text-gray-600 hover:text-emerald transition-all duration-300 ${isFiturOpen ? 'bg-emerald/5 text-emerald' : ''
                                        }`}
                                >
                                    <span>Fitur</span>
                                    <ChevronDown size={14} className={`transition-transform duration-300 ${isFiturOpen ? 'rotate-180 text-emerald' : ''}`} />
                                </button>

                                {/* Dropdown Content */}
                                <AnimatePresence>
                                    {isFiturOpen && (
                                        <>
                                            {/* Click outside overlay */}
                                            <div className="fixed inset-0 z-0" onClick={() => setIsFiturOpen(false)} />
                                            <motion.div
                                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                                transition={{ duration: 0.15 }}
                                                className="absolute top-full right-0 mt-2 z-10 w-52 bg-white/95 backdrop-blur-md rounded-2xl shadow-premium border border-gray-100 p-2 flex flex-col gap-0.5"
                                            >
                                                {fiturLinks.map((link) => (
                                                    <Link
                                                        key={link.name}
                                                        to={link.href}
                                                        onClick={() => setIsFiturOpen(false)}
                                                        className={`px-4 py-2.5 rounded-xl text-sm font-outfit font-semibold transition-all ${isLinkActive(link.href)
                                                            ? 'bg-emerald/5 text-emerald'
                                                            : 'text-gray-600 hover:bg-emerald-soft/50 hover:text-emerald'
                                                            }`}
                                                    >
                                                        {link.name}
                                                    </Link>
                                                ))}
                                            </motion.div>
                                        </>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* Right: Hijri Date Badge & CTA Button */}
                        <div className="hidden md:flex items-center gap-4">
                            {/* Hijri Date Display */}
                            <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-soft text-emerald font-outfit font-semibold text-xs border border-emerald-500/10 shadow-sm">
                                <Calendar size={13} className="text-gold" />
                                <span>{hijriDate || '10 Zulhijah 1447 H'}</span>
                            </div>

                            <Link
                                to="/join"
                                className="bg-gradient-to-r from-emerald to-gold hover:shadow-premium hover:opacity-95 text-white font-outfit font-bold px-5 py-2.5 rounded-xl transition-all duration-300 text-sm"
                            >
                                Gabung Komunitas
                            </Link>
                        </div>

                        {/* Hamburger Button Mobile */}
                        <div className="md:hidden flex items-center">
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className={`p-2 rounded-xl focus:outline-none transition-colors ${isScrolled ? 'text-emerald bg-emerald-soft/50' : 'text-gray-800 bg-white/40'
                                    }`}
                            >
                                {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Drawer */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        {/* Overlay */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.4 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black z-40 md:hidden"
                            onClick={() => setIsMobileMenuOpen(false)}
                        />

                        {/* Drawer */}
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 h-full w-72 bg-sand/95 backdrop-blur-lg z-50 md:hidden flex flex-col shadow-premium border-l border-white/20"
                        >
                            <div className="p-6 flex flex-col h-full overflow-y-auto custom-scrollbar">
                                <div className="flex justify-between items-center mb-8">
                                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-soft text-emerald font-semibold text-xs border border-emerald-500/10">
                                        <Calendar size={12} className="text-gold" />
                                        <span>{hijriDate || '10 Zulhijah 1447 H'}</span>
                                    </div>
                                    <button
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="text-gray-500 hover:text-emerald bg-white/60 p-2 rounded-full border border-gray-100"
                                    >
                                        <X size={18} />
                                    </button>
                                </div>

                                <div className="flex flex-col space-y-1.5 flex-grow">
                                    {mainLinks.map((link) => (
                                        <Link
                                            key={link.name}
                                            to={link.href}
                                            className={`text-base font-outfit font-semibold px-4 py-3 rounded-xl transition-all ${isLinkActive(link.href)
                                                ? 'bg-emerald/10 text-emerald font-bold'
                                                : 'text-gray-700 hover:bg-emerald-soft/50 hover:text-emerald'
                                                }`}
                                        >
                                            {link.name}
                                        </Link>
                                    ))}

                                    <div className="pt-4 border-t border-emerald-500/10 mt-4">
                                        <p className="px-4 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Fitur Lainnya</p>
                                        {fiturLinks.map((link) => (
                                            <Link
                                                key={link.name}
                                                to={link.href}
                                                className={`text-base font-outfit font-semibold px-4 py-3 rounded-xl transition-all flex items-center ${isLinkActive(link.href)
                                                    ? 'bg-emerald/10 text-emerald font-bold'
                                                    : 'text-gray-700 hover:bg-emerald-soft/50 hover:text-emerald'
                                                    }`}
                                            >
                                                {link.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>

                                <div className="mt-8 pt-6 border-t border-emerald-500/10">
                                    <Link
                                        to="/join"
                                        className="w-full flex justify-center bg-gradient-to-r from-emerald to-gold text-white font-outfit font-bold px-6 py-3.5 rounded-xl hover:shadow-lg transition duration-300"
                                    >
                                        Gabung Komunitas
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;