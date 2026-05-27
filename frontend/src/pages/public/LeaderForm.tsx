import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Briefcase, User, MapPin, Star, UploadCloud, CheckCircle2, 
    ShieldCheck, Loader2, Brain, ArrowLeft, ArrowRight
} from 'lucide-react';
import Swal from 'sweetalert2';
import { API_ENDPOINTS } from '../../config/api';

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
    const [currentStep, setCurrentStep] = useState(1);

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

    const nextStep = () => {
        if (currentStep === 1) {
            if (!formData.full_name || !formData.nickname || !formData.email || !formData.instagram || !formData.phone) {
                return Swal.fire('Form Belum Lengkap', 'Harap isi seluruh field bertanda bintang (*)', 'warning');
            }
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                return Swal.fire('Email Tidak Valid', 'Harap masukkan alamat email yang valid', 'warning');
            }
        } else if (currentStep === 2) {
            if (!formData.domicile || !formData.birth_place || !formData.birth_date || !formData.gender || !formData.activity) {
                return Swal.fire('Form Belum Lengkap', 'Harap isi seluruh field bertanda bintang (*)', 'warning');
            }
        } else if (currentStep === 3) {
            if (!formData.skills) {
                return Swal.fire('Form Belum Lengkap', 'Harap isi deskripsi skill terkuatmu (*)', 'warning');
            }
            if (selectedInterests.length === 0) {
                return Swal.fire('Pilih Minat', 'Pilih minimal 1 bidang minat kontribusi (*)', 'warning');
            }
        } else if (currentStep === 4) {
            if (!formData.motivation || !formData.selling_point) {
                return Swal.fire('Form Belum Lengkap', 'Harap isi motivasi dan selling point kamu (*)', 'warning');
            }
        }
        setCurrentStep(prev => Math.min(prev + 1, 5));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const prevStep = () => {
        setCurrentStep(prev => Math.max(prev - 1, 1));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (selectedInterests.length === 0) {
            return Swal.fire('Oops', 'Pilih minimal 1 bidang minat kontribusi', 'warning');
        }
        if (!cvFile) {
            return Swal.fire('Oops', 'Harap unggah CV kamu', 'warning');
        }
        if (!formData.agreement) {
            return Swal.fire('Oops', 'Harap setujui komitmen sebagai Khazanah Leader', 'warning');
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
            const res = await fetch(`${API_ENDPOINTS.leaders}/register`, {
                method: 'POST',
                body: submitData
            });

            const result = await res.json();

            if (res.ok) {
                Swal.fire({
                    title: 'Pendaftaran Berhasil! 🚀',
                    text: 'CV dan profilmu sudah kami terima. Pantau terus email atau WhatsApp kamu untuk info screening tahap selanjutnya.',
                    icon: 'success',
                    confirmButtonColor: '#0F5B30',
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

    const steps = [
        { id: 1, title: 'Data Pribadi', icon: <User size={18} /> },
        { id: 2, title: 'Profil & Domisili', icon: <MapPin size={18} /> },
        { id: 3, title: 'Skill & Minat', icon: <Star size={18} /> },
        { id: 4, title: 'Screening', icon: <Brain size={18} /> },
        { id: 5, title: 'CV & Komitmen', icon: <UploadCloud size={18} /> }
    ];

    const progressPercentage = (currentStep / steps.length) * 100;

    return (
        <div className="bg-[#FAF6EE] min-h-screen pt-28 pb-20 font-sans selection:bg-emerald-100 selection:text-emerald-950 relative overflow-hidden">
            {/* Ambient Background Lights */}
            <div className="absolute top-20 left-1/4 w-96 h-96 bg-emerald-700/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-gold/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
                {/* HERO INTRO */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center p-3 bg-white/80 backdrop-blur shadow-sm text-emerald-800 mb-6 border border-emerald/10 rounded-full">
                        <Briefcase size={28} className="text-emerald" />
                    </div>
                    <h1 className="text-3xl md:text-5xl font-outfit font-extrabold text-gray-800 mb-4 leading-tight">
                        Pendaftaran <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald to-gold">
                            Khazanah Leader 🚀
                        </span>
                    </h1>
                    <p className="text-gray-650 text-base md:text-lg font-outfit font-medium max-w-xl mx-auto">
                        Bersama membangun komunitas, berdampak, dan bertumbuh dalam dakwah. Jadilah bagian dari penggerak perubahan!
                    </p>
                </div>

                {/* STEPPER PROGRESS */}
                <div className="mb-10 max-w-3xl mx-auto">
                    {/* Stepper Headers */}
                    <div className="flex justify-between items-center relative mb-6">
                        {steps.map((step) => (
                            <div key={step.id} className="flex flex-col items-center z-10 flex-1">
                                <button
                                    type="button"
                                    onClick={() => step.id < currentStep && setCurrentStep(step.id)}
                                    disabled={step.id >= currentStep}
                                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                                        currentStep >= step.id
                                            ? 'bg-emerald border-emerald text-white shadow-md'
                                            : 'bg-white border-gray-200 text-gray-400'
                                    } ${step.id < currentStep ? 'cursor-pointer hover:bg-emerald-800' : 'cursor-default'}`}
                                >
                                    {step.icon}
                                </button>
                                <span className={`text-[10px] sm:text-xs font-outfit font-bold mt-2 text-center transition-colors ${
                                    currentStep >= step.id ? 'text-emerald' : 'text-gray-400'
                                }`}>
                                    {step.title}
                                </span>
                            </div>
                        ))}
                        {/* Connecting Line BG */}
                        <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200 -z-10" />
                        {/* Active Line Fill */}
                        <div
                            className="absolute top-5 left-0 h-0.5 bg-emerald -z-10 transition-all duration-500"
                            style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
                        />
                    </div>

                    {/* Progress Fill */}
                    <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                        <div
                            className="bg-gradient-to-r from-emerald to-gold h-full transition-all duration-300"
                            style={{ width: `${progressPercentage}%` }}
                        />
                    </div>
                </div>

                {/* MAIN FORM CARD */}
                <div className="glass-card p-6 md:p-10 border border-white/20 bg-white/80 shadow-xl rounded-3xl">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        <AnimatePresence mode="wait">
                            {/* STEP 1: DATA PRIBADI */}
                            {currentStep === 1 && (
                                <motion.div
                                    key="step1"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.2 }}
                                    className="space-y-6"
                                >
                                    <div className="flex items-center gap-2 mb-4 border-b border-emerald/10 pb-2">
                                        <User className="text-emerald" size={20} />
                                        <h2 className="text-xl font-outfit font-bold text-gray-800">Data Pribadi</h2>
                                    </div>
                                    <div className="space-y-5">
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">Nama Lengkap Sesuai Identitas *</label>
                                            <input
                                                type="text"
                                                name="full_name"
                                                required
                                                value={formData.full_name}
                                                onChange={handleChange}
                                                className="w-full p-4 rounded-xl bg-gray-50/50 border border-gray-200 outline-none transition-all focus:border-gold focus:ring-4 focus:ring-gold/20 font-medium"
                                                placeholder="Tuliskan nama lengkap..."
                                            />
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-2">Nama Panggilan *</label>
                                                <input
                                                    type="text"
                                                    name="nickname"
                                                    required
                                                    value={formData.nickname}
                                                    onChange={handleChange}
                                                    className="w-full p-4 rounded-xl bg-gray-50/50 border border-gray-200 outline-none transition-all focus:border-gold focus:ring-4 focus:ring-gold/20 font-medium"
                                                    placeholder="Nama sapaan..."
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-2">Email Aktif *</label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    required
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    className="w-full p-4 rounded-xl bg-gray-50/50 border border-gray-200 outline-none transition-all focus:border-gold focus:ring-4 focus:ring-gold/20 font-medium"
                                                    placeholder="email@contoh.com"
                                                />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-2">Instagram *</label>
                                                <input
                                                    type="text"
                                                    name="instagram"
                                                    required
                                                    value={formData.instagram}
                                                    onChange={handleChange}
                                                    className="w-full p-4 rounded-xl bg-gray-50/50 border border-gray-200 outline-none transition-all focus:border-gold focus:ring-4 focus:ring-gold/20 font-medium"
                                                    placeholder="@username"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-2">No WhatsApp *</label>
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    required
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    className="w-full p-4 rounded-xl bg-gray-50/50 border border-gray-200 outline-none transition-all focus:border-gold focus:ring-4 focus:ring-gold/20 font-medium"
                                                    placeholder="08xxxxxxxxxx"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* STEP 2: PROFIL & DOMISILI */}
                            {currentStep === 2 && (
                                <motion.div
                                    key="step2"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.2 }}
                                    className="space-y-6"
                                >
                                    <div className="flex items-center gap-2 mb-4 border-b border-emerald/10 pb-2">
                                        <MapPin className="text-emerald" size={20} />
                                        <h2 className="text-xl font-outfit font-bold text-gray-800">Profil & Domisili</h2>
                                    </div>
                                    <div className="space-y-5">
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">Domisili Saat Ini *</label>
                                            <input
                                                type="text"
                                                name="domicile"
                                                required
                                                value={formData.domicile}
                                                onChange={handleChange}
                                                className="w-full p-4 rounded-xl bg-gray-50/50 border border-gray-200 outline-none transition-all focus:border-gold focus:ring-4 focus:ring-gold/20 font-medium"
                                                placeholder="Kota / Kabupaten..."
                                            />
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-2">Tempat Lahir *</label>
                                                <input
                                                    type="text"
                                                    name="birth_place"
                                                    required
                                                    value={formData.birth_place}
                                                    onChange={handleChange}
                                                    className="w-full p-4 rounded-xl bg-gray-50/50 border border-gray-200 outline-none transition-all focus:border-gold focus:ring-4 focus:ring-gold/20 font-medium"
                                                    placeholder="Contoh: Bandung..."
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-2">Tanggal Lahir *</label>
                                                <input
                                                    type="date"
                                                    name="birth_date"
                                                    required
                                                    value={formData.birth_date}
                                                    onChange={handleChange}
                                                    className="w-full p-4 rounded-xl bg-gray-50/50 border border-gray-200 outline-none transition-all focus:border-gold focus:ring-4 focus:ring-gold/20 font-medium text-gray-700"
                                                />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-2">Jenis Kelamin *</label>
                                                <select
                                                    name="gender"
                                                    required
                                                    value={formData.gender}
                                                    onChange={handleChange}
                                                    className="w-full p-4 rounded-xl bg-gray-50/50 border border-gray-200 outline-none transition-all focus:border-gold focus:ring-4 focus:ring-gold/20 font-medium text-gray-700"
                                                >
                                                    <option value="">-- Pilih Jenis Kelamin --</option>
                                                    <option value="Laki-laki">Laki-laki</option>
                                                    <option value="Perempuan">Perempuan</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-2">Kesibukan Utama *</label>
                                                <select
                                                    name="activity"
                                                    required
                                                    value={formData.activity}
                                                    onChange={handleChange}
                                                    className="w-full p-4 rounded-xl bg-gray-50/50 border border-gray-200 outline-none transition-all focus:border-gold focus:ring-4 focus:ring-gold/20 font-medium text-gray-700"
                                                >
                                                    <option value="">-- Pilih Kesibukan --</option>
                                                    <option value="Bekerja">Bekerja</option>
                                                    <option value="Kuliah">Kuliah</option>
                                                    <option value="Sekolah">Sekolah</option>
                                                    <option value="Lainnya">Lainnya</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* STEP 3: SKILL & MINAT */}
                            {currentStep === 3 && (
                                <motion.div
                                    key="step3"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.2 }}
                                    className="space-y-6"
                                >
                                    <div className="flex items-center gap-2 mb-4 border-b border-emerald/10 pb-2">
                                        <Star className="text-emerald" size={20} />
                                        <h2 className="text-xl font-outfit font-bold text-gray-800">Skill & Minat Kontribusi</h2>
                                    </div>
                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">Hobi</label>
                                            <textarea
                                                name="hobby"
                                                rows={2}
                                                value={formData.hobby}
                                                onChange={handleChange}
                                                className="w-full p-4 rounded-xl bg-gray-50/50 border border-gray-200 outline-none transition-all resize-none font-medium focus:border-gold focus:ring-4 focus:ring-gold/20"
                                                placeholder="Menulis, membaca buku sejarah, fotografi..."
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">Hard Skill / Soft Skill Terkuatmu *</label>
                                            <p className="text-xs text-gray-500 mb-2 font-medium">Boleh lebih dari satu. Pisahkan dengan koma.</p>
                                            <textarea
                                                name="skills"
                                                required
                                                rows={3}
                                                value={formData.skills}
                                                onChange={handleChange}
                                                className="w-full p-4 rounded-xl bg-gray-50/50 border border-gray-200 outline-none transition-all resize-none font-medium focus:border-gold focus:ring-4 focus:ring-gold/20"
                                                placeholder="Contoh: Public Speaking, Desain Figma, Manajemen Waktu, Editing Premiere Pro..."
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">Minat Kontribusi *</label>
                                            <p className="text-xs text-gray-500 mb-4 font-medium">Pilih satu atau beberapa bidang yang paling sesuai dengan minat kamu.</p>
                                            
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[220px] overflow-y-auto pr-2 custom-scrollbar">
                                                {INTEREST_CATEGORIES.map((category, idx) => (
                                                    <div key={idx} className="bg-emerald-50/20 p-4 rounded-2xl border border-emerald-100/50">
                                                        <h3 className="font-bold text-emerald-950 mb-2 text-xs">{category.group}</h3>
                                                        <div className="space-y-1.5">
                                                            {category.items.map(item => (
                                                                <label key={item} className="flex items-center gap-2 cursor-pointer group">
                                                                    <input
                                                                        type="checkbox"
                                                                        checked={selectedInterests.includes(item)}
                                                                        onChange={() => handleInterestToggle(item)}
                                                                        className="w-4 h-4 accent-emerald rounded cursor-pointer shrink-0"
                                                                    />
                                                                    <span className="text-xs font-semibold text-gray-700 group-hover:text-emerald transition-colors">{item}</span>
                                                                </label>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* STEP 4: SCREENING */}
                            {currentStep === 4 && (
                                <motion.div
                                    key="step4"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.2 }}
                                    className="space-y-6"
                                >
                                    <div className="flex items-center gap-2 mb-4 border-b border-emerald/10 pb-2">
                                        <Brain className="text-emerald" size={20} />
                                        <h2 className="text-xl font-outfit font-bold text-gray-800">Motivasi & Screening</h2>
                                    </div>
                                    <div className="space-y-5">
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">Kenapa kamu ingin bergabung menjadi Leader? *</label>
                                            <p className="text-[11px] text-emerald mb-2.5 font-bold bg-emerald-50/50 p-2.5 rounded-lg border border-emerald-150 inline-block">💡 Ceritakan dengan jujur dan spesifik ya!</p>
                                            <textarea
                                                name="motivation"
                                                required
                                                rows={4}
                                                value={formData.motivation}
                                                onChange={handleChange}
                                                className="w-full p-4 rounded-xl bg-gray-50/50 border border-gray-200 outline-none transition-all resize-none leading-relaxed font-medium focus:border-gold focus:ring-4 focus:ring-gold/20"
                                                placeholder="Alasan utamaku adalah..."
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">Kenapa kami harus memilih kamu? (Selling Point) *</label>
                                            <textarea
                                                name="selling_point"
                                                required
                                                rows={4}
                                                value={formData.selling_point}
                                                onChange={handleChange}
                                                className="w-full p-4 rounded-xl bg-gray-50/50 border border-gray-200 outline-none transition-all resize-none leading-relaxed font-medium focus:border-gold focus:ring-4 focus:ring-gold/20"
                                                placeholder="Apa nilai tambah, komitmen, atau pengalaman yang membuatmu tepat untuk peran ini?"
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* STEP 5: CV & KOMITMEN */}
                            {currentStep === 5 && (
                                <motion.div
                                    key="step5"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.2 }}
                                    className="space-y-6"
                                >
                                    <div className="flex items-center gap-2 mb-4 border-b border-emerald/10 pb-2">
                                        <UploadCloud className="text-emerald" size={20} />
                                        <h2 className="text-xl font-outfit font-bold text-gray-800">Upload CV & Komitmen</h2>
                                    </div>
                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-3">Upload CV Kamu *</label>
                                            <div className="border-2 border-dashed border-emerald-200 bg-emerald-50/10 rounded-2xl p-8 text-center hover:bg-emerald-50/20 transition-all relative group cursor-pointer">
                                                <input
                                                    type="file"
                                                    accept=".pdf"
                                                    required
                                                    onChange={handleFileChange}
                                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                                />
                                                <div className="flex flex-col items-center justify-center pointer-events-none">
                                                    <UploadCloud size={40} className={`mb-3 transition-colors ${cvFile ? 'text-emerald' : 'text-gray-400 group-hover:text-emerald'}`} />
                                                    {cvFile ? (
                                                        <p className="text-emerald font-bold text-sm">{cvFile.name}</p>
                                                    ) : (
                                                        <>
                                                            <p className="text-gray-700 font-bold text-sm mb-1">Pilih File atau Tarik ke Sini</p>
                                                            <p className="text-gray-400 text-xs font-semibold">Format PDF. Ukuran maks 2MB.</p>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Commitment Box */}
                                        <div className="bg-emerald text-[#FAF6EE] p-5 rounded-2xl border border-emerald-800 relative overflow-hidden">
                                            <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-full blur-2xl pointer-events-none" />
                                            <div className="flex items-center gap-2 mb-3 text-gold font-bold">
                                                <ShieldCheck size={20} />
                                                <h3 className="font-outfit text-base">Komitmen Khazanah Leader</h3>
                                            </div>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-xs font-medium text-[#FAF6EE]/90 mb-4 pl-1">
                                                <p>• Bersedia untuk terus belajar</p>
                                                <p>• Minimal berusia 17 tahun</p>
                                                <p>• Berkomitmen minimal 6 bulan</p>
                                                <p>• Memiliki kemampuan komunikasi baik</p>
                                                <p>• Memiliki minat besar di dunia dakwah</p>
                                                <p>• Menjaga nama baik komunitas</p>
                                            </div>

                                            <label className="flex items-start gap-3 cursor-pointer bg-white/10 p-3 rounded-xl border border-white/10 hover:border-gold/30 hover:bg-white/15 transition">
                                                <input
                                                    type="checkbox"
                                                    name="agreement"
                                                    required
                                                    checked={formData.agreement}
                                                    onChange={handleChange}
                                                    className="mt-1 w-4.5 h-4.5 accent-gold rounded cursor-pointer shrink-0"
                                                />
                                                <span className="text-[11px] sm:text-xs font-bold text-white leading-snug">
                                                    Bismillah, saya bersedia dan berjanji mengikuti seluruh syarat & ketentuan komitmen sebagai Khazanah Leader.
                                                </span>
                                            </label>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

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

                            {currentStep < 5 ? (
                                <button
                                    type="button"
                                    onClick={nextStep}
                                    className="flex items-center gap-1.5 px-6 py-3 rounded-xl bg-emerald hover:shadow-premium text-white font-bold text-sm transition ml-auto"
                                >
                                    <span>Lanjutkan</span>
                                    <ArrowRight size={16} />
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    disabled={isSubmitting || !formData.agreement || !cvFile}
                                    className="flex items-center gap-1.5 px-8 py-3 rounded-xl bg-gradient-to-r from-emerald to-gold hover:shadow-premium text-white font-bold text-sm transition ml-auto disabled:opacity-50"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="animate-spin" size={16} />
                                            <span>Mendaftarkan...</span>
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

export default LeaderForm;