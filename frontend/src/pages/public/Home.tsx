import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, BookOpen, Users, PlaySquare, CheckCircle2, ArrowRight } from 'lucide-react';

import sholehahLogo from '../../assets/sholehah.png';
import jofisahLogo from '../../assets/jofisah.png';
import khazanahLogo from '../../assets/logo.png'; 

interface ProgramType {
    id: number;
    title: string;
    slug: string;
    category: string;
    description: string;
    date: string;
    image: string | null;
    status: string;
}

const Home: React.FC = () => {
    const [recentPrograms, setRecentPrograms] = useState<ProgramType[]>([]);
    const [isLoadingPrograms, setIsLoadingPrograms] = useState(true);

    useEffect(() => {
        const fetchRecentPrograms = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/programs');
                const result = await response.json(); 
                
                const programArray = Array.isArray(result) ? result : (result.data || []);

                const activePrograms = programArray
                    .filter((p: ProgramType) => p.status !== 'draft')
                    .slice(0, 3);
                
                setRecentPrograms(activePrograms);
            } catch (error) {
                console.error("Gagal mengambil data program untuk Home:", error);
                setRecentPrograms([]); 
            } finally {
                setIsLoadingPrograms(false);
            }
        };

        fetchRecentPrograms();
    }, []);
    
    return (
        <div className="font-sans text-gray-800 bg-white selection:bg-khazanah-light selection:text-khazanah-dark overflow-hidden">
            
            {/* HERO SECTION MODERN ISLAMI */}
            <section className="relative min-h-[100dvh] md:min-h-screen flex items-center justify-center pt-32 pb-16 md:pt-20 md:pb-20 bg-white">
                
                {/* Decorative Background Elements */}
                <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                    {/* Glow Effects */}
                    <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-khazanah-green/5 rounded-full blur-[100px]"></div>
                    <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-khazanah-gold/5 rounded-full blur-[100px]"></div>
                    {/* Subtle Pattern (Opsional, menggunakan URL placeholder tekstur halus) */}
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-[0.03]"></div>
                </div>

                <div className="relative z-10 text-center max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {/* Badge Pill */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-khazanah-light/50 border border-khazanah-green/20 text-khazanah-green text-sm font-bold mb-8">
                        <span className="flex h-2 w-2 rounded-full bg-khazanah-gold animate-pulse"></span>
                        Komunitas Digital Pemuda Muslim
                    </div>

                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 mb-6 leading-[1.15] tracking-tight">
                        Bangun Generasi Muslim yang <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-khazanah-green to-khazanah-gold">
                            Bertumbuh Bersama
                        </span>
                    </h1>
                    
                    <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto px-2 leading-relaxed">
                        Platform komunitas digital dengan <span className="font-bold text-gray-900">6.9+ juta</span> audience yang fokus pada edukasi, self-growth, dan ukhuwah Islamiyah.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4 px-4 sm:px-0">
                        <button className="w-full sm:w-auto bg-khazanah-green hover:bg-khazanah-dark text-white font-bold px-8 py-4 rounded-xl transition shadow-xl shadow-khazanah-green/20 flex items-center justify-center gap-2 group">
                            Gabung Sekarang
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                        <Link to="/program" className="w-full sm:w-auto bg-white border-2 border-gray-100 text-gray-700 hover:border-khazanah-gold hover:text-khazanah-gold font-bold px-8 py-4 rounded-xl transition flex justify-center items-center shadow-sm">
                            Eksplor Program
                        </Link>
                    </div>

                    {/* Social Proof (Avatar Group) */}
                    <div className="mt-14 flex flex-col items-center justify-center gap-3">
                        <div className="flex -space-x-4">
                            <img className="w-12 h-12 rounded-full border-4 border-white object-cover shadow-sm" src="https://i.pravatar.cc/100?img=5" alt="Member" />
                            <img className="w-12 h-12 rounded-full border-4 border-white object-cover shadow-sm" src="https://i.pravatar.cc/100?img=12" alt="Member" />
                            <img className="w-12 h-12 rounded-full border-4 border-white object-cover shadow-sm" src="https://i.pravatar.cc/100?img=9" alt="Member" />
                            <img className="w-12 h-12 rounded-full border-4 border-white object-cover shadow-sm" src="https://i.pravatar.cc/100?img=32" alt="Member" />
                            <div className="w-12 h-12 rounded-full border-4 border-white bg-gray-50 flex items-center justify-center text-xs font-bold text-gray-600 shadow-sm z-10">+6k</div>
                        </div>
                        <p className="text-sm text-gray-500 font-medium">Bergabunglah dengan ribuan pemuda lainnya</p>
                    </div>
                </div>
            </section>

            {/* SOCIAL PROOF (STATISTIK) */}
            <section className="py-12 md:py-16 bg-white relative z-10 -mt-12 md:-mt-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-5xl mx-auto bg-white shadow-xl shadow-gray-100/50 rounded-3xl py-8 md:py-10 border border-gray-100">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-4 md:gap-8 text-center md:divide-x divide-gray-100">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-extrabold text-khazanah-green mb-1">6.9M+</h2>
                            <p className="text-gray-500 font-bold text-xs md:text-sm uppercase tracking-widest">Followers</p>
                        </div>
                        <div>
                            <h2 className="text-3xl md:text-4xl font-extrabold text-khazanah-green mb-1">15M+</h2>
                            <p className="text-gray-500 font-bold text-xs md:text-sm uppercase tracking-widest">Impressions</p>
                        </div>
                        <div>
                            <h2 className="text-3xl md:text-4xl font-extrabold text-khazanah-green mb-1">6000+</h2>
                            <p className="text-gray-500 font-bold text-xs md:text-sm uppercase tracking-widest">Members</p>
                        </div>
                        <div>
                            <h2 className="text-3xl md:text-4xl font-extrabold text-khazanah-green mb-1">20+</h2>
                            <p className="text-gray-500 font-bold text-xs md:text-sm uppercase tracking-widest">Leaders</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ABOUT SINGKAT */}
            <section className="py-16 md:py-24 bg-khazanah-light/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-10 md:gap-12 items-center">
                        <div className="bg-gradient-to-br from-khazanah-green to-khazanah-dark h-56 sm:h-64 md:h-80 rounded-[2rem] shadow-lg flex items-center justify-center text-white/50 order-2 md:order-1 overflow-hidden relative">
                            {/* Mempercantik Placeholder dengan Logo */}
                            <img src={khazanahLogo} alt="Khazanah" className="w-1/2 opacity-20 object-contain drop-shadow-2xl z-10" />
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-10 mix-blend-overlay"></div>
                        </div>
                        <div className="order-1 md:order-2 text-center md:text-left">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">Lebih dari sekadar media, ini adalah keluarga.</h2>
                            <p className="text-gray-600 leading-relaxed mb-8 font-medium text-lg">
                                Khazanah Alwahda Kreatif hadir sejak 2021 sebagai wadah dakwah digital yang edukatif & interaktif. Kami menyebarkan spirit persatuan dan keberagaman dalam Islam khusus untuk generasi muda Muslim Indonesia.
                            </p>
                            <ul className="space-y-4 text-gray-700 font-bold text-left inline-block md:block">
                                <li className="flex items-center gap-4">
                                    <CheckCircle2 className="text-khazanah-gold w-6 h-6 flex-shrink-0" />
                                    Kolaborasi & Edukasi Islam modern
                                </li>
                                <li className="flex items-center gap-4">
                                    <CheckCircle2 className="text-khazanah-gold w-6 h-6 flex-shrink-0" />
                                    Komunitas yang inklusif & suportif
                                </li>
                                <li className="flex items-center gap-4">
                                    <CheckCircle2 className="text-khazanah-gold w-6 h-6 flex-shrink-0" />
                                    Ratusan program pengembangan diri
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* CONTENT PILLARS */}
            <section className="py-16 md:py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900">Pilar Konten Kami</h2>
                        <p className="text-gray-600 mt-4 text-lg">Fokus pembahasan untuk menunjang pertumbuhanmu</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="p-8 rounded-3xl bg-rose-50 border border-rose-100 hover:-translate-y-2 hover:shadow-xl transition-all duration-300 text-center md:text-left group cursor-pointer">
                            <div className="mb-6 inline-flex p-4 rounded-2xl bg-white text-rose-500 shadow-sm border border-rose-100 group-hover:scale-110 transition-transform">
                                <Heart size={32} strokeWidth={2} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Women</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">Beauty, mental health, fashion & empowerment.</p>
                        </div>
                        <div className="p-8 rounded-3xl bg-blue-50 border border-blue-100 hover:-translate-y-2 hover:shadow-xl transition-all duration-300 text-center md:text-left group cursor-pointer">
                            <div className="mb-6 inline-flex p-4 rounded-2xl bg-white text-blue-500 shadow-sm border border-blue-100 group-hover:scale-110 transition-transform">
                                <BookOpen size={32} strokeWidth={2} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Education</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">Dakwah, Quran study, daily verses, language.</p>
                        </div>
                        <div className="p-8 rounded-3xl bg-amber-50 border border-amber-100 hover:-translate-y-2 hover:shadow-xl transition-all duration-300 text-center md:text-left group cursor-pointer">
                            <div className="mb-6 inline-flex p-4 rounded-2xl bg-white text-khazanah-gold shadow-sm border border-amber-100 group-hover:scale-110 transition-transform">
                                <Users size={32} strokeWidth={2} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Relationship</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">Pre-marriage education, tips hubungan halal.</p>
                        </div>
                        <div className="p-8 rounded-3xl bg-khazanah-light border border-khazanah-green/10 hover:-translate-y-2 hover:shadow-xl transition-all duration-300 text-center md:text-left group cursor-pointer">
                            <div className="mb-6 inline-flex p-4 rounded-2xl bg-white text-khazanah-green shadow-sm border border-khazanah-green/10 group-hover:scale-110 transition-transform">
                                <PlaySquare size={32} strokeWidth={2} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Entertainment</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">Film, komik, musik Islami, sports & series.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* HIGHLIGHT PROGRAM */}
            <section id="program" className="py-16 md:py-24 bg-gray-50 border-t border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-12 text-center md:text-left gap-6">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900">Program Unggulan</h2>
                            <p className="text-gray-600 mt-2 text-lg">Ikuti kelas dan kegiatan terbaru kami</p>
                        </div>
                        <Link to="/program" className="text-khazanah-gold font-bold hover:bg-khazanah-gold hover:text-white transition-colors flex items-center gap-2 bg-white px-6 py-3 rounded-full border border-khazanah-gold/30 shadow-sm">
                            Lihat Semua Program <ArrowRight size={18} />
                        </Link>
                    </div>

                    {isLoadingPrograms ? (
                        <div className="text-center py-12">
                            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-khazanah-gold mx-auto"></div>
                            <p className="mt-4 text-gray-500 font-medium">Memuat program...</p>
                        </div>
                    ) : recentPrograms.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {recentPrograms.map((prog) => (
                                <div key={prog.id} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col group">
                                    <div className="h-56 bg-gray-200 relative overflow-hidden">
                                        {prog.image ? (
                                            <img 
                                                src={`http://localhost:5000${prog.image}`} 
                                                alt={prog.title} 
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-400 bg-khazanah-light font-medium">
                                                Khazanah Program
                                            </div>
                                        )}
                                        {prog.status === 'full' && (
                                            <div className="absolute top-4 right-4 bg-gray-900/90 text-white text-xs font-bold px-4 py-1.5 rounded-full backdrop-blur-sm">
                                                KUOTA PENUH
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-8 flex flex-col flex-grow">
                                        <div className="text-xs font-bold text-khazanah-gold mb-3 uppercase tracking-widest bg-amber-50 inline-block px-3 py-1 rounded-lg border border-amber-100 w-max">
                                            {prog.category}
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-khazanah-green transition-colors">{prog.title}</h3>
                                        <p className="text-gray-500 text-sm mb-8 line-clamp-3 leading-relaxed">
                                            {prog.description || "Mari bergabung bersama kami dalam program spesial ini. Silakan klik detail untuk informasi lebih lanjut."}
                                        </p>
                                        <Link 
                                            to={`/program/${prog.slug}`}
                                            className="mt-auto w-full bg-white border-2 border-khazanah-green text-khazanah-green py-3.5 rounded-xl font-bold hover:bg-khazanah-green hover:text-white transition flex items-center justify-center gap-2"
                                        >
                                            {prog.status === 'full' ? 'Lihat Detail' : 'Daftar Sekarang'}
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-gray-200">
                            <h3 className="text-xl font-bold text-gray-800 mb-2">Belum ada program saat ini</h3>
                            <p className="text-gray-500">Nantikan update program menarik dari kami selanjutnya!</p>
                        </div>
                    )}
                </div>
            </section>

            {/* COMMUNITY ECOSYSTEM (HERO IP) */}
            <section id="komunitas" className="py-16 md:py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900">Ekosistem Khazanah</h2>
                        <p className="text-gray-600 mt-4 font-medium text-lg">Kunjungi media partner dan sister-brands kami</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        
                        <a href="https://instagram.com/sholehahstory" target="_blank" rel="noreferrer" className="block p-8 border border-gray-100 rounded-[2rem] shadow-sm text-center hover:shadow-xl hover:-translate-y-2 transition duration-300 group bg-white">
                            <div className="w-24 h-24 bg-pink-50 rounded-2xl mx-auto mb-6 flex items-center justify-center p-2 border border-pink-100 shadow-inner overflow-hidden group-hover:scale-105 transition-transform">
                                <img src={sholehahLogo} alt="Logo Sholehah Story" className="w-full h-full object-contain rounded-xl" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-pink-500 transition-colors">@sholehahstory</h3>
                            <p className="text-khazanah-gold font-bold text-sm mb-4">914K Followers</p>
                            <p className="text-gray-600 text-sm leading-relaxed">Muslim women empowerment & sisterhood community.</p>
                        </a>

                        <a href="https://instagram.com/jofisah.id" target="_blank" rel="noreferrer" className="block p-8 border border-gray-100 rounded-[2rem] shadow-sm text-center hover:shadow-xl hover:-translate-y-2 transition duration-300 group bg-white">
                            <div className="w-24 h-24 bg-teal-50 rounded-2xl mx-auto mb-6 flex items-center justify-center p-2 border border-teal-100 shadow-inner overflow-hidden group-hover:scale-105 transition-transform">
                                <img src={jofisahLogo} alt="Logo Jofisah" className="w-full h-full object-contain rounded-xl" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-teal-500 transition-colors">@jofisah.id</h3>
                            <p className="text-khazanah-gold font-bold text-sm mb-4">325K Followers</p>
                            <p className="text-gray-600 text-sm leading-relaxed">Faith, self growth, dan relationship stories.</p>
                        </a>

                        <a href="https://instagram.com/khazanahnetwork" target="_blank" rel="noreferrer" className="block p-8 border border-gray-100 rounded-[2rem] shadow-sm text-center hover:shadow-xl hover:-translate-y-2 transition duration-300 group bg-white">
                            <div className="w-24 h-24 bg-gray-50 rounded-2xl mx-auto mb-6 flex items-center justify-center p-2 border border-gray-200 shadow-inner overflow-hidden group-hover:scale-105 transition-transform">
                                <img src={khazanahLogo} alt="Logo Khazanah Network" className="w-full h-full object-contain rounded-xl" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-khazanah-green transition-colors">@khazanahnetwork</h3>
                            <p className="text-khazanah-gold font-bold text-sm mb-4">302K Followers</p>
                            <p className="text-gray-600 text-sm leading-relaxed">News, Islamic wisdom, and faith in action.</p>
                        </a>

                    </div>
                </div>
            </section>

            {/* CALL TO ACTION (JOIN) */}
            <section className="py-20 md:py-32 bg-khazanah-green text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 bg-khazanah-gold opacity-20 rounded-full blur-[100px]"></div>
                <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-96 h-96 bg-white opacity-10 rounded-full blur-[100px]"></div>
                <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-8 px-2 leading-tight">
                        Jadilah bagian dari komunitas ini sekarang
                    </h2>
                    <p className="text-khazanah-light/90 text-xl mb-12 px-4 font-medium max-w-2xl mx-auto leading-relaxed">
                        Belajar, bertumbuh, dan berkontribusi bersama ribuan pemuda Muslim lainnya di seluruh Indonesia.
                    </p>
                    <button className="w-full sm:w-auto bg-white text-khazanah-green font-extrabold px-12 py-5 rounded-2xl text-lg hover:scale-105 transition-transform shadow-2xl shadow-black/20">
                        Daftar Sekarang
                    </button>
                </div>
            </section>
        </div>
    );
};

export default Home;