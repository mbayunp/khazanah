import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, MapPin, Users, ArrowLeft, CheckCircle2, Share2 } from 'lucide-react';

interface ProgramType {
    id: number;
    title: string;
    description: string;
    category: string;
    date: string;
    location: string;
    image: string | null;
    status: string;
    quota: number;
}

const ProgramDetail: React.FC = () => {
    const { slug } = useParams();
    const [program, setProgram] = useState<ProgramType | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProgram = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/programs/slug/${slug}`);
                const data = await response.json();
                setProgram(data);
            } catch (error) {
                console.error("Gagal memuat detail program:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProgram();
    }, [slug]);

    if (isLoading) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-khazanah-gold"></div>
        </div>
    );

    if (!program) return (
        <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
            <h2 className="text-2xl font-bold mb-4">Program tidak ditemukan 🧐</h2>
            <Link to="/program" className="text-khazanah-green font-bold hover:underline">Kembali ke Daftar Program</Link>
        </div>
    );

    return (
        <div className="bg-gray-50 min-h-screen pb-20">
            {/* Header / Navigasi Balik */}
            <div className="bg-white border-b border-gray-100 pt-28 pb-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Link to="/program" className="flex items-center gap-2 text-gray-500 hover:text-khazanah-green transition-colors text-sm font-medium">
                        <ArrowLeft size={16} /> Kembali ke Program
                    </Link>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
                <div className="grid lg:grid-cols-3 gap-10">
                    
                    {/* Kolom Kiri: Detail Konten */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Judul & Kategori */}
                        <div>
                            <span className="bg-khazanah-light text-khazanah-green px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border border-khazanah-green/10">
                                {program.category}
                            </span>
                            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-4 leading-tight">
                                {program.title}
                            </h1>
                        </div>

                        {/* Image Poster */}
                        <div className="rounded-3xl overflow-hidden shadow-2xl shadow-khazanah-dark/10 bg-gray-200 aspect-video lg:aspect-auto lg:h-[450px]">
                            {program.image ? (
                                <img src={`http://localhost:5000${program.image}`} alt={program.title} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-400">Khazanah Poster</div>
                            )}
                        </div>

                        {/* Deskripsi */}
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                                <span className="w-2 h-6 bg-khazanah-gold rounded-full"></span>
                                Tentang Program
                            </h2>
                            <div className="text-gray-600 leading-relaxed whitespace-pre-line text-lg">
                                {program.description || "Belum ada deskripsi untuk program ini."}
                            </div>
                        </div>
                    </div>

                    {/* Kolom Kanan: Sidebar Info & Form */}
                    <div className="space-y-6">
                        <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 sticky top-32">
                            <h3 className="text-xl font-bold mb-6 text-gray-900">Detail Acara</h3>
                            
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-khazanah-light rounded-2xl text-khazanah-green">
                                        <Calendar size={24} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Waktu</p>
                                        <p className="font-bold text-gray-800">{new Date(program.date).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</p>
                                        <p className="text-sm text-gray-500">{new Date(program.date).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-blue-50 rounded-2xl text-blue-600">
                                        <MapPin size={24} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Lokasi</p>
                                        <p className="font-bold text-gray-800">{program.location}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-amber-50 rounded-2xl text-khazanah-gold">
                                        <Users size={24} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Kuota</p>
                                        <p className="font-bold text-gray-800">{program.quota > 0 ? `${program.quota} Peserta` : 'Terbuka Umum'}</p>
                                    </div>
                                </div>
                            </div>

                            <hr className="my-8 border-gray-100" />

                            {/* Tombol Daftar */}
                            {program.status === 'active' ? (
                                <button className="w-full bg-khazanah-green text-white py-4 rounded-2xl font-bold text-lg hover:bg-khazanah-dark transition shadow-lg shadow-khazanah-green/30 flex items-center justify-center gap-2">
                                    Daftar Sekarang <CheckCircle2 size={20} />
                                </button>
                            ) : (
                                <button disabled className="w-full bg-gray-100 text-gray-400 py-4 rounded-2xl font-bold text-lg cursor-not-allowed border border-gray-200">
                                    Pendaftaran Ditutup
                                </button>
                            )}
                            
                            <button className="w-full mt-4 flex items-center justify-center gap-2 text-sm font-semibold text-gray-500 hover:text-khazanah-gold transition-colors py-2">
                                <Share2 size={16} /> Bagikan Program
                            </button>
                        </div>

                        {/* Info Tambahan */}
                        <div className="bg-khazanah-dark p-6 rounded-3xl text-white">
                            <p className="text-sm opacity-80 mb-2 font-medium italic text-khazanah-light">"Barangsiapa yang menempuh jalan untuk mencari ilmu, maka Allah akan memudahkan baginya jalan ke surga."</p>
                            <p className="text-xs font-bold text-khazanah-gold">— HR. Muslim</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ProgramDetail;