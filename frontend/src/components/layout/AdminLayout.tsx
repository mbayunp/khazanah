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
    FileText // <-- Tambahan ikon untuk Artikel
} from 'lucide-react';
import Swal from 'sweetalert2';
import logo from '../../assets/logo.png';

const AdminLayout: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    // State untuk mengontrol dropdown menu Program
    const [isProgramMenuOpen, setIsProgramMenuOpen] = useState(true); 
    
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        Swal.fire({
            title: 'Keluar dari Dashboard?',
            text: "Sesi Anda akan diakhiri.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#18703E',
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

    // Fungsi helper untuk mengecek apakah path sedang aktif
    const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(`${path}/`);

    return (
        <div className="flex h-screen bg-gray-50 font-sans text-gray-800 overflow-hidden">
            
            {/* Overlay Mobile */}
            <div 
                className={`fixed inset-0 bg-gray-900/50 z-20 lg:hidden transition-opacity ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setIsSidebarOpen(false)}
            ></div>

            {/* Sidebar Container */}
            <aside className={`fixed inset-y-0 left-0 z-30 w-64 bg-khazanah-dark text-white shadow-xl transform transition-transform duration-300 lg:static lg:translate-x-0 flex flex-col ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                
                {/* Logo Area */}
                <div className="flex items-center justify-center h-20 border-b border-khazanah-green/30 px-6 shrink-0">
                    <img src={logo} alt="Logo" className="h-10 w-auto mr-3 bg-white p-1 rounded-lg" />
                    <span className="font-bold text-xl tracking-wide">Admin Area</span>
                    <button className="lg:hidden ml-auto text-gray-300 hover:text-white" onClick={() => setIsSidebarOpen(false)}>
                        <X size={24} />
                    </button>
                </div>

                {/* Menu Navigasi (Scrollable) */}
                <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto custom-scrollbar">
                    
                    <Link
                        to="/admin/dashboard"
                        onClick={() => setIsSidebarOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                            isActive('/admin/dashboard') ? 'bg-khazanah-green text-white font-bold shadow-lg shadow-khazanah-green/20' : 'text-gray-300 hover:bg-khazanah-green/20 hover:text-white'
                        }`}
                    >
                        <LayoutDashboard size={20} />
                        <span>Dashboard</span>
                    </Link>

                    {/* Program Management (Dengan Submenu) */}
                    <div>
                        <button
                            onClick={() => setIsProgramMenuOpen(!isProgramMenuOpen)}
                            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 ${
                                isActive('/admin/programs') && !isProgramMenuOpen ? 'bg-khazanah-green/20 text-white' : 'text-gray-300 hover:bg-khazanah-green/20 hover:text-white'
                            }`}
                        >
                            <div className="flex items-center gap-3 font-semibold">
                                <FolderKanban size={20} />
                                <span>Program</span>
                            </div>
                            {isProgramMenuOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                        </button>
                        
                        {/* Submenu Items */}
                        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isProgramMenuOpen ? 'max-h-40 opacity-100 mt-1' : 'max-h-0 opacity-0'}`}>
                            <div className="pl-11 pr-4 py-2 space-y-1 border-l-2 border-khazanah-green/30 ml-6">
                                <Link to="/admin/programs" onClick={() => setIsSidebarOpen(false)} className={`block py-2 text-sm transition-colors ${location.pathname === '/admin/programs' ? 'text-khazanah-gold font-bold' : 'text-gray-400 hover:text-white'}`}>All Programs</Link>
                                <Link to="/admin/programs/create" onClick={() => setIsSidebarOpen(false)} className={`block py-2 text-sm transition-colors ${location.pathname === '/admin/programs/create' ? 'text-khazanah-gold font-bold' : 'text-gray-400 hover:text-white'}`}>Create Program</Link>
                                <Link to="/admin/categories" onClick={() => setIsSidebarOpen(false)} className={`block py-2 text-sm transition-colors ${location.pathname === '/admin/categories' ? 'text-khazanah-gold font-bold' : 'text-gray-400 hover:text-white'}`}>Categories</Link>
                            </div>
                        </div>
                    </div>

                    <Link
                        to="/admin/participants"
                        onClick={() => setIsSidebarOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                            isActive('/admin/participants') ? 'bg-khazanah-green text-white font-bold shadow-lg shadow-khazanah-green/20' : 'text-gray-300 hover:bg-khazanah-green/20 hover:text-white'
                        }`}
                    >
                        <Users size={20} />
                        <span>Participants</span>
                    </Link>

                    <Link
                        to="/admin/community"
                        onClick={() => setIsSidebarOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                            isActive('/admin/community') ? 'bg-khazanah-green text-white font-bold shadow-lg shadow-khazanah-green/20' : 'text-gray-300 hover:bg-khazanah-green/20 hover:text-white'
                        }`}
                    >
                        <ShieldHalf size={20} />
                        <span>Community Leaders</span>
                    </Link>

                    <Link
                        to="/admin/ruang"
                        onClick={() => setIsSidebarOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                            isActive('/admin/ruang') ? 'bg-khazanah-green text-white font-bold shadow-lg shadow-khazanah-green/20' : 'text-gray-300 hover:bg-khazanah-green/20 hover:text-white'
                        }`}
                    >
                        <MessageSquare size={20} />
                        <span>Ruang Curhat</span>
                    </Link>

                    {/* MENU BARU: ARTICLES */}
                    <Link
                        to="/admin/articles"
                        onClick={() => setIsSidebarOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                            isActive('/admin/articles') ? 'bg-khazanah-green text-white font-bold shadow-lg shadow-khazanah-green/20' : 'text-gray-300 hover:bg-khazanah-green/20 hover:text-white'
                        }`}
                    >
                        <FileText size={20} />
                        <span>Articles</span>
                    </Link>

                    <Link
                        to="/admin/speakers"
                        onClick={() => setIsSidebarOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                            isActive('/admin/speakers') ? 'bg-khazanah-green text-white font-bold shadow-lg shadow-khazanah-green/20' : 'text-gray-300 hover:bg-khazanah-green/20 hover:text-white'
                        }`}
                    >
                        <MicVocal size={20} />
                        <span>Speakers</span>
                    </Link>

                    <Link
                        to="/admin/tasks"
                        onClick={() => setIsSidebarOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                            isActive('/admin/tasks') ? 'bg-khazanah-green text-white font-bold shadow-lg shadow-khazanah-green/20' : 'text-gray-300 hover:bg-khazanah-green/20 hover:text-white'
                        }`}
                    >
                        <ListTodo size={20} />
                        <span>Tasks</span>
                    </Link>

                    <Link
                        to="/admin/reports"
                        onClick={() => setIsSidebarOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                            isActive('/admin/reports') ? 'bg-khazanah-green text-white font-bold shadow-lg shadow-khazanah-green/20' : 'text-gray-300 hover:bg-khazanah-green/20 hover:text-white'
                        }`}
                    >
                        <FileBarChart size={20} />
                        <span>Reports</span>
                    </Link>

                    <Link
                        to="/admin/settings"
                        onClick={() => setIsSidebarOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                            isActive('/admin/settings') ? 'bg-khazanah-green text-white font-bold shadow-lg shadow-khazanah-green/20' : 'text-gray-300 hover:bg-khazanah-green/20 hover:text-white'
                        }`}
                    >
                        <Settings size={20} />
                        <span>Settings</span>
                    </Link>

                </nav>

                {/* Bottom Action Area */}
                <div className="p-4 border-t border-khazanah-green/30 space-y-2 shrink-0">
                    <Link 
                        to="/"
                        className="flex items-center gap-3 w-full px-4 py-3 text-khazanah-gold hover:bg-khazanah-gold/10 hover:text-yellow-400 rounded-xl transition-colors font-semibold"
                    >
                        <Globe size={20} />
                        <span>Lihat Website</span>
                    </Link>
                    <button 
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-4 py-3 text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-xl transition-colors font-semibold"
                    >
                        <LogOut size={20} />
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
                            className="lg:hidden text-gray-500 hover:text-khazanah-green transition-colors bg-gray-50 p-2 rounded-lg"
                            onClick={() => setIsSidebarOpen(true)}
                        >
                            <Menu size={24} />
                        </button>
                        <div>
                            <h2 className="text-xl font-bold text-gray-800 capitalize hidden sm:block">
                                {location.pathname.split('/').pop() || 'Dashboard'}
                            </h2>
                            <p className="text-xs text-gray-500 hidden sm:block">Khazanah Admin Panel</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="text-right hidden md:block">
                            <p className="text-sm font-bold text-gray-800">Administrator</p>
                            <p className="text-xs text-khazanah-green font-medium">Super Admin</p>
                        </div>
                        <div className="w-10 h-10 bg-khazanah-light text-khazanah-green rounded-full flex items-center justify-center font-bold text-lg border-2 border-khazanah-green/20 shadow-sm">
                            A
                        </div>
                    </div>
                </header>

                {/* Area Konten Dinamis */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50/50 p-4 lg:p-8">
                    <Outlet />
                </main>

            </div>
        </div>
    );
};

export default AdminLayout;