import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
    Sparkles, 
    Leaf, 
    Compass, 
    Heart, 
    HeartHandshake, 
    BookOpen, 
    ArrowRight, 
    PlayCircle
} from 'lucide-react';
import { motion } from 'framer-motion';

// Import Aset Gambar
import logoJofisah from '../../assets/jofisah.png';
import igIcon from '../../assets/ig.png';

const Jofisah: React.FC = () => {
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);

    return (
        <div className="font-sans text-teal-900 bg-sand overflow-hidden">
            
            {/* 1. HERO SECTION */}
            <section className="min-h-screen flex items-center bg-gradient-to-br from-teal-900/5 via-white to-orange-50/20 pt-28 pb-16 relative">
                {/* Floating ambient spots */}
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-tealJofisah/10 rounded-full blur-[100px] pointer-events-none" />
                <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-gold/5 rounded-full blur-[80px] pointer-events-none" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
                    <div className="flex flex-col md:grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
                        
                        <motion.div 
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-center md:text-left"
                        >
                            {/* Brand Badge */}
                            <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm border border-tealJofisah/15 px-4 py-2 rounded-full text-xs font-outfit font-bold text-tealJofisah mb-6 shadow-sm mx-auto md:mx-0">
                                <Sparkles size={14} className="text-gold" />
                                <span>Sobat Jofisah</span>
                                <span className="w-1.5 h-1.5 rounded-full bg-tealJofisah/30" />
                                <span className="text-gray-400 font-medium">by Khazanah Alwahda</span>
                            </div>

                            <div className="mb-6 flex justify-center md:justify-start">
                                <img
                                    src={logoJofisah}
                                    alt="Logo Jofisah"
                                    className="w-28 h-28 md:w-32 md:h-32 rounded-3xl shadow-premium border border-white/20 p-1 bg-white"
                                />
                            </div>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold text-gray-900 mb-6 leading-tight">
                                Temukan Arah & <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-tealJofisah to-gold">
                                    Merawat Hati Bersama
                                </span>
                            </h1>
                            <p className="text-base md:text-lg text-gray-650 mb-8 leading-relaxed max-w-lg mx-auto md:mx-0 font-outfit">
                                Jofisah hadir untuk menemani perjalanan iman, self-growth, dan kehidupan yang lebih mindful bagi pemuda Muslim Indonesia.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                                <a 
                                    href="https://instagram.com/jofisah.id" 
                                    target="_blank" 
                                    rel="noreferrer" 
                                    className="bg-tealJofisah hover:shadow-premium text-white font-outfit font-bold px-8 py-4 rounded-xl transition duration-300 text-center flex items-center justify-center gap-3 group"
                                >
                                    <img src={igIcon} alt="Instagram" className="w-6 h-6 filter invert group-hover:scale-105 transition-transform" />
                                    <span>Follow @jofisah.id</span>
                                </a>
                                <Link 
                                    to="/join/jofisah" 
                                    className="bg-white border border-tealJofisah/20 text-tealJofisah hover:bg-teal-50/50 font-outfit font-bold px-8 py-4 rounded-xl transition duration-300 text-center flex items-center justify-center"
                                >
                                    Gabung Sobat Jofisah
                                </Link>
                            </div>
                        </motion.div>

                        {/* Interactive Visual Card */}
                        <motion.div 
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="relative w-full max-w-[450px] mx-auto md:max-w-none"
                        >
                            <div className="absolute inset-0 bg-tealJofisah/10 rounded-3xl blur-3xl opacity-50 transform translate-x-4 translate-y-4"></div>
                            <div className="glass-card p-6 md:p-8 relative z-10 border border-white/20 h-[450px] flex flex-col justify-between bg-white/70">
                                <div className="flex items-center gap-3 border-b border-tealJofisah/10 pb-4">
                                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center p-0.5 shadow-sm border border-gray-100">
                                        <img src={logoJofisah} alt="icon" className="w-full h-full object-cover rounded-xl" />
                                    </div>
                                    <div className="text-left">
                                        <div className="font-outfit font-bold text-gray-900 text-sm">jofisah.id</div>
                                        <div className="text-[11px] font-outfit text-gray-500 font-bold uppercase tracking-wider">Faith & Self Growth</div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4 flex-grow my-6 text-center">
                                    <div className="bg-tealJofisah/5 border border-tealJofisah/10 rounded-2xl flex flex-col items-center justify-center p-4">
                                        <span className="text-tealJofisah font-display font-bold italic text-sm mb-1">Self Reflection</span>
                                        <span className="text-[10px] text-gray-500">Menata Hati</span>
                                    </div>
                                    <div className="bg-gold/5 border border-gold/15 rounded-2xl flex flex-col items-center justify-center p-4">
                                        <span className="text-gold font-display font-bold italic text-sm mb-1">Daily Reminder</span>
                                        <span className="text-[10px] text-gray-500">Menjaga Ibadah</span>
                                    </div>
                                    <div className="bg-emerald/5 border border-emerald/10 rounded-2xl flex flex-col items-center justify-center p-4">
                                        <span className="text-emerald font-display font-bold italic text-sm mb-1">Mindfulness</span>
                                        <span className="text-[10px] text-gray-500">Berdamai dengan Keadaan</span>
                                    </div>
                                    <div className="bg-teal-50 border border-teal-150 rounded-2xl flex flex-col items-center justify-center p-4">
                                        <span className="text-teal-700 font-display font-bold italic text-sm mb-1">Spiritual Growth</span>
                                        <span className="text-[10px] text-gray-500">Bertumbuh Sesuai Sunnah</span>
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
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900">
                            Kenalan Lebih Dekat dengan <span className="text-tealJofisah">Jofisah</span>
                        </h2>
                        <p className="text-gray-550 mt-4 font-outfit text-base md:text-lg">
                            Wadah bagi pemuda Muslim untuk saling menjaga, bertukar pemikiran positif, dan saling menguatkan.
                        </p>
                    </div>
                    
                    {/* Bumper Video Container */}
                    <div className="relative rounded-[2.5rem] overflow-hidden shadow-premium border-[6px] border-tealJofisah/5 bg-teal-950 group aspect-video w-full max-w-4xl mx-auto">
                        {!isVideoPlaying ? (
                            <div 
                                className="absolute inset-0 w-full h-full flex items-center justify-center bg-black/25 group-hover:bg-black/15 transition-all duration-300 z-10 cursor-pointer"
                                onClick={() => setIsVideoPlaying(true)}
                            >
                                <img 
                                    src="https://img.youtube.com/vi/nZJI3Gu6tmA/maxresdefault.jpg" 
                                    alt="Cover Bumper Jofisah"
                                    className="absolute inset-0 w-full h-full object-cover -z-10"
                                />
                                <div className="w-20 h-20 bg-tealJofisah/95 rounded-full flex items-center justify-center text-white shadow-xl shadow-tealJofisah/30 group-hover:scale-110 transition-transform backdrop-blur-sm">
                                    <PlayCircle size={40} className="ml-1" />
                                </div>
                            </div>
                        ) : (
                            <iframe 
                                className="absolute inset-0 w-full h-full"
                                src="https://www.youtube.com/embed/nZJI3Gu6tmA?autoplay=1&rel=0&modestbranding=1" 
                                title="Bumper Jofisah" 
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                allowFullScreen
                            ></iframe>
                        )}
                    </div>
                </div>
            </section>

            {/* 3. ABOUT JOFISAH */}
            <section className="py-20 md:py-28 bg-sand/30 text-center">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-center mb-6">
                        <div className="p-4 bg-tealJofisah/10 rounded-2xl text-tealJofisah">
                            <Leaf size={36} />
                        </div>
                    </div>
                    <h2 className="text-3xl font-display font-bold text-gray-900 mb-6">Merawat Iman, Menata Hati</h2>
                    <p className="text-base md:text-lg text-gray-650 leading-relaxed font-outfit">
                        Jofisah adalah platform konten yang membantu Muslim muda untuk bertumbuh secara spiritual dan emosional melalui konten yang ringan, relatable, dan bermakna. Kami percaya bahwa setiap proses menuju baik layak untuk didukung.
                    </p>
                </div>
            </section>

            {/* 4. CONTENT PILLARS */}
            <section className="py-20 md:py-28 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-display font-bold text-gray-900">Fokus Pembahasan Kami</h2>
                        <p className="text-gray-500 mt-4 text-base md:text-lg font-outfit">Pilar utama perjalanan self-growth di Jofisah</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { icon: <Compass size={28} />, title: "Faith", desc: "Memperkuat hubungan dengan Allah melalui ibadah dan reminder harian." },
                            { icon: <Leaf size={28} />, title: "Self Growth", desc: "Pengembangan diri, menjaga kesehatan mental, dan membentuk mindset positif." },
                            { icon: <HeartHandshake size={28} />, title: "Relationship", desc: "Edukasi pra-nikah, cinta karena Allah, dan pergaulan yang sehat." },
                            { icon: <BookOpen size={28} />, title: "Stories", desc: "Kisah nyata nan inspiratif dari perjalanan hijrah dan kehidupan pemuda Muslim." }
                        ].map((pillar, idx) => (
                            <div key={idx} className="bg-sand/30 p-8 rounded-[2rem] border border-tealJofisah/5 hover:shadow-premium hover:-translate-y-2 transition-all duration-300 group text-center md:text-left cursor-default">
                                <div className="mb-6 bg-white w-14 h-14 rounded-2xl flex items-center justify-center text-tealJofisah mx-auto md:mx-0 group-hover:bg-tealJofisah group-hover:text-white transition-colors group-hover:scale-105 shadow-sm border border-gray-100">
                                    {pillar.icon}
                                </div>
                                <h3 className="text-lg font-outfit font-bold text-tealJofisah mb-3">{pillar.title}</h3>
                                <p className="text-gray-600 text-sm leading-relaxed font-outfit">{pillar.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. INSTAGRAM PREVIEW */}
            <section id="content" className="py-20 md:py-28 bg-sand/30">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h2 className="text-3xl font-display font-bold text-gray-900">Sapaan Harian Jofisah</h2>
                            <p className="text-gray-555 mt-2 text-sm md:text-base font-outfit">Cuplikan konten yang relate dengan keseharianmu</p>
                        </div>
                        <a href="https://instagram.com/jofisah.id" target="_blank" rel="noreferrer" className="text-tealJofisah font-outfit font-bold hover:underline hidden md:flex items-center gap-2">
                            Lihat di Instagram <ArrowRight size={18} />
                        </a>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                        {[1, 2, 3, 4, 5, 6].map((item) => (
                            <div key={item} className="aspect-square bg-white rounded-3xl overflow-hidden group relative cursor-pointer border border-white/20 shadow-sm">
                                <div className="absolute inset-0 bg-gradient-to-tr from-tealJofisah/5 to-white flex items-center justify-center text-tealJofisah/50 font-outfit font-bold text-xs p-6 text-center">
                                    [Konten Jofisah {item}]
                                </div>
                                <div className="absolute inset-0 bg-tealJofisah/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                                    <div className="text-white font-outfit font-bold flex items-center gap-2 scale-75 group-hover:scale-100 transition-transform">
                                        <Heart size={20} className="fill-white" />
                                        <span className="text-base">2.5K</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 6. CALL TO ACTION FINAL */}
            <section className="py-24 bg-tealJofisah text-white text-center relative overflow-hidden">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 leading-tight">
                        Mulai Perjalanan Self-Growth Kamu Hari Ini
                    </h2>
                    <p className="text-emerald-soft/90 text-base md:text-lg mb-10 leading-relaxed max-w-2xl mx-auto font-outfit font-medium">
                        Jangan berjalan sendirian. Bergabunglah dengan ratusan ribu saudara & saudari lainnya yang sedang berproses menjadi lebih baik setiap harinya.
                    </p>
                    <a 
                        href="https://instagram.com/jofisah.id" 
                        target="_blank" 
                        rel="noreferrer" 
                        className="inline-flex items-center justify-center gap-4 bg-white text-tealJofisah font-outfit font-bold px-10 py-5 rounded-2xl hover:scale-105 transition-transform shadow-premium w-full sm:w-auto text-lg"
                    >
                        <img src={igIcon} alt="IG" className="w-6 h-6" />
                        <span>Follow @jofisah.id</span>
                    </a>
                </div>
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-80 h-80 bg-white/10 rounded-full blur-[80px]"></div>
                <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-80 h-80 bg-gold/10 rounded-full blur-[80px]"></div>
            </section>
        </div>
    );
};

export default Jofisah;