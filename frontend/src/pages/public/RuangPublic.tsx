import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, User, MessageSquare, Sparkles, Trash2, Clock, Loader2 } from 'lucide-react';
import Swal from 'sweetalert2';
import { API_ENDPOINTS } from '../../config/api';

interface Curhatan {
    id: number;
    sender_name: string;
    message: string;
    created_at: string;
    comment_count: number;
}

interface Comment {
    id: number;
    curhat_id: number;
    sender_name: string;
    comment_text: string;
    created_at: string;
    editableUntil: number;
}

const CATEGORIES = ['Semua', 'Pendidikan', 'Keluarga', 'Relationship', 'Iman & Ragu', 'Self Growth'];

const getCategory = (message: string): string => {
    const text = message.toLowerCase();
    if (text.includes('kuliah') || text.includes('skripsi') || text.includes('sekolah') || text.includes('belajar') || text.includes('pendidikan') || text.includes('tugas') || text.includes('guru') || text.includes('dosen')) {
        return 'Pendidikan';
    }
    if (text.includes('keluarga') || text.includes('ortu') || text.includes('orang tua') || text.includes('ibu') || text.includes('ayah') || text.includes('mama') || text.includes('papa') || text.includes('kakak') || text.includes('adik')) {
        return 'Keluarga';
    }
    if (text.includes('pacar') || text.includes('nikah') || text.includes('jodoh') || text.includes('cinta') || text.includes('relationship') || text.includes('pasangan') || text.includes('taaruf') || text.includes('jomblo')) {
        return 'Relationship';
    }
    if (text.includes('iman') || text.includes('ragu') || text.includes('ibadah') || text.includes('shalat') || text.includes('solat') || text.includes('dosa') || text.includes('allah') || text.includes('tuhan') || text.includes('spiritual') || text.includes('hijrah')) {
        return 'Iman & Ragu';
    }
    return 'Self Growth';
};

const getCategoryBadgeStyles = (category: string): string => {
    switch (category) {
        case 'Pendidikan': return 'bg-amber-100 text-amber-800 border-amber-200';
        case 'Keluarga': return 'bg-rose-100 text-rose-800 border-rose-200';
        case 'Relationship': return 'bg-sky-100 text-sky-800 border-sky-200';
        case 'Iman & Ragu': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
        default: return 'bg-purple-100 text-purple-800 border-purple-200';
    }
};

