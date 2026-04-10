import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
// Import logo langsung dari folder assets
import logo from '../assets/khazanah.png';

const Navbar: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobileFiturOpen, setIsMobileFiturOpen] = useState(false); // State untuk dropdown mobile

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
        { name: 'Testimoni', href: '/testimoni' },
    ];

    return (
        <>
            <nav
                className={`fixed w-full top-0 z-50 transition-all duration-300 ${
                    isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
                }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center">

                        {/* Logo Berupa Gambar */}
                        <div className="flex-shrink-0 flex items-center cursor-pointer">
                            <img src={logo} alt="Khazanah Alwahda Kreatif" className="h-10 w-auto object-contain" />
                        </div>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex space-x-6 lg:space-x-8 items-center">
                            {mainLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className={`font-semibold transition-all duration-300 hover:text-khazanah-gold relative group ${
                                        isScrolled ? 'text-gray-700' : 'text-gray-800'
                                    }`}
                                >
                                    {link.name}
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-khazanah-gold transition-all duration-300 group-hover:w-full"></span>
                                </a>
                            ))}

                            {/* Dropdown Fitur Lainnya (Desktop) */}
                            <div className="relative group">
                                <button className={`flex items-center gap-1 font-semibold transition-all duration-300 hover:text-khazanah-gold ${
                                    isScrolled ? 'text-gray-700' : 'text-gray-800'
                                }`}>
                                    Fitur Lainnya <ChevronDown size={16} className="group-hover:rotate-180 transition-transform duration-300" />
                                </button>
                                
                                {/* Dropdown Content */}
                                <div className="absolute top-full left-0 pt-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                                    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-3 w-52 flex flex-col gap-1">
                                        {fiturLinks.map((link) => (
                                            <a 
                                                key={link.name} 
                                                href={link.href}
                                                className="px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-600 hover:bg-khazanah-light hover:text-khazanah-green transition-colors"
                                            >
                                                {link.name}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* CTA Button Desktop */}
                        <div className="hidden md:block">
                            <a href="/join" className="bg-khazanah-green text-white font-bold px-6 py-2.5 rounded-xl hover:bg-khazanah-dark hover:shadow-lg hover:shadow-khazanah-green/30 transition-all duration-300">
                                Gabung Komunitas
                            </a>
                        </div>

                        {/* Hamburger Button Mobile */}
                        <div className="md:hidden flex items-center">
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className={`p-2 rounded-md focus:outline-none ${isScrolled ? 'text-khazanah-green' : 'text-gray-900'}`}
                            >
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    {isMobileMenuOpen ? (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    ) : (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                    )}
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div
                className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 md:hidden ${
                    isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
            ></div>

            {/* Mobile Menu Drawer */}
            <div
                className={`fixed top-0 right-0 h-full w-72 bg-white z-50 transform transition-transform duration-300 ease-in-out md:hidden flex flex-col shadow-2xl ${
                    isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                <div className="p-6 flex flex-col h-full overflow-y-auto">
                    <div className="flex justify-end mb-6">
                        <button onClick={() => setIsMobileMenuOpen(false)} className="text-gray-500 hover:text-khazanah-gold bg-gray-50 p-2 rounded-full">
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    
                    <div className="flex flex-col space-y-2 flex-grow">
                        {mainLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="text-base font-bold text-gray-800 hover:text-khazanah-green bg-gray-50 hover:bg-khazanah-light px-4 py-3 rounded-xl transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {link.name}
                            </a>
                        ))}

                        {/* Accordion Fitur Lainnya (Mobile) */}
                        <div className="mt-2">
                            <button 
                                onClick={() => setIsMobileFiturOpen(!isMobileFiturOpen)}
                                className="w-full flex items-center justify-between text-base font-bold text-gray-800 hover:text-khazanah-green bg-gray-50 hover:bg-khazanah-light px-4 py-3 rounded-xl transition-colors"
                            >
                                <span>Fitur Lainnya</span>
                                {isMobileFiturOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                            </button>
                            
                            <div className={`flex flex-col gap-1 overflow-hidden transition-all duration-300 ${isMobileFiturOpen ? 'max-h-64 mt-2' : 'max-h-0'}`}>
                                {fiturLinks.map((link) => (
                                    <a 
                                        key={link.name}
                                        href={link.href}
                                        className="pl-8 pr-4 py-2.5 text-sm font-semibold text-gray-600 hover:text-khazanah-green border-l-2 border-transparent hover:border-khazanah-green transition-all"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {link.name}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-gray-100">
                        <a href="/join" className="w-full flex justify-center bg-khazanah-green text-white font-bold px-6 py-4 rounded-xl hover:bg-khazanah-dark transition shadow-lg shadow-khazanah-green/20">
                            Gabung Komunitas
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;