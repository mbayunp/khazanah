import React, { useState, useEffect } from 'react';
import { ShieldHalf, Search, Filter, MessageCircle, FileText, Loader2, Trash2, MapPin, Star, Target, CheckCircle2, XCircle } from 'lucide-react';
import Swal from 'sweetalert2';

interface Leader {
    id: number;
    full_name: string;
    nickname: string;
    email: string;
    phone: string;
    domicile: string;
    activity: string;
    skills: string;
    interests: string; // JSON string
    motivation: string;
    selling_point: string;
    cv_file: string;
    status: 'pending' | 'shortlisted' | 'interview' | 'accepted' | 'rejected';
    created_at: string;
}

const LeadersAdmin: React.FC = () => {
    const [leaders, setLeaders] = useState<Leader[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    const fetchLeaders = async () => {
        setIsLoading(true);
        try {
            const res = await fetch('http://localhost:5000/api/leaders');
            const data = await res.json();
            setLeaders(data);
        } catch (error) {
            console.error(error);
            Swal.fire('Error', 'Gagal memuat data pendaftar leader', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchLeaders();
    }, []);

    const handleUpdateStatus = async (id: number, newStatus: string) => {
        try {
            const res = await fetch(`http://localhost:5000/api/leaders/${id}/status`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus })
            });
            if (res.ok) {
                fetchLeaders();
            }
        } catch (error) {
            console.error(error);
            Swal.fire('Error', 'Gagal update status', 'error');
        }
    };

    const handleDelete = async (id: number, name: string) => {
        const result = await Swal.fire({
            title: `Hapus kandidat ${name}?`,
            text: "Data dan CV tidak dapat dikembalikan.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            confirmButtonText: 'Ya, Hapus!'
        });

        if (result.isConfirmed) {
            try {
                await fetch(`http://localhost:5000/api/leaders/${id}`, { method: 'DELETE' });
                Swal.fire('Terhapus!', 'Data berhasil dihapus.', 'success');
                fetchLeaders();
            } catch (error) {
                Swal.fire('Error', 'Gagal menghapus data', 'error');
            }
        }
    };

    // Filter Logic
    const filteredLeaders = leaders.filter(l => {
        const matchSearch = l.full_name.toLowerCase().includes(searchTerm.toLowerCase()) || l.skills.toLowerCase().includes(searchTerm.toLowerCase());
        const matchStatus = statusFilter === 'all' || l.status === statusFilter;
        return matchSearch && matchStatus;
    });

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'shortlisted': return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'interview': return 'bg-purple-100 text-purple-700 border-purple-200';
            case 'accepted': return 'bg-green-100 text-green-700 border-green-200';
            case 'rejected': return 'bg-red-100 text-red-700 border-red-200';
            default: return 'bg-amber-100 text-amber-700 border-amber-200'; // pending
        }
    };

    // Helper parse JSON interests
    const parseInterests = (interestsStr: string) => {
        try { return JSON.parse(interestsStr); }
        catch (e) { return []; }
    };

    return (
        <div className="p-4 lg:p-8 max-w-[100vw] mx-auto min-h-screen font-sans">

            {/* 1. HEADER */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-4">
                    <div className="p-4 bg-indigo-100 text-indigo-600 rounded-2xl shadow-sm">
                        <ShieldHalf size={32} />
                    </div>
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Community Leaders</h1>
                        <p className="text-gray-500 font-medium mt-1">Screening & rekrutmen pengurus Khazanah</p>
                    </div>
                </div>
            </div>

            {/* 2. FILTER TOOLBAR */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="flex w-full gap-3">
                    <div className="relative flex-1 group">
                        <Search className="absolute left-3 top-3 text-gray-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
                        <input type="text" placeholder="Cari nama atau skill (cth: Desain)..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 border-none ring-1 ring-gray-200 outline-none focus:ring-2 focus:ring-indigo-400 focus:bg-white text-sm font-medium transition-all" />
                    </div>
                    <div className="relative shrink-0 w-40">
                        <Filter className="absolute left-3 top-3 text-gray-400" size={18} />
                        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="w-full pl-10 pr-8 py-2.5 rounded-xl bg-gray-50 border-none ring-1 ring-gray-200 outline-none focus:ring-2 focus:ring-indigo-400 text-sm font-bold text-gray-700 appearance-none cursor-pointer transition-all">
                            <option value="all">Semua Status</option>
                            <option value="pending">Pending</option>
                            <option value="shortlisted">Shortlisted</option>
                            <option value="interview">Interview</option>
                            <option value="accepted">Accepted</option>
                            <option value="rejected">Rejected</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* 3. LIST KANDIDAT */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {isLoading ? (
                    <div className="xl:col-span-2 py-20 flex flex-col items-center justify-center text-gray-400">
                        <Loader2 className="animate-spin text-indigo-500 mb-4" size={40} />
                        <span className="font-medium">Memuat data kandidat...</span>
                    </div>
                ) : filteredLeaders.length === 0 ? (
                    <div className="xl:col-span-2 py-20 bg-white rounded-3xl border border-dashed border-gray-300 text-center flex flex-col items-center">
                        <ShieldHalf className="text-gray-300 mb-3" size={48} />
                        <p className="text-gray-500 font-medium">Belum ada kandidat yang mendaftar / sesuai kriteria.</p>
                    </div>
                ) : (
                    filteredLeaders.map((leader) => {
                        const interestsArray = parseInterests(leader.interests);

                        return (
                            <div key={leader.id} className="bg-white rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow overflow-hidden flex flex-col">

                                {/* Card Header */}
                                <div className="p-5 flex justify-between items-start border-b border-gray-50 bg-gradient-to-r from-indigo-50/30 to-white">
                                    <div className="flex gap-4 items-center">
                                        <div className="w-14 h-14 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center font-black text-xl shrink-0 border border-indigo-200/50">
                                            {leader.full_name.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-black text-gray-900 leading-tight mb-1">{leader.full_name} <span className="text-sm font-semibold text-gray-400">({leader.nickname})</span></h3>
                                            <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-gray-500">
                                                <span className="flex items-center gap-1"><MapPin size={12} /> {leader.domicile}</span>
                                                <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                                <span>{leader.activity}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Dropdown Status Pipeline */}
                                    <select
                                        value={leader.status}
                                        onChange={(e) => handleUpdateStatus(leader.id, e.target.value)}
                                        className={`px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-wider outline-none cursor-pointer border ${getStatusColor(leader.status)}`}
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="shortlisted">Shortlisted</option>
                                        <option value="interview">Interview</option>
                                        <option value="accepted">Accepted ✅</option>
                                        <option value="rejected">Rejected ❌</option>
                                    </select>
                                </div>

                                {/* Card Body (Skills & Motivation) */}
                                <div className="p-5 flex-1 space-y-5">

                                    {/* Skills & Interests Tags */}
                                    <div>
                                        <div className="flex items-center gap-1.5 mb-2 text-indigo-600">
                                            <Target size={16} /> <span className="text-xs font-black uppercase tracking-wider">Minat Kontribusi</span>
                                        </div>
                                        <div className="flex flex-wrap gap-1.5">
                                            {interestsArray.map((interest: string, i: number) => (
                                                <span key={i} className="bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-lg text-xs font-bold border border-indigo-100">
                                                    {interest}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex items-center gap-1.5 mb-2 text-amber-500">
                                            <Star size={16} /> <span className="text-xs font-black uppercase tracking-wider">Skills Terkuat</span>
                                        </div>
                                        <p className="text-sm font-bold text-gray-700">{leader.skills}</p>
                                    </div>

                                    <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                                        <p className="text-[10px] font-black uppercase text-gray-400 tracking-wider mb-1">Selling Point / Motivasi</p>
                                        <p className="text-sm text-gray-700 leading-relaxed italic line-clamp-3">"{leader.selling_point}"</p>
                                    </div>
                                </div>

                                {/* Card Footer (Actions) */}
                                <div className="p-4 border-t border-gray-50 bg-gray-50/50 flex justify-between items-center gap-3">
                                    <button onClick={() => handleDelete(leader.id, leader.full_name)} className="p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors" title="Hapus Kandidat">
                                        <Trash2 size={18} />
                                    </button>

                                    <div className="flex gap-2">
                                        <a
                                            href={`http://localhost:5000${leader.cv_file}`}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 hover:text-indigo-600 hover:border-indigo-300 px-4 py-2.5 rounded-xl text-sm font-bold transition-all shadow-sm"
                                        >
                                            <FileText size={18} /> Lihat CV
                                        </a>
                                        <a
                                            href={`https://wa.me/${leader.phone.replace(/\D/g, '')}`}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2.5 rounded-xl text-sm font-bold shadow-md shadow-green-500/20 transition-all"
                                        >
                                            <MessageCircle size={18} /> Chat
                                        </a>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

        </div>
    );
};

export default LeadersAdmin;