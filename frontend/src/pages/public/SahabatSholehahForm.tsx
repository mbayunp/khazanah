import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Sparkles, User, MapPin, Target, MessageCircle, Send, CheckCircle2, ShieldCheck, Loader2Icon } from 'lucide-react';
import Swal from 'sweetalert2';

const SahabatSholehahForm: React.FC = () => {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        gender: 'Perempuan', // Default terkunci
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const res = await fetch('http://localhost:5000/api/sholehah/register', {
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
                    confirmButtonColor: '#F472B6',
                    confirmButtonText: 'Kembali ke Beranda'
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

    return (
        <div className="bg-[#FFF7F9] min-h-screen pt-28 pb-20 font-sans selection:bg-pink-200 selection:text-pink-900">
            <div className="max-w-3xl mx-auto px-4 sm:px-6">

                {/* 1. HERO INTRO */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center p-3 bg-white rounded-full shadow-sm text-pink-400 mb-6 border border-pink-100">
                        <Sparkles size={28} />
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black text-gray-800 mb-4 leading-tight">
                        Selamat Datang di <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-500">
                            Sahabat Sholehah 🌸
                        </span>
                    </h1>
                    <p className="text-gray-600 text-lg md:text-xl font-medium max-w-xl mx-auto">
                        Tempat bertumbuh, belajar, dan saling menguatkan. Isi form ini untuk melangkah bersama kami 🤍
                    </p>
                </div>

                {/* 2. MAIN FORM */}
                <div className="bg-white p-6 md:p-10 rounded-[2.5rem] shadow-xl shadow-pink-100/50 border border-pink-50">
                    <form onSubmit={handleSubmit} className="space-y-10">

                        {/* SECTION A: DATA DIRI */}
                        <section>
                            <div className="flex items-center gap-2 mb-6 border-b border-pink-50 pb-2">
                                <User className="text-pink-400" size={20} />
                                <h2 className="text-xl font-bold text-gray-800">Kenalan Dulu Yuk!</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-bold text-gray-600 mb-2">Nama Lengkap Panggilan *</label>
                                    <input type="text" name="name" required value={formData.name} onChange={handleChange} className="w-full p-4 rounded-2xl bg-gray-50 border-none ring-1 ring-gray-200 focus:ring-2 focus:ring-pink-400 focus:bg-white outline-none transition-all" placeholder="Tuliskan nama cantikmu..." />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-600 mb-2">Jenis Kelamin</label>
                                    <select name="gender" disabled className="w-full p-4 rounded-2xl bg-gray-100 text-gray-500 border-none ring-1 ring-gray-200 outline-none cursor-not-allowed font-medium">
                                        <option value="Perempuan">Perempuan</option>
                                    </select>
                                    <p className="text-[10px] text-pink-400 mt-1 font-semibold">*Ruang khusus Muslimah</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-600 mb-2">No WhatsApp *</label>
                                    <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} className="w-full p-4 rounded-2xl bg-gray-50 border-none ring-1 ring-gray-200 focus:ring-2 focus:ring-pink-400 focus:bg-white outline-none transition-all" placeholder="081234567890" />
                                </div>
                            </div>
                        </section>

                        {/* SECTION B: PROFIL DASAR */}
                        <section>
                            <div className="flex items-center gap-2 mb-6 border-b border-pink-50 pb-2">
                                <MapPin className="text-pink-400" size={20} />
                                <h2 className="text-xl font-bold text-gray-800">Profil & Aktivitas</h2>
                            </div>
                            <div className="grid grid-cols-1 gap-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-600 mb-2">Generasi / Tahun Lahir *</label>
                                        <select name="generation" required value={formData.generation} onChange={handleChange} className="w-full p-4 rounded-2xl bg-gray-50 border-none ring-1 ring-gray-200 focus:ring-2 focus:ring-pink-400 focus:bg-white outline-none transition-all">
                                            <option value="">-- Pilih --</option>
                                            <option value="Gen Z (1997-2012)">Gen Z (1997-2012)</option>
                                            <option value="Millennial (1981-1996)">Millennial (1981-1996)</option>
                                            <option value="Lainnya">Lainnya</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-600 mb-2">Domisili (Kota/Kab) *</label>
                                        <input type="text" name="domicile" required value={formData.domicile} onChange={handleChange} className="w-full p-4 rounded-2xl bg-gray-50 border-none ring-1 ring-gray-200 focus:ring-2 focus:ring-pink-400 focus:bg-white outline-none transition-all" placeholder="Contoh: Bandung, Garut..." />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-600 mb-3">Kesibukan Saat Ini *</label>
                                    <div className="flex flex-wrap gap-4">
                                        {['Pelajar / Mahasiswa', 'Bekerja', 'Ibu Rumah Tangga', 'Freelancer / Usaha', 'Lainnya'].map((act) => (
                                            <label key={act} className={`cursor-pointer border px-5 py-3 rounded-2xl font-semibold text-sm transition-all ${formData.activity === act ? 'bg-pink-50 border-pink-400 text-pink-600 shadow-sm' : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50'}`}>
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
                            <div className="flex items-center gap-2 mb-6 border-b border-pink-50 pb-2">
                                <Heart className="text-pink-400" size={20} />
                                <h2 className="text-xl font-bold text-gray-800">Ruang Hati</h2>
                            </div>
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-600 mb-2">Apa keresahanmu saat ini? *</label>
                                    <p className="text-xs text-pink-500 mb-3 font-medium bg-pink-50 p-2 rounded-lg inline-block">🤍 Kami di sini untuk mendengarkan, bukan menghakimi. Ceritakan dengan jujur ya.</p>
                                    <textarea name="concerns" required rows={4} value={formData.concerns} onChange={handleChange} className="w-full p-4 rounded-2xl bg-gray-50 border-none ring-1 ring-gray-200 focus:ring-2 focus:ring-pink-400 focus:bg-white outline-none transition-all resize-none leading-relaxed" placeholder="Aku merasa sering insecure karena... / Aku sulit konsisten ibadah karena..."></textarea>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-600 mb-2">Apa harapan dan tujuan kamu bergabung? *</label>
                                    <textarea name="goals" required rows={3} value={formData.goals} onChange={handleChange} className="w-full p-4 rounded-2xl bg-gray-50 border-none ring-1 ring-gray-200 focus:ring-2 focus:ring-pink-400 focus:bg-white outline-none transition-all resize-none leading-relaxed" placeholder="Aku ingin punya lingkungan pertemanan yang saling support untuk ibadah..."></textarea>
                                </div>
                            </div>
                        </section>

                        {/* SECTION D: MINAT LEADER & KONTRIBUSI */}
                        <section>
                            <div className="flex items-center gap-2 mb-6 border-b border-pink-50 pb-2">
                                <Target className="text-pink-400" size={20} />
                                <h2 className="text-xl font-bold text-gray-800">Kolaborasi & Kontribusi</h2>
                            </div>

                            <div className="bg-rose-50/50 p-6 rounded-3xl border border-rose-100 mb-6">
                                <label className="block text-sm font-bold text-gray-800 mb-3">Apakah kamu tertarik menjadi penggerak (Community Leader) di masa depan?</label>
                                <div className="flex gap-4">
                                    <label className={`cursor-pointer border px-6 py-3 rounded-2xl font-bold text-sm transition-all flex-1 text-center ${formData.is_interested_leader === true ? 'bg-pink-500 border-pink-500 text-white shadow-md' : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50'}`}>
                                        <input type="radio" name="is_interested_leader" onChange={() => setFormData({ ...formData, is_interested_leader: true })} checked={formData.is_interested_leader === true} className="hidden" />
                                        Tentu Saja! 🙋‍♀️
                                    </label>
                                    <label className={`cursor-pointer border px-6 py-3 rounded-2xl font-bold text-sm transition-all flex-1 text-center ${formData.is_interested_leader === false ? 'bg-gray-200 border-gray-300 text-gray-700' : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50'}`}>
                                        <input type="radio" name="is_interested_leader" onChange={() => setFormData({ ...formData, is_interested_leader: false, leader_interest_area: '' })} checked={formData.is_interested_leader === false} className="hidden" />
                                        Mungkin Nanti
                                    </label>
                                </div>

                                {/* Dynamic Field: Hanya muncul jika tertarik jadi leader */}
                                {formData.is_interested_leader && (
                                    <div className="mt-5 animate-in slide-in-from-top-2 fade-in duration-300">
                                        <label className="block text-sm font-bold text-gray-600 mb-2">Keren! Di bidang apa kamu ingin berkontribusi?</label>
                                        <select name="leader_interest_area" value={formData.leader_interest_area} onChange={handleChange} className="w-full p-4 rounded-2xl bg-white border-none ring-1 ring-pink-200 focus:ring-2 focus:ring-pink-400 outline-none shadow-sm font-medium text-gray-700">
                                            <option value="">-- Pilih Minat Kontribusi --</option>
                                            <option value="Event Organizer (Host/Moderator)">Event Organizer (Host/Moderator)</option>
                                            <option value="Content Creator (Poster/Caption)">Content Creator (Desain/Penulis)</option>
                                            <option value="Public Relations (Cari Pemateri)">Public Relations (Relasi Pemateri)</option>
                                            <option value="Curhat Listener (Tim Support)">Ruang Dengar (Tim Support Member)</option>
                                        </select>
                                    </div>
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-600 mb-2">Request Tema Kajian (Opsional)</label>
                                    <input type="text" name="requested_topics" value={formData.requested_topics} onChange={handleChange} className="w-full p-4 rounded-2xl bg-gray-50 border-none ring-1 ring-gray-200 focus:ring-2 focus:ring-pink-400 focus:bg-white outline-none transition-all" placeholder="Misal: Manajemen Emosi, Fiqih Wanita..." />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-600 mb-2">Rekomendasi Pemateri (Opsional)</label>
                                    <input type="text" name="speaker_recommendation" value={formData.speaker_recommendation} onChange={handleChange} className="w-full p-4 rounded-2xl bg-gray-50 border-none ring-1 ring-gray-200 focus:ring-2 focus:ring-pink-400 focus:bg-white outline-none transition-all" placeholder="Nama / IG pemateri favoritmu" />
                                </div>
                            </div>
                        </section>

                        {/* SECTION E: AGREEMENT */}
                        <section className="bg-pink-50 p-6 md:p-8 rounded-3xl border border-pink-100">
                            <div className="flex items-center gap-3 mb-4 text-pink-600 font-black">
                                <ShieldCheck size={24} />
                                <h3>Peraturan Komunitas</h3>
                            </div>
                            <div className="text-sm text-gray-700 space-y-2 mb-6 ml-2 font-medium">
                                <p>1. Wajib menjaga privasi dan rahasia sesama member.</p>
                                <p>2. Saling menghargai, berkata baik, dan tidak menghakimi.</p>
                                <p>3. Aktif memperkenalkan diri dan berpartisipasi dalam diskusi positif.</p>
                            </div>

                            <label className="flex items-start gap-4 cursor-pointer bg-white p-4 rounded-2xl shadow-sm border border-pink-100/50 hover:border-pink-300 transition">
                                <input type="checkbox" name="agreement" required checked={formData.agreement} onChange={handleChange} className="mt-1 w-5 h-5 accent-pink-500 rounded cursor-pointer" />
                                <span className="text-sm font-bold text-gray-800 leading-snug">
                                    Saya telah membaca dan berjanji untuk mengikuti semua peraturan komunitas Sahabat Sholehah dengan niat mencari ridha Allah.
                                </span>
                            </label>
                        </section>

                        {/* SUBMIT BUTTON */}
                        <div className="pt-4 flex justify-end">
                            <button
                                type="submit"
                                disabled={isSubmitting || !formData.agreement}
                                className="w-full md:w-auto bg-gradient-to-r from-pink-400 to-rose-500 text-white px-10 py-4 rounded-full font-black text-lg flex items-center justify-center gap-3 hover:shadow-lg hover:shadow-pink-400/40 hover:-translate-y-1 transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                            >
                                {isSubmitting ? (
                                    <><Loader2Icon className="animate-spin" size={24} /> Memproses...</>
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

export default SahabatSholehahForm;