import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Trash2, FileText, Loader2 } from 'lucide-react';
import Swal from 'sweetalert2';

interface Article {
    id: number;
    title: string;
    category: string;
    author_name: string;
    status: 'pending' | 'approved' | 'rejected';
    created_at: string;
    content: string; // Ditampilkan sebagian untuk preview
}

const ArticleAdmin: React.FC = () => {
    const [articles, setArticles] = useState<Article[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchArticles = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/articles/admin');
            const data = await res.json();
            setArticles(data);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchArticles();
    }, []);

    const handleStatusChange = async (id: number, newStatus: 'approved' | 'rejected') => {
        try {
            await fetch(`http://localhost:5000/api/articles/${id}/status`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus })
            });
            fetchArticles();
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (id: number) => {
        const result = await Swal.fire({
            title: 'Hapus Artikel?',
            text: 'Artikel akan dihapus permanen dari database.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#gray',
            confirmButtonText: 'Hapus'
        });

        if (result.isConfirmed) {
            try {
                await fetch(`http://localhost:5000/api/articles/${id}`, { method: 'DELETE' });
                fetchArticles();
                Swal.fire('Terhapus!', 'Artikel telah dihapus.', 'success');
            } catch (error) {
                console.error(error);
            }
        }
    };

    if (isLoading) return <div className="p-8 flex justify-center"><Loader2 className="animate-spin text-khazanah-green" size={40} /></div>;

    return (
        <div className="p-4 lg:p-8 max-w-7xl mx-auto min-h-screen">
            <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-khazanah-light text-khazanah-green rounded-xl">
                    <FileText size={28} />
                </div>
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900">Moderasi Artikel</h1>
                    <p className="text-gray-500 font-medium mt-1">Kelola tulisan dari member dan kontributor</p>
                </div>
            </div>

            <div className="grid gap-6">
                {articles.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
                        <p className="text-gray-500 font-medium">Belum ada artikel yang masuk.</p>
                    </div>
                ) : (
                    articles.map((article) => (
                        <div key={article.id} className={`bg-white p-6 rounded-2xl shadow-sm border-l-4 flex flex-col md:flex-row gap-6 ${
                            article.status === 'pending' ? 'border-yellow-400' : 
                            article.status === 'approved' ? 'border-khazanah-green' : 'border-red-500'
                        }`}>
                            
                            <div className="flex-1">
                                <div className="flex flex-wrap items-center gap-3 mb-2">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                                        article.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 
                                        article.status === 'approved' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                    }`}>
                                        {article.status}
                                    </span>
                                    <span className="text-xs font-bold text-khazanah-gold bg-amber-50 px-3 py-1 rounded-full">{article.category}</span>
                                    <span className="text-sm text-gray-400 ml-auto font-medium">{new Date(article.created_at).toLocaleDateString('id-ID')}</span>
                                </div>
                                
                                <h3 className="text-xl font-bold text-gray-900 mb-1">{article.title}</h3>
                                <p className="text-sm text-gray-500 font-medium mb-4">Oleh: <span className="text-gray-800">{article.author_name}</span></p>
                                
                                <div className="bg-gray-50 p-4 rounded-xl text-gray-600 text-sm line-clamp-3 leading-relaxed border border-gray-100">
                                    {article.content}
                                </div>
                            </div>

                            <div className="flex flex-row md:flex-col gap-3 justify-center border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6 shrink-0">
                                {article.status !== 'approved' && (
                                    <button onClick={() => handleStatusChange(article.id, 'approved')} className="flex-1 flex items-center justify-center gap-2 bg-khazanah-green text-white px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-khazanah-dark transition">
                                        <CheckCircle size={16} /> Approve
                                    </button>
                                )}
                                {article.status !== 'rejected' && (
                                    <button onClick={() => handleStatusChange(article.id, 'rejected')} className="flex-1 flex items-center justify-center gap-2 bg-yellow-500 text-white px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-yellow-600 transition">
                                        <XCircle size={16} /> Reject
                                    </button>
                                )}
                                <button onClick={() => handleDelete(article.id)} className="flex-1 flex items-center justify-center gap-2 bg-red-50 text-red-600 px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-red-100 transition mt-auto">
                                    <Trash2 size={16} /> Hapus
                                </button>
                            </div>

                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ArticleAdmin;