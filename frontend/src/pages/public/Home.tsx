import React from 'react';

const Home: React.FC = () => {
    return (
        <div className="font-sans text-gray-800 bg-white selection:bg-khazanah-light selection:text-khazanah-dark">

            {/* HERO SECTION */}
            <section className="min-h-[100dvh] md:min-h-screen flex items-center justify-center bg-gradient-to-br from-khazanah-light via-white to-gray-50 pt-32 pb-16 md:pt-20 md:pb-20">
                <div className="text-center max-w-4xl px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
                        Bangun Generasi Muslim yang <span className="text-khazanah-gold">Bertumbuh Bersama</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto px-2">
                        Platform komunitas digital dengan 6.9+ juta audience yang fokus pada edukasi, self-growth, dan ukhuwah Islamiyah.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4 px-4 sm:px-0">
                        <button className="w-full sm:w-auto bg-khazanah-green hover:bg-khazanah-dark text-white font-bold px-8 py-4 rounded-xl transition shadow-lg shadow-khazanah-green/30">
                            Gabung Sekarang
                        </button>
                        <button className="w-full sm:w-auto border-2 border-khazanah-gold text-khazanah-gold hover:bg-amber-50 font-bold px-8 py-4 rounded-xl transition">
                            Lihat Program
                        </button>
                    </div>
                </div>
            </section>

            {/* SOCIAL PROOF (STATISTIK) */}
            <section className="py-12 md:py-16 bg-white relative z-10 -mt-12 md:-mt-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-5xl mx-auto bg-white shadow-xl shadow-gray-100/50 rounded-2xl py-8 md:py-10 border border-gray-100">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-4 md:gap-8 text-center md:divide-x divide-gray-100">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-khazanah-green mb-1">6.9M+</h2>
                            <p className="text-gray-500 font-medium text-xs md:text-sm uppercase tracking-wide">Followers</p>
                        </div>
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-khazanah-green mb-1">15M+</h2>
                            <p className="text-gray-500 font-medium text-xs md:text-sm uppercase tracking-wide">Impressions</p>
                        </div>
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-khazanah-green mb-1">6000+</h2>
                            <p className="text-gray-500 font-medium text-xs md:text-sm uppercase tracking-wide">Members</p>
                        </div>
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-khazanah-green mb-1">20+</h2>
                            <p className="text-gray-500 font-medium text-xs md:text-sm uppercase tracking-wide">Leaders</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ABOUT SINGKAT */}
            <section className="py-16 md:py-24 bg-khazanah-light">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-10 md:gap-12 items-center">
                        <div className="bg-khazanah-green h-56 sm:h-64 md:h-80 rounded-2xl shadow-lg flex items-center justify-center text-white/50 order-2 md:order-1">
                            [Image / Video Placeholder]
                        </div>
                        <div className="order-1 md:order-2 text-center md:text-left">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">Lebih dari sekadar media, ini adalah keluarga.</h2>
                            <p className="text-gray-600 leading-relaxed mb-6">
                                Khazanah Alwahda Kreatif hadir sejak 2021 sebagai wadah dakwah digital yang edukatif & interaktif. Kami menyebarkan spirit persatuan (unity) dan keberagaman dalam Islam khusus untuk generasi muda Muslim Indonesia.
                            </p>
                            <ul className="space-y-3 text-gray-700 font-medium text-left inline-block md:block">
                                <li className="flex items-center gap-3">
                                    <span className="text-khazanah-gold text-lg">✓</span> Kolaborasi & Edukasi Islam modern
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="text-khazanah-gold text-lg">✓</span> Komunitas yang inklusif & suportif
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="text-khazanah-gold text-lg">✓</span> Ratusan program pengembangan diri
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* CONTENT PILLARS */}
            <section className="py-16 md:py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900">Pilar Konten Kami</h2>
                        <p className="text-gray-600 mt-4">Fokus pembahasan untuk menunjang pertumbuhanmu</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="p-8 rounded-2xl bg-rose-50 border border-rose-100 hover:-translate-y-1 transition duration-300 text-center md:text-left">
                            <div className="text-rose-500 text-4xl mb-4">🌸</div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">Women</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">Beauty, mental health, fashion & empowerment.</p>
                        </div>
                        <div className="p-8 rounded-2xl bg-blue-50 border border-blue-100 hover:-translate-y-1 transition duration-300 text-center md:text-left">
                            <div className="text-blue-500 text-4xl mb-4">📚</div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">Education</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">Dakwah, Quran study, daily verses, language.</p>
                        </div>
                        <div className="p-8 rounded-2xl bg-amber-50 border border-amber-100 hover:-translate-y-1 transition duration-300 text-center md:text-left">
                            <div className="text-khazanah-gold text-4xl mb-4">🤝</div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">Relationship</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">Pre-marriage education, tips hubungan halal.</p>
                        </div>
                        <div className="p-8 rounded-2xl bg-khazanah-light border border-khazanah-light hover:-translate-y-1 transition duration-300 text-center md:text-left">
                            <div className="text-khazanah-green text-4xl mb-4">🎬</div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">Entertainment</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">Film, komik, musik Islami, sports & series.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* HIGHLIGHT PROGRAM */}
            <section id="program" className="py-16 md:py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-10 text-center md:text-left gap-4">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900">Program Unggulan</h2>
                            <p className="text-gray-600 mt-2">Ikuti kelas dan kajian rutin kami</p>
                        </div>
                        <a href="/program" className="text-khazanah-gold font-medium hover:underline flex items-center gap-1">
                            Lihat Semua <span className="md:hidden">Program</span> &rarr;
                        </a>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3].map((item) => (
                            <div key={item} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col">
                                <div className="h-48 bg-gray-200"></div>
                                <div className="p-6 flex flex-col flex-grow">
                                    <div className="text-xs font-bold text-khazanah-gold mb-2 uppercase tracking-wider">Kajian Rutin</div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">Kajian Muslimah: Self Love dalam Islam</h3>
                                    <p className="text-gray-600 text-sm mb-6 line-clamp-3">Belajar bagaimana mencintai diri sendiri sesuai dengan syariat dan tuntunan Rasulullah di era digital saat ini.</p>
                                    <button className="mt-auto w-full bg-khazanah-green text-white py-3 rounded-xl font-medium hover:bg-khazanah-dark transition">
                                        Daftar Sekarang
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* COMMUNITY ECOSYSTEM (HERO IP) */}
            <section id="komunitas" className="py-16 md:py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900">Ekosistem Khazanah</h2>
                        <p className="text-gray-600 mt-4">Kunjungi media partner dan sister-brands kami</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="p-8 border border-gray-100 rounded-2xl shadow-sm text-center hover:shadow-md transition">
                            <div className="w-20 h-20 bg-pink-100 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl">🧕</div>
                            <h3 className="text-xl font-bold text-gray-900">@sholehahstory</h3>
                            <p className="text-khazanah-gold font-bold text-sm mb-3">914K Followers</p>
                            <p className="text-gray-600 text-sm">Muslim women empowerment & sisterhood community.</p>
                        </div>
                        <div className="p-8 border border-gray-100 rounded-2xl shadow-sm text-center hover:shadow-md transition">
                            <div className="w-20 h-20 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl">✨</div>
                            <h3 className="text-xl font-bold text-gray-900">@jofisah.id</h3>
                            <p className="text-khazanah-gold font-bold text-sm mb-3">325K Followers</p>
                            <p className="text-gray-600 text-sm">Faith, self growth, dan relationship stories.</p>
                        </div>
                        <div className="p-8 border border-gray-100 rounded-2xl shadow-sm text-center hover:shadow-md transition">
                            <div className="w-20 h-20 bg-khazanah-light rounded-full mx-auto mb-4 flex items-center justify-center text-3xl">📰</div>
                            <h3 className="text-xl font-bold text-gray-900">@khazanahnetwork</h3>
                            <p className="text-khazanah-gold font-bold text-sm mb-3">302K Followers</p>
                            <p className="text-gray-600 text-sm">News, Islamic wisdom, and faith in action.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CALL TO ACTION (JOIN) */}
            <section className="py-16 md:py-24 bg-khazanah-green text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white opacity-5 rounded-full blur-2xl"></div>
                <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-white opacity-5 rounded-full blur-2xl"></div>
                <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 px-2">
                        Jadilah bagian dari komunitas ini sekarang
                    </h2>
                    <p className="text-khazanah-light text-lg md:text-xl mb-10 px-4">
                        Belajar, bertumbuh, dan berkontribusi bersama ribuan pemuda Muslim lainnya di seluruh Indonesia.
                    </p>
                    <button className="w-full sm:w-auto bg-white text-khazanah-green font-bold px-10 py-4 rounded-xl text-lg hover:bg-gray-50 transition shadow-lg">
                        Daftar Sekarang
                    </button>
                </div>
            </section>
        </div>
    );
};

export default Home;