import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Sparkles, User, MapPin, Target, CheckCircle2, ShieldCheck, Loader2, ArrowLeft, ArrowRight } from 'lucide-react';
import Swal from 'sweetalert2';
import { API_ENDPOINTS } from '../../config/api';

const SahabatSholehahForm: React.FC = () => {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);

    const [formData, setFormData] = useState({
        name: '',
        gender: 'Perempuan', // Terkunci
        phone: '',
        generation: '',
        activity: '',
        domicile: '',
        is_interested_leader: false,
        leader_interest_area: '',
        concerns: '',
        goals: '',
        requested_topics: '',
        speaker_recommendation: '',
        agreement: false
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;

        if (type === 'checkbox') {
            const checked = (e.target as HTMLInputElement).checked;
            setFormData(prev => ({ ...prev, [name]: checked }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const nextStep = () => {
        if (currentStep === 1) {
            if (!formData.name || !formData.phone) {
                return Swal.fire('Form Belum Lengkap', 'Harap isi seluruh field bertanda bintang (*)', 'warning');
            }
        } else if (currentStep === 2) {
            if (!formData.generation || !formData.domicile || !formData.activity) {
                return Swal.fire('Form Belum Lengkap', 'Harap isi seluruh field bertanda bintang (*)', 'warning');
            }
        } else if (currentStep === 3) {
            if (!formData.concerns || !formData.goals) {
                return Swal.fire('Form Belum Lengkap', 'Harap isi seluruh field bertanda bintang (*)', 'warning');
            }
        }
        setCurrentStep(prev => Math.min(prev + 1, 4));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const prevStep = () => {
        setCurrentStep(prev => Math.max(prev - 1, 1));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.agreement) {
            return Swal.fire('Persetujuan Diperlukan', 'Kamu harus menyetujui peraturan komunitas untuk bergabung.', 'warning');
        }

        setIsSubmitting(true);

        try {
            const res = await fetch(`${API_ENDPOINTS.sholehah}/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const result = await res.json();

            if (res.ok) {
                Swal.fire({
                    title: 'Masyaallah, Selamat Bergabung! 🌸',
                    text: 'Data kamu sudah kami terima dengan aman. Tunggu pesan WhatsApp dari tim kami ya.',
                    icon: 'success',
                    confirmButtonColor: '#D47A8E',
                    confirmButtonText: 'Kembali ke Sholehah'
                }).then(() => {
                    navigate('/sholehah');
                });
            } else {
                Swal.fire('Oops...', result.message, 'warning');
            }
        } catch (error) {
            Swal.fire('Error', 'Gagal terhubung ke server. Silakan coba lagi.', 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const steps = [
        { id: 1, title: 'Kenalan Dulu', icon: <User size={18} /> },
        { id: 2, title: 'Domisili & Aktivitas', icon: <MapPin size={18} /> },
        { id: 3, title: 'Ruang Hati', icon: <Heart size={18} /> },
        { id: 4, title: 'Kolaborasi', icon: <Target size={18} /> }
    ];

    const progressPercentage = (currentStep / steps.length) * 100;

    return (
        <div className="bg-[#FFF7F9] min-h-screen pt-28 pb-20 font-sans selection:bg-pink-100 selection:text-pink-900">
            <div className="max-w-3xl mx-auto px-4 sm:px-6">

                {/* HERO INTRO */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center p-3 bg-white/85 backdrop-blur shadow-sm text-roseSholehah mb-6 border border-roseSholehah/10 rounded-full">
                        <Sparkles size={24} />
                    </div>
                    <h1 className="text-3xl md:text-5xl font-outfit font-extrabold text-gray-800 mb-4 leading-tight">
                        Selamat Datang di <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-roseSholehah to-gold">
                            Sahabat Sholehah 🌸
                        </span>
                    </h1>
                    <p className="text-gray-650 text-base md:text-lg font-outfit font-medium max-w-xl mx-auto">
                        Tempat bertumbuh, belajar, dan saling menguatkan. Isi form ini untuk melangkah bersama kami 🤍
                    </p>
                </div>

                {/* STEPPER PROGRESS */}
                <div className="mb-10">
                    {/* Stepper Headers */}
                    <div className="flex justify-between items-center relative mb-4">
                        {steps.map((step) => (
                            <div key={step.id} className="flex flex-col items-center z-10 flex-1">
                                <div 
                                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-350 ${
                                        currentStep >= step.id 
                                            ? 'bg-roseSholehah border-roseSholehah text-white shadow-md' 
                                            : 'bg-white border-gray-200 text-gray-400'
                                    }`}
                                >
                                    {step.icon}
                                </div>
                                <span className={`text-[10px] sm:text-xs font-outfit font-bold mt-2 text-center transition-colors ${
                                    currentStep >= step.id ? 'text-roseSholehah' : 'text-gray-400'
                                }`}>
                                    {step.title}
                                </span>
                            </div>
                        ))}
                        {/* Connecting Line BG */}
                        <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200 -z-10" />
                        {/* Active Line Fill */}
                        <div 
                            className="absolute top-5 left-0 h-0.5 bg-roseSholehah -z-10 transition-all duration-350"
                            style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
                        />
                    </div>

                    {/* Progress Fill */}
                    <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                        <div 
                            className="bg-gradient-to-r from-roseSholehah to-gold h-full transition-all duration-300"
                            style={{ width: `${progressPercentage}%` }}
                        />
                    </div>
                </div>

                {/* MAIN FORM CARD */}
                <div className="glass-card p-6 md:p-10 border border-white/20 bg-white/75">
                    <form onSubmit={handleSubmit} className="space-y-8">

                        {/* STEP 1: KENALAN */}
                        {currentStep === 1 && (
                            <div className="space-y-6 animate-in fade-in duration-300">
                                <div className="flex items-center gap-2 mb-4 border-b border-roseSholehah/10 pb-2">
                                    <User className="text-roseSholehah" size={20} />
                                    <h2 className="text-xl font-outfit font-bold text-gray-800">Kenalan Dulu Yuk!</h2>
                                </div>
                                <div className="space-y-5">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-650 mb-2">Nama Lengkap Panggilan *</label>
                                        <input 
                                            type="text" 
                                            name="name" 
                                            required 
                                            value={formData.name} 
                                            onChange={handleChange} 
                                            className="w-full p-4 rounded-xl bg-gray-50/50 border border-gray-200 outline-none transition-all focus:border-gold focus:ring-4 focus:ring-gold/20" 
                                            placeholder="Tuliskan nama cantikmu..." 
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                        <div>
                                            <label className="block text-sm font-bold text-gray-650 mb-2">Jenis Kelamin</label>
                                            <select 
                                                name="gender" 
                                                disabled 
                                                className="w-full p-4 rounded-xl bg-gray-100 text-gray-400 border border-gray-200 outline-none cursor-not-allowed font-medium"
                                            >
                                                <option value="Perempuan">Perempuan</option>
                                            </select>
                                            <p className="text-[10px] text-roseSholehah mt-1.5 font-bold">* Ruang khusus Muslimah</p>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-gray-650 mb-2">No WhatsApp *</label>
                                            <input 
                                                type="tel" 
                                                name="phone" 
                                                required 
                                                value={formData.phone} 
                                                onChange={handleChange} 
                                                className="w-full p-4 rounded-xl bg-gray-50/50 border border-gray-200 outline-none transition-all focus:border-gold focus:ring-4 focus:ring-gold/20" 
                                                placeholder="081234567890" 
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* STEP 2: PROFIL DASAR */}
                        {currentStep === 2 && (
                            <div className="space-y-6 animate-in fade-in duration-300">
                                <div className="flex items-center gap-2 mb-4 border-b border-roseSholehah/10 pb-2">
                                    <MapPin className="text-roseSholehah" size={20} />
                                    <h2 className="text-xl font-outfit font-bold text-gray-800">Profil & Domisili</h2>
                                </div>
                                <div className="space-y-5">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                        <div>
                                            <label className="block text-sm font-bold text-gray-650 mb-2">Generasi / Tahun Lahir *</label>
                                            <select 
                                                name="generation" 
                                                required 
                                                value={formData.generation} 
                                                onChange={handleChange} 
                                                className="w-full p-4 rounded-xl bg-gray-50/50 border border-gray-200 outline-none transition-all text-gray-700 focus:border-gold focus:ring-4 focus:ring-gold/20"
                                            >
                                                <option value="">-- Pilih --</option>
                                                <option value="Gen Z (1997-2012)">Gen Z (1997-2012)</option>
                                                <option value="Millennial (1981-1996)">Millennial (1981-1996)</option>
                                                <option value="Lainnya">Lainnya</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-gray-650 mb-2">Domisili (Kota/Kab) *</label>
                                            <input 
                                                type="text" 
                                                name="domicile" 
                                                required 
                                                value={formData.domicile} 
                                                onChange={handleChange} 
                                                className="w-full p-4 rounded-xl bg-gray-50/50 border border-gray-200 outline-none transition-all focus:border-gold focus:ring-4 focus:ring-gold/20" 
                                                placeholder="Contoh: Bandung, Garut..." 
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-650 mb-3">Kesibukan Saat Ini *</label>
                                        <div className="flex flex-wrap gap-3">
                                            {['Pelajar / Mahasiswa', 'Bekerja', 'Ibu Rumah Tangga', 'Freelancer / Usaha', 'Lainnya'].map((act) => (
                                                <label 
                                                    key={act} 
                                                    className={`cursor-pointer border px-5 py-3 rounded-xl font-semibold text-sm transition-all ${
                                                        formData.activity === act 
                                                            ? 'bg-roseSholehah/10 border-roseSholehah text-roseSholehah shadow-sm' 
                                                            : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50'
                                                    }`}
                                                >
                                                    <input 
                                                        type="radio" 
                                                        name="activity" 
                                                        value={act} 
                                                        required 
                                                        checked={formData.activity === act} 
                                                        onChange={handleChange} 
                                                        className="hidden" 
                                                    />
                                                    {act}
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* STEP 3: RUANG HATI */}
                        {currentStep === 3 && (
                            <div className="space-y-6 animate-in fade-in duration-300">
                                <div className="flex items-center gap-2 mb-4 border-b border-roseSholehah/10 pb-2">
                                    <Heart className="text-roseSholehah" size={20} />
                                    <h2 className="text-xl font-outfit font-bold text-gray-800">Ruang Hati</h2>
                                </div>
                                <div className="space-y-5">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-650 mb-2">Apa keresahanmu saat ini? *</label>
                                        <p className="text-xs text-roseSholehah mb-3 font-semibold bg-roseSholehah/5 p-2.5 rounded-lg">🤍 Kami di sini untuk mendengarkan, bukan menghakimi. Ceritakan dengan jujur ya.</p>
                                        <textarea 
                                            name="concerns" 
                                            required 
                                            rows={4} 
                                            value={formData.concerns} 
                                            onChange={handleChange} 
                                            className="w-full p-4 rounded-xl bg-gray-50/50 border border-gray-200 outline-none transition-all resize-none leading-relaxed focus:border-gold focus:ring-4 focus:ring-gold/20" 
                                            placeholder="Aku merasa sering insecure karena... / Aku sulit konsisten ibadah karena..."
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-650 mb-2">Apa harapan dan tujuan kamu bergabung? *</label>
                                        <textarea 
                                            name="goals" 
                                            required 
                                            rows={3} 
                                            value={formData.goals} 
                                            onChange={handleChange} 
                                            className="w-full p-4 rounded-xl bg-gray-50/50 border border-gray-200 outline-none transition-all resize-none leading-relaxed focus:border-gold focus:ring-4 focus:ring-gold/20" 
                                            placeholder="Aku ingin punya lingkungan pertemanan yang saling support untuk ibadah..."
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* STEP 4: KOLABORASI & ATURAN */}
                        {currentStep === 4 && (
                            <div className="space-y-6 animate-in fade-in duration-300">
                                <div className="flex items-center gap-2 mb-4 border-b border-roseSholehah/10 pb-2">
                                    <Target className="text-roseSholehah" size={20} />
                                    <h2 className="text-xl font-outfit font-bold text-gray-800">Kolaborasi & Persetujuan</h2>
                                </div>
                                <div className="space-y-6">
                                    <div className="bg-roseSholehah/5 p-6 rounded-2xl border border-roseSholehah/10">
                                        <label className="block text-sm font-bold text-gray-800 mb-3">Apakah kamu tertarik menjadi penggerak (Community Leader) di masa depan?</label>
                                        <div className="flex gap-4">
                                            <button 
                                                type="button"
                                                onClick={() => setFormData({ ...formData, is_interested_leader: true })}
                                                className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm transition-all ${
                                                    formData.is_interested_leader 
                                                        ? 'bg-roseSholehah text-white shadow-md' 
                                                        : 'bg-white border border-gray-200 text-gray-650'
                                                }`}
                                            >
                                                Tentu Saja! 🙋‍♀️
                                            </button>
                                            <button 
                                                type="button"
                                                onClick={() => setFormData({ ...formData, is_interested_leader: false, leader_interest_area: '' })}
                                                className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm transition-all ${
                                                    !formData.is_interested_leader 
                                                        ? 'bg-gray-400 text-white shadow-md' 
                                                        : 'bg-white border border-gray-200 text-gray-650'
                                                }`}
                                            >
                                                Mungkin Nanti
                                            </button>
                                        </div>

                                        {formData.is_interested_leader && (
                                            <div className="mt-5 space-y-4 animate-in slide-in-from-top-2 duration-200">
                                                <label className="block text-xs font-bold text-gray-650 mb-1">Keren! Di bidang apa kamu ingin berkontribusi?</label>
                                                <select 
                                                    name="leader_interest_area" 
                                                    value={formData.leader_interest_area} 
                                                    onChange={handleChange} 
                                                    className="w-full p-3 rounded-xl bg-white border border-roseSholehah/25 outline-none font-medium text-xs text-gray-700 focus:border-gold focus:ring-4 focus:ring-gold/20"
                                                >
                                                    <option value="">-- Pilih Minat Kontribusi --</option>
                                                    <option value="Event Organizer (Host/Moderator)">Event Organizer (Host/Moderator)</option>
                                                    <option value="Content Creator (Poster/Caption)">Content Creator (Desain/Penulis)</option>
                                                    <option value="Public Relations (Cari Pemateri)">Public Relations (Relasi Pemateri)</option>
                                                    <option value="Curhat Listener (Tim Support)">Ruang Dengar (Tim Support Member)</option>
                                                </select>
                                            </div>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                        <div>
                                            <label className="block text-sm font-bold text-gray-650 mb-2">Request Tema Kajian (Opsional)</label>
                                            <input 
                                                type="text" 
                                                name="requested_topics" 
                                                value={formData.requested_topics} 
                                                onChange={handleChange} 
                                                className="w-full p-4 rounded-xl bg-gray-50/50 border border-gray-200 outline-none focus:border-gold focus:ring-4 focus:ring-gold/20" 
                                                placeholder="Misal: Manajemen Emosi, Fiqih Wanita..." 
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-gray-650 mb-2">Rekomendasi Pemateri (Opsional)</label>
                                            <input 
                                                type="text" 
                                                name="speaker_recommendation" 
                                                value={formData.speaker_recommendation} 
                                                onChange={handleChange} 
                                                className="w-full p-4 rounded-xl bg-gray-50/50 border border-gray-200 outline-none focus:border-gold focus:ring-4 focus:ring-gold/20" 
                                                placeholder="Nama / IG pemateri favoritmu" 
                                            />
                                        </div>
                                    </div>

                                    {/* Agreement Box */}
                                    <div className="bg-pink-50 p-5 rounded-2xl border border-pink-100">
                                        <div className="flex items-center gap-2 mb-3 text-roseSholehah font-bold">
                                            <ShieldCheck size={20} />
                                            <h3>Peraturan Komunitas</h3>
                                        </div>
                                        <div className="text-xs text-gray-600 space-y-1 mb-4 leading-relaxed pl-1 font-medium">
                                            <p>1. Wajib menjaga privasi dan rahasia sesama member.</p>
                                            <p>2. Saling menghargai, berkata baik, dan tidak menghakimi.</p>
                                            <p>3. Aktif memperkenalkan diri dan berpartisipasi dalam diskusi positif.</p>
                                        </div>

                                        <label className="flex items-start gap-3 cursor-pointer bg-white p-3 rounded-xl border border-pink-100/50 hover:border-pink-300 transition">
                                            <input 
                                                type="checkbox" 
                                                name="agreement" 
                                                required 
                                                checked={formData.agreement} 
                                                onChange={handleChange} 
                                                className="mt-1 w-4.5 h-4.5 accent-roseSholehah rounded cursor-pointer shrink-0" 
                                            />
                                            <span className="text-xs font-bold text-gray-800 leading-snug">
                                                Saya telah membaca dan berjanji untuk mengikuti semua peraturan komunitas Sahabat Sholehah dengan niat mencari ridha Allah.
                                            </span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* NAV CONTROL BUTTONS */}
                        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                            {currentStep > 1 ? (
                                <button
                                    type="button"
                                    onClick={prevStep}
                                    className="flex items-center gap-1.5 px-5 py-3 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-600 font-bold text-sm transition"
                                >
                                    <ArrowLeft size={16} />
                                    <span>Sebelumnya</span>
                                </button>
                            ) : (
                                <div />
                            )}

                            {currentStep < 4 ? (
                                <button
                                    type="button"
                                    onClick={nextStep}
                                    className="flex items-center gap-1.5 px-6 py-3 rounded-xl bg-roseSholehah hover:shadow-premium text-white font-bold text-sm transition ml-auto"
                                >
                                    <span>Lanjutkan</span>
                                    <ArrowRight size={16} />
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    disabled={isSubmitting || !formData.agreement}
                                    className="flex items-center gap-1.5 px-8 py-3 rounded-xl bg-gradient-to-r from-roseSholehah to-gold hover:shadow-premium text-white font-bold text-sm transition ml-auto disabled:opacity-50"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="animate-spin" size={16} />
                                            <span>Mendaftar...</span>
                                        </>
                                    ) : (
                                        <>
                                            <CheckCircle2 size={16} />
                                            <span>Kirim Pendaftaran</span>
                                        </>
                                    )}
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SahabatSholehahForm;