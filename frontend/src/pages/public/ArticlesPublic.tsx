import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, BookOpen, Calendar, User, ArrowRight, Loader2 } from 'lucide-react';

interface Article {
    id: number;
    title: string;
    slug: string;
    thumbnail: string | null;
    category: string;
    author_name: string;
    created_at: string;
}

const ArticlesPublic: React.FC = () => {
    const [articles, setArticles] = useState<Article[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    
    // State untuk fitur Filter & Search
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Semua');

    const categories = ['Semua', 'Self Growth', 'Faith', 'Relationship', 'Lifestyle'];

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                // Mengambil HANYA artikel yang approved dari backend
                const res = await fetch('http://localhost:5000/api/articles');
                const data = await res.json();
                setArticles(data);
            } catch (error) {
                console.error("Gagal mengambil artikel:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchArticles();
    }, []);

    // Logika Filter & Pencarian
    const filteredArticles = articles.filter(article => {
        const matchesCategory = selectedCategory === 'Semua' || article.category === selectedCategory;
        const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="bg-[#fdfdfd] min-h-screen pt-28 pb-24 font-sans relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-khazanah-light/40 to-transparent z-0 pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                
                {/* 1. HEADER & SEARCH SECTION */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-khazanah-green text-xs font-bold uppercase tracking-widest mb-6 border border-khazanah-green/20 shadow-sm">
                        <BookOpen size={14} /> Khazanah Blog
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">
                        Artikel & <span className="text-khazanah-green">Inspirasi</span>
                    </h1>
                    <p className="text-lg text-gray-600 mb-10 leading-relaxed">
                        Kumpulan tulisan terbaik dari para member dan leader komunitas. Temukan inspirasi harianmu di sini.
                    </p>

                    {/* Search Bar */}
                    <div className="relative max-w-xl mx-auto group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-gray-400 group-focus-within:text-khazanah-green transition-colors" />
                        </div>
                        <input
                            type="text"
                            placeholder="Cari judul artikel..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="block w-full pl-12 pr-4 py-4 border border-gray-200 rounded-2xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-khazanah-green/10 focus:border-khazanah-green transition-all shadow-sm text-gray-900"
                        />
                    </div>
                </div>

                {/* 2. CATEGORY FILTER */}
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
                                selectedCategory === cat
                                    ? 'bg-khazanah-dark text-khazanah-gold shadow-lg shadow-khazanah-dark/20 scale-105'
                                    : 'bg-white text-gray-500 hover:bg-gray-100 border border-gray-200'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* 3. ARTICLE GRID */}
                {isLoading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 className="animate-spin text-khazanah-green" size={48} />
                    </div>
                ) : filteredArticles.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-[2rem] border border-dashed border-gray-300 shadow-sm">
                        <BookOpen className="mx-auto text-gray-300 mb-4" size={48} />
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Tidak ada artikel</h3>
                        <p className="text-gray-500">Artikel yang kamu cari belum tersedia atau sedang dalam proses peninjauan.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredArticles.map((article) => (
                            <div key={article.id} className="bg-white rounded-[2rem] shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-gray-100 flex flex-col group overflow-hidden">
                                
                                {/* Thumbnail */}
                                <div className="h-52 bg-gray-100 relative overflow-hidden">
                                    {article.thumbnail ? (
                                        <img 
                                            src={`http://localhost:5000${article.thumbnail}`} 
                                            alt={article.title} 
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                                        />
                                    ) : (
                                        <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 bg-khazanah-light/50">
                                            <BookOpen size={32} className="mb-2 opacity-50" />
                                            <span className="text-sm font-semibold">Khazanah Blog</span>
                                        </div>
                                    )}
                                    
                                    {/* Category Badge over image */}
                                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-khazanah-green font-extrabold text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-lg shadow-sm">
                                        {article.category}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6 flex flex-col flex-grow">
                                    <h3 className="text-xl font-extrabold text-gray-900 mb-4 line-clamp-2 group-hover:text-khazanah-green transition-colors leading-snug">
                                        {article.title}
                                    </h3>
                                    
                                    <div className="flex items-center gap-4 text-xs font-semibold text-gray-500 mt-auto pt-4 border-t border-gray-50">
                                        <div className="flex items-center gap-1.5">
                                            <User size={14} className="text-gray-400" />
                                            <span className="truncate max-w-[100px]">{article.author_name}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <Calendar size={14} className="text-gray-400" />
                                            <span>{new Date(article.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                                        </div>
                                    </div>

                                    {/* Button */}
                                    <Link 
                                        to={`/artikel/${article.slug}`}
                                        className="mt-6 w-full bg-gray-50 hover:bg-khazanah-green text-gray-700 hover:text-white py-3 rounded-xl font-bold transition-colors flex items-center justify-center gap-2 group-hover:shadow-md"
                                    >
                                        Baca Selengkapnya <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

            </div>
        </div>
    );
};

export default ArticlesPublic;