const RuangPublic: React.FC = () => {
    const [curhatans, setCurhatans] = useState<Curhatan[]>([]);
    const [selectedCategory, setSelectedCategory] = useState('Semua');
    const [isLoading, setIsLoading] = useState(true);

    // Form Curhat
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');

    // Comments & Replies
    const [expandedId, setExpandedId] = useState<number | null>(null);
    const [comments, setComments] = useState<{ [key: number]: Comment[] }>({});
    const [replyName, setReplyName] = useState('');
    const [replyText, setReplyText] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [cooldown, setCooldown] = useState(0);

    const isAdmin = localStorage.getItem('khazanah_token') !== null;

    const fetchAllData = async () => {
        try {
            const res = await fetch(API_ENDPOINTS.ruang);
            const data = await res.json();

            const enrichedData = await Promise.all(data.map(async (c: any) => {
                const commRes = await fetch(`${API_ENDPOINTS.ruang}/${c.id}/comments`);
                const commData = await commRes.json();
                return { ...c, comment_count: commData.length };
            }));

            setCurhatans(enrichedData);
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchAllData();
        const timer = setInterval(() => {
            setCooldown((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const res = await fetch(API_ENDPOINTS.ruang, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ sender_name: name || 'Hamba Allah', message })
            });
            if (res.ok) {
                Swal.fire({
                    title: 'Alhamdulillah!',
                    text: 'Ceritamu berhasil dikirim. Tunggu persetujuan Leader agar tampil di publik ya! ✨',
                    icon: 'success',
                    confirmButtonColor: '#0F5B30',
                });
                setName('');
                setMessage('');
            }
        } catch (error) {
            Swal.fire('Oops!', 'Gagal mengirim cerita.', 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const toggleComments = async (curhatId: number) => {
        if (expandedId === curhatId) {
            setExpandedId(null);
            return;
        }
        setExpandedId(curhatId);
        try {
            const res = await fetch(`${API_ENDPOINTS.ruang}/${curhatId}/comments`);
            const data = await res.json();
            setComments(prev => ({ ...prev, [curhatId]: data }));
        } catch (error) { console.error(error); }
    };

    const handleSubmitReply = async (e: React.FormEvent, curhatId: number) => {
        e.preventDefault();
        if (cooldown > 0 || !replyText.trim()) return;

        try {
            const res = await fetch(`${API_ENDPOINTS.ruang}/${curhatId}/comments`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ sender_name: replyName || 'Hamba Allah', comment_text: replyText })
            });

            if (res.ok) {
                const updatedRes = await fetch(`${API_ENDPOINTS.ruang}/${curhatId}/comments`);
                const updatedData = await updatedRes.json();

                const dataWithTimer = updatedData.map((c: any) => ({
                    ...c,
                    editableUntil: c.comment_text === replyText ? Date.now() + 20000 : 0
                }));

                setComments(prev => ({ ...prev, [curhatId]: dataWithTimer }));

                setCurhatans(prev => prev.map(c => c.id === curhatId ? { ...c, comment_count: updatedData.length } : c));

                setReplyName('');
                setReplyText('');
                setCooldown(30);
            }
        } catch (error) { console.error(error); }
    };

    const handleDeleteComment = async (curhatId: number, commentId: number) => {
        const result = await Swal.fire({
            title: 'Hapus komentar?',
            text: "Tindakan ini tidak bisa dibatalkan.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#gray',
            confirmButtonText: 'Ya, Hapus!'
        });

        if (result.isConfirmed) {
            setComments(prev => ({
                ...prev,
                [curhatId]: prev[curhatId].filter(c => c.id !== commentId)
            }));
            setCurhatans(prev => prev.map(c => c.id === curhatId ? { ...c, comment_count: c.comment_count - 1 } : c));
            Swal.fire('Terhapus!', 'Komentar berhasil dihapus.', 'success');
        }
    };

    const filteredCurhatans = curhatans.filter(c => {
        if (selectedCategory === 'Semua') return true;
        return getCategory(c.message) === selectedCategory;
    });

    return (
        <div className="bg-[#FAF6EE] min-h-screen pt-28 pb-20 relative overflow-hidden font-sans selection:bg-emerald-100 selection:text-emerald-950">
            {/* Ambient Background Lights */}
            <div className="absolute top-20 left-1/4 w-96 h-96 bg-emerald-700/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-gold/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10">

                <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur text-emerald border border-emerald/10 text-xs font-bold uppercase tracking-widest mb-4">
                        <Sparkles size={14} className="text-gold" /> Ruang Curhat
                    </div>
                    <h1 className="text-4xl md:text-5xl font-outfit font-black text-gray-800 mb-3 tracking-tight">Ruang Cerita</h1>
                    <p className="text-gray-500 font-outfit text-sm sm:text-base max-w-lg mx-auto">
                        Bagikan keresahan, mintalah nasihat, atau kuatkan satu sama lain secara anonim dan aman 🤍
                    </p>
                </div>

                {/* FORM CURHAT */}
                <div className="glass-card p-6 md:p-8 border border-white/20 bg-white/80 rounded-3xl shadow-xl mb-12">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="text"
                                placeholder="Nama Anda (Opsional, default: Hamba Allah)"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-250 bg-gray-50/50 focus:bg-white focus:border-gold focus:ring-4 focus:ring-gold/20 outline-none font-medium transition-all"
                            />
                        </div>
                        <textarea
                            rows={3}
                            required
                            placeholder="Tulis ceritamu di sini..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="w-full px-5 py-4 rounded-xl border border-gray-255 bg-gray-50/50 focus:bg-white focus:border-gold focus:ring-4 focus:ring-gold/20 outline-none resize-none font-medium transition-all leading-relaxed"
                        ></textarea>
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                disabled={isSubmitting || !message.trim()}
                                className="bg-emerald hover:shadow-premium text-white px-8 py-3.5 rounded-xl font-bold transition-all flex items-center gap-2 disabled:opacity-50"
                            >
                                {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : <><Send size={18} /> Bagikan Cerita</>}
                            </button>
                        </div>
                    </form>
                </div>

                {/* CATEGORY TABS */}
                <div className="mb-8 overflow-x-auto pb-2 custom-scrollbar">
                    <div className="flex gap-2 min-w-max">
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-2 rounded-full font-bold text-xs border transition-all duration-200 ${
                                    selectedCategory === cat
                                        ? 'bg-emerald text-white border-emerald shadow-sm shadow-emerald/20'
                                        : 'bg-white/80 border-gray-200 text-gray-500 hover:bg-white'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* LIST CURHATAN */}
                <div className="space-y-6">
                    {isLoading ? (
                        <div className="text-center py-10">
                            <Loader2 className="mx-auto animate-spin text-emerald" size={40} />
                        </div>
                    ) : filteredCurhatans.length === 0 ? (
                        <div className="text-center py-12 bg-white/50 border border-dashed border-gray-300 rounded-3xl">
                            <p className="text-gray-400 font-bold text-sm">Belum ada cerita di kategori ini.</p>
                        </div>
                    ) : (
                        <AnimatePresence>
                            {filteredCurhatans.map((c) => {
                                const curCategory = getCategory(c.message);
                                return (
                                    <motion.div
                                        key={c.id}
                                        layout
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 flex flex-col md:flex-row gap-5"
                                    >
                                        {/* Avatar / Icon */}
                                        <div className="w-12 h-12 bg-gradient-to-br from-emerald to-emerald-800 rounded-2xl flex items-center justify-center font-outfit font-black text-white shrink-0 shadow-md">
                                            {c.sender_name.charAt(0).toUpperCase()}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex flex-wrap items-center justify-between gap-2">
                                                <div className="flex items-center gap-3">
                                                    <h4 className="font-outfit font-bold text-gray-800 text-base">{c.sender_name}</h4>
                                                    <span className={`px-2.5 py-0.5 rounded-full border text-[10px] font-bold ${getCategoryBadgeStyles(curCategory)}`}>
                                                        {curCategory}
                                                    </span>
                                                </div>
                                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                                                    {new Date(c.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                                                </span>
                                            </div>
                                            <p className="mt-3 text-gray-750 leading-relaxed text-sm sm:text-base font-medium">{c.message}</p>

                                            <button
                                                onClick={() => toggleComments(c.id)}
                                                className={`mt-5 flex items-center gap-2 px-4 py-2 rounded-full font-bold text-xs transition-all ${
                                                    expandedId === c.id 
                                                        ? 'bg-emerald text-white' 
                                                        : 'bg-[#FAF6EE] text-emerald hover:bg-emerald-50'
                                                }`}
                                            >
                                                <MessageSquare size={14} />
                                                {expandedId === c.id ? 'Tutup Diskusi' : `Lihat Diskusi (${c.comment_count})`}
                                            </button>

                                            {/* COMMENTS SECTION */}
                                            {expandedId === c.id && (
                                                <div className="mt-6 pt-6 border-t border-gray-100 space-y-4 animate-in slide-in-from-top-4 duration-300">
                                                    <div className="space-y-3">
                                                        {comments[c.id]?.length === 0 ? (
                                                            <p className="text-xs text-gray-400 font-semibold italic pl-1">Belum ada tanggapan. Berikan tanggapan pertamamu! 🤍</p>
                                                        ) : (
                                                            comments[c.id]?.map(comment => {
                                                                return (
                                                                    <div key={comment.id} className="group relative flex gap-3 p-4 bg-gray-50/50 rounded-2xl border border-gray-100">
                                                                        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center font-outfit font-bold text-emerald shrink-0 border text-xs">
                                                                            {comment.sender_name.charAt(0).toUpperCase()}
                                                                        </div>
                                                                        <div className="flex-1">
                                                                            <div className="flex items-center justify-between mb-1">
                                                                                <span className="font-outfit font-bold text-xs text-gray-800">{comment.sender_name}</span>
                                                                                {isAdmin && (
                                                                                    <button 
                                                                                        onClick={() => handleDeleteComment(c.id, comment.id)} 
                                                                                        className="text-[10px] font-bold text-rose-500 hover:underline flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                                                                    >
                                                                                        <Trash2 size={10} /> Hapus
                                                                                    </button>
                                                                                )}
                                                                            </div>
                                                                            <p className="text-gray-650 text-xs sm:text-sm font-medium">{comment.comment_text}</p>
                                                                        </div>
                                                                    </div>
                                                                );
                                                            })
                                                        )}
                                                    </div>

                                                    {/* REPLY FORM */}
                                                    <form onSubmit={(e) => handleSubmitReply(e, c.id)} className="bg-gray-50/50 p-2 rounded-2xl border border-gray-250 flex flex-col sm:flex-row gap-2">
                                                        <input 
                                                            type="text" 
                                                            placeholder="Nama..." 
                                                            value={replyName} 
                                                            onChange={(e) => setReplyName(e.target.value)} 
                                                            className="px-4 py-2 text-xs rounded-xl bg-white border border-gray-200 outline-none w-full sm:w-1/4 font-medium focus:border-gold" 
                                                        />
                                                        <input 
                                                            type="text" 
                                                            required 
                                                            placeholder={cooldown > 0 ? `Tunggu ${cooldown}s...` : "Tanggapi cerita ini..."} 
                                                            disabled={cooldown > 0} 
                                                            value={replyText} 
                                                            onChange={(e) => setReplyText(e.target.value)} 
                                                            className="flex-1 px-4 py-2 text-xs bg-white border border-gray-200 outline-none rounded-xl font-medium focus:border-gold" 
                                                        />
                                                        <button 
                                                            type="submit" 
                                                            disabled={cooldown > 0 || !replyText.trim()} 
                                                            className="bg-emerald text-white p-2.5 rounded-xl hover:bg-emerald-800 transition disabled:opacity-50 shrink-0 flex items-center justify-center"
                                                        >
                                                            {cooldown > 0 ? <Clock size={16} /> : <Send size={16} />}
                                                        </button>
                                                    </form>
                                                </div>
                                            )}
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RuangPublic;