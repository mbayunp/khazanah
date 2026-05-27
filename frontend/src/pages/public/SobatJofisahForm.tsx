import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Rocket, User, MapPin, Target, Compass, CheckCircle2, ShieldCheck, Loader2, ArrowLeft, ArrowRight } from 'lucide-react';
import Swal from 'sweetalert2';
import { API_ENDPOINTS } from '../../config/api';

const SobatJofisahForm: React.FC = () => {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);

    const [formData, setFormData] = useState({
        name: '',
        gender: '',
        phone: '',
        generation: '',
        activity: '',
        domicile: '',
        is_interested_leader: false,
        leader_interest_area: '',
        leader_reason: '',
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
            if (!formData.name || !formData.gender || !formData.phone) {
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
            const res = await fetch(`${API_ENDPOINTS.jofisah}/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const result = await res.json();

            if (res.ok) {
                Swal.fire({
                    title: 'Welcome to the Journey! 🚀',
                    text: 'Data kamu aman bersama kami. Pantau terus info selanjutnya di grup atau WhatsApp ya.',
                    icon: 'success',
                    confirmButtonColor: '#1E7F8A',
                    confirmButtonText: 'Kembali ke Jofisah'
                }).then(() => navigate('/jofisah'));
            } else {
                Swal.fire('Oops...', result.message, 'warning');
            }
        } catch (error) {
            Swal.fire('Error', 'Gagal terhubung ke server.', 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const steps = [
        { id: 1, title: 'Data Diri', icon: <User size={18} /> },
        { id: 2, title: 'Domisili & Aktivitas', icon: <MapPin size={18} /> },
        { id: 3, title: 'Insight & Growth', icon: <Compass size={18} /> },
        { id: 4, title: 'Kontribusi', icon: <Target size={18} /> }
    ];

    const progressPercentage = (currentStep / steps.length) * 100;

    return (
        <div className="bg-[#FAF6EE] min-h-screen pt-28 pb-20 font-sans selection:bg-teal-100 selection:text-teal-900">
            <div className="max-w-3xl mx-auto px-4 sm:px-6">

                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center p-3 bg-white/80 backdrop-blur shadow-sm text-teal-600 mb-6 border border-teal-600/10 rounded-full">
                        <Rocket size={24} />
                    </div>
                    <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
                        Gabung Sobat <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-amber-500">
                            Jofisah 🚀
                        </span>
                    </h1>
                    <p className="text-gray-600 text-base md:text-lg font-medium max-w-xl mx-auto">
                        Tempat bertumbuh, memperbaiki diri, dan menemukan arah hidup bersama.
                    </p>
                </div>

                <div className="mb-10">
                    <div className="flex justify-between items-center relative mb-4">
                        {steps.map((step) => (
                            <div key={step.id} className="flex flex-col items-center z-10 flex-1">
                                <div 
                                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-350 ${
                                        currentStep >= step.id 
                                            ? 'bg-teal-600 border-teal-600 text-white shadow-md' 
                                            : 'bg-white border-gray-200 text-gray-400'
                                    }`}
                                >
                                    {step.icon}
                                </div>
                                <span className={`text-[10px] sm:text-xs font-bold mt-2 text-center transition-colors ${
                                    currentStep >= step.id ? 'text-teal-600' : 'text-gray-400'
                                }`}>
                                    {step.title}
                                </span>
                            </div>
                        ))}
                        <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200 -z-10" />
                        <div 
                            className="absolute top-5 left-0 h-0.5 bg-teal-600 -z-10 transition-all duration-350"
                            style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
                        />
                    </div>

                    <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                        <div 
                            className="bg-gradient-to-r from-teal-600 to-amber-500 h-full transition-all duration-300"
                            style={{ width: `${progressPercentage}%` }}
                        />
                    </div>
                </div>

                <div className="bg-white/75 backdrop-blur p-6 md:p-10 border border-white/20 rounded-[2.5rem] shadow-xl shadow-blue-900/5">
                    <form onSubmit={handleSubmit} className="space-y-8">

                        {currentStep === 1 && (
                            <div className="space-y-6 animate-in fade-in duration-300">
                                <div className="flex items-center gap-2 mb-4 border-b border-gray-100 pb-2">
                                    <User className="text-teal-600" size={20} />
                                    <h2 className="text-xl font-bold text-gray-900">Data Diri</h2>
                                </div>
                                <div className="space-y-5">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Nama Lengkap *</label>
                                        <input type="text" name="name" required value={formData.name} onChange={handleChange} className="w-full p-4 rounded-xl bg-gray-50/50 border border-gray-200 outline-none transition-all focus:border-amber-500 focus:ring-4 focus:ring-amber-500/20" placeholder="Tuliskan nama lengkapmu..." />
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">Jenis Kelamin *</label>
                                            <select name="gender" required value={formData.gender} onChange={handleChange} className="w-full p-4 rounded-xl bg-gray-50/50 border border-gray-200 outline-none transition-all font-medium text-gray-700 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/20">
                                                <option value="">-- Pilih --</option>
                                                <option value="Laki-laki">Laki-laki</option>
                                                <option value="Perempuan">Perempuan</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">No WhatsApp *</label>
                                            <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} className="w-full p-4 rounded-xl bg-gray-50/50 border border-gray-200 outline-none transition-all focus:border-amber-500 focus:ring-4 focus:ring-amber-500/20" placeholder="081234567890" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {currentStep === 2 && (
                            <div className="space-y-6 animate-in fade-in duration-300">
                                <div className="flex items-center gap-2 mb-4 border-b border-gray-100 pb-2">
                                    <MapPin className="text-teal-600" size={20} />
                                    <h2 className="text-xl font-bold text-gray-900">Profil & Aktivitas</h2>
                                </div>
                                <div className="space-y-5">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">Tahun Lahir (Generasi) *</label>
                                            <select name="generation" required value={formData.generation} onChange={handleChange} className="w-full p-4 rounded-xl bg-gray-50/50 border border-gray-200 outline-none transition-all text-gray-700 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/20">
                                                <option value="">-- Pilih Generasi --</option>
                                                <option value="Gen Z (1997-2012)">Gen Z (1997-2012)</option>
                                                <option value="Millennial (1981-1996)">Millennial (1981-1996)</option>
                                                <option value="Lainnya">Lainnya</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">Domisili *</label>
                                            <input type="text" name="domicile" required value={formData.domicile} onChange={handleChange} className="w-full p-4 rounded-xl bg-gray-50/50 border border-gray-200 outline-none transition-all focus:border-amber-500 focus:ring-4 focus:ring-amber-500/20" placeholder="Contoh: Bandung, Garut..." />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-3">Kesibukan Saat Ini *</label>
                                        <div className="flex flex-wrap gap-3">
                                            {['Kuliah', 'Bekerja', 'Freelance/Usaha', 'Lainnya'].map((act) => (
                                                <label key={act} className={`cursor-pointer border px-6 py-3 rounded-xl font-bold text-sm transition-all ${formData.activity === act ? 'bg-teal-600/10 border-teal-600 text-teal-600 shadow-sm' : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50'}`}>
                                                    <input type="radio" name="activity" value={act} required checked={formData.activity === act} onChange={handleChange} className="hidden" />
                                                    {act}
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {currentStep === 3 && (
                            <div className="space-y-6 animate-in fade-in duration-300">
                                <div className="flex items-center gap-2 mb-4 border-b border-gray-100 pb-2">
                                    <Compass className="text-teal-600" size={20} />
                                    <h2 className="text-xl font-bold text-gray-900">Insight & Growth</h2>
                                </div>
                                <div className="space-y-5">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Apa keresahanmu saat ini? *</label>
                                        <p className="text-xs text-teal-600 mb-3 font-semibold bg-teal-600/5 p-2.5 rounded-lg">🤝 Cerita aja, kita di sini untuk saling menguatkan.</p>
                                        <textarea name="concerns" required rows={4} value={formData.concerns} onChange={handleChange} className="w-full p-4 rounded-xl bg-gray-50/50 border border-gray-200 outline-none transition-all resize-none leading-relaxed focus:border-amber-500 focus:ring-4 focus:ring-amber-500/20" placeholder="Contoh: Merasa tertinggal dari teman, bingung arah karir, atau sulit konsisten..."></textarea>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Apa harapan dan tujuan kamu bergabung? *</label>
                                        <textarea name="goals" required rows={3} value={formData.goals} onChange={handleChange} className="w-full p-4 rounded-xl bg-gray-50/50 border border-gray-200 outline-none transition-all resize-none leading-relaxed focus:border-amber-500 focus:ring-4 focus:ring-amber-500/20" placeholder="Aku ingin bisa lebih produktif dan punya circle yang positif..."></textarea>
                                    </div>
                                </div>
                            </div>
                        )}

                        {currentStep === 4 && (
                            <div className="space-y-6 animate-in fade-in duration-300">
                                <div className="flex items-center gap-2 mb-4 border-b border-gray-100 pb-2">
                                    <Target className="text-teal-600" size={20} />
                                    <h2 className="text-xl font-bold text-gray-900">Kontribusi & Persetujuan</h2>
                                </div>
                                <div className="space-y-6">
                                    <div className="bg-teal-600/5 p-6 rounded-2xl border border-teal-600/10">
                                        <label className="block text-sm font-bold text-gray-900 mb-3">Tertarik jadi penggerak (Leader) di Sobat Jofisah? *</label>
                                        <div className="flex gap-4">
                                            <button type="button" onClick={() => setFormData({ ...formData, is_interested_leader: true })} className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm transition-all ${formData.is_interested_leader ? 'bg-teal-600 text-white shadow-md' : 'bg-white border border-gray-200 text-gray-600'}`}>Ya, Gas! 🚀</button>
                                            <button type="button" onClick={() => setFormData({ ...formData, is_interested_leader: false, leader_interest_area: '', leader_reason: '' })} className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm transition-all ${!formData.is_interested_leader ? 'bg-gray-400 text-white shadow-md' : 'bg-white border border-gray-200 text-gray-600'}`}>Nanti Dulu</button>
                                        </div>

                                        {formData.is_interested_leader && (
                                            <div className="mt-5 space-y-4 animate-in slide-in-from-top-2 duration-200">
                                                <div>
                                                    <label className="block text-xs font-bold text-gray-700 mb-1">Bidang kontribusi apa yang kamu minati?</label>
                                                    <select name="leader_interest_area" required={formData.is_interested_leader} value={formData.leader_interest_area} onChange={handleChange} className="w-full p-3 rounded-xl bg-white border border-teal-600/25 outline-none font-medium text-xs text-gray-700 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/20">
                                                        <option value="">-- Pilih Bidang --</option>
                                                        <option value="Event / Host">Event Organizer (Host/Moderator)</option>
                                                        <option value="Content / Desain">Content Creator (Desain/Penulis)</option>
                                                        <option value="Partnership / Relasi">Partnership (Relasi Pemateri)</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-bold text-gray-700 mb-1">Kenapa tertarik jadi leader?</label>
                                                    <textarea name="leader_reason" required={formData.is_interested_leader} rows={2} value={formData.leader_reason} onChange={handleChange} className="w-full p-3 rounded-xl bg-white border border-teal-600/25 outline-none resize-none text-xs focus:border-amber-500 focus:ring-4 focus:ring-amber-500/20" placeholder="Cerita singkat alasanmu..."></textarea>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">Request Tema Kajian</label>
                                            <input type="text" name="requested_topics" value={formData.requested_topics} onChange={handleChange} className="w-full p-4 rounded-xl bg-gray-50/50 border border-gray-200 outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/20" placeholder="Tema kajian..." />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">Rekomendasi Pemateri</label>
                                            <input type="text" name="speaker_recommendation" value={formData.speaker_recommendation} onChange={handleChange} className="w-full p-4 rounded-xl bg-gray-50/50 border border-gray-200 outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/20" placeholder="Nama Pemateri..." />
                                        </div>
                                    </div>

                                    <div className="bg-[#FAF6EE] p-5 rounded-2xl border border-gray-200">
                                        <div className="flex items-center gap-2 mb-3 text-teal-600 font-bold">
                                            <ShieldCheck size={20} />
                                            <h3>Peraturan Komunitas</h3>
                                        </div>
                                        <div className="text-xs text-gray-600 space-y-1 mb-4 leading-relaxed pl-1 font-medium">
                                            <p>1. Wajib memperkenalkan diri setelah bergabung.</p>
                                            <p>2. Menjaga adab diskusi dan saling menghargai pendapat.</p>
                                            <p>3. Dilarang menyebarkan hoax, SARA, atau jualan tanpa izin.</p>
                                        </div>

                                        <label className="flex items-start gap-3 cursor-pointer bg-white p-3 rounded-xl border border-gray-200 hover:border-amber-500 transition">
                                            <input type="checkbox" name="agreement" required checked={formData.agreement} onChange={handleChange} className="mt-1 w-4.5 h-4.5 accent-teal-600 rounded cursor-pointer" />
                                            <span className="text-xs font-bold text-gray-800 leading-snug">
                                                Saya telah membaca dan berjanji untuk mengikuti semua aturan komunitas demi kenyamanan bersama.
                                            </span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                            {currentStep > 1 ? (
                                <button type="button" onClick={prevStep} className="flex items-center gap-1.5 px-5 py-3 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-600 font-bold text-sm transition">
                                    <ArrowLeft size={16} />
                                    <span>Sebelumnya</span>
                                </button>
                            ) : <div />}

                            {currentStep < 4 ? (
                                <button type="button" onClick={nextStep} className="flex items-center gap-1.5 px-6 py-3 rounded-xl bg-teal-600 hover:shadow-lg text-white font-bold text-sm transition ml-auto">
                                    <span>Lanjutkan</span>
                                    <ArrowRight size={16} />
                                </button>
                            ) : (
                                <button type="submit" disabled={isSubmitting || !formData.agreement} className="flex items-center gap-1.5 px-8 py-3 rounded-xl bg-gradient-to-r from-teal-600 to-amber-500 hover:shadow-lg text-white font-bold text-sm transition ml-auto disabled:opacity-50">
                                    {isSubmitting ? (
                                        <><Loader2 className="animate-spin" size={16} /> <span>Mendaftar...</span></>
                                    ) : (
                                        <><CheckCircle2 size={16} /> <span>Kirim Pendaftaran</span></>
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

export default SobatJofisahForm;