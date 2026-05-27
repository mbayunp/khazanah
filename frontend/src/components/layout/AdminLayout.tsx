import React, { useState } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import {
    LayoutDashboard,
    FolderKanban,
    Users,
    ShieldHalf,
    MicVocal,
    ListTodo,
    FileBarChart,
    Settings,
    LogOut,
    Menu,
    X,
    Globe,
    ChevronDown,
    ChevronUp,
    MessageSquare,
    FileText
} from 'lucide-react';
import Swal from 'sweetalert2';
import logo from '../../assets/logo.png';

const AdminLayout: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isProgramMenuOpen, setIsProgramMenuOpen] = useState(true);

    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        Swal.fire({
            title: 'Keluar dari Dashboard?',
            text: "Sesi Anda akan diakhiri.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#0F5B30',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya, Keluar',
            cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem('khazanah_token');
                navigate('/admin/login');
            }
        });
    };

    const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(`${path}/`);

    return (
        <div className="flex h-screen bg-[#FAF6EE] font-sans text-gray-800 overflow-hidden">

            {/* Overlay Mobile */}
            <div
                className={`fixed inset-0 bg-emerald-950/40 backdrop-blur-sm z-25 lg:hidden transition-opacity ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setIsSidebarOpen(false)}
            ></div>

            {/* Sidebar Container */}
            <aside className={`fixed inset-y-0 left-0 z-30 w-64 bg-[#0A3D1E] text-white shadow-xl transform transition-transform duration-300 lg:static lg:translate-x-0 flex flex-col ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>

                {/* Logo Area */}
                <div className="flex items-center justify-center h-20 border-b border-white/10 px-6 shrink-0">
                    <img src={logo} alt="Logo" className="h-10 w-auto mr-3 bg-white p-1 rounded-lg" />
                    <span className="font-outfit font-bold text-lg tracking-wide text-white">Admin Area</span>
                    <button className="lg:hidden ml-auto text-gray-300 hover:text-white" onClick={() => setIsSidebarOpen(false)}>
                        <X size={20} />
                    </button>
                </div>

                {/* Profile Card inside Sidebar */}
                <div className="p-4 border-b border-white/5 bg-black/10 flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald text-white rounded-xl flex items-center justify-center font-bold text-lg border border-gold/30 shadow-inner">
                        A
                    </div>
                    <div>
                        <p className="text-xs text-gray-400 font-bold leading-tight">Super Admin</p>
                        <p className="text-sm font-outfit font-bold text-[#FAF6EE]">Administrator</p>
                    </div>
                </div>

                {/* Menu Navigasi (Scrollable) */}
                <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto custom-scrollbar">

                    <Link
                        to="/admin/dashboard"
                        onClick={() => setIsSidebarOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${isActive('/admin/dashboard') ? 'bg-gradient-to-r from-emerald to-emerald-800 text-white font-bold shadow-md border-r-4 border-gold' : 'text-gray-300 hover:bg-white/5 hover:text-white'
                            }`}
                    >
                        <LayoutDashboard size={18} />
                        <span>Dashboard</span>
                    </Link>

                    {/* Program Management */}
                    <div>
                        <button
                            onClick={() => setIsProgramMenuOpen(!isProgramMenuOpen)}
                            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 font-medium ${isActive('/admin/programs') && !isProgramMenuOpen ? 'bg-white/5 text-white' : 'text-gray-300 hover:bg-white/5 hover:text-white'
                                }`}
                        >
                            <div className="flex items-center gap-3 font-semibold">
                                <FolderKanban size={18} />
                                <span>Program</span>
                            </div>
                            {isProgramMenuOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>

                        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isProgramMenuOpen ? 'max-h-40 opacity-100 mt-1' : 'max-h-0 opacity-0'}`}>
                            <div className="pl-8 pr-2 py-1 space-y-0.5 border-l border-white/10 ml-6">
                                <Link to="/admin/programs" onClick={() => setIsSidebarOpen(false)} className={`block py-1.5 text-xs font-semibold transition-colors ${location.pathname === '/admin/programs' ? 'text-gold' : 'text-gray-400 hover:text-white'}`}>Semua Program</Link>
                                <Link to="/admin/programs/create" onClick={() => setIsSidebarOpen(false)} className={`block py-1.5 text-xs font-semibold transition-colors ${location.pathname === '/admin/programs/create' ? 'text-gold' : 'text-gray-400 hover:text-white'}`}>Tambah Program</Link>
                                <Link to="/admin/categories" onClick={() => setIsSidebarOpen(false)} className={`block py-1.5 text-xs font-semibold transition-colors ${location.pathname === '/admin/categories' ? 'text-gold' : 'text-gray-400 hover:text-white'}`}>Kategori Program</Link>
                            </div>
                        </div>
                    </div>

                    <Link
                        to="/admin/members"
                        onClick={() => setIsSidebarOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${isActive('/admin/members') ? 'bg-gradient-to-r from-emerald to-emerald-800 text-white font-bold shadow-md border-r-4 border-gold' : 'text-gray-300 hover:bg-white/5 hover:text-white'
                            }`}
                    >
                        <Users size={18} />
                        <span>Members</span>
                    </Link>

                    <Link
                        to="/admin/leaders"
                        onClick={() => setIsSidebarOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${isActive('/admin/leaders') ? 'bg-gradient-to-r from-emerald to-emerald-800 text-white font-bold shadow-md border-r-4 border-gold' : 'text-gray-300 hover:bg-white/5 hover:text-white'
                            }`}
                    >
                        <ShieldHalf size={18} />
                        <span>Community Leaders</span>
                    </Link>

                    <Link
                        to="/admin/ruang"
                        onClick={() => setIsSidebarOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${isActive('/admin/ruang') ? 'bg-gradient-to-r from-emerald to-emerald-800 text-white font-bold shadow-md border-r-4 border-gold' : 'text-gray-300 hover:bg-white/5 hover:text-white'
                            }`}
                    >
                        <MessageSquare size={18} />
                        <span>Ruang Curhat</span>
                    </Link>

                    <Link
                        to="/admin/articles"
                        onClick={() => setIsSidebarOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${isActive('/admin/articles') ? 'bg-gradient-to-r from-emerald to-emerald-800 text-white font-bold shadow-md border-r-4 border-gold' : 'text-gray-300 hover:bg-white/5 hover:text-white'
                            }`}
                    >
                        <FileText size={18} />
                        <span>Artikel</span>
                    </Link>

                    <Link
                        to="/admin/speakers"
                        onClick={() => setIsSidebarOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${isActive('/admin/speakers') ? 'bg-gradient-to-r from-emerald to-emerald-800 text-white font-bold shadow-md border-r-4 border-gold' : 'text-gray-300 hover:bg-white/5 hover:text-white'
                            }`}
                    >
                        <MicVocal size={18} />
                        <span>Speakers</span>
                    </Link>

                    <Link
                        to="/admin/tasks"
                        onClick={() => setIsSidebarOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${isActive('/admin/tasks') ? 'bg-gradient-to-r from-emerald to-emerald-800 text-white font-bold shadow-md border-r-4 border-gold' : 'text-gray-300 hover:bg-white/5 hover:text-white'
                            }`}
                    >
                        <ListTodo size={18} />
                        <span>Tasks</span>
                    </Link>

                    <Link
                        to="/admin/reports"
                        onClick={() => setIsSidebarOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${isActive('/admin/reports') ? 'bg-gradient-to-r from-emerald to-emerald-800 text-white font-bold shadow-md border-r-4 border-gold' : 'text-gray-300 hover:bg-white/5 hover:text-white'
                            }`}
                    >
                        <FileBarChart size={18} />
                        <span>Reports</span>
                    </Link>

                    <Link
                        to="/admin/settings"
                        onClick={() => setIsSidebarOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${isActive('/admin/settings') ? 'bg-gradient-to-r from-emerald to-emerald-800 text-white font-bold shadow-md border-r-4 border-gold' : 'text-gray-300 hover:bg-white/5 hover:text-white'
                            }`}
                    >
                        <Settings size={18} />
                        <span>Settings</span>
                    </Link>

                </nav>

                {/* Bottom Action Area */}
                <div className="p-4 border-t border-white/5 space-y-1 shrink-0">
                    <Link
                        to="/"
                        className="flex items-center gap-3 w-full px-4 py-2.5 text-gold hover:bg-white/5 rounded-xl transition-colors font-semibold text-sm"
                    >
                        <Globe size={18} />
                        <span>Lihat Website</span>
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-4 py-2.5 text-roseSholehah hover:bg-white/5 rounded-xl transition-colors font-semibold text-sm"
                    >
                        <LogOut size={18} />
                        <span>Keluar</span>
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

                {/* Header Topbar */}
                <header className="bg-white h-20 shadow-sm border-b border-gray-100 flex items-center justify-between px-4 lg:px-8 z-10 shrink-0">
                    <div className="flex items-center gap-4">
                        <button
                            className="lg:hidden text-gray-500 hover:text-emerald transition-colors bg-gray-50 p-2 rounded-lg"
                            onClick={() => setIsSidebarOpen(true)}
                        >
                            <Menu size={24} />
                        </button>
                        <div>
                            <h2 className="text-lg font-outfit font-black text-gray-800 capitalize hidden sm:block">
                                Assalamu'alaikum, Admin! 🌟
                            </h2>
                            <p className="text-[10px] sm:text-xs text-gray-500 font-medium hidden sm:block">Selamat datang di Khazanah Admin Panel</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="text-right hidden md:block">
                            <p className="text-sm font-bold text-gray-800">Super Admin</p>
                            <p className="text-[10px] text-emerald font-bold">ONLINE</p>
                        </div>
                        <div className="w-10 h-10 bg-[#FAF6EE] text-emerald rounded-full flex items-center justify-center font-bold text-lg border-2 border-emerald/20 shadow-sm">
                            A
                        </div>
                    </div>
                </header>

                {/* Area Konten Dinamis */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-55/30 p-4 lg:p-8">
                    <Outlet />
                </main>

            </div>
        </div>
    );
};

export default AdminLayout;