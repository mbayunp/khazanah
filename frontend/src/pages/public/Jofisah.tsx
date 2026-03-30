import React from 'react';
import { 
    Sparkles, 
    Leaf, 
    Compass, 
    Heart, 
    HeartHandshake, 
    BookOpen, 
    ArrowRight, 
    Users
} from 'lucide-react';
// Import Aset Gambar
import logoJofisah from '../../assets/jofisah.png';
import igIcon from '../../assets/ig.png';

const Jofisah: React.FC = () => {
    return (
        <div className="font-sans text-gray-800 bg-white selection:bg-teal-200 selection:text-teal-900">
            
            {/* 1. HERO SECTION */}
            <section className="min-h-[90vh] flex items-center bg-gradient-to-br from-teal-50 via-teal-100/30 to-white pt-24 pb-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                    <div className="flex flex-col md:grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
                        
                        <div className="text-center md:text-left">
                            <div className="inline-flex items-center gap-2 bg-white border border-teal-200 text-teal-700 font-semibold px-4 py-1.5 rounded-full text-sm mb-6 shadow-sm mx-auto md:mx-0">
                                <Sparkles size={16} className="text-teal-500" />
                                <span>Ruang Tumbuh Muslimah</span>
                            </div>

                            <img
                                src={logoJofisah}
                                alt="Logo Jofisah"
                                className="w-32 md:w-40 mb-6 rounded-full shadow-lg shadow-teal-500/20 mx-auto md:mx-0"
                            />

                            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                                Tempat Bertumbuh Menjadi <span className="text-orange-500">Versi Terbaik Dirimu</span>
                            </h2>
                            <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-lg mx-auto md:mx-0 font-medium">
                                Jofisah hadir untuk menemani perjalanan iman, self-growth, dan kehidupan yang lebih mindful. Mari merawat hati dan pikiran bersama.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                                <a href="https://instagram.com/jofisah.id" target="_blank" rel="noreferrer" className="bg-teal-500 hover:bg-teal-600 text-white font-bold px-8 py-4 rounded-xl transition duration-300 shadow-lg shadow-teal-500/30 text-center flex items-center justify-center gap-3">
                                    <img src={igIcon} alt="Instagram" className="w-10 h-10" />
                                    <span>Follow Sekarang</span>
                                </a>
                                <a href="#content" className="bg-white border-2 border-teal-200 text-teal-600 hover:bg-teal-50 font-bold px-8 py-4 rounded-xl transition duration-300 text-center flex items-center justify-center gap-2 group">
                                    <span>Jelajahi Konten</span>
                                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </a>
                            </div>
                        </div>

                        {/* Kolom Image (Mockup) - Sekarang Muncul Di Bawah pada Mobile */}
                        <div className="relative w-full max-w-[450px] mx-auto md:max-w-none">
                            <div className="absolute inset-0 bg-teal-300 rounded-3xl blur-3xl opacity-30 transform translate-x-4 translate-y-4"></div>
                            <div className="bg-white p-4 rounded-3xl shadow-2xl relative z-10 border border-teal-50 h-[450px] md:h-[500px] flex flex-col">
                                <div className="flex items-center gap-3 mb-4 border-b border-gray-100 pb-4">
                                    <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center text-xl overflow-hidden border border-teal-200/30">
                                        <img src={logoJofisah} alt="icon" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="text-left">
                                        <div className="font-bold text-gray-900">jofisah.id</div>
                                        <div className="text-xs text-gray-500">Faith & Self Growth</div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-2 flex-grow text-center">
                                    <div className="bg-teal-50 rounded-xl flex items-center justify-center text-teal-200 font-bold italic text-[10px] md:text-xs p-2">Self Reflection</div>
                                    <div className="bg-orange-50 rounded-xl flex items-center justify-center text-orange-200 font-bold italic text-[10px] md:text-xs p-2">Daily Reminder</div>
                                    <div className="bg-gray-50 rounded-xl flex items-center justify-center text-gray-200 font-bold italic text-[10px] md:text-xs p-2">Mindfulness</div>
                                    <div className="bg-teal-100/50 rounded-xl flex items-center justify-center text-teal-300 font-bold italic text-[10px] md:text-xs p-2">Spiritual Growth</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. ABOUT JOFISAH */}
            <section className="py-24 bg-white text-center">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-center mb-6">
                        <div className="p-4 bg-teal-50 rounded-2xl text-teal-500">
                            <Leaf size={40} />
                        </div>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Merawat Iman, Menata Hati</h2>
                    <p className="text-xl text-gray-600 leading-relaxed font-medium">
                        Jofisah adalah platform konten yang membantu Muslim muda untuk bertumbuh secara spiritual dan emosional melalui konten yang ringan, relatable, dan bermakna. Kami percaya bahwa setiap proses menuju baik layak untuk dirayakan.
                    </p>
                </div>
            </section>

            {/* 3. CONTENT PILLARS */}
            <section className="py-20 bg-teal-50/40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900">Fokus Pembahasan Kami</h2>
                        <p className="text-gray-600 mt-4">Pilar utama perjalanan self-growth di Jofisah</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { icon: <Compass size={32} />, title: "Faith", desc: "Memperkuat hubungan dengan Allah melalui ibadah dan reminder harian." },
                            { icon: <Leaf size={32} />, title: "Self Growth", desc: "Pengembangan diri, menjaga kesehatan mental, dan membentuk mindset positif." },
                            { icon: <HeartHandshake size={32} />, title: "Relationship", desc: "Edukasi pra-nikah, cinta karena Allah, dan pergaulan yang sehat." },
                            { icon: <BookOpen size={32} />, title: "Stories", desc: "Kisah nyata nan inspiratif dari perjalanan hijrah dan kehidupan Muslimah." }
                        ].map((pillar, idx) => (
                            <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-teal-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300 group text-center md:text-left">
                                <div className="mb-6 bg-teal-50 w-16 h-16 rounded-xl flex items-center justify-center text-teal-500 mx-auto md:mx-0 group-hover:bg-teal-500 group-hover:text-white transition-colors">
                                    {pillar.icon}
                                </div>
                                <h3 className="text-xl font-bold text-teal-600 mb-3">{pillar.title}</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">{pillar.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. HIGHLIGHT CONTENT */}
            <section id="content" className="py-24 bg-white">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-end mb-10">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900">Sapaan Harian Jofisah</h2>
                            <p className="text-gray-600 mt-2">Cuplikan konten yang relate dengan keseharianmu</p>
                        </div>
                        <a href="https://instagram.com/jofisah.id" target="_blank" rel="noreferrer" className="text-teal-600 font-bold hover:underline hidden md:flex items-center gap-2">
                            Lihat di Instagram <ArrowRight size={18} />
                        </a>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                        {[1, 2, 3, 4, 5, 6].map((item) => (
                            <div key={item} className="aspect-square bg-gray-100 rounded-2xl overflow-hidden group relative cursor-pointer border border-gray-100">
                                <div className="absolute inset-0 bg-gradient-to-tr from-teal-50 to-white flex items-center justify-center text-teal-300/60 font-bold text-[10px] md:text-xs p-4 text-center">
                                    [Konten Jofisah {item}]
                                </div>
                                <div className="absolute inset-0 bg-teal-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <div className="text-white font-bold flex items-center gap-2">
                                        <Heart size={20} className="fill-white" />
                                        <span>2.5K</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. CALL TO ACTION FINAL */}
            <section className="py-24 bg-teal-50 text-center relative overflow-hidden">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 text-teal-800 leading-tight">
                        Mulai Perjalanan Self-Growth Kamu Hari Ini
                    </h2>
                    <p className="text-gray-600 text-lg mb-10 leading-relaxed max-w-2xl mx-auto font-medium">
                        Jangan berjalan sendirian. Bergabunglah dengan ratusan ribu saudari lainnya yang sedang berproses menjadi lebih baik setiap harinya.
                    </p>
                    <a 
                        href="https://instagram.com/jofisah.id" 
                        target="_blank" 
                        rel="noreferrer" 
                        className="inline-flex items-center gap-4 bg-teal-500 text-white font-bold px-10 py-5 rounded-2xl text-xl hover:bg-teal-600 transition shadow-2xl shadow-teal-500/30"
                    >
                        <img src={igIcon} alt="IG" className="w-10 h-10" />
                        <span>Follow @jofisah.id di Instagram</span>
                    </a>
                </div>
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-teal-200/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-64 h-64 bg-orange-100/30 rounded-full blur-3xl"></div>
            </section>
        </div>
    );
};

export default Jofisah;