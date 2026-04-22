import React, { useState, useEffect } from 'react';
import { Send, User, MessageSquare, ChevronDown, ChevronUp, Sparkles, Edit2, Trash2, Clock, Loader2 } from 'lucide-react';
import Swal from 'sweetalert2';

interface Curhatan {
    id: number;
    sender_name: string;
    message: string;
    created_at: string;
    comment_count: number; // Kita tambahkan ini agar angka konsisten
}

interface Comment {
    id: number;
    curhat_id: number;
    sender_name: string;
    comment_text: string;
    created_at: string;
    editableUntil: number;
}

const RuangPublic: React.FC = () => {
    const [curhatans, setCurhatans] = useState<Curhatan[]>([]);
    const [isLoading, setIsLoading] = useState(true);
<<<<<<< HEAD

    // State Form Curhat
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');

=======
    
    // State Form Curhat
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    
>>>>>>> 664b17580807ab2abe3415669c17297d2005b759
    // State Komentar & Edit
    const [expandedId, setExpandedId] = useState<number | null>(null);
    const [comments, setComments] = useState<{ [key: number]: Comment[] }>({});
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editValue, setEditValue] = useState('');
    const [now, setNow] = useState(Date.now());
<<<<<<< HEAD

=======
    
>>>>>>> 664b17580807ab2abe3415669c17297d2005b759
    // State Balasan
    const [replyName, setReplyName] = useState('');
    const [replyText, setReplyText] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [cooldown, setCooldown] = useState(0);

    const isAdmin = localStorage.getItem('khazanah_token') !== null;

    // 1. Fetch Data Awal (Curhatan + Jumlah Komentar)
    const fetchAllData = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/ruang');
            const data = await res.json();
<<<<<<< HEAD

=======
            
>>>>>>> 664b17580807ab2abe3415669c17297d2005b759
            // Untuk setiap curhatan, kita fetch jumlah komentarnya agar angka di tombol akurat
            const enrichedData = await Promise.all(data.map(async (c: any) => {
                const commRes = await fetch(`http://localhost:5000/api/ruang/${c.id}/comments`);
                const commData = await commRes.json();
                return { ...c, comment_count: commData.length };
            }));
<<<<<<< HEAD

=======
            
