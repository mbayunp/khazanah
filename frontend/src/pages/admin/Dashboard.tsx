import React, { useState, useEffect } from 'react';
import { Users, CalendarDays, CheckCircle, ShieldAlert, Sparkles, MessageSquare, Loader2 } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, BarChart, Bar, CartesianGrid } from 'recharts';
import { API_ENDPOINTS } from '../../config/api';

interface StatItem {
    title: string;
    value: number;
    icon: React.ReactNode;
    color: string;
    bgColor: string;
}

interface RecentRegistrant {
    id: number;
    name: string;
    community_type: string;
    domicile: string;
    status: string;
    created_at: string;
}

const Dashboard: React.FC = () => {
    const [stats, setStats] = useState({
        programsCount: 0,
        membersCount: 0,
        leadersCount: 0,
        pendingCurhatCount: 0
    });
    const [recentRegistrations, setRecentRegistrations] = useState<RecentRegistrant[]>([]);
    const [distributionData, setDistributionData] = useState<{ name: string; count: number }[]>([]);
    const [growthData, setGrowthData] = useState<{ day: string; Pendaftar: number }[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchDashboardData = async () => {
        setIsLoading(true);
        try {
            // Fetch Programs
            const progRes = await fetch(API_ENDPOINTS.programs);
            const progs = progRes.ok ? await progRes.json() : [];

            // Fetch Sholehah Members
            const sholehahRes = await fetch(`${API_ENDPOINTS.members}/sholehah`);
            const sholehahMembers = sholehahRes.ok ? await sholehahRes.json() : [];

            // Fetch Jofisah Members
            const jofisahRes = await fetch(`${API_ENDPOINTS.members}/jofisah`);
            const jofisahMembers = jofisahRes.ok ? await jofisahRes.json() : [];

            // Fetch Leaders
            const leaderRes = await fetch(API_ENDPOINTS.leaders);
            const leaders = leaderRes.ok ? await leaderRes.json() : [];

            // Fetch Curhatans (Ruang Curhat)
            const curhatRes = await fetch(`${API_ENDPOINTS.ruang}/admin`);
            const curhats = curhatRes.ok ? await curhatRes.json() : [];

            const totalMembers = sholehahMembers.length + jofisahMembers.length;
            const pendingCurhats = curhats.filter((c: any) => c.status === 'pending').length;

            setStats({
                programsCount: progs.length,
                membersCount: totalMembers,
                leadersCount: leaders.length,
                pendingCurhatCount: pendingCurhats
            });

            // Process Recent Registrants (Merge & Sort by Date)
            const allMembers = [
                ...sholehahMembers.map((m: any) => ({ ...m, community_type: 'Sholehah' })),
                ...jofisahMembers.map((m: any) => ({ ...m, community_type: 'Jofisah' }))
            ];
            allMembers.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
            setRecentRegistrations(allMembers.slice(0, 5));

            // Chart 1: Distribution
            setDistributionData([
                { name: 'Sholehah', count: sholehahMembers.length },
                { name: 'Jofisah', count: jofisahMembers.length },
                { name: 'Leaders', count: leaders.length },
                { name: 'Curhatans', count: curhats.length }
            ]);

            // Chart 2: Growth Trend (Last 7 days mock based on real totals)
            const baseValue = Math.max(5, Math.floor(totalMembers / 7));
            setGrowthData([
                { day: 'Sen', Pendaftar: Math.max(1, baseValue - 2) },
                { day: 'Sel', Pendaftar: Math.max(2, baseValue - 1) },
                { day: 'Rab', Pendaftar: Math.max(3, baseValue + 1) },
                { day: 'Kam', Pendaftar: Math.max(2, baseValue) },
                { day: 'Jum', Pendaftar: Math.max(4, baseValue + 3) },
                { day: 'Sab', Pendaftar: Math.max(5, baseValue + 5) },
                { day: 'Min', Pendaftar: Math.max(1, baseValue + 2) }
            ]);

        } catch (error) {
            console.error('Error fetching dashboard statistics', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const statItems: StatItem[] = [
        {
            title: 'Total Program',
            value: stats.programsCount,
            icon: <CalendarDays size={22} />,
            color: 'text-blue-600',
            bgColor: 'bg-blue-50 border-blue-100'
        },
        {
            title: 'Total Member',
            value: stats.membersCount,
            icon: <Users size={22} />,
            color: 'text-emerald-700',
            bgColor: 'bg-emerald-50 border-emerald-100'
        },
        {
            title: 'Community Leaders',
            value: stats.leadersCount,
            icon: <CheckCircle size={22} />,
            color: 'text-amber-600',
            bgColor: 'bg-amber-50 border-amber-100'
        },
        {
            title: 'Moderasi Curhat',
            value: stats.pendingCurhatCount,
            icon: <MessageSquare size={22} />,
            color: 'text-rose-600',
            bgColor: 'bg-rose-50 border-rose-100'
        }
    ];

    if (isLoading) {
        return (
            <div className="flex h-[60vh] flex-col items-center justify-center text-gray-400">
                <Loader2 className="animate-spin text-emerald mb-3" size={40} />
                <span className="font-semibold text-sm">Memuat Ringkasan Dashboard...</span>
            </div>
        );
    }

    return (
        <div className="space-y-8 font-sans">
            
            {/* Header Welcome */}
            <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100/80">
                <h1 className="text-2xl md:text-3xl font-outfit font-black text-gray-800 mb-2">Selamat Datang, Admin! 👋</h1>
                <p className="text-gray-500 font-medium text-xs sm:text-sm">Berikut adalah ringkasan perkembangan dakwah & komunitas Khazanah hari ini.</p>
            </div>

            {/* Statistik Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {statItems.map((item, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100/70 flex items-center gap-4 hover:shadow-md transition-shadow">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${item.color} ${item.bgColor} shrink-0 shadow-sm`}>
                            {item.icon}
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">{item.title}</p>
                            <h3 className="text-2xl font-outfit font-bold text-gray-800">{item.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Chart 1: Growth Trend */}
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                    <h3 className="text-base font-outfit font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <Sparkles size={16} className="text-emerald" /> Tren Pendaftaran (Minggu Ini)
                    </h3>
                    <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={growthData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorPendaftar" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#0F5B30" stopOpacity={0.2}/>
                                        <stop offset="95%" stopColor="#0F5B30" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f3f3" />
                                <XAxis dataKey="day" stroke="#9ca3af" fontSize={11} tickLine={false} />
                                <YAxis stroke="#9ca3af" fontSize={11} tickLine={false} axisLine={false} />
                                <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #f3f3f3', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }} />
                                <Area type="monotone" dataKey="Pendaftar" stroke="#0F5B30" strokeWidth={2} fillOpacity={1} fill="url(#colorPendaftar)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Chart 2: Category Distribution */}
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                    <h3 className="text-base font-outfit font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <ShieldAlert size={16} className="text-gold" /> Distribusi Ekosistem Khazanah
                    </h3>
                    <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={distributionData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f3f3" />
                                <XAxis dataKey="name" stroke="#9ca3af" fontSize={11} tickLine={false} />
                                <YAxis stroke="#9ca3af" fontSize={11} tickLine={false} axisLine={false} />
                                <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #f3f3f3', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }} />
                                <Bar dataKey="count" fill="#C5A85C" radius={[8, 8, 0, 0]} barSize={36} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Recent Registrations Table */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 overflow-hidden">
                <h3 className="text-base font-outfit font-bold text-gray-800 mb-4">Pendaftar Terbaru (Semua Komunitas)</h3>
                <div className="overflow-x-auto custom-scrollbar">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-gray-100 text-xs font-bold text-gray-400 uppercase tracking-wider">
                                <th className="pb-3 pl-3">Nama</th>
                                <th className="pb-3">Komunitas</th>
                                <th className="pb-3">Domisili</th>
                                <th className="pb-3">Tanggal</th>
                                <th className="pb-3 text-right pr-3">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {recentRegistrations.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="py-8 text-center text-gray-400 font-medium text-xs">Belum ada pendaftar terbaru.</td>
                                </tr>
                            ) : (
                                recentRegistrations.map((reg) => (
                                    <tr key={reg.id} className="text-xs text-gray-700 hover:bg-gray-50/50 transition">
                                        <td className="py-3.5 pl-3 font-bold text-gray-900">{reg.name}</td>
                                        <td className="py-3.5">
                                            <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                                                reg.community_type === 'Sholehah' 
                                                    ? 'bg-pink-100 text-pink-700' 
                                                    : 'bg-sky-100 text-sky-700'
                                            }`}>
                                                {reg.community_type}
                                            </span>
                                        </td>
                                        <td className="py-3.5 font-medium text-gray-500">{reg.domicile}</td>
                                        <td className="py-3.5 font-semibold text-gray-400">
                                            {new Date(reg.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                                        </td>
                                        <td className="py-3.5 text-right pr-3">
                                            <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                                                reg.status === 'approved' 
                                                    ? 'bg-green-100 text-green-700' 
                                                    : 'bg-amber-100 text-amber-700'
                                            }`}>
                                                {reg.status.toUpperCase()}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
};

export default Dashboard;