import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase, User, MapPin, Star, UploadCloud, CheckCircle2, ShieldCheck, Loader2, Target, Brain } from 'lucide-react';
import Swal from 'sweetalert2';

// Definisi Kategori Minat
const INTEREST_CATEGORIES = [
    { group: '🎤 Event & Public Speaking', items: ['Host / MC', 'Moderator', 'Pemateri', 'Tilawah'] },
    { group: '🎨 Konten & Kreatif', items: ['Desain Grafis', 'Video Editing', 'Content Creator', 'Copywriting', 'Script Writing'] },
    { group: '📱 Media & Digital', items: ['Social Media', 'Admin WA', 'Live Streaming', 'IT Support'] },
    { group: '🧠 Edukasi & Dakwah', items: ['Penyusunan Materi', 'Riset', 'Kurikulum'] },
    { group: '📊 Manajemen', items: ['Project Management', 'Koordinator', 'HR', 'Partnership'] },
    { group: '💰 Bisnis', items: ['Fundraising', 'Sponsorship', 'Monetisasi'] },
    { group: '🤝 Support', items: ['CS', 'Follow Up', 'Admin Data'] }
];

const LeaderForm: React.FC = () => {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);

    // State untuk data text/select biasa
    const [formData, setFormData] = useState({
        full_name: '', nickname: '', email: '', instagram: '', phone: '',
        domicile: '', birth_place: '', birth_date: '', gender: '', activity: '',
        hobby: '', skills: '', motivation: '', selling_point: '', agreement: false
    });

    // State khusus untuk array multi-select & File
    const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
    const [cvFile, setCvFile] = useState<File | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        if (type === 'checkbox') {
            setFormData(prev => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleInterestToggle = (item: string) => {
        setSelectedInterests(prev =>
            prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
        );
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.type !== 'application/pdf') {
                Swal.fire('Format Salah', 'Harap unggah file dalam format PDF', 'warning');
                e.target.value = '';
                return;
            }
            if (file.size > 2 * 1024 * 1024) {
                Swal.fire('File Terlalu Besar', 'Maksimal ukuran CV adalah 2MB', 'error');
                e.target.value = '';
                return;
            }
            setCvFile(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (selectedInterests.length === 0) {
            return Swal.fire('Oops', 'Pilih minimal 1 bidang minat kontribusi', 'warning');
        }
        if (!cvFile) {
            return Swal.fire('Oops', 'Harap unggah CV kamu', 'warning');
        }

        setIsSubmitting(true);
        const submitData = new FormData();

        // Append text data
        Object.keys(formData).forEach(key => {
            submitData.append(key, formData[key as keyof typeof formData] as string);
        });

        // Append array & file
        submitData.append('interests', JSON.stringify(selectedInterests));
        submitData.append('cv_file', cvFile);

        try {
            const res = await fetch('http://localhost:5000/api/leaders/register', {
                method: 'POST',
                body: submitData
            });

            const result = await res.json();

            if (res.ok) {
                Swal.fire({
                    title: 'Pendaftaran Berhasil! 🚀',
                    text: 'CV dan profilmu sudah kami terima. Pantau terus email atau WhatsApp kamu untuk info screening tahap selanjutnya.',
                    icon: 'success',
                    confirmButtonColor: '#4F46E5', // Indigo-600
                }).then(() => navigate('/'));
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
        <div className="bg-gray-50 min-h-screen pt-28 pb-20 font-sans selection:bg-indigo-200 selection:text-indigo-900">
            <div className="max-w-4xl mx-auto px-4 sm:px-6">

                {/* 1. HERO INTRO */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center p-4 bg-indigo-100 rounded-full text-indigo-600 mb-6 shadow-sm">
                        <Briefcase size={32} />
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black text-gray-900 mb-4 leading-tight">
                        Pendaftaran <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">
                            Khazanah Leader 🚀
                        </span>
                    </h1>
                    <p className="text-gray-600 text-lg font-medium max-w-2xl mx-auto">
                        Bersama membangun komunitas, berdampak, dan bertumbuh dalam dakwah. Jadilah bagian dari penggerak perubahan!
                    </p>
                </div>

                {/* 2. MAIN FORM */}
                <div className="bg-white p-6 md:p-10 rounded-[2.5rem] shadow-xl border border-gray-100">
                    <form onSubmit={handleSubmit} className="space-y-12">

                        {/* SECTION A: DATA PRIBADI */}
                        <section>
                            <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-3">
                                <User className="text-indigo-600" size={24} />
                                <h2 className="text-2xl font-bold text-gray-900">Data Pribadi</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Nama Lengkap Sesuai Identitas *</label>
                                    <input type="text" name="full_name" required value={formData.full_name} onChange={handleChange} className="w-full p-4 rounded-2xl bg-gray-50 ring-1 ring-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="Masukkan nama lengkap..." />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Nama Panggilan *</label>
                                    <input type="text" name="nickname" required value={formData.nickname} onChange={handleChange} className="w-full p-4 rounded-2xl bg-gray-50 ring-1 ring-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="Nama sapaan..." />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Email Aktif *</label>
                                    <input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full p-4 rounded-2xl bg-gray-50 ring-1 ring-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="email@contoh.com" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Instagram *</label>
                                    <input type="text" name="instagram" required value={formData.instagram} onChange={handleChange} className="w-full p-4 rounded-2xl bg-gray-50 ring-1 ring-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="@username" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">No WhatsApp *</label>
                                    <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} className="w-full p-4 rounded-2xl bg-gray-50 ring-1 ring-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="08xxxx" />
                                </div>
                            </div>
                        </section>

                        {/* SECTION B: PROFIL DASAR */}
                        <section>
                            <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-3">
                                <MapPin className="text-indigo-600" size={24} />
                                <h2 className="text-2xl font-bold text-gray-900">Profil & Background</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Domisili Saat Ini *</label>
                                    <input type="text" name="domicile" required value={formData.domicile} onChange={handleChange} className="w-full p-4 rounded-2xl bg-gray-50 ring-1 ring-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="Kota / Kabupaten..." />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Tempat Lahir *</label>
                                    <input type="text" name="birth_place" required value={formData.birth_place} onChange={handleChange} className="w-full p-4 rounded-2xl bg-gray-50 ring-1 ring-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Tanggal Lahir *</label>
                                    <input type="date" name="birth_date" required value={formData.birth_date} onChange={handleChange} className="w-full p-4 rounded-2xl bg-gray-50 ring-1 ring-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Jenis Kelamin *</label>
                                    <select name="gender" required value={formData.gender} onChange={handleChange} className="w-full p-4 rounded-2xl bg-gray-50 ring-1 ring-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none font-medium">
                                        <option value="">-- Pilih --</option>
                                        <option value="Laki-laki">Laki-laki</option>
                                        <option value="Perempuan">Perempuan</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Kesibukan Utama *</label>
                                    <select name="activity" required value={formData.activity} onChange={handleChange} className="w-full p-4 rounded-2xl bg-gray-50 ring-1 ring-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none font-medium">
                                        <option value="">-- Pilih --</option>
                                        <option value="Bekerja">Bekerja</option>
                                        <option value="Kuliah">Kuliah</option>
                                        <option value="Sekolah">Sekolah</option>
                                        <option value="Lainnya">Lainnya</option>
                                    </select>
                                </div>
                            </div>
                        </section>

                        {/* SECTION C: PERSONAL & SKILLS */}
                        <section>
                            <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-3">
                                <Star className="text-indigo-600" size={24} />
                                <h2 className="text-2xl font-bold text-gray-900">Personal & Skill</h2>
                            </div>
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Hobi</label>
                                    <textarea name="hobby" rows={2} value={formData.hobby} onChange={handleChange} className="w-full p-4 rounded-2xl bg-gray-50 ring-1 ring-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none resize-none" placeholder="Menulis, membaca buku sejarah, fotografi..."></textarea>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Hard Skill / Soft Skill Terkuatmu *</label>
                                    <p className="text-xs text-gray-500 mb-3">Boleh lebih dari satu. Pisahkan dengan koma.</p>
                                    <textarea name="skills" required rows={3} value={formData.skills} onChange={handleChange} className="w-full p-4 rounded-2xl bg-gray-50 ring-1 ring-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none resize-none" placeholder="Contoh: Public Speaking, Desain Figma, Manajemen Waktu, Editing Premiere Pro..."></textarea>
                                </div>
                            </div>
                        </section>

                        {/* SECTION D: MINAT KONTRIBUSI (MULTI-SELECT GROUP) */}
                        <section>
                            <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-3">
                                <Target className="text-indigo-600" size={24} />
                                <h2 className="text-2xl font-bold text-gray-900">Minat Kontribusi</h2>
                            </div>
                            <p className="text-sm text-gray-600 mb-6 font-medium">Pilih satu atau lebih area dimana kamu merasa bisa memberikan dampak terbesar.</p>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {INTEREST_CATEGORIES.map((category, idx) => (
                                    <div key={idx} className="bg-indigo-50/50 p-5 rounded-2xl border border-indigo-100">
                                        <h3 className="font-bold text-indigo-900 mb-3 text-sm">{category.group}</h3>
                                        <div className="space-y-2">
                                            {category.items.map(item => (
                                                <label key={item} className="flex items-center gap-3 cursor-pointer group">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedInterests.includes(item)}
                                                        onChange={() => handleInterestToggle(item)}
                                                        className="w-4 h-4 accent-indigo-600 rounded cursor-pointer"
                                                    />
                                                    <span className="text-sm font-semibold text-gray-700 group-hover:text-indigo-600 transition-colors">{item}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* SECTION E: SCREENING */}
                        <section>
                            <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-3">
                                <Brain className="text-indigo-600" size={24} />
                                <h2 className="text-2xl font-bold text-gray-900">Motivasi & Screening</h2>
                            </div>
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Kenapa kamu ingin bergabung menjadi Leader? *</label>
                                    <p className="text-xs text-indigo-600 mb-3 font-semibold bg-indigo-50 p-2 rounded-lg inline-block">💡 Ceritakan dengan jujur dan spesifik ya!</p>
                                    <textarea name="motivation" required rows={4} value={formData.motivation} onChange={handleChange} className="w-full p-4 rounded-2xl bg-gray-50 ring-1 ring-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none resize-none leading-relaxed" placeholder="Alasan utamaku adalah..."></textarea>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Kenapa kami harus memilih kamu? (Selling Point) *</label>
                                    <textarea name="selling_point" required rows={4} value={formData.selling_point} onChange={handleChange} className="w-full p-4 rounded-2xl bg-gray-50 ring-1 ring-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none resize-none leading-relaxed" placeholder="Apa nilai tambah, komitmen, atau pengalaman yang membuatmu tepat untuk peran ini?"></textarea>
                                </div>
                            </div>
                        </section>

                        {/* SECTION F: UPLOAD CV */}
                        <section>
                            <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-3">
                                <UploadCloud className="text-indigo-600" size={24} />
                                <h2 className="text-2xl font-bold text-gray-900">Upload CV</h2>
                            </div>
                            <div className="border-2 border-dashed border-indigo-200 bg-indigo-50/30 rounded-3xl p-8 text-center hover:bg-indigo-50 transition-colors relative group">
                                <input
                                    type="file"
                                    accept=".pdf"
                                    required
                                    onChange={handleFileChange}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                />
                                <div className="flex flex-col items-center justify-center pointer-events-none">
                                    <UploadCloud size={48} className={`mb-4 transition-colors ${cvFile ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-500'}`} />
                                    {cvFile ? (
                                        <p className="text-indigo-700 font-bold text-lg">{cvFile.name}</p>
                                    ) : (
                                        <>
                                            <p className="text-gray-700 font-bold text-lg mb-1">Pilih File atau Tarik ke Sini</p>
                                            <p className="text-gray-500 text-sm">Hanya file PDF. Maksimal 2MB.</p>
                                        </>
                                    )}
                                </div>
                            </div>
                        </section>

                        {/* SECTION G: AGREEMENT */}
                        <section className="bg-blue-50 p-6 md:p-8 rounded-3xl border border-blue-100">
                            <div className="flex items-center gap-3 mb-4 text-blue-700 font-black">
                                <ShieldCheck size={24} />
                                <h3>Komitmen Leader</h3>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-sm text-gray-700 mb-6 ml-2 font-medium">
                                <p>• Bersedia untuk terus belajar</p>
                                <p>• Minimal berusia 17 tahun</p>
                                <p>• Berkomitmen minimal 6 bulan</p>
                                <p>• Memiliki kemampuan komunikasi baik</p>
                                <p>• Memiliki minat besar di dunia dakwah</p>
                                <p>• Menjaga nama baik komunitas</p>
                            </div>

                            <label className="flex items-start gap-4 cursor-pointer bg-white p-4 rounded-2xl shadow-sm border border-blue-100 hover:border-blue-300 transition">
                                <input type="checkbox" name="agreement" required checked={formData.agreement} onChange={handleChange} className="mt-1 w-5 h-5 accent-indigo-600 rounded cursor-pointer shrink-0" />
                                <span className="text-sm font-bold text-gray-800 leading-snug">
                                    Bismillah, saya bersedia dan berjanji mengikuti seluruh syarat & ketentuan komitmen sebagai Khazanah Leader.
                                </span>
                            </label>
                        </section>

                        {/* SUBMIT BUTTON */}
                        <div className="pt-6 flex justify-end">
                            <button
                                type="submit"
                                disabled={isSubmitting || !formData.agreement}
                                className="w-full md:w-auto bg-indigo-600 text-white px-12 py-4 rounded-full font-black text-lg flex items-center justify-center gap-3 hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-500/30 hover:-translate-y-1 transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                            >
                                {isSubmitting ? (
                                    <><Loader2 className="animate-spin" size={24} /> Memproses...</>
                                ) : (
                                    <><CheckCircle2 size={24} /> Daftar Sekarang</>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LeaderForm;