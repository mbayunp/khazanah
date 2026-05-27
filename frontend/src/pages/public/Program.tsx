import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Calendar, MapPin, Sparkles, Inbox } from 'lucide-react';
import { API_URL, API_ENDPOINTS } from '../../config/api';

interface ProgramType {
    id: number;
    title: string;
    slug: string;
    category: 'Jofisah' | 'Jumanji' | 'Sholehah';
    date: string;
    location: string;
    image: string | null;
    status: 'active' | 'full' | 'draft';
    created_at: string;
}

const Program: React.FC = () => {
    const [programs, setPrograms] = useState<ProgramType[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState<string>("Semua");
    const [searchQuery, setSearchQuery] = useState<string>("");

    const [categories, setCategories] = useState<string[]>(["Semua"]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch programs
                const response = await fetch(API_ENDPOINTS.programs);
                const data = await response.json();
                
                // Hanya tampilkan program yang bukan 'draft' di halaman publik
                const publicPrograms = Array.isArray(data) ? data.filter((p: ProgramType) => p.status !== 'draft') : [];
                setPrograms(publicPrograms);

                // Fetch categories
                const catResponse = await fetch(API_ENDPOINTS.categories);
                if (catResponse.ok) {
                    const catData = await catResponse.json();
                    if (Array.isArray(catData)) {
                        const names = catData.map((c: any) => c.name);
                        setCategories(["Semua", ...names]);
                    }
                }
            } catch (error) {
                console.error("Gagal mengambil data program:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Logika Filter
    const filteredPrograms = programs.filter(p => {
        const matchCategory = selectedCategory === "Semua" || p.category === selectedCategory;
        const matchSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
        return matchCategory && matchSearch;
    });

    // Helper untuk mengecek apakah program baru (dibuat dalam 7 hari terakhir)
    const isNewProgram = (dateStr: string) => {
        const createdDate = new Date(dateStr);
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - createdDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays <= 7;
    };

    return (
        <div className="font-sans text-gray-800 bg-white selection:bg-khazanah-light selection:text-khazanah-dark min-h-screen flex flex-col">

            {/* 1. HERO SECTION */}
            <section className="bg-khazanah-light pt-32 pb-20 text-center px-4 relative overflow-hidden">
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
                <section className="py-8 bg-white sticky top-20 z-30 shadow-sm border-b border-gray-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-6">

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
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
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

                {/* 3. LIST PROGRAM (GRID) */}
                <section className="py-16 bg-gray-50/50 min-h-[400px]">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                        {isLoading ? (
                            <div className="text-center py-20">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-khazanah-gold mx-auto"></div>
                                <p className="mt-4 text-gray-500 font-medium">Memuat program penuh manfaat...</p>
                            </div>
                        ) : filteredPrograms.length > 0 ? (
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {filteredPrograms.map((program) => (
                                    <div key={program.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col group cursor-pointer relative">

                                        {/* Badge Baru */}
                                        {isNewProgram(program.created_at) && (
                                            <div className="absolute top-4 left-4 z-10">
                                                <span className="bg-red-500 text-white text-[10px] font-extrabold px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
                                                    <Sparkles size={10} /> BARU
                                                </span>
                                            </div>
                                        )}

                                        {/* Image Display */}
                                        <div className="h-52 w-full bg-gray-200 relative overflow-hidden">
                                            {program.image ? (
                                                <img 
                                                    src={`${API_URL}${program.image}`} 
                                                    alt={program.title} 
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-gray-400 bg-khazanah-light">
                                                    Khazanah Alwahda
                                                </div>
                                            )}
                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-6 flex flex-col flex-grow">
                                            <div className="flex justify-between items-start mb-3">
                                                <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded border ${
                                                    program.category === 'Jofisah' ? 'text-teal-600 border-teal-200 bg-teal-50' :
                                                    program.category === 'Sholehah' ? 'text-pink-500 border-pink-200 bg-pink-50' :
                                                    'text-blue-600 border-blue-200 bg-blue-50'
                                                }`}>
                                                    {program.category}
                                                </span>

                                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                                    program.status === 'full' ? 'bg-gray-100 text-gray-500' : 'bg-green-100 text-green-700'
                                                }`}>
                                                    {program.status === 'full' ? 'KUOTA PENUH' : 'TERSEDIA'}
                                                </span>
                                            </div>

                                            <h3 className="font-bold text-lg text-gray-900 mb-4 group-hover:text-khazanah-gold transition-colors line-clamp-2 leading-snug">
                                                {program.title}
                                            </h3>

                                            <div className="mt-auto space-y-2 text-sm text-gray-500 font-medium">
                                                <div className="flex items-center gap-2">
                                                    <Calendar size={16} className="text-khazanah-gold" />
                                                    {new Date(program.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <MapPin size={16} className="text-khazanah-gold" />
                                                    {program.location}
                                                </div>
                                            </div>

                                            <Link
                                                to={`/program/${program.slug}`}
                                                className={`mt-6 w-full py-3 rounded-xl font-bold text-center transition-all duration-300 ${program.status === 'full'
                                                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                        : 'bg-white border-2 border-khazanah-gold text-khazanah-gold group-hover:bg-khazanah-gold group-hover:text-white'
                                                    }`}
                                            >
                                                {program.status === 'full' ? 'Cek Program Lain' : 'Lihat Detail'}
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            /* Empty State */
                            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200 max-w-2xl mx-auto">
                                <Inbox size={64} className="mx-auto text-gray-300 mb-4" />
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                    Belum ada program tersedia
                                </h2>
                                <p className="text-gray-500 px-6">
                                    Maaf, tidak ada program yang cocok dengan pencarian <strong>"{searchQuery || selectedCategory}"</strong>.
                                </p>
                                <button
                                    onClick={() => { setSelectedCategory("Semua"); setSearchQuery(""); }}
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
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">
                        Ingin Update Tercepat?
                    </h2>
                    <p className="text-khazanah-light/80 text-lg mb-10">
                        Gabung ke dalam grup komunitas kami untuk mendapatkan informasi program terbaru langsung di HP kamu.
                    </p>
                    <button className="bg-white text-khazanah-green font-bold px-10 py-4 rounded-xl text-lg hover:bg-gray-50 transition shadow-xl">
                        Gabung Komunitas (Gratis)
                    </button>
                </div>
            </section>

        </div>
    );
};

export default Program;