>>>>>>> 664b17580807ab2abe3415669c17297d2005b759
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
            setNow(Date.now());
            setCooldown((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
<<<<<<< HEAD
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const res = await fetch('http://localhost:5000/api/ruang', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ sender_name: name || 'Hamba Allah', message })
            });
            if (res.ok) {
                Swal.fire({
                    title: 'Alhamdulillah!',
                    text: 'Ceritamu berhasil dikirim. Tunggu persetujuan Leader agar tampil di publik ya! ✨',
                    icon: 'success',
                    confirmButtonColor: '#18703E',
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
=======
    e.preventDefault();
    setIsSubmitting(true);
    try {
        const res = await fetch('http://localhost:5000/api/ruang', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ sender_name: name || 'Hamba Allah', message })
        });
        if (res.ok) {
            Swal.fire({
                title: 'Alhamdulillah!',
                text: 'Ceritamu berhasil dikirim. Tunggu persetujuan Leader agar tampil di publik ya! ✨',
                icon: 'success',
                confirmButtonColor: '#18703E',
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
>>>>>>> 664b17580807ab2abe3415669c17297d2005b759

    // 3. Toggle & Sync Komentar
    const toggleComments = async (curhatId: number) => {
        if (expandedId === curhatId) {
            setExpandedId(null);
            return;
        }
        setExpandedId(curhatId);
        try {
            const res = await fetch(`http://localhost:5000/api/ruang/${curhatId}/comments`);
            const data = await res.json();
            setComments(prev => ({ ...prev, [curhatId]: data }));
        } catch (error) { console.error(error); }
    };

    const handleSubmitReply = async (e: React.FormEvent, curhatId: number) => {
        e.preventDefault();
        if (cooldown > 0 || !replyText.trim()) return;

        try {
            const res = await fetch(`http://localhost:5000/api/ruang/${curhatId}/comments`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ sender_name: replyName || 'Hamba Allah', comment_text: replyText })
            });
<<<<<<< HEAD

            if (res.ok) {
                const updatedRes = await fetch(`http://localhost:5000/api/ruang/${curhatId}/comments`);
                const updatedData = await updatedRes.json();

=======
            
            if (res.ok) {
                const updatedRes = await fetch(`http://localhost:5000/api/ruang/${curhatId}/comments`);
                const updatedData = await updatedRes.json();
                
>>>>>>> 664b17580807ab2abe3415669c17297d2005b759
                // Tambahkan Timer Edit 20 detik hanya untuk komentar yang baru saja dikirim
                const dataWithTimer = updatedData.map((c: any) => ({
                    ...c,
                    editableUntil: c.comment_text === replyText ? Date.now() + 20000 : 0
                }));

                setComments(prev => ({ ...prev, [curhatId]: dataWithTimer }));
<<<<<<< HEAD

                // Update jumlah komentar di tombol secara real-time
                setCurhatans(prev => prev.map(c => c.id === curhatId ? { ...c, comment_count: updatedData.length } : c));

=======
                
                // Update jumlah komentar di tombol secara real-time
                setCurhatans(prev => prev.map(c => c.id === curhatId ? { ...c, comment_count: updatedData.length } : c));
                
>>>>>>> 664b17580807ab2abe3415669c17297d2005b759
                setReplyName('');
                setReplyText('');
                setCooldown(30);
            }
        } catch (error) { console.error(error); }
    };

    // Logika Hapus Komentar (Hanya Admin)
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
            // Logika hapus (nanti hubungkan ke API delete comment)
            setComments(prev => ({
                ...prev,
                [curhatId]: prev[curhatId].filter(c => c.id !== commentId)
            }));
            setCurhatans(prev => prev.map(c => c.id === curhatId ? { ...c, comment_count: c.comment_count - 1 } : c));
            Swal.fire('Terhapus!', 'Komentar berhasil dihapus.', 'success');
        }
    };

    return (
        <div className="bg-[#fdfdfd] min-h-screen pt-28 pb-20 relative overflow-hidden font-sans">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10">
<<<<<<< HEAD

=======
                
>>>>>>> 664b17580807ab2abe3415669c17297d2005b759
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-khazanah-light text-khazanah-green text-xs font-bold uppercase tracking-widest mb-4 border border-khazanah-green/10">
                        <Sparkles size={14} /> Ruang Publik
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-2 tracking-tight">Ruang Cerita</h1>
                </div>

                {/* FORM CURHAT */}
                <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-khazanah-dark/5 border border-gray-100 mb-14">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
<<<<<<< HEAD
                            <input
                                type="text"
                                placeholder="Nama Anda (Opsional)"
=======
                            <input 
                                type="text" 
                                placeholder="Nama Anda (Opsional)" 
>>>>>>> 664b17580807ab2abe3415669c17297d2005b759
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-4 focus:ring-khazanah-green/5 outline-none transition-all"
                            />
                        </div>
<<<<<<< HEAD
                        <textarea
                            rows={3}
                            required
                            placeholder="Tulis ceritamu di sini..."
=======
                        <textarea 
                            rows={3}
                            required
                            placeholder="Tulis ceritamu di sini..." 
>>>>>>> 664b17580807ab2abe3415669c17297d2005b759
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="w-full px-6 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-4 focus:ring-khazanah-green/5 outline-none resize-none transition-all"
                        ></textarea>
                        <div className="flex justify-end">
<<<<<<< HEAD
                            <button
                                type="submit"
=======
                            <button 
                                type="submit" 
>>>>>>> 664b17580807ab2abe3415669c17297d2005b759
                                disabled={isSubmitting}
                                className="bg-khazanah-green text-white px-8 py-3.5 rounded-2xl font-bold hover:bg-khazanah-dark transition-all shadow-lg flex items-center gap-2 disabled:opacity-50"
                            >
                                {isSubmitting ? <Loader2 className="animate-spin" /> : <><Send size={18} /> Bagikan Cerita</>}
                            </button>
                        </div>
                    </form>
                </div>

                {/* LIST CURHATAN */}
                <div className="space-y-8">
                    {isLoading ? (
                        <div className="text-center py-10"><Loader2 className="mx-auto animate-spin text-khazanah-green" size={40} /></div>
                    ) : curhatans.map((c) => (
                        <div key={c.id} className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 animate-in fade-in duration-500">
                            <div className="flex items-start gap-5">
                                <div className="w-12 h-12 bg-gradient-to-br from-khazanah-green to-khazanah-dark rounded-2xl flex items-center justify-center font-black text-white shrink-0 shadow-lg">
                                    {c.sender_name.charAt(0).toUpperCase()}
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-center">
                                        <h4 className="font-bold text-gray-900">{c.sender_name}</h4>
                                        <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">{new Date(c.created_at).toLocaleDateString('id-ID')}</span>
                                    </div>
                                    <p className="mt-3 text-gray-700 leading-relaxed text-lg">{c.message}</p>
<<<<<<< HEAD

                                    <button
                                        onClick={() => toggleComments(c.id)}
                                        className={`mt-6 flex items-center gap-2 px-5 py-2 rounded-full font-bold text-sm transition-all ${expandedId === c.id ? 'bg-khazanah-green text-white' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
                                            }`}
                                    >
                                        <MessageSquare size={16} />
=======
                                    
                                    <button 
                                        onClick={() => toggleComments(c.id)}
                                        className={`mt-6 flex items-center gap-2 px-5 py-2 rounded-full font-bold text-sm transition-all ${
                                            expandedId === c.id ? 'bg-khazanah-green text-white' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
                                        }`}
                                    >
                                        <MessageSquare size={16} /> 
>>>>>>> 664b17580807ab2abe3415669c17297d2005b759
                                        {expandedId === c.id ? 'Tutup Diskusi' : `Lihat Diskusi (${c.comment_count})`}
                                    </button>
                                </div>
                            </div>

                            {/* COMMENTS SECTION */}
                            {expandedId === c.id && (
                                <div className="ml-4 sm:ml-16 mt-8 space-y-6 animate-in slide-in-from-top-4 duration-300">
                                    <div className="space-y-4">
                                        {comments[c.id]?.map(comment => {
                                            const timeLeft = Math.max(0, Math.ceil((comment.editableUntil - now) / 1000));
                                            const isEditing = editingId === comment.id;

                                            return (
                                                <div key={comment.id} className="group relative flex gap-4 p-5 bg-gray-50/50 rounded-2xl border border-gray-100">
                                                    <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center font-bold text-khazanah-green shrink-0 border text-xs">
                                                        {comment.sender_name.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="flex items-center justify-between mb-1">
                                                            <span className="font-bold text-sm text-gray-900">{comment.sender_name}</span>
                                                            <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                                                {timeLeft > 0 && !isEditing && (
<<<<<<< HEAD
                                                                    <button onClick={() => { setEditingId(comment.id); setEditValue(comment.comment_text) }} className="text-[10px] font-bold text-blue-500 flex items-center gap-1">
=======
                                                                    <button onClick={() => {setEditingId(comment.id); setEditValue(comment.comment_text)}} className="text-[10px] font-bold text-blue-500 flex items-center gap-1">
>>>>>>> 664b17580807ab2abe3415669c17297d2005b759
                                                                        <Edit2 size={12} /> Edit ({timeLeft}s)
                                                                    </button>
                                                                )}
                                                                {isAdmin && (
                                                                    <button onClick={() => handleDeleteComment(c.id, comment.id)} className="text-[10px] font-bold text-red-500 flex items-center gap-1 hover:scale-105 transition-transform">
                                                                        <Trash2 size={12} /> Hapus
                                                                    </button>
                                                                )}
                                                            </div>
                                                        </div>
                                                        {isEditing ? (
                                                            <div className="mt-2 space-y-2">
                                                                <textarea value={editValue} onChange={(e) => setEditValue(e.target.value)} className="w-full p-3 text-sm rounded-xl border border-khazanah-green outline-none bg-white" rows={2} />
                                                                <div className="flex gap-2">
                                                                    <button onClick={() => {
<<<<<<< HEAD
                                                                        setComments(prev => ({ ...prev, [c.id]: prev[c.id].map(com => com.id === comment.id ? { ...com, comment_text: editValue } : com) }));
=======
                                                                        setComments(prev => ({...prev, [c.id]: prev[c.id].map(com => com.id === comment.id ? {...com, comment_text: editValue} : com)}));
>>>>>>> 664b17580807ab2abe3415669c17297d2005b759
                                                                        setEditingId(null);
                                                                    }} className="bg-khazanah-green text-white px-3 py-1 rounded-lg text-xs font-bold">Simpan</button>
                                                                    <button onClick={() => setEditingId(null)} className="bg-gray-200 text-gray-600 px-3 py-1 rounded-lg text-xs font-bold">Batal</button>
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <p className="text-gray-600 text-sm">{comment.comment_text}</p>
                                                        )}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>

                                    {/* REPLY FORM */}
                                    <form onSubmit={(e) => handleSubmitReply(e, c.id)} className="bg-white p-2 rounded-2xl border border-gray-100 shadow-inner flex flex-col sm:flex-row gap-2">
                                        <input type="text" placeholder="Nama..." value={replyName} onChange={(e) => setReplyName(e.target.value)} className="px-4 py-2 text-sm rounded-xl bg-transparent outline-none w-full sm:w-1/4" />
                                        <input type="text" required placeholder={cooldown > 0 ? `Tunggu ${cooldown}s...` : "Tanggapi cerita ini..."} disabled={cooldown > 0} value={replyText} onChange={(e) => setReplyText(e.target.value)} className="flex-1 px-4 py-2 text-sm bg-transparent outline-none" />
                                        <button type="submit" disabled={cooldown > 0} className="bg-khazanah-green text-white p-3 rounded-xl hover:bg-khazanah-dark transition disabled:opacity-50">
                                            {cooldown > 0 ? <Clock size={18} /> : <Send size={18} />}
                                        </button>
                                    </form>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RuangPublic;