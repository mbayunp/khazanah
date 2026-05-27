import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, BookOpen, Users, PlaySquare, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { API_URL, API_ENDPOINTS } from '../../config/api';
import { DailyReflectionCard } from '../../components/DailyReflectionCard';

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
                const response = await fetch(API_ENDPOINTS.programs);
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
    
    // Animation Variants
    const fadeUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15
            }
        }
    };

    return (
        <div className="font-sans text-emerald-dark bg-sand overflow-hidden">
            
            {/* HERO SECTION MODERN ISLAMI */}
            <section className="relative min-h-screen flex items-center justify-center pt-28 pb-16 md:pt-20 md:pb-20 islamic-pattern-bg">
                
                {/* Radial Gradient Ambient Glows */}
                <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                    <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] ambient-emerald pointer-events-none"></div>
                    <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[700px] h-[700px] ambient-glow pointer-events-none"></div>
                </div>

                <div className="relative z-10 text-center max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {/* Animated Badge Pill */}
                    <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 border border-emerald/10 text-emerald text-xs font-outfit font-bold mb-8 shadow-sm"
                    >
                        <span className="flex h-2 w-2 rounded-full bg-gold animate-pulse"></span>
                        Komunitas Digital Pemuda Muslim
                    </motion.div>

                    {/* Rub el Hizb Ornament - Rotating in BG */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] opacity-5 -z-10 pointer-events-none select-none">
                        <svg className="w-full h-full animate-spin-slow" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="25" y="25" width="50" height="50" rx="3" stroke="#C5A85C" strokeWidth="2"/>
                            <rect x="25" y="25" width="50" height="50" rx="3" transform="rotate(45 50 50)" stroke="#C5A85C" strokeWidth="2"/>
                            <circle cx="50" cy="50" r="10" stroke="#C5A85C" strokeWidth="1.5"/>
                        </svg>
                    </div>

                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-extrabold text-emerald-dark mb-6 leading-[1.15] tracking-tight"
                    >
                        Bangun Generasi Muslim yang <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald via-emerald-dark to-gold gold-text-glow">
                            Bertumbuh Bersama
                        </span>
                    </motion.h1>
                    
                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-base sm:text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto px-2 leading-relaxed font-outfit"
                    >
                        Platform komunitas digital dengan <span className="font-bold text-emerald">6.9+ juta</span> audience yang fokus pada edukasi, self-growth, dan ukhuwah Islamiyah.
                    </motion.p>
                    
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="flex flex-col sm:flex-row justify-center items-center gap-4 px-4 sm:px-0"
                    >
                        <Link to="/join" className="w-full sm:w-auto bg-gradient-to-r from-emerald to-gold hover:shadow-premium text-white font-outfit font-bold px-8 py-4 rounded-2xl transition duration-300 flex items-center justify-center gap-2 group">
                            Gabung Sekarang
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <a href="#program" className="w-full sm:w-auto bg-white/80 backdrop-blur-sm border border-emerald/10 text-emerald-dark hover:border-gold hover:text-gold font-outfit font-bold px-8 py-4 rounded-2xl transition flex justify-center items-center shadow-sm">
                            Eksplor Program
                        </a>
                    </motion.div>

                    {/* Social Proof (Avatar Group) */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.8 }}
                        className="mt-14 flex flex-col items-center justify-center gap-3"
                    >
                        <div className="flex -space-x-4">
                            <img className="w-12 h-12 rounded-full border-4 border-sand object-cover shadow-sm" src="https://i.pravatar.cc/100?img=5" alt="Member" />
                            <img className="w-12 h-12 rounded-full border-4 border-sand object-cover shadow-sm" src="https://i.pravatar.cc/100?img=12" alt="Member" />
                            <img className="w-12 h-12 rounded-full border-4 border-sand object-cover shadow-sm" src="https://i.pravatar.cc/100?img=9" alt="Member" />
                            <img className="w-12 h-12 rounded-full border-4 border-sand object-cover shadow-sm" src="https://i.pravatar.cc/100?img=32" alt="Member" />
                            <div className="w-12 h-12 rounded-full border-4 border-sand bg-white/95 flex items-center justify-center text-xs font-bold text-emerald shadow-sm z-10 font-outfit">+6k</div>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-500 font-outfit font-medium">Bergabunglah dengan ribuan pemuda lainnya</p>
                    </motion.div>
                </div>
            </section>

            {/* DAILY reflection WIDGET */}
            <section className="py-12 bg-transparent relative z-10 -mt-10">
                <div className="max-w-7xl mx-auto px-4">
                    <DailyReflectionCard />
                </div>
            </section>

            {/* SOCIAL PROOF (STATISTIK) */}
            <section className="py-16 bg-transparent relative z-10 px-4 sm:px-6 lg:px-8">
                <div className="max-w-5xl mx-auto bg-white/70 backdrop-blur-md shadow-premium rounded-[2.5rem] py-10 border border-white/20">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-4 md:gap-8 text-center md:divide-x divide-emerald-500/10">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-display font-extrabold text-emerald mb-1">6.9M+</h2>
                            <p className="text-gray-500 font-outfit font-bold text-xs md:text-sm uppercase tracking-widest">Followers</p>
                        </div>
                        <div>
                            <h2 className="text-3xl md:text-4xl font-display font-extrabold text-emerald mb-1">15M+</h2>
                            <p className="text-gray-500 font-outfit font-bold text-xs md:text-sm uppercase tracking-widest">Impressions</p>
                        </div>
                        <div>
                            <h2 className="text-3xl md:text-4xl font-display font-extrabold text-emerald mb-1">6000+</h2>
                            <p className="text-gray-500 font-outfit font-bold text-xs md:text-sm uppercase tracking-widest">Members</p>
                        </div>
                        <div>
                            <h2 className="text-3xl md:text-4xl font-display font-extrabold text-emerald mb-1">20+</h2>
                            <p className="text-gray-500 font-outfit font-bold text-xs md:text-sm uppercase tracking-widest">Leaders</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ABOUT SINGKAT */}
            <section className="py-20 md:py-28 bg-emerald/5 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="bg-gradient-to-br from-emerald to-emerald-dark h-64 md:h-96 rounded-[2.5rem] shadow-premium flex items-center justify-center text-white/50 order-2 md:order-1 overflow-hidden relative border border-white/10">
                            <img src={khazanahLogo} alt="Khazanah" className="w-1/2 opacity-20 object-contain drop-shadow-2xl z-10" />
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-[0.04] mix-blend-overlay"></div>
                            {/* Decorative glowing sphere inside */}
                            <div className="absolute -bottom-10 -left-10 w-44 h-44 bg-gold/25 rounded-full blur-[40px]" />
                        </div>
                        <div className="order-1 md:order-2 text-center md:text-left">
                            <h2 className="text-3xl md:text-4xl font-display font-bold text-emerald-dark mb-6 leading-tight">Lebih dari sekadar media, ini adalah keluarga.</h2>
                            <p className="text-gray-600 leading-relaxed mb-8 font-outfit font-medium text-base md:text-lg">
                                Khazanah Alwahda Kreatif hadir sejak 2021 sebagai wadah dakwah digital yang edukatif & interaktif. Kami menyebarkan spirit persatuan dan keberagaman dalam Islam khusus untuk generasi muda Muslim Indonesia.
                            </p>
                            <ul className="space-y-4 text-emerald-dark font-outfit font-bold text-left inline-block md:block">
                                <li className="flex items-center gap-4">
                                    <div className="w-6 h-6 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center shrink-0">
                                        <CheckCircle2 className="text-gold w-4 h-4" />
                                    </div>
                                    Kolaborasi & Edukasi Islam modern
                                </li>
                                <li className="flex items-center gap-4">
                                    <div className="w-6 h-6 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center shrink-0">
                                        <CheckCircle2 className="text-gold w-4 h-4" />
                                    </div>
                                    Komunitas yang inklusif & suportif
                                </li>
                                <li className="flex items-center gap-4">
                                    <div className="w-6 h-6 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center shrink-0">
                                        <CheckCircle2 className="text-gold w-4 h-4" />
                                    </div>
                                    Ratusan program pengembangan diri
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* CONTENT PILLARS */}
            <section className="py-20 md:py-28 bg-transparent">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-emerald-dark">Pilar Konten Kami</h2>
                        <p className="text-gray-500 mt-4 text-base md:text-lg font-outfit">Fokus pembahasan untuk menunjang pertumbuhanmu</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        
                        {/* Pillar 1 */}
                        <div className="p-8 rounded-[2rem] bg-roseSholehah/5 border border-roseSholehah/10 hover:-translate-y-2 hover:shadow-premium hover:bg-roseSholehah/10 transition-all duration-300 text-center md:text-left group cursor-pointer">
                            <div className="mb-6 inline-flex p-4 rounded-2xl bg-white text-roseSholehah shadow-sm border border-roseSholehah/10 group-hover:scale-110 transition-transform">
                                <Heart size={28} />
                            </div>
                            <h3 className="text-xl font-outfit font-bold text-emerald-dark mb-3">Women</h3>
                            <p className="text-gray-600 text-sm leading-relaxed font-outfit">Beauty, mental health, fashion & empowerment.</p>
                        </div>
                        
                        {/* Pillar 2 */}
                        <div className="p-8 rounded-[2rem] bg-tealJofisah/5 border border-tealJofisah/10 hover:-translate-y-2 hover:shadow-premium hover:bg-tealJofisah/10 transition-all duration-300 text-center md:text-left group cursor-pointer">
                            <div className="mb-6 inline-flex p-4 rounded-2xl bg-white text-tealJofisah shadow-sm border border-tealJofisah/10 group-hover:scale-110 transition-transform">
                                <BookOpen size={28} />
                            </div>
                            <h3 className="text-xl font-outfit font-bold text-emerald-dark mb-3">Education</h3>
                            <p className="text-gray-600 text-sm leading-relaxed font-outfit">Dakwah, Quran study, daily verses, language.</p>
                        </div>

                        {/* Pillar 3 */}
                        <div className="p-8 rounded-[2rem] bg-gold/5 border border-gold/10 hover:-translate-y-2 hover:shadow-premium hover:bg-gold/10 transition-all duration-300 text-center md:text-left group cursor-pointer">
                            <div className="mb-6 inline-flex p-4 rounded-2xl bg-white text-gold shadow-sm border border-gold/15 group-hover:scale-110 transition-transform">
                                <Users size={28} />
                            </div>
                            <h3 className="text-xl font-outfit font-bold text-emerald-dark mb-3">Relationship</h3>
                            <p className="text-gray-600 text-sm leading-relaxed font-outfit">Pre-marriage education, tips hubungan halal.</p>
                        </div>

                        {/* Pillar 4 */}
                        <div className="p-8 rounded-[2rem] bg-emerald/5 border border-emerald/10 hover:-translate-y-2 hover:shadow-premium hover:bg-emerald/10 transition-all duration-300 text-center md:text-left group cursor-pointer">
                            <div className="mb-6 inline-flex p-4 rounded-2xl bg-white text-emerald shadow-sm border border-emerald/15 group-hover:scale-110 transition-transform">
                                <PlaySquare size={28} />
                            </div>
                            <h3 className="text-xl font-outfit font-bold text-emerald-dark mb-3">Entertainment</h3>
                            <p className="text-gray-600 text-sm leading-relaxed font-outfit">Film, komik, musik Islami, sports & series.</p>
                        </div>

                    </div>
                </div>
            </section>

            {/* HIGHLIGHT PROGRAM */}
            <section id="program" className="py-20 md:py-28 bg-emerald/5 relative border-t border-emerald-500/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-12 text-center md:text-left gap-6">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-display font-bold text-emerald-dark">Program Unggulan</h2>
                            <p className="text-gray-500 mt-2 text-base md:text-lg font-outfit">Ikuti kelas dan kegiatan terbaru kami</p>
                        </div>
                        <Link to="/program" className="text-emerald font-outfit font-bold hover:bg-emerald hover:text-white transition-all flex items-center gap-2 bg-white px-6 py-3 rounded-full border border-emerald/20 shadow-sm">
                            Lihat Semua Program <ArrowRight size={18} />
                        </Link>
                    </div>

                    {isLoadingPrograms ? (
                        <div className="text-center py-12">
                            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gold mx-auto"></div>
                            <p className="mt-4 text-gray-500 font-outfit font-medium">Memuat program...</p>
                        </div>
                    ) : recentPrograms.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {recentPrograms.map((prog) => (
                                <div key={prog.id} className="glass-card hover:-translate-y-2 hover:shadow-premium overflow-hidden bg-white/80 border border-white/20 flex flex-col group">
                                    <div className="h-56 bg-gray-200 relative overflow-hidden">
                                        {prog.image ? (
                                            <img 
                                                src={`${API_URL}${prog.image}`} 
                                                alt={prog.title} 
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-emerald bg-emerald/5 font-outfit font-bold">
                                                Khazanah Program
                                            </div>
                                        )}
                                        {prog.status === 'full' && (
                                            <div className="absolute top-4 right-4 bg-emerald-dark/95 backdrop-blur-sm text-white text-xs font-outfit font-bold px-4 py-1.5 rounded-full border border-white/10">
                                                KUOTA PENUH
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-8 flex flex-col flex-grow">
                                        <div className="text-xs font-outfit font-bold text-gold mb-3 uppercase tracking-widest bg-gold/5 inline-block px-3 py-1 rounded-lg border border-gold/15 w-max">
                                            {prog.category}
                                        </div>
                                        <h3 className="text-xl font-outfit font-bold text-emerald-dark mb-3 line-clamp-2 group-hover:text-emerald transition-colors">{prog.title}</h3>
                                        <p className="text-gray-500 text-sm mb-8 line-clamp-3 leading-relaxed font-outfit">
                                            {prog.description || "Mari bergabung bersama kami dalam program spesial ini. Silakan klik detail untuk informasi lebih lanjut."}
                                        </p>
                                        <Link 
                                            to={`/program/${prog.slug}`}
                                            className="mt-auto w-full bg-white border border-emerald text-emerald py-3.5 rounded-xl font-outfit font-bold hover:bg-emerald hover:text-white transition flex items-center justify-center gap-2"
                                        >
                                            {prog.status === 'full' ? 'Lihat Detail' : 'Daftar Sekarang'}
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16 bg-white/70 backdrop-blur-md rounded-3xl border border-dashed border-emerald/10">
                            <h3 className="text-xl font-display font-bold text-emerald-dark mb-2">Belum ada program saat ini</h3>
                            <p className="text-gray-500 font-outfit">Nantikan update program menarik dari kami selanjutnya!</p>
                        </div>
                    )}
                </div>
            </section>

            {/* COMMUNITY ECOSYSTEM (SISTER BRANDS) */}
            <section id="komunitas" className="py-20 md:py-28 bg-transparent">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-emerald-dark">Ekosistem Khazanah</h2>
                        <p className="text-gray-500 mt-4 font-outfit font-medium text-base md:text-lg">Kunjungi media partner dan sister-brands kami</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        
                        {/* Sholehah Brand card */}
                        <Link to="/sholehah" className="block p-8 border border-white/20 rounded-[2.5rem] shadow-premium text-center hover:shadow-premium hover:-translate-y-2 transition duration-300 group bg-white/60 backdrop-blur-sm relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-roseSholehah/5 rounded-full blur-xl pointer-events-none" />
                            <div className="w-24 h-24 bg-roseSholehah/5 rounded-3xl mx-auto mb-6 flex items-center justify-center p-2 border border-roseSholehah/10 shadow-inner overflow-hidden group-hover:scale-105 transition-transform">
                                <img src={sholehahLogo} alt="Logo Sholehah Story" className="w-full h-full object-contain rounded-xl" />
                            </div>
                            <h3 className="text-xl font-outfit font-bold text-emerald-dark mb-1 group-hover:text-roseSholehah transition-colors">@sholehahstory</h3>
                            <p className="text-gold font-outfit font-bold text-xs mb-4">914K Followers</p>
                            <p className="text-gray-600 text-sm leading-relaxed font-outfit">Muslim women empowerment & sisterhood community.</p>
                        </Link>

                        {/* Jofisah Brand card */}
                        <Link to="/jofisah" className="block p-8 border border-white/20 rounded-[2.5rem] shadow-premium text-center hover:shadow-premium hover:-translate-y-2 transition duration-300 group bg-white/60 backdrop-blur-sm relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-tealJofisah/5 rounded-full blur-xl pointer-events-none" />
                            <div className="w-24 h-24 bg-tealJofisah/5 rounded-3xl mx-auto mb-6 flex items-center justify-center p-2 border border-tealJofisah/10 shadow-inner overflow-hidden group-hover:scale-105 transition-transform">
                                <img src={jofisahLogo} alt="Logo Jofisah" className="w-full h-full object-contain rounded-xl" />
                            </div>
                            <h3 className="text-xl font-outfit font-bold text-emerald-dark mb-1 group-hover:text-tealJofisah transition-colors">@jofisah.id</h3>
                            <p className="text-gold font-outfit font-bold text-xs mb-4">325K Followers</p>
                            <p className="text-gray-600 text-sm leading-relaxed font-outfit">Faith, self growth, dan relationship stories.</p>
                        </Link>

                        {/* Khazanah Network */}
                        <a href="https://instagram.com/khazanahnetwork" target="_blank" rel="noreferrer" className="block p-8 border border-white/20 rounded-[2.5rem] shadow-premium text-center hover:shadow-premium hover:-translate-y-2 transition duration-300 group bg-white/60 backdrop-blur-sm relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald/5 rounded-full blur-xl pointer-events-none" />
                            <div className="w-24 h-24 bg-emerald/5 rounded-3xl mx-auto mb-6 flex items-center justify-center p-2 border border-emerald/10 shadow-inner overflow-hidden group-hover:scale-105 transition-transform">
                                <img src={khazanahLogo} alt="Logo Khazanah Network" className="w-full h-full object-contain rounded-xl" />
                            </div>
                            <h3 className="text-xl font-outfit font-bold text-emerald-dark mb-1 group-hover:text-emerald transition-colors">@khazanahnetwork</h3>
                            <p className="text-gold font-outfit font-bold text-xs mb-4">302K Followers</p>
                            <p className="text-gray-600 text-sm leading-relaxed font-outfit">News, Islamic wisdom, and faith in action.</p>
                        </a>

                    </div>
                </div>
            </section>

            {/* CALL TO ACTION */}
            <section className="py-24 md:py-32 bg-emerald-dark text-white relative overflow-hidden border-t border-gold/10">
                <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 bg-gold opacity-10 rounded-full blur-[100px]"></div>
                <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-96 h-96 bg-white opacity-5 rounded-full blur-[100px]"></div>
                <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-8 px-2 leading-tight">
                        Jadilah bagian dari komunitas ini sekarang
                    </h2>
                    <p className="text-emerald-soft/90 text-lg sm:text-xl mb-12 px-4 font-outfit font-medium max-w-2xl mx-auto leading-relaxed">
                        Belajar, bertumbuh, dan berkontribusi bersama ribuan pemuda Muslim lainnya di seluruh Indonesia.
                    </p>
                    <Link to="/join" className="inline-block w-full sm:w-auto bg-gradient-to-r from-emerald to-gold hover:shadow-premium text-white font-outfit font-bold px-12 py-5 rounded-2xl text-lg hover:scale-105 transition-transform duration-300">
                        Daftar Sekarang
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Home;