import React, { useState, useEffect } from 'react';
import { Users, Search, Filter, MessageCircle, MoreVertical, ShieldAlert, Sparkles, Rocket, Loader2, CheckCircle, Clock, Trash2, MapPin } from 'lucide-react';
import Swal from 'sweetalert2';
import { API_ENDPOINTS } from '../../config/api';

interface Member {
    id: number;
    name: string;
    gender: string;
    phone: string;
    generation: string;
    activity: string;
    domicile: string;
    is_interested_leader: boolean;
    leader_interest_area?: string;
    leader_reason?: string;
    concerns: string;
    goals: string;
    requested_topics?: string;
    speaker_recommendation?: string;
    status: 'pending' | 'approved' | 'rejected';
    created_at: string;
    community_type: 'Sholehah' | 'Jofisah';
}

const MembersAdmin: React.FC = () => {
    const [members, setMembers] = useState<Member[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'Sholehah' | 'Jofisah'>('Sholehah');
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    const fetchMembers = async (type: 'Sholehah' | 'Jofisah') => {
        setIsLoading(true);
        try {
            const endpoint = type === 'Sholehah' ? 'sholehah' : 'jofisah';
            const res = await fetch(`${API_ENDPOINTS.members}/${endpoint}`);
            const data = await res.json();

            // Validasi: Pastikan 'data' adalah Array sebelum di-set
            if (res.ok && Array.isArray(data)) {
                setMembers(data);
            } else {
                console.error("Data bukan array atau API error:", data);
                setMembers([]); // Jadikan array kosong agar .filter tidak crash
            }

        } catch (error) {
            console.error("Gagal memuat data", error);
            Swal.fire('Error', 'Gagal memuat data member', 'error');
            setMembers([]); // Amankan dengan array kosong
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchMembers(activeTab);
    }, [activeTab]);

    const handleUpdateStatus = async (id: number, currentStatus: string, community: string) => {
        const nextStatus = currentStatus === 'pending' ? 'approved' : 'pending';

        try {
            await fetch(`${API_ENDPOINTS.members}/${id}/status`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ community: community.toLowerCase(), status: nextStatus })
            });
            fetchMembers(activeTab); // Refresh data
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (id: number, name: string, community: string) => {
        const result = await Swal.fire({
            title: `Hapus ${name}?`,
            text: "Data yang dihapus tidak dapat dikembalikan.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            confirmButtonText: 'Ya, Hapus!'
        });

        if (result.isConfirmed) {
            try {
                await fetch(`${API_ENDPOINTS.members}/${id}`, {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ community: community.toLowerCase() })
                });
                Swal.fire('Terhapus!', 'Data berhasil dihapus.', 'success');
                fetchMembers(activeTab);
            } catch (error) {
                Swal.fire('Error', 'Gagal menghapus data', 'error');
            }
        }
    };

    // Filter Logic
    const filteredMembers = members.filter(m => {
        const matchSearch = m.name.toLowerCase().includes(searchTerm.toLowerCase()) || m.domicile.toLowerCase().includes(searchTerm.toLowerCase());
        const matchStatus = statusFilter === 'all' || m.status === statusFilter;
        return matchSearch && matchStatus;
    });

    const themeColor = activeTab === 'Sholehah' ? 'pink' : 'blue';

    return (
        <div className="p-4 lg:p-8 max-w-[100vw] mx-auto min-h-screen font-sans">

            {/* 1. HEADER & STATS */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-4">
                    <div className={`p-4 bg-${themeColor}-100 text-${themeColor}-600 rounded-2xl shadow-sm`}>
                        <Users size={32} />
                    </div>
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Data Keanggotaan</h1>
                        <p className="text-gray-500 font-medium mt-1">Review, filter, dan kelola pendaftar baru Khazanah</p>
                    </div>
                </div>
            </div>

            {/* 2. TABS & FILTER TOOLBAR */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-2 mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">

                {/* TABS */}
                <div className="flex bg-gray-50 p-1.5 rounded-xl w-full md:w-auto shrink-0 border border-gray-200/60">
                    <button
                        onClick={() => setActiveTab('Sholehah')}
                        className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-bold text-sm transition-all duration-300 ${activeTab === 'Sholehah' ? 'bg-white text-pink-600 shadow-sm border border-pink-100' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        <Sparkles size={16} /> Sholehah
                    </button>
                    <button
                        onClick={() => setActiveTab('Jofisah')}
                        className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-bold text-sm transition-all duration-300 ${activeTab === 'Jofisah' ? 'bg-white text-blue-600 shadow-sm border border-blue-100' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        <Rocket size={16} /> Jofisah
                    </button>
                </div>

                {/* SEARCH & STATUS FILTER */}
                <div className="flex w-full md:w-auto gap-3 flex-1 md:justify-end">
                    <div className="relative flex-1 md:max-w-xs group">
                        <Search className={`absolute left-3 top-3 text-gray-400 group-focus-within:text-${themeColor}-500 transition-colors`} size={18} />
                        <input type="text" placeholder="Cari nama atau kota..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 border-none ring-1 ring-gray-200 outline-none focus:ring-2 focus:ring-${themeColor}-400 focus:bg-white text-sm font-medium transition-all`} />
                    </div>
                    <div className="relative shrink-0 w-36">
                        <Filter className="absolute left-3 top-3 text-gray-400" size={18} />
                        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className={`w-full pl-10 pr-8 py-2.5 rounded-xl bg-gray-50 border-none ring-1 ring-gray-200 outline-none focus:ring-2 focus:ring-${themeColor}-400 text-sm font-bold text-gray-700 appearance-none cursor-pointer transition-all`}>
                            <option value="all">Semua Status</option>
                            <option value="pending">Pending</option>
                            <option value="approved">Approved</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* 3. LIST MEMBER CARDS (GRID) */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {isLoading ? (
                    <div className="xl:col-span-2 py-20 flex flex-col items-center justify-center text-gray-400">
                        <Loader2 className={`animate-spin text-${themeColor}-500 mb-4`} size={40} />
                        <span className="font-medium">Memuat data pendaftar...</span>
                    </div>
                ) : filteredMembers.length === 0 ? (
                    <div className="xl:col-span-2 py-20 bg-white rounded-3xl border border-dashed border-gray-300 text-center flex flex-col items-center">
                        <Users className="text-gray-300 mb-3" size={48} />
                        <p className="text-gray-500 font-medium">Belum ada data pendaftar yang sesuai kriteria.</p>
                    </div>
                ) : (
                    filteredMembers.map((member) => (
                        <div key={member.id} className="bg-white rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow overflow-hidden flex flex-col">

                            {/* Card Header */}
                            <div className={`p-5 flex justify-between items-start border-b border-gray-50 bg-gradient-to-r ${activeTab === 'Sholehah' ? 'from-pink-50/50 to-white' : 'from-blue-50/50 to-white'}`}>
                                <div className="flex gap-4 items-center">
                                    <div className={`w-14 h-14 rounded-2xl bg-${themeColor}-100 text-${themeColor}-600 flex items-center justify-center font-black text-xl shrink-0 border border-${themeColor}-200/50`}>
                                        {member.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-black text-gray-900 leading-tight mb-1">{member.name}</h3>
                                        <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-gray-500">
                                            <span className="flex items-center gap-1"><MapPin size={12} /> {member.domicile}</span>
                                            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                            <span>{member.activity}</span>
                                            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                            <span>{member.generation}</span>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleUpdateStatus(member.id, member.status, member.community_type)}
                                    className={`px-3 py-1.5 rounded-full text-xs font-black flex items-center gap-1.5 transition-colors ${member.status === 'approved' ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-amber-100 text-amber-700 hover:bg-amber-200'}`}
                                >
                                    {member.status === 'approved' ? <CheckCircle size={14} /> : <Clock size={14} />}
                                    {member.status.toUpperCase()}
                                </button>
                            </div>

                            {/* Card Body (Insights) */}
                            <div className="p-5 flex-1 space-y-4">
                                {member.is_interested_leader && (
                                    <div className={`bg-${themeColor}-50 border border-${themeColor}-100 p-3 rounded-xl flex items-start gap-3`}>
                                        <ShieldAlert className={`text-${themeColor}-600 shrink-0 mt-0.5`} size={18} />
                                        <div>
                                            <p className={`text-xs font-black uppercase text-${themeColor}-700 tracking-wider mb-1`}>Tertarik Menjadi Leader!</p>
                                            <p className={`text-sm font-semibold text-${themeColor}-900`}>{member.leader_interest_area}</p>
                                            {member.leader_reason && <p className="text-xs text-gray-600 mt-1 italic leading-relaxed line-clamp-2">"{member.leader_reason}"</p>}
                                        </div>
                                    </div>
                                )}

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                                        <p className="text-[10px] font-black uppercase text-gray-400 tracking-wider mb-2">Keresahan / Masalah</p>
                                        <p className="text-sm text-gray-700 leading-relaxed line-clamp-3">{member.concerns}</p>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                                        <p className="text-[10px] font-black uppercase text-gray-400 tracking-wider mb-2">Harapan Gabung</p>
                                        <p className="text-sm text-gray-700 leading-relaxed line-clamp-3">{member.goals}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Card Footer (Actions) */}
                            <div className="p-4 border-t border-gray-50 bg-gray-50/50 flex justify-between items-center gap-3">
                                <span className="text-xs text-gray-400 font-bold px-2">
                                    Daftar: {new Date(member.created_at).toLocaleDateString('id-ID')}
                                </span>
                                <div className="flex gap-2">
                                    <button onClick={() => handleDelete(member.id, member.name, member.community_type)} className="p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors">
                                        <Trash2 size={18} />
                                    </button>
                                    <a
                                        href={`https://wa.me/${member.phone.replace(/\D/g, '')}`}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-md shadow-green-500/20 transition-all"
                                    >
                                        <MessageCircle size={18} /> Chat WA
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

        </div>
    );
};

export default MembersAdmin;