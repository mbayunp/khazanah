import React from 'react';
// Import logo Jofisah dari folder assets
import logoJofisah from '../../assets/jofisah.png';

const Jofisah: React.FC = () => {
    return (
        <div className="font-sans text-gray-800 bg-white selection:bg-teal-200 selection:text-teal-900">
            {/* 1. HERO SECTION */}
            <section className="min-h-[90vh] flex items-center bg-gradient-to-br from-teal-50 via-teal-100/30 to-white pt-20 pb-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                    <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
                        <div className="order-2 md:order-1">
                            <div className="inline-block bg-teal-100 text-teal-700 font-semibold px-4 py-1.5 rounded-full text-sm mb-6 shadow-sm border border-teal-200/50">
                                ✨ Ruang Tumbuh Muslimah
                            </div>

                            {/* Menampilkan Logo Jofisah */}
                            <img
                                src={logoJofisah}
                                alt="Logo Jofisah"
                                className="w-32 md:w-40 mb-6 rounded-full shadow-lg shadow-teal-500/20"
                            />

                            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 leading-snug">
                                Tempat Bertumbuh Menjadi <span className="text-orange-500">Versi Terbaik Dirimu</span>
                            </h2>
                            <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-lg">
                                Jofisah hadir untuk menemani perjalanan iman, self-growth, dan kehidupan yang lebih mindful. Mari merawat hati dan pikiran bersama.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <a href="https://instagram.com/jofisah.id" target="_blank" rel="noreferrer" className="bg-teal-500 hover:bg-teal-600 text-white font-semibold px-8 py-4 rounded-xl transition duration-300 shadow-lg shadow-teal-500/30 text-center flex items-center justify-center gap-2">
                                    <span>📱</span> Follow Sekarang
                                </a>
                                <a href="#content" className="bg-white border-2 border-teal-200 text-teal-600 hover:bg-teal-50 font-semibold px-8 py-4 rounded-xl transition duration-300 text-center">
                                    Jelajahi Konten
                                </a>
                            </div>
                        </div>

                        {/* Mockup Image / IG Feed Preview */}
                        <div className="order-1 md:order-2 relative">
                            <div className="absolute inset-0 bg-teal-300 rounded-3xl blur-3xl opacity-30 transform translate-x-4 translate-y-4"></div>
                            <div className="bg-white p-4 rounded-3xl shadow-2xl relative z-10 border border-teal-50 h-[500px] flex flex-col">
                                {/* Fake IG Header */}
                                <div className="flex items-center gap-3 mb-4 border-b border-gray-100 pb-4">
                                    <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center text-xl overflow-hidden">
                                        <img src={logoJofisah} alt="icon" className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <div className="font-bold text-gray-900">jofisah.id</div>
                                        <div className="text-xs text-gray-500">Faith & Self Growth</div>
                                    </div>
                                </div>
                                {/* Fake IG Grid */}
                                <div className="grid grid-cols-2 gap-2 flex-grow">
                                    <div className="bg-teal-50 rounded-xl"></div>
                                    <div className="bg-orange-50 rounded-xl"></div>
                                    <div className="bg-gray-50 rounded-xl"></div>
                                    <div className="bg-teal-100/50 rounded-xl"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. ABOUT JOFISAH */}
            <section className="py-24 bg-white text-center">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <span className="text-teal-500 text-4xl mb-6 block">🌿</span>
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Merawat Iman, Menata Hati</h2>
                    <p className="text-xl text-gray-600 leading-relaxed">
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
                            { icon: "🕋", title: "Faith", desc: "Memperkuat hubungan dengan Allah melalui ibadah dan reminder harian." },
                            { icon: "🌱", title: "Self Growth", desc: "Pengembangan diri, menjaga kesehatan mental, dan membentuk mindset positif." },
                            { icon: "💍", title: "Relationship", desc: "Edukasi pra-nikah, cinta karena Allah, dan pergaulan yang sehat." },
                            { icon: "📖", title: "Community Stories", desc: "Kisah nyata nan inspiratif dari perjalanan hijrah dan kehidupan Muslimah." }
                        ].map((pillar, idx) => (
                            <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-teal-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                                <div className="text-4xl mb-6 bg-teal-50 w-16 h-16 rounded-xl flex items-center justify-center">{pillar.icon}</div>
                                <h3 className="text-xl font-bold text-teal-600 mb-3">{pillar.title}</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">{pillar.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. HIGHLIGHT CONTENT (FEED STYLE) */}
            <section id="content" className="py-24 bg-white">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-end mb-10">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900">Sapaan Harian Jofisah</h2>
                            <p className="text-gray-600 mt-2">Cuplikan konten yang relate dengan keseharianmu</p>
                        </div>
                        <a href="#" className="text-teal-600 font-semibold hover:underline hidden md:block">Lihat di Instagram &rarr;</a>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                        {[1, 2, 3, 4, 5, 6].map((item) => (
                            <div key={item} className="aspect-square bg-gray-100 rounded-2xl overflow-hidden group relative cursor-pointer border border-gray-100">
                                {/* Placeholder for IG Image */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-teal-50 to-white flex items-center justify-center text-teal-300/60 font-medium">
                                    [Konten {item}]
                                </div>
                                {/* Hover Overlay */}
                                <div className="absolute inset-0 bg-teal-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <span className="text-white font-medium flex items-center gap-2">
                                        <span>❤️</span> 2.5K
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. AUDIENCE IMPACT */}
            <section className="py-20 bg-teal-500 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <p className="text-teal-100 font-medium mb-4 uppercase tracking-wider text-sm">Bertumbuh Bersama</p>
                    <div className="grid md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-teal-400">
                        <div className="pt-6 md:pt-0">
                            <h2 className="text-4xl md:text-5xl font-extrabold mb-2">325K+</h2>
                            <p className="text-teal-50 text-lg">Followers Aktif</p>
                        </div>
                        <div className="pt-6 md:pt-0">
                            <h2 className="text-4xl md:text-5xl font-extrabold mb-2">High</h2>
                            <p className="text-teal-50 text-lg">Engagement Rate</p>
                        </div>
                        <div className="pt-6 md:pt-0">
                            <h2 className="text-4xl md:text-5xl font-extrabold mb-2">1000+</h2>
                            <p className="text-teal-50 text-lg">Kisah Terbagikan</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. CALL TO ACTION */}
            <section className="py-24 bg-teal-50 text-center">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 text-teal-800">
                        Mulai Perjalanan Self-Growth Kamu Hari Ini
                    </h2>
                    <p className="text-gray-600 text-lg mb-10">
                        Jangan berjalan sendirian. Bergabunglah dengan ratusan ribu saudari lainnya yang sedang berproses menjadi lebih baik setiap harinya.
                    </p>
                    <button className="bg-teal-500 text-white font-bold px-10 py-4 rounded-xl text-lg hover:bg-teal-600 transition shadow-lg shadow-teal-500/20">
                        Follow @jofisah.id di Instagram
                    </button>
                </div>
            </section>
        </div>
    );
};

export default Jofisah;