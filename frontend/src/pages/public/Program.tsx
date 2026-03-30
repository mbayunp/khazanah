import React, { useState } from 'react';

// Mendefinisikan tipe data sesuai dengan struktur Database Anda
interface ProgramType {
    id: number;
    title: string;
    slug: string;
    category: 'Jofisah' | 'Jumanji' | 'Sholehah';
    date: string;
    location: string;
    image: string;
    status: 'active' | 'full';
    isNew?: boolean;
}

const Program: React.FC = () => {
    // State untuk Filter & Pencarian
    const [selectedCategory, setSelectedCategory] = useState<string>("Semua");
    const [searchQuery, setSearchQuery] = useState<string>("");

    const categories = ["Semua", "Jofisah", "Jumanji", "Sholehah"];

    // Mock Data (Nantinya diganti dengan fetching dari GET /api/programs)
    const mockPrograms: ProgramType[] = [
        {
            id: 1,
            title: "Kelas Self Growth Muslimah: Mengelola Rasa Insecure",
            slug: "self-growth-muslimah",
            category: "Jofisah",
            date: "10 Oktober 2026",
            location: "Zoom Online",
            image: "bg-teal-100",
            status: "active",
            isNew: true
        },
        {
            id: 2,
            title: "Kajian Rutin: Sisterhood & Inner Beauty",
            slug: "kajian-rutin-sisterhood",
            category: "Sholehah",
            date: "15 Oktober 2026",
            location: "Markas Khazanah",
            image: "bg-pink-100",
            status: "active"
        },
        {
            id: 3,
            title: "Bootcamp Digital Dakwah & Content Creation",
            slug: "bootcamp-digital-dakwah",
            category: "Jumanji",
            date: "20 Oktober 2026",
            location: "Google Meet",
            image: "bg-blue-100",
            status: "full"
        },
        {
            id: 4,
            title: "Webinar Pra-Nikah: Menjemput Jodoh Impian",
            slug: "webinar-pranikah",
            category: "Jofisah",
            date: "25 Oktober 2026",
            location: "Zoom Online",
            image: "bg-teal-200",
            status: "active"
        }
    ];

    // Logika Filter: Berdasarkan Kategori DAN Kata Kunci Pencarian
    const filteredPrograms = mockPrograms.filter(p => {
        const matchCategory = selectedCategory === "Semua" || p.category === selectedCategory;
        const matchSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
        return matchCategory && matchSearch;
    });

    return (
        <div className="font-sans text-gray-800 bg-white selection:bg-khazanah-light selection:text-khazanah-dark min-h-screen flex flex-col">

            {/* 1. HERO SECTION */}
            <section className="bg-khazanah-light pt-24 pb-20 text-center px-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-5"></div>
                <div className="max-w-3xl mx-auto relative z-10">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-khazanah-dark mb-6">
                        Program & Kegiatan
                    </h1>
                    <p className="text-lg text-gray-600 max-w-xl mx-auto leading-relaxed">
                        Temukan berbagai program yang dirancang untuk membantu kamu bertumbuh dalam iman, ilmu, dan kehidupan yang lebih bermakna.
                    </p>
                </div>
            </section>

            <main className="flex-grow">
                {/* 2. SEARCH & FILTER KATEGORI */}
                <section className="py-8 bg-white sticky top-16 z-30 shadow-sm border-b border-gray-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4">

                            {/* Filter Buttons */}
                            <div className="flex flex-wrap justify-center md:justify-start gap-2">
                                {categories.map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => setSelectedCategory(cat)}
                                        className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 border ${selectedCategory === cat
                                                ? 'bg-khazanah-gold border-khazanah-gold text-white shadow-md'
                                                : 'bg-white border-gray-200 text-gray-600 hover:border-khazanah-gold hover:text-khazanah-gold'
                                            }`}
                                    >
                                        {cat === "Jofisah" && "🌿 "}
                                        {cat === "Jumanji" && "🧠 "}
                                        {cat === "Sholehah" && "🌸 "}
                                        {cat}
                                    </button>
                                ))}
                            </div>

                            {/* Search Bar */}
                            <div className="w-full md:w-72 relative">
                                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
                                <input
                                    type="text"
                                    placeholder="Cari program..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-khazanah-gold focus:border-transparent text-sm bg-gray-50 focus:bg-white transition-all"
                                />
                            </div>

                        </div>
                    </div>
                </section>

                {/* 3. LIST PROGRAM (GRID) & 4. EMPTY STATE */}
                <section className="py-16 bg-gray-50/50 min-h-[400px]">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                        {filteredPrograms.length > 0 ? (
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {filteredPrograms.map((program) => (
                                    <div key={program.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col group cursor-pointer relative">

                                        {/* Badges */}
                                        <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                                            {program.isNew && (
                                                <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">BARU 🔥</span>
                                            )}
                                        </div>

                                        {/* Image Placeholder (Warna menyesuaikan kategori mockup) */}
                                        <div className={`h-48 w-full ${program.image} relative overflow-hidden`}>
                                            {/* Hover overlay effect */}
                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-6 flex flex-col flex-grow">
                                            <div className="flex justify-between items-start mb-3">
                                                <span className={`text-xs font-bold uppercase tracking-wider ${program.category === 'Jofisah' ? 'text-teal-600' :
                                                        program.category === 'Sholehah' ? 'text-pink-500' :
                                                            'text-blue-600'
                                                    }`}>
                                                    {program.category}
                                                </span>

                                                {/* Status Badge */}
                                                <span className={`text-xs font-semibold px-2 py-1 rounded-md ${program.status === 'full' ? 'bg-gray-100 text-gray-500' : 'bg-green-100 text-green-700'
                                                    }`}>
                                                    {program.status === 'full' ? 'Kuota Penuh' : 'Tersedia'}
                                                </span>
                                            </div>

                                            <h3 className="font-bold text-xl text-gray-900 mb-3 group-hover:text-khazanah-gold transition-colors line-clamp-2">
                                                {program.title}
                                            </h3>

                                            <div className="mt-auto space-y-2 text-sm text-gray-500 font-medium">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-lg">📅</span> {program.date}
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-lg">📍</span> {program.location}
                                                </div>
                                            </div>

                                            <button
                                                className={`mt-6 w-full py-3 rounded-xl font-bold transition-all duration-300 ${program.status === 'full'
                                                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                        : 'bg-white border-2 border-khazanah-gold text-khazanah-gold group-hover:bg-khazanah-gold group-hover:text-white'
                                                    }`}
                                                disabled={program.status === 'full'}
                                            >
                                                {program.status === 'full' ? 'Cek Program Lain' : 'Lihat Detail'}
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            /* Empty State */
                            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
                                <div className="text-6xl mb-4">📭</div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                    Belum ada program tersedia
                                </h2>
                                <p className="text-gray-500 max-w-md mx-auto">
                                    Maaf, tidak ada program yang cocok dengan kategori atau pencarian <strong>"{searchQuery || selectedCategory}"</strong>. Silakan cek kembali nanti.
                                </p>
                                <button
                                    onClick={() => {
                                        setSelectedCategory("Semua");
                                        setSearchQuery("");
                                    }}
                                    className="mt-6 text-khazanah-gold font-semibold hover:underline"
                                >
                                    Reset Filter
                                </button>
                            </div>
                        )}

                    </div>
                </section>
            </main>

            {/* 5. CTA (JOIN COMMUNITY) */}
            <section className="py-20 bg-khazanah-green text-white text-center relative overflow-hidden border-t-8 border-khazanah-gold mt-auto">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-10"></div>
                <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        Tidak menemukan program yang cocok?
                    </h2>
                    <p className="text-khazanah-light/80 text-lg mb-10">
                        Jangan khawatir! Gabung ke dalam grup komunitas kami untuk berdiskusi sehari-hari dan mendapatkan *update* tercepat saat ada program baru yang dibuka.
                    </p>
                    <button className="bg-white text-khazanah-green font-bold px-10 py-4 rounded-xl text-lg hover:bg-khazanah-light transition shadow-lg shadow-khazanah-dark/50">
                        Gabung Komunitas (Gratis)
                    </button>
                </div>
            </section>

        </div>
    );
};

export default Program;