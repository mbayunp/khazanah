import React, { useState, useEffect } from 'react';
// Import logo langsung dari folder assets
import logo from '../../assets/khazanah.png';

const Navbar: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Program', href: '/program' },
        { name: 'Jofisah', href: '/jofisah' },
        { name: 'Sholehah', href: '/sholehah' },
        { name: 'Kontak', href: '/kontak' },
    ];

    return (
        <>
            <nav
                className={`fixed w-full top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
                    }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center">

                        {/* Logo Berupa Gambar */}
                        <div className="flex-shrink-0 flex items-center cursor-pointer">
                            {/* h-10 atau h-12 cocok untuk logo memanjang, w-auto agar proporsional */}
                            <img src={logo} alt="Khazanah Alwahda Kreatif" className="h-10 w-auto object-contain" />
                        </div>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex space-x-8 items-center">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className={`font-semibold transition-all duration-300 hover:text-khazanah-gold relative group ${isScrolled ? 'text-gray-700' : 'text-gray-800'
                                        }`}
                                >
                                    {link.name}
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-khazanah-gold transition-all duration-300 group-hover:w-full"></span>
                                </a>
                            ))}
                        </div>

                        {/* CTA Button Desktop - Menggunakan Warna Tema Baru */}
                        <div className="hidden md:block">
                            <button className="bg-khazanah-green text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-khazanah-dark hover:shadow-lg hover:shadow-khazanah-green/30 transition-all duration-300">
                                Gabung Komunitas
                            </button>
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

            {/* Mobile Menu Drawer */}
            <div
                className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 md:hidden ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                    }`}
                onClick={() => setIsMobileMenuOpen(false)}
            ></div>

            <div
                className={`fixed top-0 right-0 h-full w-64 bg-white z-50 transform transition-transform duration-300 ease-in-out md:hidden flex flex-col shadow-2xl ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                <div className="p-6 flex flex-col h-full">
                    <div className="flex justify-end mb-8">
                        <button onClick={() => setIsMobileMenuOpen(false)} className="text-gray-500 hover:text-khazanah-gold">
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <div className="flex flex-col space-y-4 flex-grow">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="text-lg font-semibold text-gray-800 hover:text-khazanah-gold border-b border-gray-100 pb-2"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>
                    <div className="mt-auto">
                        <button className="w-full bg-khazanah-green text-white font-bold px-6 py-3 rounded-xl hover:bg-khazanah-dark transition">
                            Gabung Komunitas
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;