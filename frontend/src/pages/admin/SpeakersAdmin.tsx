import React, { useState, useEffect } from 'react';
import { MicVocal, Plus, Search, Filter, Phone, Edit, Trash2, X, Save, MessageCircle, Eye, Loader2, Camera, Download } from 'lucide-react';
import Swal from 'sweetalert2';

interface Speaker {
    id: number;
    name: string;
    gender: 'L' | 'P';
    photo: string | null;
    focus: string;
    bio: string;
    phone: string;
    instagram: string;
    invitation_status: 'belum' | 'sudah' | 'tidak_dibalas' | 'jadwal_tidak_cocok';
    ratecard: number;
    benefits: string;
    notes: string;
}

const SpeakersAdmin: React.FC = () => {
    const [speakers, setSpeakers] = useState<Speaker[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    // Modal State untuk Edit/Create
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    
    // Modal State KHUSUS untuk Preview Foto
    const [viewPhotoSpeaker, setViewPhotoSpeaker] = useState<Speaker | null>(null);

    // State untuk Form & Gambar
    const [photoFile, setPhotoFile] = useState<File | null>(null);
    const [photoPreview, setPhotoPreview] = useState<string | null>(null);
    const [formData, setFormData] = useState<Partial<Speaker>>({
        name: '', gender: 'P', focus: '', bio: '', phone: '', instagram: '', invitation_status: 'belum', ratecard: 0, benefits: '', notes: ''
    });

    const fetchSpeakers = async () => {
        setIsLoading(true);
        try {
            const res = await fetch('http://localhost:5000/api/speakers');
            const data = await res.json();
            setSpeakers(data);
        } catch (error) { console.error(error); }
        finally { setIsLoading(false); }
    };

    useEffect(() => { fetchSpeakers(); }, []);

    // Filter Logic
    const filteredSpeakers = speakers.filter(s => {
        const matchSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.focus.toLowerCase().includes(searchTerm.toLowerCase());
        const matchStatus = statusFilter === 'all' || s.invitation_status === statusFilter;
        return matchSearch && matchStatus;
    });

    // Handle Gambar Berubah di Form
    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                Swal.fire('File Terlalu Besar', 'Maksimal ukuran foto adalah 2MB', 'error');
                e.target.value = '';
                return;
            }
            setPhotoFile(file);
            setPhotoPreview(URL.createObjectURL(file));
        }
    };

    // Save Data
    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        const url = formData.id ? `http://localhost:5000/api/speakers/${formData.id}` : 'http://localhost:5000/api/speakers';
        const method = formData.id ? 'PUT' : 'POST';

        const submitData = new FormData();
        Object.keys(formData).forEach(key => {
            if (key !== 'photo' && formData[key as keyof typeof formData] !== undefined) {
                submitData.append(key, formData[key as keyof typeof formData] as string);
            }
        });
        if (photoFile) submitData.append('photo', photoFile);

        try {
            const res = await fetch(url, { method, body: submitData });
            if (res.ok) {
                Swal.fire('Berhasil!', 'Data pemateri tersimpan.', 'success');
                setIsModalOpen(false);
                fetchSpeakers();
            }
        } catch (error) { Swal.fire('Error', 'Gagal menyimpan', 'error'); }
        finally { setIsSaving(false); }
    };

    const handleDelete = async (id: number) => {
        const result = await Swal.fire({ title: 'Hapus data?', text: 'Data pemateri akan hilang permanen.', icon: 'warning', showCancelButton: true, confirmButtonColor: '#d33', confirmButtonText: 'Hapus' });
        if (result.isConfirmed) {
            try {
                await fetch(`http://localhost:5000/api/speakers/${id}`, { method: 'DELETE' });
                fetchSpeakers();
                Swal.fire('Terhapus!', '', 'success');
            } catch (error) { console.error(error); }
        }
    };

    const openModal = (speaker?: Speaker) => {
        setPhotoFile(null);
        if (speaker) {
            setFormData(speaker);
            setPhotoPreview(speaker.photo ? `http://localhost:5000${speaker.photo}` : null);
        } else {
            setFormData({ name: '', gender: 'P', focus: '', bio: '', phone: '', instagram: '', invitation_status: 'belum', ratecard: 0, benefits: '', notes: '' });
            setPhotoPreview(null);
        }
        setIsModalOpen(true);
    };

    // Fungsi Download Gambar (Dipanggil dari Modal Preview)
    const handleDownloadPhoto = async (photoUrl: string, speakerName: string) => {
        try {
            const url = `http://localhost:5000${photoUrl}`;
            const response = await fetch(url);
            const blob = await response.blob();
            const blobUrl = window.URL.createObjectURL(blob);
            
            const link = document.createElement('a');
            link.href = blobUrl;
            const extension = photoUrl.split('.').pop() || 'jpg';
            link.download = `${speakerName.replace(/\s+/g, '_')}_Khazanah.${extension}`;
            
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(blobUrl);
            
            // Tutup preview setelah klik download agar rapi
            setViewPhotoSpeaker(null);
        } catch (error) {
            Swal.fire('Gagal Download', 'Terjadi kesalahan saat mencoba mengunduh gambar', 'error');
        }
    };

    const formatRupiah = (angka: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(angka);

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'sudah': return <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">🟢 Sudah</span>;
            case 'belum': return <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-bold">🟡 Belum</span>;
            case 'tidak_dibalas': return <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold">🔴 Tdk Dibalas</span>;
            case 'jadwal_tidak_cocok': return <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-bold">🟠 Jdwl Tdk Cocok</span>;
            default: return null;
        }
    };

    return (
        <div className="p-4 lg:p-8 max-w-7xl mx-auto min-h-screen font-sans">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-khazanah-light text-khazanah-green rounded-xl"><MicVocal size={28} /></div>
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900">Database Pemateri</h1>
                        <p className="text-gray-500 font-medium">Kelola relasi dan jadwal narasumber Khazanah</p>
                    </div>
                </div>
                <button onClick={() => openModal()} className="bg-khazanah-green text-white px-5 py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-khazanah-dark shadow-lg transition">
                    <Plus size={18} /> Tambah Pemateri
                </button>
            </div>

            {/* Toolbar: Search & Filter */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-6 flex flex-col md:flex-row gap-4">
                <div className="relative flex-1 group">
                    <Search className="absolute left-3 top-3 text-gray-400 group-focus-within:text-khazanah-green" size={20} />
                    <input type="text" placeholder="Cari nama atau fokus bahasan..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-khazanah-green bg-gray-50 focus:bg-white" />
                </div>
                <div className="relative shrink-0">
                    <Filter className="absolute left-3 top-3 text-gray-400" size={20} />
                    <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="pl-10 pr-8 py-2.5 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-khazanah-green bg-gray-50 font-semibold text-gray-700 cursor-pointer appearance-none">
                        <option value="all">Semua Status</option>
                        <option value="belum">Belum Pernah</option>
                        <option value="sudah">Sudah Pernah</option>
                        <option value="tidak_dibalas">Tidak Dibalas</option>
                        <option value="jadwal_tidak_cocok">Jadwal Tdk Cocok</option>
                    </select>
                </div>
            </div>

            {/* List Pemateri */}
            <div className="grid gap-6">
                {isLoading ? (
                    <div className="text-center py-20"><Loader2 className="animate-spin text-khazanah-green mx-auto mb-4" size={40} /></div>
                ) : filteredSpeakers.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
                        <MicVocal className="mx-auto text-gray-300 mb-2" size={48} />
                        <p className="text-gray-500 font-medium">Data pemateri tidak ditemukan.</p>
                    </div>
                ) : (
                    filteredSpeakers.map(speaker => (
                        <div key={speaker.id} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col lg:flex-row gap-6 hover:shadow-md transition group">
                            
                            {/* Info Utama */}
                            <div className="flex-1 flex gap-5 items-start">
                                
                                {/* AVATAR PEMATERI -> KLIK MUNCULKAN PREVIEW MODAL */}
                                <div 
                                    className={`w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-400 font-black text-2xl shrink-0 shadow-sm overflow-hidden border border-gray-200 relative group-hover:shadow-md transition-all ${speaker.photo ? 'cursor-pointer hover:ring-2 hover:ring-khazanah-green' : ''}`}
                                    onClick={() => {
                                        if (speaker.photo) {
                                            setViewPhotoSpeaker(speaker);
                                        }
                                    }}
                                    title={speaker.photo ? "Klik untuk lihat & download foto" : ""}
                                >
                                    {speaker.photo ? (
                                        <>
                                            <img src={`http://localhost:5000${speaker.photo}`} alt={speaker.name} className="w-full h-full object-cover" />
                                            {/* Hover Overlay: Ikon Mata (Preview) */}
                                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Eye size={20} className="text-white" />
                                            </div>
                                        </>
                                    ) : (
                                        speaker.name.charAt(0).toUpperCase()
                                    )}
                                </div>

                                <div>
                                    <div className="flex flex-wrap items-center gap-2 mb-1">
                                        <h3 className="text-xl font-bold text-gray-900">{speaker.name}</h3>
                                        <span className="text-xs font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-md">({speaker.gender})</span>
                                        {getStatusBadge(speaker.invitation_status)}
                                    </div>
                                    <p className="text-sm font-bold text-khazanah-green mb-3">{speaker.focus}</p>
                                    <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed bg-gray-50 p-3 rounded-xl border border-gray-100">{speaker.bio || 'Belum ada bio.'}</p>
                                </div>
                            </div>

                            {/* Kerjasama & Kontak */}
                            <div className="flex-1 lg:max-w-xs flex flex-col justify-between gap-4 border-t lg:border-t-0 lg:border-l border-gray-100 pt-4 lg:pt-0 lg:pl-6">
                                <div className="space-y-3">
                                    <div>
                                        <span className="text-[10px] font-black uppercase text-gray-400 tracking-wider">Ratecard & Benefit</span>
                                        <p className="text-sm font-bold text-gray-800">{speaker.ratecard > 0 ? formatRupiah(speaker.ratecard) : 'Free / Negosiasi'}</p>
                                        <p className="text-xs text-gray-500 mt-0.5 truncate">{speaker.benefits || '-'}</p>
                                    </div>
                                    {speaker.notes && (
                                        <div className="bg-amber-50 p-2.5 rounded-lg border border-amber-100/50">
                                            <span className="text-[10px] font-black uppercase text-amber-600 tracking-wider block mb-1">Internal Notes:</span>
                                            <p className="text-xs text-amber-800 italic line-clamp-2">{speaker.notes}</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Quick Actions */}
                            <div className="flex flex-row lg:flex-col gap-2 justify-center lg:justify-start shrink-0 border-t lg:border-t-0 lg:border-l border-gray-100 pt-4 lg:pt-0 lg:pl-6">
                                <a href={`https://wa.me/${speaker.phone?.replace(/\D/g,'')}`} target="_blank" rel="noreferrer" className="flex-1 lg:flex-none flex items-center justify-center gap-2 bg-green-50 text-green-600 px-4 py-2 rounded-xl text-sm font-bold hover:bg-green-500 hover:text-white transition">
                                    <MessageCircle size={16} /> WA
                                </a>
                                {speaker.instagram && (
                                    <a href={`https://instagram.com/${speaker.instagram.replace('@','')}`} target="_blank" rel="noreferrer" className="flex-1 lg:flex-none flex items-center justify-center gap-2 bg-pink-50 text-pink-600 px-4 py-2 rounded-xl text-sm font-bold hover:bg-pink-500 hover:text-white transition">
                                        <Camera  size={16} /> IG
                                    </a>
                                )}
                                <div className="flex gap-2 lg:mt-auto">
                                    <button onClick={() => openModal(speaker)} className="flex-1 flex items-center justify-center p-2 bg-gray-100 text-gray-600 rounded-xl hover:bg-khazanah-green hover:text-white transition"><Edit size={16} /></button>
                                    <button onClick={() => handleDelete(speaker.id)} className="flex-1 flex items-center justify-center p-2 bg-gray-100 text-gray-600 rounded-xl hover:bg-red-500 hover:text-white transition"><Trash2 size={16} /></button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* MODAL PREVIEW FOTO (LIGHTBOX) */}
            {viewPhotoSpeaker && viewPhotoSpeaker.photo && (
                <div 
                    className="fixed inset-0 bg-black/90 backdrop-blur-md z-[60] flex items-center justify-center p-4 animate-in fade-in duration-200"
                    onClick={() => setViewPhotoSpeaker(null)} // Tutup saat klik background
                >
                    <div 
                        className="relative w-full max-w-3xl flex flex-col items-center"
                        onClick={e => e.stopPropagation()} // Hindari tutup saat klik area gambar
                    >
                        <button 
                            onClick={() => setViewPhotoSpeaker(null)} 
                            className="absolute -top-12 right-0 md:-right-12 text-white/70 hover:text-white p-2 rounded-full transition"
                        >
                            <X size={32} />
                        </button>

                        <div className="bg-white/5 p-2 rounded-3xl backdrop-blur-sm border border-white/10 shadow-2xl">
                            <img 
                                src={`http://localhost:5000${viewPhotoSpeaker.photo}`} 
                                alt={viewPhotoSpeaker.name} 
                                className="max-h-[65vh] w-auto object-contain rounded-2xl"
                            />
                        </div>

                        <div className="flex flex-col items-center mt-6 gap-4">
                            <h3 className="text-white text-2xl font-black">{viewPhotoSpeaker.name}</h3>
                            <button 
                                onClick={() => handleDownloadPhoto(viewPhotoSpeaker.photo!, viewPhotoSpeaker.name)}
                                className="bg-khazanah-green text-white px-8 py-3.5 rounded-2xl font-bold flex items-center gap-3 hover:bg-khazanah-dark hover:scale-105 transition-all shadow-xl shadow-khazanah-green/30"
                            >
                                <Download size={20} /> Download Foto Asli
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* MODAL FORM CREATE/EDIT */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-[2rem] w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl animate-in zoom-in-95 duration-200">
                        <div className="p-6 bg-khazanah-dark text-white flex justify-between items-center shrink-0">
                            <h2 className="text-xl font-bold flex items-center gap-2"><MicVocal size={20} /> {formData.id ? 'Edit Pemateri' : 'Tambah Pemateri Baru'}</h2>
                            <button onClick={() => setIsModalOpen(false)} className="bg-white/10 p-2 rounded-full hover:bg-white/20"><X size={20}/></button>
                        </div>
                        <div className="p-6 overflow-y-auto custom-scrollbar flex-1">
                            <form id="speakerForm" onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                
                                {/* Info Utama & Upload Foto */}
                                <div className="space-y-4">
                                    <h3 className="font-bold text-gray-800 border-b pb-2 mb-4">Informasi Utama</h3>
                                    
                                    {/* Upload Foto (Lingkaran) */}
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="w-20 h-20 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex flex-col items-center justify-center relative overflow-hidden group shrink-0">
                                            {photoPreview ? (
                                                <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                                            ) : (
                                                <Camera size={24} className="text-gray-400" />
                                            )}
                                            <input type="file" accept="image/*" onChange={handlePhotoChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                                <span className="text-white text-[10px] font-bold">Ubah Foto</span>
                                            </div>
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            <p className="font-bold text-gray-700">Foto Profil Pemateri</p>
                                            <p>Opsional. Maksimal ukuran 2MB (JPG/PNG).</p>
                                        </div>
                                    </div>

                                    <div><label className="text-xs font-bold text-gray-500">Nama Lengkap *</label><input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full p-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-khazanah-green" /></div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div><label className="text-xs font-bold text-gray-500">Gender</label><select value={formData.gender} onChange={e => setFormData({...formData, gender: e.target.value as 'L'|'P'})} className="w-full p-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-khazanah-green"><option value="L">Laki-laki</option><option value="P">Perempuan</option></select></div>
                                        <div><label className="text-xs font-bold text-gray-500">Fokus Bahasan</label><input type="text" placeholder="Misal: Parenting" value={formData.focus} onChange={e => setFormData({...formData, focus: e.target.value})} className="w-full p-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-khazanah-green" /></div>
                                    </div>
                                    <div><label className="text-xs font-bold text-gray-500">Bio Singkat</label><textarea rows={3} value={formData.bio} onChange={e => setFormData({...formData, bio: e.target.value})} className="w-full p-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-khazanah-green resize-none"></textarea></div>
                                </div>

                                {/* Kontak & Relasi */}
                                <div className="space-y-4">
                                    <h3 className="font-bold text-gray-800 border-b pb-2 mb-4">Kontak & Kerjasama</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div><label className="text-xs font-bold text-gray-500">No WhatsApp</label><input type="text" placeholder="0812..." value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full p-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-khazanah-green" /></div>
                                        <div><label className="text-xs font-bold text-gray-500">Instagram</label><input type="text" placeholder="@username" value={formData.instagram} onChange={e => setFormData({...formData, instagram: e.target.value})} className="w-full p-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-khazanah-green" /></div>
                                    </div>
                                    <div><label className="text-xs font-bold text-gray-500">Status Relasi</label><select value={formData.invitation_status} onChange={e => setFormData({...formData, invitation_status: e.target.value as any})} className="w-full p-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-khazanah-green"><option value="belum">Belum Pernah Diundang</option><option value="sudah">Sudah Pernah</option><option value="tidak_dibalas">Tidak Dibalas</option><option value="jadwal_tidak_cocok">Jadwal Tidak Cocok</option></select></div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div><label className="text-xs font-bold text-gray-500">Ratecard (Rp)</label><input type="number" placeholder="Kosongkan jika free" value={formData.ratecard || ''} onChange={e => setFormData({...formData, ratecard: Number(e.target.value)})} className="w-full p-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-khazanah-green" /></div>
                                        <div><label className="text-xs font-bold text-gray-500">Benefit (Opsional)</label><input type="text" placeholder="Misal: Souvenir" value={formData.benefits} onChange={e => setFormData({...formData, benefits: e.target.value})} className="w-full p-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-khazanah-green" /></div>
                                    </div>
                                </div>
                                
                                {/* Notes */}
                                <div className="md:col-span-2">
                                    <label className="text-xs font-bold text-amber-600">Catatan Internal (Rahasia)</label>
                                    <textarea rows={2} placeholder="Catatan evaluasi admin terhadap pemateri ini..." value={formData.notes} onChange={e => setFormData({...formData, notes: e.target.value})} className="w-full p-3 bg-amber-50/50 border border-amber-100 rounded-xl outline-none focus:ring-2 focus:ring-amber-400 resize-none text-sm"></textarea>
                                </div>
                            </form>
                        </div>
                        <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3 shrink-0">
                            <button onClick={() => setIsModalOpen(false)} className="px-6 py-2.5 font-bold text-gray-500">Batal</button>
                            <button form="speakerForm" type="submit" disabled={isSaving} className="bg-khazanah-green text-white px-8 py-2.5 rounded-xl font-bold shadow-lg flex items-center gap-2 hover:bg-khazanah-dark transition">
                                {isSaving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />} Simpan Data
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SpeakersAdmin;