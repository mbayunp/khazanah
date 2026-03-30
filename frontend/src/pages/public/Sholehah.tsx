import React from 'react';
// Import logo Sholehah dari folder assets
import logoSholehah from '../../assets/sholehah.png';

const Sholehah: React.FC = () => {
    return (
        <div className="font-sans text-stone-800 bg-white selection:bg-pink-200 selection:text-stone-900">

            {/* 1. HERO SECTION (EMOTIONAL HOOK) */}
            <section className="min-h-[90vh] flex items-center bg-gradient-to-br from-pink-50 via-rose-50/50 to-white pt-20 pb-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                    <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
                        <div className="order-2 md:order-1">
                            <div className="inline-block bg-white border border-pink-200 text-pink-600 font-semibold px-4 py-1.5 rounded-full text-sm mb-6 flex items-center gap-2 w-max shadow-sm">
                                <span>🌸</span> Ruang Aman Muslimah
                            </div>

                            {/* Menampilkan Logo Sholehah */}
                            <img
                                src={logoSholehah}
                                alt="Logo Sholehah Story"
                                className="w-56 md:w-72 mb-4 drop-shadow-sm -ml-2"
                            />

                            <h2 className="text-2xl md:text-3xl font-bold text-stone-800 mb-4 leading-snug mt-2">
                                Menjadi Muslimah yang Kuat, <span className="text-pink-500">Lembut, dan Bermakna</span>
                            </h2>
                            <p className="text-lg text-stone-600 mb-8 leading-relaxed max-w-lg">
                                Sholehah hadir sebagai ruang aman bagi Muslimah untuk bertumbuh dalam iman, kehidupan, dan kebahagiaan. Ruang bertumbuh untuk kamu yang ingin lebih baik setiap harinya.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <a href="https://instagram.com/sholehahstory" target="_blank" rel="noreferrer" className="bg-pink-400 hover:bg-pink-500 text-white font-semibold px-8 py-4 rounded-xl transition duration-300 shadow-lg shadow-pink-400/30 text-center flex items-center justify-center gap-2">
                                    <span>📱</span> Follow Sekarang
                                </a>
                                <a href="#sisterhood" className="bg-white border-2 border-pink-200 text-pink-500 hover:bg-pink-50 font-semibold px-8 py-4 rounded-xl transition duration-300 text-center">
                                    Temukan Sisterhood
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
                                    <div className="bg-rose-50 rounded-xl flex items-center justify-center text-rose-300 font-medium">Visual Feminin</div>
                                    <div className="bg-pink-50 rounded-xl flex items-center justify-center text-pink-300 font-medium">Quotes Harian</div>
                                    <div className="bg-stone-50 rounded-xl flex items-center justify-center text-stone-300 font-medium">Daily Routine</div>
                                    <div className="bg-rose-100/50 rounded-xl flex items-center justify-center text-rose-300 font-medium">Self Care Tips</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. ABOUT SHOLEHAH */}
            <section className="py-24 bg-white text-center">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <span className="text-pink-400 text-4xl mb-6 block">✨</span>
                    <h2 className="text-3xl font-bold text-stone-800 mb-6">Membangun Kepercayaan Diri Muslimah</h2>
                    <p className="text-xl text-stone-600 leading-relaxed">
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
                            { icon: "💖", title: "Inner Beauty", desc: "Memperbaiki hati, keikhlasan, dan akhlak untuk memancarkan kecantikan sejati." },
                            { icon: "🧕", title: "Muslimah Lifestyle", desc: "Inspirasi fashion syar'i, daily routine produktif, dan self-care yang halal." },
                            { icon: "🤝", title: "Relationship", desc: "Menjaga keharmonisan pernikahan, keluarga, dan pergaulan yang membawa berkah." },
                            { icon: "🌱", title: "Mental & Emotion", desc: "Ruang untuk healing, memaafkan, self-love, dan menata emosi agar lebih stabil." }
                        ].map((pillar, idx) => (
                            <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-pink-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                                <div className="text-4xl mb-6 bg-pink-50 w-16 h-16 rounded-xl flex items-center justify-center">{pillar.icon}</div>
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
                        <a href="#" className="text-pink-500 font-semibold hover:underline hidden md:block">Lihat di Instagram &rarr;</a>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                        {[1, 2, 3, 4, 5, 6].map((item) => (
                            <div key={item} className="aspect-square bg-pink-50 rounded-2xl overflow-hidden group relative cursor-pointer border border-pink-100">
                                {/* Placeholder for Aesthetic Image */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-pink-100/50 to-white flex items-center justify-center text-pink-300/80 font-medium">
                                    [Konten Estetik {item}]
                                </div>
                                {/* Hover Overlay */}
                                <div className="absolute inset-0 bg-stone-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <span className="text-white font-medium flex items-center gap-2">
                                        <span>💖</span> 5.2K
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. SISTERHOOD COMMUNITY (UNIQUE TO SHOLEHAH) */}
            <section id="sisterhood" className="py-24 bg-pink-100/60">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="text-5xl mb-6">👭</div>
                    <h2 className="text-3xl md:text-4xl font-bold text-pink-500 mb-6">
                        Sisterhood Community: Kamu Tidak Sendiri
                    </h2>
                    <p className="text-xl text-stone-700 leading-relaxed mb-10 max-w-2xl mx-auto">
                        Di Sholehah, kamu akan menemukan teman seperjalanan yang saling menguatkan dalam kebaikan. Sebuah support system tanpa penghakiman, ruang untuk berbagi rasa, tawa, dan air mata.
                    </p>
                    <button className="bg-white text-pink-500 font-bold px-8 py-4 rounded-xl shadow-sm hover:shadow-md transition duration-300">
                        Kenalan dengan Komunitas Kami
                    </button>
                </div>
            </section>

            {/* 6. IMPACT / TRUST */}
            <section className="py-20 bg-pink-400 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="grid md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-pink-300">
                        <div className="pt-6 md:pt-0">
                            <h2 className="text-4xl md:text-5xl font-extrabold mb-2">914K+</h2>
                            <p className="text-pink-100 text-lg">Muslimah Terinspirasi</p>
                        </div>
                        <div className="pt-6 md:pt-0">
                            <h2 className="text-4xl md:text-5xl font-extrabold mb-2">Aktif</h2>
                            <p className="text-pink-100 text-lg">Sisterhood Network</p>
                        </div>
                        <div className="pt-6 md:pt-0">
                            <h2 className="text-4xl md:text-5xl font-extrabold mb-2">Aman</h2>
                            <p className="text-pink-100 text-lg">Safe Space Sharing</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 7. CALL TO ACTION */}
            <section className="py-24 bg-rose-50 text-center">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 text-stone-800">
                        Yuk Bertumbuh Bersama
                    </h2>
                    <p className="text-stone-600 text-lg mb-10">
                        Mulai perjalanan menjadi Muslimah terbaik versi dirimu hari ini. Kami menunggu kehadiranmu di dalam lingkaran kebaikan ini.
                    </p>
                    <button className="bg-pink-400 text-white font-bold px-10 py-4 rounded-xl text-lg hover:bg-pink-500 transition shadow-lg shadow-pink-400/20">
                        Follow @sholehahstory Sekarang
                    </button>
                </div>
            </section>

        </div>
    );
};

export default Sholehah;