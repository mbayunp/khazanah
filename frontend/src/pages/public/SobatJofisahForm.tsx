import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Rocket, User, MapPin, Target, Compass, CheckCircle2, ShieldCheck, Loader2 } from 'lucide-react';
import Swal from 'sweetalert2';

const SobatJofisahForm: React.FC = () => {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const res = await fetch('http://localhost:5000/api/jofisah/register', {
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
                    confirmButtonColor: '#2563EB',
                    confirmButtonText: 'Kembali ke Beranda'
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

    return (
        <div className="bg-[#F9FAFB] min-h-screen pt-28 pb-20 font-sans selection:bg-blue-200 selection:text-blue-900">
            <div className="max-w-3xl mx-auto px-4 sm:px-6">

                {/* 1. HERO INTRO */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center p-3 bg-white rounded-full shadow-sm text-blue-600 mb-6 border border-blue-100">
                        <Rocket size={28} />
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black text-gray-900 mb-4 leading-tight">
                        Gabung Sobat <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500">
                            Jofisah 🚀
                        </span>
                    </h1>
                    <p className="text-gray-600 text-lg md:text-xl font-medium max-w-xl mx-auto">
                        Tempat bertumbuh, memperbaiki diri, dan menemukan arah hidup bersama.
                    </p>
                </div>

                {/* 2. MAIN FORM */}
                <div className="bg-white p-6 md:p-10 rounded-[2.5rem] shadow-xl shadow-blue-900/5 border border-gray-100">
                    <form onSubmit={handleSubmit} className="space-y-10">

                        {/* SECTION A: DATA DIRI */}
                        <section>
                            <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-2">
                                <User className="text-blue-600" size={20} />
                                <h2 className="text-xl font-bold text-gray-900">Data Diri</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Nama Lengkap *</label>
                                    <input type="text" name="name" required value={formData.name} onChange={handleChange} className="w-full p-4 rounded-2xl bg-gray-50 border-none ring-1 ring-gray-200 focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all" placeholder="Tuliskan nama lengkapmu..." />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Jenis Kelamin *</label>
                                    <select name="gender" required value={formData.gender} onChange={handleChange} className="w-full p-4 rounded-2xl bg-gray-50 border-none ring-1 ring-gray-200 focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all font-medium text-gray-700">
                                        <option value="">-- Pilih --</option>
                                        <option value="Laki-laki">Laki-laki</option>
                                        <option value="Perempuan">Perempuan</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">No WhatsApp *</label>
                                    <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} className="w-full p-4 rounded-2xl bg-gray-50 border-none ring-1 ring-gray-200 focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all" placeholder="081234567890" />
                                </div>
                            </div>
                        </section>

                        {/* SECTION B: PROFIL DASAR */}
                        <section>
                            <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-2">
                                <MapPin className="text-blue-600" size={20} />
                                <h2 className="text-xl font-bold text-gray-900">Profil & Aktivitas</h2>
                            </div>
                            <div className="grid grid-cols-1 gap-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Tahun Lahir (Generasi) *</label>
                                        <select name="generation" required value={formData.generation} onChange={handleChange} className="w-full p-4 rounded-2xl bg-gray-50 border-none ring-1 ring-gray-200 focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all text-gray-700">
                                            <option value="">-- Pilih Generasi --</option>
                                            <option value="Gen Z (1997-2012)">Gen Z (1997-2012)</option>
                                            <option value="Millennial (1981-1996)">Millennial (1981-1996)</option>
                                            <option value="Lainnya">Lainnya</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Domisili *</label>
                                        <input type="text" name="domicile" required value={formData.domicile} onChange={handleChange} className="w-full p-4 rounded-2xl bg-gray-50 border-none ring-1 ring-gray-200 focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all" placeholder="Contoh: Bandung, Garut..." />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-3">Kesibukan Saat Ini *</label>
                                    <div className="flex flex-wrap gap-4">
                                        {['Kuliah', 'Bekerja', 'Freelance/Usaha', 'Lainnya'].map((act) => (
                                            <label key={act} className={`cursor-pointer border px-6 py-3 rounded-2xl font-bold text-sm transition-all ${formData.activity === act ? 'bg-blue-50 border-blue-500 text-blue-700 shadow-sm' : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50'}`}>
                                                <input type="radio" name="activity" value={act} required checked={formData.activity === act} onChange={handleChange} className="hidden" />
                                                {act}
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* SECTION C: EMOSIONAL & HARAPAN (CORE) */}
                        <section>
                            <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-2">
                                <Compass className="text-blue-600" size={20} />
                                <h2 className="text-xl font-bold text-gray-900">Insight & Growth</h2>
                            </div>
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Apa keresahanmu saat ini? *</label>
                                    <p className="text-xs text-blue-600 mb-3 font-semibold bg-blue-50 p-2 rounded-lg inline-block">🤝 Cerita aja, kita di sini untuk saling menguatkan.</p>
                                    <textarea name="concerns" required rows={4} value={formData.concerns} onChange={handleChange} className="w-full p-4 rounded-2xl bg-gray-50 border-none ring-1 ring-gray-200 focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all resize-none leading-relaxed" placeholder="Contoh: Merasa tertinggal dari teman, bingung arah karir, atau sulit konsisten..."></textarea>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Apa harapan dan tujuan kamu bergabung? *</label>
                                    <p className="text-xs text-gray-500 mb-3 font-medium">Fokus pada: self growth, ibadah, relationship, karir, dll.</p>
                                    <textarea name="goals" required rows={3} value={formData.goals} onChange={handleChange} className="w-full p-4 rounded-2xl bg-gray-50 border-none ring-1 ring-gray-200 focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all resize-none leading-relaxed" placeholder="Aku ingin bisa lebih produktif dan punya circle yang positif..."></textarea>
                                </div>
                            </div>
                        </section>

                        {/* SECTION D: MINAT LEADER & KONTRIBUSI */}
                        <section>
                            <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-2">
                                <Target className="text-blue-600" size={20} />
                                <h2 className="text-xl font-bold text-gray-900">Kontribusi</h2>
                            </div>

                            <div className="bg-gradient-to-br from-blue-50 to-teal-50 p-6 md:p-8 rounded-3xl border border-blue-100/50 mb-8">
                                <label className="block text-sm font-bold text-gray-900 mb-4">Tertarik jadi penggerak (Leader) di Sobat Jofisah? *</label>
                                <div className="flex gap-4">
                                    <label className={`cursor-pointer border-2 px-6 py-3.5 rounded-2xl font-bold text-sm transition-all flex-1 text-center ${formData.is_interested_leader === true ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-white border-white text-gray-500 hover:bg-gray-50'}`}>
                                        <input type="radio" name="is_interested_leader" onChange={() => setFormData({ ...formData, is_interested_leader: true })} checked={formData.is_interested_leader === true} className="hidden" />
                                        Ya, Gas! 🚀
                                    </label>
                                    <label className={`cursor-pointer border-2 px-6 py-3.5 rounded-2xl font-bold text-sm transition-all flex-1 text-center ${formData.is_interested_leader === false ? 'bg-gray-200 border-gray-200 text-gray-700' : 'bg-white border-white text-gray-500 hover:bg-gray-50'}`}>
                                        <input type="radio" name="is_interested_leader" onChange={() => setFormData({ ...formData, is_interested_leader: false, leader_interest_area: '', leader_reason: '' })} checked={formData.is_interested_leader === false} className="hidden" />
                                        Nanti Dulu
                                    </label>
                                </div>

                                {/* Dynamic Field: Leadership */}
                                {formData.is_interested_leader && (
                                    <div className="mt-6 space-y-5 animate-in slide-in-from-top-4 fade-in duration-300">
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">Bidang kontribusi apa yang kamu minati?</label>
                                            <select name="leader_interest_area" required={formData.is_interested_leader} value={formData.leader_interest_area} onChange={handleChange} className="w-full p-4 rounded-2xl bg-white border-none ring-1 ring-blue-200 focus:ring-2 focus:ring-blue-500 outline-none shadow-sm font-medium text-gray-700">
                                                <option value="">-- Pilih Bidang --</option>
                                                <option value="Event / Host">Event Organizer (Host/Moderator)</option>
                                                <option value="Content / Desain">Content Creator (Desain/Penulis)</option>
                                                <option value="Partnership / Relasi">Partnership (Relasi Pemateri)</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">Kenapa tertarik jadi leader?</label>
                                            <textarea name="leader_reason" required={formData.is_interested_leader} rows={2} value={formData.leader_reason} onChange={handleChange} className="w-full p-4 rounded-2xl bg-white border-none ring-1 ring-blue-200 focus:ring-2 focus:ring-blue-500 outline-none shadow-sm resize-none text-sm" placeholder="Karena aku ingin belajar public speaking / nambah portofolio..."></textarea>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Request Tema Kajian</label>
                                    <input type="text" name="requested_topics" value={formData.requested_topics} onChange={handleChange} className="w-full p-4 rounded-2xl bg-gray-50 border-none ring-1 ring-gray-200 focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all" placeholder="Misal: self improvement, jodoh, mental health..." />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Rekomendasi Pemateri</label>
                                    <input type="text" name="speaker_recommendation" value={formData.speaker_recommendation} onChange={handleChange} className="w-full p-4 rounded-2xl bg-gray-50 border-none ring-1 ring-gray-200 focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all" placeholder="Nama / IG pemateri yang kamu suka" />
                                </div>
                            </div>
                        </section>

                        {/* SECTION E: AGREEMENT */}
                        <section className="bg-gray-50 p-6 md:p-8 rounded-3xl border border-gray-200">
                            <div className="flex items-center gap-3 mb-4 text-blue-700 font-black">
                                <ShieldCheck size={24} />
                                <h3>Peraturan Komunitas</h3>
                            </div>
                            <div className="text-sm text-gray-700 space-y-2 mb-6 ml-2 font-medium">
                                <p>1. Wajib memperkenalkan diri setelah bergabung.</p>
                                <p>2. Menjaga adab diskusi dan saling menghargai pendapat.</p>
                                <p>3. Dilarang menyebarkan hoax, SARA, atau jualan tanpa izin.</p>
                            </div>

                            <label className="flex items-start gap-4 cursor-pointer bg-white p-4 rounded-2xl shadow-sm border border-gray-200 hover:border-blue-400 transition">
                                <input type="checkbox" name="agreement" required checked={formData.agreement} onChange={handleChange} className="mt-1 w-5 h-5 accent-blue-600 rounded cursor-pointer" />
                                <span className="text-sm font-bold text-gray-800 leading-snug">
                                    Saya telah membaca dan berjanji untuk mengikuti semua aturan komunitas demi kenyamanan bersama.
                                </span>
                            </label>
                        </section>

                        {/* SUBMIT BUTTON */}
                        <div className="pt-4 flex justify-end">
                            <button
                                type="submit"
                                disabled={isSubmitting || !formData.agreement}
                                className="w-full md:w-auto bg-gradient-to-r from-blue-600 to-teal-500 text-white px-10 py-4 rounded-full font-black text-lg flex items-center justify-center gap-3 hover:shadow-lg hover:shadow-blue-500/40 hover:-translate-y-1 transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                            >
                                {isSubmitting ? (
                                    <><Loader2 className="animate-spin" size={24} /> Memproses...</>
                                ) : (
                                    <><CheckCircle2 size={24} /> Gabung Sekarang</>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SobatJofisahForm;