import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, MapPin, Users, ArrowLeft, CheckCircle2, Share2, MessageCircle, Send, Clock, Edit2, Trash2, X, Save } from 'lucide-react';

interface ProgramType {
    id: number;
    title: string;
    description: string;
    category: string;
    date: string;
    location: string;
    image: string | null;
    status: string;
    quota: number;
}

interface CommentType {
    id: number;
    name: string;
    text: string;
    date: string;
    editableUntil: number; 
}

const ProgramDetail: React.FC = () => {
    const { slug } = useParams();
    const [program, setProgram] = useState<ProgramType | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const [comments, setComments] = useState<CommentType[]>([]);
    const [newName, setNewName] = useState('');
    const [newComment, setNewComment] = useState('');
    const [cooldown, setCooldown] = useState(0);

    const [editingId, setEditingId] = useState<number | null>(null);
    const [editValue, setEditValue] = useState('');
    const [now, setNow] = useState(Date.now()); 

    const isAdmin = localStorage.getItem('khazanah_token') !== null;

    // FETCH DATA PROGRAM & KOMENTAR DARI DATABASE
    useEffect(() => {
        const fetchProgramAndComments = async () => {
            try {
                // 1. Fetch Program
                const response = await fetch(`http://localhost:5000/api/programs/slug/${slug}`);
                if (!response.ok) throw new Error("Program tidak ditemukan");
                const data = await response.json();
                setProgram(data);

                // 2. Fetch Komentar dari DB menggunakan ID program
                const resComments = await fetch(`http://localhost:5000/api/programs/${data.id}/comments`);
                if (resComments.ok) {
                    const commentsData = await resComments.json();
                    const formattedComments = commentsData.map((c: any) => ({
                        id: c.id,
                        name: c.name,
                        text: c.text,
                        date: c.created_at,
                        editableUntil: 0 
                    }));
                    setComments(formattedComments);
                }
            } catch (error) {
                console.error("Gagal memuat detail program:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProgramAndComments();
    }, [slug]);

    useEffect(() => {
        const timer = setInterval(() => {
            setNow(Date.now());
            setCooldown((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    // SIMPAN KOMENTAR KE DATABASE
    const handleSumbitComment = async (e: React.FormEvent) => {
        e.preventDefault();
        if (cooldown > 0 || !newName.trim() || !newComment.trim() || !program) return;
        if (newComment.length < 5) {
            alert("Komentar terlalu pendek!");
            return;
        }

        try {
            // POST ke Backend API
            const res = await fetch(`http://localhost:5000/api/programs/${program.id}/comments`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: newName, text: newComment })
            });

            if (res.ok) {
                // Tarik ulang data komentar terbaru dari DB
                const resComments = await fetch(`http://localhost:5000/api/programs/${program.id}/comments`);
                const commentsData = await resComments.json();
                const formattedComments = commentsData.map((c: any) => ({
                    id: c.id,
                    name: c.name,
                    text: c.text,
                    date: c.created_at,
                    editableUntil: c.text === newComment ? Date.now() + 20000 : 0
                }));
                setComments(formattedComments);
                setNewComment('');
                setCooldown(30); 
            }
        } catch (error) {
            console.error("Gagal mengirim komentar", error);
        }
    };

    const handleStartEdit = (comment: CommentType) => {
        setEditingId(comment.id);
        setEditValue(comment.text);
    };

    const handleSaveEdit = (id: number) => {
        if (!editValue.trim()) return;
        setComments(comments.map(c => c.id === id ? { ...c, text: editValue } : c));
        setEditingId(null);
    };

    const handleDelete = (id: number) => {
        if (window.confirm("Apakah Anda yakin ingin menghapus komentar ini?")) {
            setComments(comments.filter(c => c.id !== id));
        }
    };

    if (isLoading) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-khazanah-gold"></div>
        </div>
    );

    if (!program) return (
        <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
            <h2 className="text-2xl font-bold mb-4">Program tidak ditemukan 🧐</h2>
            <Link to="/program" className="text-khazanah-green font-bold hover:underline">Kembali ke Daftar Program</Link>
        </div>
    );

    return (
        <div className="bg-gray-50 min-h-screen pb-20">
            <div className="bg-white border-b border-gray-100 pt-28 pb-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Link to="/program" className="flex items-center gap-2 text-gray-500 hover:text-khazanah-green transition-colors text-sm font-medium">
                        <ArrowLeft size={16} /> Kembali ke Program
                    </Link>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
                <div className="grid lg:grid-cols-3 gap-10">
                    
                    <div className="lg:col-span-2 space-y-8">
                        <div>
                            <span className="bg-khazanah-light text-khazanah-green px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border border-khazanah-green/10">
                                {program.category}
                            </span>
                            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-4 leading-tight">
                                {program.title}
                            </h1>
                        </div>

                        <div className="rounded-3xl overflow-hidden shadow-2xl shadow-khazanah-dark/10 bg-gray-200 aspect-video lg:aspect-auto lg:h-[450px]">
                            {program.image ? (
                                <img src={`http://localhost:5000${program.image}`} alt={program.title} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-400">Khazanah Poster</div>
                            )}
                        </div>

                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                                <span className="w-2 h-6 bg-khazanah-gold rounded-full"></span>
                                Tentang Program
                            </h2>
                            <div className="text-gray-600 leading-relaxed whitespace-pre-line text-lg">
                                {program.description || "Belum ada deskripsi untuk program ini."}
                            </div>
                        </div>

                        {/* --- RUANG DISKUSI --- */}
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                                <MessageCircle size={24} className="text-khazanah-green" />
                                Ruang Diskusi ({comments.length})
                            </h2>

                            <form onSubmit={handleSumbitComment} className="mb-8 space-y-4 bg-gray-50 p-6 rounded-2xl border border-gray-100">
                                <div>
                                    <input 
                                        type="text" 
                                        placeholder="Nama Anda" 
                                        value={newName}
                                        onChange={(e) => setNewName(e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-khazanah-green bg-white"
                                        required
                                        disabled={cooldown > 0}
                                    />
                                </div>
                                <div>
                                    <textarea 
                                        rows={3}
                                        placeholder="Tulis pertanyaan atau komentar Anda..." 
                                        value={newComment}
                                        onChange={(e) => setNewComment(e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-khazanah-green bg-white resize-none"
                                        required
                                        disabled={cooldown > 0}
                                    ></textarea>
                                </div>
                                <div className="flex justify-end">
                                    <button 
                                        type="submit" 
                                        disabled={cooldown > 0 || !newComment.trim() || !newName.trim()}
                                        className={`px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all ${
                                            cooldown > 0 
                                            ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                                            : 'bg-khazanah-green text-white hover:bg-khazanah-dark shadow-lg'
                                        }`}
                                    >
                                        {cooldown > 0 ? (
                                            <><Clock size={18} /> Tunggu {cooldown}s</>
                                        ) : (
                                            <><Send size={18} /> Kirim Komentar</>
                                        )}
                                    </button>
                                </div>
                            </form>

                            <div className="space-y-6">
                                {comments.length === 0 ? (
                                    <p className="text-center text-gray-400 italic py-4">Belum ada diskusi. Jadilah yang pertama berkomentar!</p>
                                ) : (
                                    comments.map((comment) => {
                                        const timeLeft = Math.max(0, Math.ceil((comment.editableUntil - now) / 1000));
                                        const canEdit = timeLeft > 0;
                                        const isEditing = editingId === comment.id;

                                        return (
                                            <div key={comment.id} className="flex gap-4 p-4 hover:bg-gray-50 rounded-2xl transition group border border-transparent hover:border-gray-100">
                                                <div className="w-10 h-10 bg-khazanah-light rounded-full flex items-center justify-center text-khazanah-green font-bold shrink-0">
                                                    {comment.name.charAt(0).toUpperCase()}
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center justify-between mb-1">
                                                        <div className="flex items-center gap-2">
                                                            <h4 className="font-bold text-gray-900">{comment.name}</h4>
                                                            <span className="text-xs text-gray-400">• {new Date(comment.date).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}</span>
                                                        </div>
                                                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                            {canEdit && !isEditing && (
                                                                <button onClick={() => handleStartEdit(comment)} className="text-xs flex items-center gap-1 text-gray-400 hover:text-blue-600 font-medium">
                                                                    <Edit2 size={14} /> Edit ({timeLeft}s)
                                                                </button>
                                                            )}
                                                            {isAdmin && (
                                                                <button onClick={() => handleDelete(comment.id)} className="text-xs flex items-center gap-1 text-gray-400 hover:text-red-600 font-medium">
                                                                    <Trash2 size={14} /> Hapus
                                                                </button>
                                                            )}
                                                        </div>
                                                    </div>

                                                    {isEditing ? (
                                                        <div className="mt-2 space-y-2">
                                                            <textarea 
                                                                value={editValue}
                                                                onChange={(e) => setEditValue(e.target.value)}
                                                                className="w-full px-3 py-2 text-sm rounded-lg border border-khazanah-green focus:outline-none focus:ring-1 focus:ring-khazanah-green resize-none"
                                                                rows={2}
                                                                autoFocus
                                                            />
                                                            <div className="flex gap-2">
                                                                <button onClick={() => handleSaveEdit(comment.id)} className="text-xs bg-khazanah-green text-white px-3 py-1.5 rounded-lg font-bold flex items-center gap-1">
                                                                    <Save size={14} /> Simpan
                                                                </button>
                                                                <button onClick={() => setEditingId(null)} className="text-xs bg-gray-200 text-gray-600 px-3 py-1.5 rounded-lg font-bold flex items-center gap-1 hover:bg-gray-300">
                                                                    <X size={14} /> Batal
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <p className="text-gray-600 leading-relaxed text-sm">{comment.text}</p>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 sticky top-32">
                            <h3 className="text-xl font-bold mb-6 text-gray-900">Detail Acara</h3>
                            
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-khazanah-light rounded-2xl text-khazanah-green">
                                        <Calendar size={24} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Waktu</p>
                                        <p className="font-bold text-gray-800">{new Date(program.date).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</p>
                                        <p className="text-sm text-gray-500">{new Date(program.date).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-blue-50 rounded-2xl text-blue-600">
                                        <MapPin size={24} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Lokasi</p>
                                        <p className="font-bold text-gray-800">{program.location}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-amber-50 rounded-2xl text-khazanah-gold">
                                        <Users size={24} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Kuota</p>
                                        <p className="font-bold text-gray-800">{program.quota > 0 ? `${program.quota} Peserta` : 'Terbuka Umum'}</p>
                                    </div>
                                </div>
                            </div>

                            <hr className="my-8 border-gray-100" />

                            {program.status === 'active' ? (
                                <button className="w-full bg-khazanah-green text-white py-4 rounded-2xl font-bold text-lg hover:bg-khazanah-dark transition shadow-lg shadow-khazanah-green/30 flex items-center justify-center gap-2">
                                    Daftar Sekarang <CheckCircle2 size={20} />
                                </button>
                            ) : (
                                <button disabled className="w-full bg-gray-100 text-gray-400 py-4 rounded-2xl font-bold text-lg cursor-not-allowed border border-gray-200">
                                    Pendaftaran Ditutup
                                </button>
                            )}
                            
                            <button className="w-full mt-4 flex items-center justify-center gap-2 text-sm font-semibold text-gray-500 hover:text-khazanah-gold transition-colors py-2">
                                <Share2 size={16} /> Bagikan Program
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ProgramDetail;