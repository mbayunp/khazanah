import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
    Heart, 
    Sparkles, 
    Smartphone, 
    ArrowRight,
    Flower2,
    PlayCircle
} from 'lucide-react';
import { motion } from 'framer-motion';

// Import Aset Gambar
import logoSholehah from '../../assets/sholehah.png';
import igIcon from '../../assets/ig.png';

const Sholehah: React.FC = () => {
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);

    return (
        <div className="font-sans text-stone-800 bg-[#FFF7F9] overflow-hidden">

            {/* 1. HERO SECTION */}
            <section className="min-h-screen flex items-center bg-gradient-to-br from-pink-50 via-rose-50/30 to-white pt-28 pb-16 relative">
                {/* Floating ambient glow spots */}
                <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-rose-300/10 rounded-full blur-[100px] pointer-events-none" />
                <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-yellow-400/5 rounded-full blur-[80px] pointer-events-none" />

                {/* Minimalist background floral SVG */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[350px] h-[350px] opacity-10 pointer-events-none select-none">
                    <svg className="w-full h-full text-pink-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 1.62-.48 3.12-1.3 4.39z"/>
                    </svg>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
                    <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="order-2 md:order-1 text-center md:text-left"
                        >
                            {/* Brand Badge */}
                            <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm border border-pink-500/20 px-4 py-2 rounded-full text-xs font-bold text-pink-600 mb-6 shadow-sm mx-auto md:mx-0">
                                <Flower2 size={14} className="text-pink-500 animate-pulse" />
                                <span>Sahabat Sholehah</span>
                                <span className="w-1.5 h-1.5 rounded-full bg-pink-500/30" />
                                <span className="text-gray-400 font-medium">by Khazanah Alwahda</span>
                            </div>

                            {/* Logo */}
                            <div className="mb-4 flex justify-center md:justify-start">
                                <img
                                    src={logoSholehah}
                                    alt="Logo Sholehah Story"
                                    className="w-52 md:w-60 drop-shadow-sm ml-[-8px]"
                                />
                            </div>

                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-stone-850 mb-6 leading-tight">
                                Menjadi Muslimah yang Kuat, <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-600">
                                    Lembut, dan Bermakna
                                </span>
                            </h2>
                            <p className="text-base md:text-lg text-stone-600 mb-8 leading-relaxed max-w-lg mx-auto md:mx-0">
                                Sholehah hadir sebagai ruang aman bagi Muslimah untuk bertumbuh dalam iman, kehidupan, dan kebahagiaan sejati.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                                <a 
                                    href="https://instagram.com/sholehahstory" 
                                    target="_blank" 
                                    rel="noreferrer" 
                                    className="bg-pink-500 hover:shadow-xl text-white font-bold px-8 py-4 rounded-xl transition duration-300 text-center flex items-center justify-center gap-3 group"
                                >
                                    <img 
                                        src={igIcon} 
                                        alt="Instagram Icon" 
                                        className="w-6 h-6 object-contain filter invert group-hover:scale-105 transition-transform" 
                                    />
                                    <span>Follow @sholehahstory</span>
                                </a>
                                <Link 
                                    to="/join/sholehah" 
                                    className="bg-white border border-pink-500/20 text-pink-600 hover:bg-pink-50/50 font-bold px-8 py-4 rounded-xl transition duration-300 text-center flex items-center justify-center"
                                >
                                    Gabung Sahabat Sholehah
                                </Link>
                            </div>
                        </motion.div>

                        {/* Visual Mockup Card */}
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            className="order-1 md:order-2 relative w-full max-w-[450px] mx-auto md:max-w-none"
                        >
                            <div className="absolute inset-0 bg-pink-500/10 rounded-3xl blur-3xl opacity-50 transform translate-x-4 translate-y-4"></div>
                            <div className="bg-white/70 backdrop-blur-md p-6 md:p-8 relative z-10 border border-white/20 rounded-3xl h-[480px] flex flex-col justify-between shadow-2xl">
                                {/* Header */}
                                <div className="flex items-center gap-3 border-b border-pink-500/10 pb-4">
                                    <div className="w-12 h-12 bg-rose-50 rounded-2xl flex items-center justify-center p-1 border border-pink-100/50">
                                        <img src={logoSholehah} alt="icon" className="w-full h-full object-contain" />
                                    </div>
                                    <div className="text-left">
                                        <div className="font-bold text-stone-800 text-sm">sholehahstory</div>
                                        <div className="text-[11px] text-gray-500 font-bold uppercase tracking-wider">Muslimah Lifestyle & Sisterhood</div>
                                    </div>
                                </div>
                                {/* Soft Toned Grid */}
                                <div className="grid grid-cols-2 gap-4 flex-grow my-6 text-center">
                                    <div className="bg-pink-500/5 border border-pink-500/10 rounded-2xl flex flex-col items-center justify-center p-4">
                                        <span className="text-pink-500 font-bold italic text-sm mb-1">Visual Feminin</span>
                                        <span className="text-[10px] text-gray-500">Anggun & Elegan</span>
                                    </div>
                                    <div className="bg-yellow-500/5 border border-yellow-500/15 rounded-2xl flex flex-col items-center justify-center p-4">
                                        <span className="text-yellow-600 font-bold italic text-sm mb-1">Quotes Harian</span>
                                        <span className="text-[10px] text-gray-500">Pelembut Hati</span>
                                    </div>
                                    <div className="bg-stone-50 border border-stone-200/50 rounded-2xl flex flex-col items-center justify-center p-4">
                                        <span className="text-stone-700 font-bold italic text-sm mb-1">Daily Routine</span>
                                        <span className="text-[10px] text-gray-500">Muslimah Produktif</span>
                                    </div>
                                    <div className="bg-pink-50 border border-pink-100 rounded-2xl flex flex-col items-center justify-center p-4">
                                        <span className="text-pink-600 font-bold italic text-sm mb-1">Self Care Tips</span>
                                        <span className="text-[10px] text-gray-500">Sesuai Syariat</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 2. VIDEO BUMPER SECTION */}
            <section id="video-bumper" className="py-20 md:py-28 bg-white relative">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-stone-900">
                            Kenalan Lebih Dekat dengan <span className="text-pink-500">Sholehah Story</span>
                        </h2>
                        <p className="text-stone-600 mt-4 text-base md:text-lg">
                            Ruang aman bagi Muslimah untuk saling menguatkan, berbagi cerita, dan menjadi lebih baik.
                        </p>
                    </div>
                    
                    {/* Bumper Video Container */}
                    <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-[6px] border-pink-500/5 bg-stone-950 group aspect-video w-full max-w-4xl mx-auto">
                        {!isVideoPlaying ? (
                            <div 
                                className="absolute inset-0 w-full h-full flex items-center justify-center bg-black/25 group-hover:bg-black/15 transition-all duration-300 z-10 cursor-pointer"
                                onClick={() => setIsVideoPlaying(true)}
                            >
                                <img 
                                    src="https://img.youtube.com/vi/Svzv2OXYTyc/maxresdefault.jpg" 
                                    alt="Cover Bumper Sholehah"
                                    className="absolute inset-0 w-full h-full object-cover -z-10"
                                />
                                <div className="w-20 h-20 bg-pink-500/95 rounded-full flex items-center justify-center text-white shadow-xl shadow-pink-500/30 group-hover:scale-110 transition-transform backdrop-blur-sm">
                                    <PlayCircle size={40} className="ml-1" />
                                </div>
                            </div>
                        ) : (
                            <iframe 
                                className="absolute inset-0 w-full h-full"
                                src="https://www.youtube.com/embed/Svzv2OXYTyc?autoplay=1&rel=0&modestbranding=1" 
                                title="Bumper Sholehah" 
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                allowFullScreen
                            ></iframe>
                        )}
                    </div>
                </div>
            </section>

            {/* 3. ABOUT SHOLEHAH */}
            <section className="py-20 md:py-28 bg-[#FFF7F9]/30 text-center">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-center mb-6">
                        <div className="p-4 bg-pink-500/10 rounded-2xl text-pink-500">
                            <Sparkles size={36} />
                        </div>
                    </div>
                    <h2 className="text-3xl font-bold text-stone-800 mb-6">Membangun Kepercayaan Diri Muslimah</h2>
                    <p className="text-base md:text-lg text-stone-650 leading-relaxed">
                        Sholehah adalah platform konten Muslimah yang berfokus pada pengembangan diri, kehidupan Islami, dan membangun kepercayaan diri wanita dalam menjalani setiap peran kehidupannya dengan penuh kemuliaan.
                    </p>
                </div>
            </section>

            {/* 4. VALUES SECTION */}
            <section className="py-20 md:py-28 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-stone-850">Nilai yang Kami Bawa</h2>
                        <p className="text-stone-500 mt-4 text-base md:text-lg">Pondasi utama untuk menjadi versi terbaik dirimu</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { icon: <Heart size={28} />, title: "Inner Beauty", desc: "Memperbaiki hati, keikhlasan, dan akhlak untuk memancarkan kecantikan sejati." },
                            { icon: <Smartphone size={28} />, title: "Muslimah Lifestyle", desc: "Inspirasi fashion syar'i, daily routine produktif, dan self-care yang halal." },
                            { icon: <Sparkles size={28} />, title: "Relationship", desc: "Menjaga keharmonisan pernikahan, keluarga, dan pergaulan yang membawa berkah." },
                            { icon: <Flower2 size={28} />, title: "Mental & Emotion", desc: "Ruang untuk healing, memaafkan, self-love, dan menata emosi agar lebih stabil." }
                        ].map((pillar, idx) => (
                            <div key={idx} className="bg-[#FFF7F9] p-8 rounded-[2rem] border border-pink-500/5 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group text-center md:text-left cursor-default">
                                <div className="mb-6 bg-white w-14 h-14 rounded-2xl flex items-center justify-center text-pink-500 mx-auto md:mx-0 group-hover:bg-pink-500 group-hover:text-white transition-colors group-hover:scale-105 shadow-sm border border-gray-100">
                                    {pillar.icon}
                                </div>
                                <h3 className="text-lg font-bold text-pink-500 mb-3">{pillar.title}</h3>
                                <p className="text-stone-600 text-sm leading-relaxed">{pillar.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. CONTENT PREVIEW */}
            <section className="py-20 md:py-28 bg-[#FFF7F9]/30">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h2 className="text-3xl font-bold text-stone-800">Jurnal Muslimah</h2>
                            <p className="text-stone-500 mt-2 text-sm md:text-base">Dosis inspirasi harian untuk melembutkan hati</p>
                        </div>
                        <a href="https://instagram.com/sholehahstory" target="_blank" rel="noreferrer" className="text-pink-500 font-bold hover:underline hidden md:flex items-center gap-2">
                            Lihat di Instagram <ArrowRight size={18} />
                        </a>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                        {[1, 2, 3, 4, 5, 6].map((item) => (
                            <div key={item} className="aspect-square bg-white rounded-3xl overflow-hidden group relative cursor-pointer border border-white/20 shadow-sm">
                                <div className="absolute inset-0 bg-gradient-to-tr from-pink-100/30 to-white flex items-center justify-center text-pink-500/50 font-bold text-xs p-6 text-center">
                                    [Konten Estetik {item}]
                                </div>
                                <div className="absolute inset-0 bg-pink-500/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                                    <div className="text-white font-bold flex items-center gap-2 scale-75 group-hover:scale-100 transition-transform">
                                        <Heart size={20} className="fill-white" /> 
                                        <span className="text-base">5.2K</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 6. CALL TO ACTION */}
            <section className="py-24 bg-pink-500 text-white text-center relative overflow-hidden">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                        Yuk Bertumbuh Bersama
                    </h2>
                    <p className="text-white/90 text-base md:text-lg mb-10 leading-relaxed max-w-2xl mx-auto font-medium">
                        Mulai perjalanan menjadi Muslimah terbaik versi dirimu hari ini. Kami menunggu kehadiranmu di dalam lingkaran kebaikan ini.
                    </p>
                    <a 
                        href="https://instagram.com/sholehahstory" 
                        target="_blank" 
                        rel="noreferrer" 
                        className="inline-flex items-center justify-center gap-4 bg-white text-pink-600 font-bold px-10 py-5 rounded-2xl hover:scale-105 transition-transform shadow-2xl w-full sm:w-auto text-lg"
                    >
                        <img 
                            src={igIcon} 
                            alt="IG" 
                            className="w-6 h-6 object-contain" 
                        />
                        <span>Follow @sholehahstory</span>
                    </a>
                </div>
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-80 h-80 bg-white/10 rounded-full blur-[80px]"></div>
                <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-80 h-80 bg-yellow-400/10 rounded-full blur-[80px]"></div>
            </section>

        </div>
    );
};

export default Sholehah;