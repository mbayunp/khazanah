import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Calendar, Tag, Share2, Loader2, BookOpen } from 'lucide-react';
import { API_URL, API_ENDPOINTS } from '../../config/api';

interface ArticleDetail {
    id: number;
    title: string;
    slug: string;
    thumbnail: string | null;
    category: string;
    author_name: string;
    created_at: string;
    content: string;
}

const ArticleDetail: React.FC = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [article, setArticle] = useState<ArticleDetail | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchArticleDetail = async () => {
            try {
                // Fetch data dari backend menggunakan slug
                const res = await fetch(`${API_ENDPOINTS.articles}/slug/${slug}`);
                if (!res.ok) {
                    if (res.status === 404) {
                        navigate('/artikel'); // Redirect jika tidak ditemukan
                    }
                    throw new Error('Gagal mengambil data artikel');
                }
                const data = await res.json();
                setArticle(data);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchArticleDetail();
    }, [slug, navigate]);

    // Format tanggal ke bahasa Indonesia
    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('id-ID', options);
    };

    // Estimasi waktu baca (Asumsi 200 kata per menit)
    const calculateReadTime = (content: string) => {
        const words = content.trim().split(/\s+/).length;
        const readTime = Math.ceil(words / 200);
        return `${readTime} menit baca`;
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
                <Loader2 className="animate-spin text-khazanah-green mb-4" size={48} />
                <p className="text-gray-500 font-medium">Memuat artikel...</p>
            </div>
        );
    }

    if (!article) return null;

    return (
        <div className="bg-[#fdfdfd] min-h-screen pb-24 font-sans">
            
            {/* 1. TOP NAVIGATION BAR */}
            <div className="bg-white border-b border-gray-100 pt-28 pb-4 sticky top-0 z-40 shadow-sm">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 flex items-center justify-between">
                    <Link 
                        to="/artikel" 
                        className="flex items-center gap-2 text-gray-500 hover:text-khazanah-green transition-colors text-sm font-bold group"
                    >
                        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> 
                        Kembali ke Artikel
                    </Link>
                    
                    {/* Share Button Placeholder */}
                    <button className="p-2 text-gray-400 hover:text-khazanah-green hover:bg-khazanah-light rounded-full transition-colors">
                        <Share2 size={20} />
                    </button>
                </div>
            </div>

            <article className="max-w-4xl mx-auto px-4 sm:px-6 pt-12">
                
                {/* 2. ARTICLE HEADER */}
                <header className="mb-12 text-center md:text-left">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-khazanah-light text-khazanah-green text-xs font-black uppercase tracking-widest mb-6">
                        <Tag size={14} /> {article.category}
                    </div>
                    
                    <h1 className="text-3xl md:text-5xl font-black text-gray-900 mb-6 leading-tight md:leading-tight">
                        {article.title}
                    </h1>
                    
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 md:gap-8 text-sm text-gray-500 font-medium border-b border-gray-100 pb-8">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold overflow-hidden border border-gray-300">
                                {article.author_name.charAt(0).toUpperCase()}
                            </div>
                            <span className="text-gray-800 font-bold">{article.author_name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar size={16} />
                            <span>{formatDate(article.created_at)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <BookOpen size={16} />
                            <span>{calculateReadTime(article.content)}</span>
                        </div>
                    </div>
                </header>

                {/* 3. HERO IMAGE / THUMBNAIL */}
                {article.thumbnail && (
                    <figure className="mb-16">
                        <div className="w-full aspect-[21/9] md:aspect-[16/9] rounded-[2rem] overflow-hidden shadow-2xl shadow-gray-200/50 bg-gray-100 border border-gray-100">
                            <img 
                                src={`${API_URL}${article.thumbnail}`} 
                                alt={article.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </figure>
                )}

                {/* 4. ARTICLE CONTENT */}
                <div className="prose prose-lg md:prose-xl prose-stone max-w-none prose-headings:font-black prose-a:text-khazanah-green hover:prose-a:text-khazanah-dark prose-img:rounded-3xl leading-relaxed">
                    {/* Karena saat ini konten masih plain text dari textarea, 
                        kita gunakan trik sederhana untuk memisahkan paragraf berdasarkan enter (\n).
                        Nantinya jika kamu pakai Rich Text Editor (spt Quill), cukup gunakan dangerouslySetInnerHTML */}
                    
                    {article.content.split('\n').map((paragraph, index) => {
                        // Jika baris kosong, render div kosong sebagai spasi
                        if (!paragraph.trim()) return <div key={index} className="h-4"></div>;
                        
                        return (
                            <p key={index} className="mb-6 text-gray-700">
                                {paragraph}
                            </p>
                        );
                    })}
                </div>

                {/* 5. FOOTER / AUTHOR BIO BOX */}
                <footer className="mt-20 pt-10 border-t border-gray-100">
                    <div className="bg-gray-50 p-8 rounded-[2rem] flex flex-col md:flex-row items-center md:items-start gap-6 border border-gray-200/60">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-khazanah-green to-khazanah-dark flex items-center justify-center text-white font-black text-3xl shrink-0 shadow-lg">
                            {article.author_name.charAt(0).toUpperCase()}
                        </div>
                        <div className="text-center md:text-left flex-1">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Ditulis oleh <span className="text-khazanah-green">{article.author_name}</span></h3>
                            <p className="text-gray-600 leading-relaxed">
                                Kontributor Khazanah Alwahda Kreatif. Terima kasih telah meluangkan waktu untuk membaca tulisan ini. Semoga bermanfaat dan menjadi amal jariyah.
                            </p>
                        </div>
                    </div>
                </footer>

            </article>
        </div>
    );
};

export default ArticleDetail;