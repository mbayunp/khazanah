import React from 'react';
import { 
    Heart, 
    Users, 
    Leaf, 
    Sparkles, 
    Smartphone, 
    ArrowRight,
    Flower2,
} from 'lucide-react';
// Import Aset Gambar
import logoSholehah from '../../assets/sholehah.png';
import igIcon from '../../assets/ig.png';

const Sholehah: React.FC = () => {
    return (
        <div className="font-sans text-stone-800 bg-white selection:bg-pink-200 selection:text-stone-900">

            {/* 1. HERO SECTION (EMOTIONAL HOOK) */}
            <section className="min-h-[90vh] flex items-center bg-gradient-to-br from-pink-50 via-rose-50/50 to-white pt-20 pb-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                    <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
                        <div className="order-2 md:order-1 text-center md:text-left">
                            <div className="inline-flex items-center gap-2 bg-white border border-pink-200 text-pink-600 font-semibold px-4 py-1.5 rounded-full text-sm mb-6 shadow-sm mx-auto md:mx-0">
                                <Flower2 size={16} className="text-pink-400" />
                                <span>Ruang Aman Muslimah</span>
                            </div>

                            {/* Menampilkan Logo Sholehah */}
                            <img
                                src={logoSholehah}
                                alt="Logo Sholehah Story"
                                className="w-56 md:w-72 mb-4 drop-shadow-sm mx-auto md:ml-[-8px]"
                            />

                            <h2 className="text-2xl md:text-3xl font-bold text-stone-800 mb-4 leading-snug mt-2">
                                Menjadi Muslimah yang Kuat, <span className="text-pink-500">Lembut, dan Bermakna</span>
                            </h2>
                            <p className="text-lg text-stone-600 mb-8 leading-relaxed max-w-lg mx-auto md:mx-0">
                                Sholehah hadir sebagai ruang aman bagi Muslimah untuk bertumbuh dalam iman, kehidupan, dan kebahagiaan. Ruang bertumbuh untuk kamu yang ingin lebih baik setiap harinya.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                                <a href="https://instagram.com/sholehahstory" target="_blank" rel="noreferrer" className="bg-pink-400 hover:bg-pink-500 text-white font-bold px-8 py-4 rounded-xl transition duration-300 shadow-lg shadow-pink-400/30 text-center flex items-center justify-center gap-3">
                                <img 
                                        src={igIcon} 
                                        alt="Instagram Icon" 
                                        className="w-6 h-6 object-contain" 
                                    />
                                    <span>Follow Sekarang</span>
                                </a>
                                <a href="#sisterhood" className="bg-white border-2 border-pink-200 text-pink-500 hover:bg-pink-50 font-bold px-8 py-4 rounded-xl transition duration-300 text-center flex items-center justify-center gap-2 group">
                                    <span>Temukan Sisterhood</span>
                                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </a>
                            </div>
                        </div>

                        {/* Mockup Image / IG Feed Preview */}
                        <div className="order-1 md:order-2 relative">
                            <div className="absolute inset-0 bg-pink-200 rounded-3xl blur-3xl opacity-50 transform translate-x-4 translate-y-4"></div>
                            <div className="bg-white p-4 rounded-3xl shadow-2xl relative z-10 border border-pink-50 h-[500px] flex flex-col">
                                {/* Fake IG Header */}
                                <div className="flex items-center gap-3 mb-4 border-b border-gray-100 pb-4">
                                    <div className="w-12 h-12 bg-pink-50 rounded-full flex items-center justify-center overflow-hidden border border-pink-100 p-1.5">
                                        <img src={logoSholehah} alt="icon" className="w-full h-full object-contain" />
                                    </div>
                                    <div>
                                        <div className="font-bold text-stone-800">sholehahstory</div>
                                        <div className="text-xs text-stone-500">Muslimah Lifestyle & Sisterhood</div>
                                    </div>
                                </div>
                                {/* Fake IG Grid - Soft Tones */}
                                <div className="grid grid-cols-2 gap-2 flex-grow">
                                    <div className="bg-rose-50 rounded-xl flex items-center justify-center text-rose-300 font-medium text-center px-2 text-xs md:text-sm italic">Visual Feminin</div>
                                    <div className="bg-pink-50 rounded-xl flex items-center justify-center text-pink-300 font-medium text-center px-2 text-xs md:text-sm italic">Quotes Harian</div>
                                    <div className="bg-stone-50 rounded-xl flex items-center justify-center text-stone-300 font-medium text-center px-2 text-xs md:text-sm italic">Daily Routine</div>
                                    <div className="bg-rose-100/50 rounded-xl flex items-center justify-center text-rose-300 font-medium text-center px-2 text-xs md:text-sm italic">Self Care Tips</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. ABOUT SHOLEHAH */}
            <section className="py-24 bg-white text-center">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-center mb-6">
                        <div className="p-4 bg-pink-50 rounded-2xl text-pink-400">
                            <Sparkles size={40} />
                        </div>
                    </div>
                    <h2 className="text-3xl font-bold text-stone-800 mb-6">Membangun Kepercayaan Diri Muslimah</h2>
                    <p className="text-xl text-stone-600 leading-relaxed font-medium">
                        Sholehah adalah platform konten Muslimah yang berfokus pada pengembangan diri, kehidupan Islami, dan membangun kepercayaan diri wanita dalam menjalani setiap peran kehidupannya dengan penuh martabat.
                    </p>
                </div>
            </section>

            {/* 3. PILAR KEHIDUPAN MUSLIMAH */}
            <section className="py-20 bg-rose-50/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-stone-800">Nilai yang Kami Bawa</h2>
                        <p className="text-stone-500 mt-4">Pondasi utama untuk menjadi versi terbaik dirimu</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { icon: <Heart size={32} />, title: "Inner Beauty", desc: "Memperbaiki hati, keikhlasan, dan akhlak untuk memancarkan kecantikan sejati." },
                            { icon: <Smartphone size={32} />, title: "Muslimah Lifestyle", desc: "Inspirasi fashion syar'i, daily routine produktif, dan self-care yang halal." },
                            { icon: <Users size={32} />, title: "Relationship", desc: "Menjaga keharmonisan pernikahan, keluarga, dan pergaulan yang membawa berkah." },
                            { icon: <Leaf size={32} />, title: "Mental & Emotion", desc: "Ruang untuk healing, memaafkan, self-love, dan menata emosi agar lebih stabil." }
                        ].map((pillar, idx) => (
                            <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-pink-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300 group text-center md:text-left">
                                <div className="mb-6 bg-pink-50 w-16 h-16 rounded-xl flex items-center justify-center text-pink-400 mx-auto md:mx-0 group-hover:bg-pink-400 group-hover:text-white transition-colors">
                                    {pillar.icon}
                                </div>
                                <h3 className="text-xl font-bold text-pink-500 mb-3">{pillar.title}</h3>
                                <p className="text-stone-600 text-sm leading-relaxed">{pillar.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. CONTENT HIGHLIGHT (FEED MUSLIMAH) */}
            <section className="py-24 bg-white">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-end mb-10">
                        <div>
                            <h2 className="text-3xl font-bold text-stone-800">Jurnal Muslimah</h2>
                            <p className="text-stone-500 mt-2">Dosis inspirasi harian untuk melembutkan hati</p>
                        </div>
                        <a href="https://instagram.com/sholehahstory" target="_blank" rel="noreferrer" className="text-pink-500 font-bold hover:underline hidden md:flex items-center gap-2">
                            Lihat di Instagram <ArrowRight size={18} />
                        </a>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                        {[1, 2, 3, 4, 5, 6].map((item) => (
                            <div key={item} className="aspect-square bg-pink-50 rounded-2xl overflow-hidden group relative cursor-pointer border border-pink-100">
                                <div className="absolute inset-0 bg-gradient-to-tr from-pink-100/50 to-white flex items-center justify-center text-pink-300/80 font-medium p-4 text-center text-xs">
                                    [Konten Estetik {item}]
                                </div>
                                <div className="absolute inset-0 bg-stone-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <div className="text-white font-bold flex items-center gap-2">
                                        <Heart size={20} className="fill-white" /> 
                                        <span>5.2K</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. CALL TO ACTION FINAL */}
            <section className="py-24 bg-rose-50 text-center relative overflow-hidden">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 text-stone-800">
                        Yuk Bertumbuh Bersama
                    </h2>
                    <p className="text-stone-600 text-lg mb-10 leading-relaxed">
                        Mulai perjalanan menjadi Muslimah terbaik versi dirimu hari ini. Kami menunggu kehadiranmu di dalam lingkaran kebaikan ini.
                    </p>
                    <a 
                        href="https://instagram.com/sholehahstory" 
                        target="_blank" 
                        rel="noreferrer" 
                        className="inline-flex items-center gap-4 bg-pink-400 text-white font-bold px-10 py-5 rounded-2xl text-xl hover:bg-pink-500 transition shadow-2xl shadow-pink-400/40"
                    >
                        <img 
                            src={igIcon} 
                            alt="IG" 
                            className="w-8 h-8 object-contain" 
                        />
                        <span>Follow @sholehahstory Sekarang</span>
                    </a>
                </div>
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-pink-200/30 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-64 h-64 bg-pink-300/20 rounded-full blur-3xl"></div>
            </section>

        </div>
    );
};

export default Sholehah;