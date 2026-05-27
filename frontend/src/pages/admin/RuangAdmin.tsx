import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Trash2, MessageSquare, Loader2, Filter, Sparkles } from 'lucide-react';
import Swal from 'sweetalert2';
import { API_ENDPOINTS } from '../../config/api';

interface CurhatanAdmin {
    id: number;
    sender_name: string;
    message: string;
    status: 'pending' | 'approved' | 'rejected';
    created_at: string;
}

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
        case 'Pendidikan': return 'bg-amber-100 text-amber-800 border-amber-250';
        case 'Keluarga': return 'bg-rose-100 text-rose-800 border-rose-250';
        case 'Relationship': return 'bg-sky-100 text-sky-800 border-sky-250';
        case 'Iman & Ragu': return 'bg-emerald-100 text-emerald-800 border-emerald-250';
        default: return 'bg-purple-100 text-purple-800 border-purple-250';
    }
};

const RuangAdmin: React.FC = () => {
    const [curhatans, setCurhatans] = useState<CurhatanAdmin[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeFilter, setActiveFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');

    const fetchCurhatan = async () => {
        setIsLoading(true);
        try {
            const res = await fetch(`${API_ENDPOINTS.ruang}/admin`);
            const data = await res.json();
            setCurhatans(data);
        } catch (error) { 
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => { fetchCurhatan(); }, []);

    const handleRespond = async (id: number, status: 'approved' | 'rejected') => {
        try {
            await fetch(`${API_ENDPOINTS.ruang}/${id}/respond`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ admin_response: '', status })
            });
            Swal.fire({
                title: 'Berhasil!',
                text: `Curhatan telah di-${status === 'approved' ? 'setujui untuk tayang' : 'sembunyikan'}`,
                icon: 'success',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 2000
            });
            fetchCurhatan();
        } catch (error) { 
            console.error(error);
            Swal.fire('Error', 'Gagal merespon curhatan', 'error');
        }
    };

    const handleDelete = async (id: number) => {
        const result = await Swal.fire({
            title: 'Hapus Curhatan?',
            text: "Data curhatan akan dihapus secara permanen.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#gray',
            confirmButtonText: 'Ya, Hapus!'
        });

        if (result.isConfirmed) {
            try {
                await fetch(`${API_ENDPOINTS.ruang}/${id}`, { method: 'DELETE' });
                Swal.fire('Terhapus!', 'Curhatan berhasil dihapus permanen.', 'success');
                fetchCurhatan();
            } catch (error) { 
                console.error(error);
                Swal.fire('Error', 'Gagal menghapus curhatan', 'error');
            }
        }
    };

    const filteredCurhatans = curhatans.filter(c => {
        if (activeFilter === 'all') return true;
        return c.status === activeFilter;
    });

    const counts = {
        all: curhatans.length,
        pending: curhatans.filter(c => c.status === 'pending').length,
        approved: curhatans.filter(c => c.status === 'approved').length,
        rejected: curhatans.filter(c => c.status === 'rejected').length
    };

    return (
        <div className="max-w-6xl mx-auto min-h-[80vh] font-sans pb-10">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-emerald/10 text-emerald rounded-2xl shadow-sm">
                        <MessageSquare size={26} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-outfit font-black text-gray-800">Moderasi Ruang Cerita</h1>
                        <p className="text-gray-550 text-xs sm:text-sm font-medium mt-0.5">Saring, tinjau, dan setujui curhatan anonim yang masuk ke website</p>
                    </div>
                </div>
            </div>

            {/* Filter Toolbar */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-2.5 mb-6 flex flex-wrap gap-2 items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                    {(['all', 'pending', 'approved', 'rejected'] as const).map((filter) => (
                        <button
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
                            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all capitalize ${
                                activeFilter === filter
                                    ? 'bg-emerald text-[#FAF6EE] shadow-sm'
                                    : 'bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-gray-850'
                            }`}
                        >
                            {filter === 'all' ? 'Semua' : filter} ({counts[filter]})
                        </button>
                    ))}
                </div>
                <div className="text-xs font-semibold text-gray-400 flex items-center gap-1.5 px-2">
                    <Filter size={14} /> Menyaring {filteredCurhatans.length} cerita
                </div>
            </div>

            {/* Moderation Cards Grid */}
            {isLoading ? (
                <div className="py-20 flex flex-col items-center justify-center text-gray-400">
                    <Loader2 className="animate-spin text-emerald mb-3" size={40} />
                    <span className="font-semibold text-xs">Memuat data curhatan...</span>
                </div>
            ) : filteredCurhatans.length === 0 ? (
                <div className="py-20 bg-white rounded-3xl border border-dashed border-gray-300 text-center flex flex-col items-center justify-center">
                    <Sparkles className="text-gray-300 mb-3 animate-pulse" size={44} />
                    <p className="text-gray-500 font-bold text-sm">Tidak ada curhatan dalam antrean.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <AnimatePresence>
                        {filteredCurhatans.map((c) => {
                            const curCategory = getCategory(c.message);
                            return (
                                <motion.div
                                    key={c.id}
                                    layout
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.2 }}
                                    className={`bg-white p-6 rounded-3xl shadow-sm border border-gray-100/80 hover:shadow-md transition-shadow flex flex-col justify-between relative overflow-hidden`}
                                >
                                    {/* Left Accent Pill */}
                                    <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${
                                        c.status === 'pending' ? 'bg-amber-400' : 
                                        c.status === 'approved' ? 'bg-green-500' : 'bg-red-500'
                                    }`} />

                                    <div>
                                        {/* Header Info */}
                                        <div className="flex justify-between items-start gap-4 mb-4">
                                            <div>
                                                <h3 className="font-outfit font-black text-gray-800 text-base">{c.sender_name}</h3>
                                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-0.5">
                                                    {new Date(c.created_at).toLocaleString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <span className={`px-2.5 py-0.5 rounded-full border text-[9px] font-bold ${getCategoryBadgeStyles(curCategory)}`}>
                                                    {curCategory}
                                                </span>
                                                <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase ${
                                                    c.status === 'pending' ? 'bg-amber-100 text-amber-700 border border-amber-200' : 
                                                    c.status === 'approved' ? 'bg-green-100 text-green-700 border border-green-200' : 
                                                    'bg-red-100 text-red-700 border border-red-200'
                                                }`}>{c.status}</span>
                                            </div>
                                        </div>
                                        
                                        {/* Message Content */}
                                        <div className="bg-gray-50/50 p-4 rounded-2xl text-gray-700 text-sm font-medium border border-gray-100/50 leading-relaxed mb-6">
                                            {c.message}
                                        </div>
                                    </div>

                                    {/* Footer Actions */}
                                    <div className="flex items-center gap-2 pt-2 border-t border-gray-50">
                                        {c.status !== 'approved' && (
                                            <button 
                                                onClick={() => handleRespond(c.id, 'approved')} 
                                                className="flex items-center gap-1.5 bg-emerald hover:bg-emerald-800 hover:shadow-premium text-[#FAF6EE] px-4 py-2 rounded-xl text-xs font-bold transition-all"
                                            >
                                                <CheckCircle size={14} /> Setujui
                                            </button>
                                        )}
                                        {c.status !== 'rejected' && (
                                            <button 
                                                onClick={() => handleRespond(c.id, 'rejected')} 
                                                className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-600 hover:shadow-premium text-white px-4 py-2 rounded-xl text-xs font-bold transition-all"
                                            >
                                                <XCircle size={14} /> Sembunyikan
                                            </button>
                                        )}
                                        <button 
                                            onClick={() => handleDelete(c.id)} 
                                            className="flex items-center gap-1.5 bg-red-50 hover:bg-red-100 text-red-600 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ml-auto"
                                        >
                                            <Trash2 size={14} /> Hapus
                                        </button>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>
            )}
        </div>
    );
};

export default RuangAdmin;