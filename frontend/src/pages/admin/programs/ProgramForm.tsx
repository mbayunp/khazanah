import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Save, ArrowLeft, UploadCloud, ImageIcon, Loader2 } from 'lucide-react';
import Swal from 'sweetalert2';
import { API_URL, API_ENDPOINTS } from '../../../config/api';

const ProgramForm: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEdit = Boolean(id);

    const [formData, setFormData] = useState({
        title: '', category: 'Jofisah', description: '', date: '', location: '', quota: 0, status: 'draft'
    });
    
    // State khusus untuk File Gambar
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    
    // State Loading untuk mencegah double-submit
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [categoriesList, setCategoriesList] = useState<any[]>([]);

    useEffect(() => {
        fetch(API_ENDPOINTS.categories)
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setCategoriesList(data);
                    if (!isEdit && data.length > 0) {
                        setFormData(prev => ({ ...prev, category: data[0].name }));
                    }
                }
            })
            .catch(err => console.error("Gagal mengambil kategori:", err));

        if (isEdit) {
            fetch(`${API_ENDPOINTS.programs}/${id}`)
                .then(res => res.json())
                .then(data => {
                    if (data.date) {
                        const formattedDate = new Date(data.date).toISOString().slice(0, 16);
                        setFormData({ ...data, date: formattedDate });
                    } else {
                        setFormData(data);
                    }
                    if (data.image) setImagePreview(`${API_URL}${data.image}`);
                });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, isEdit]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                Swal.fire('File Terlalu Besar', 'Maksimal ukuran gambar adalah 5MB', 'error');
                e.target.value = '';
                return;
            }
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true); // Kunci tombol simpan

        const url = isEdit ? `${API_ENDPOINTS.programs}/${id}` : API_ENDPOINTS.programs;
        const method = isEdit ? 'PUT' : 'POST';

        const data = new FormData();
        data.append('title', formData.title);
        data.append('category', formData.category);
        data.append('description', formData.description || '');
        data.append('date', formData.date);
        data.append('location', formData.location);
        data.append('quota', String(formData.quota || 0));
        data.append('status', formData.status);

        if (imageFile) {
            data.append('image', imageFile);
        }

        try {
            const response = await fetch(url, { method, body: data });
            const contentType = response.headers.get("content-type");
            
            if (contentType && contentType.indexOf("application/json") !== -1) {
                const result = await response.json();
                if (response.ok) {
                    Swal.fire('Sukses!', result.message, 'success');
                    navigate('/admin/programs');
                } else {
                    // Tampilkan pesan error spesifik dari backend (misal: Judul sudah ada)
                    Swal.fire('Oops!', result.message || 'Gagal menyimpan program', 'warning');
                }
            } else {
                const textError = await response.text();
                console.error("Server HTML Error:", textError);
                Swal.fire('Server Error', 'Terjadi kesalahan sistem di Backend. Cek terminal node.js Anda.', 'error');
            }
        } catch (error) {
            console.error("Fetch Error:", error);
            Swal.fire('Error', 'Koneksi ke server gagal.', 'error');
        } finally {
            setIsSubmitting(false); // Buka kunci tombol simpan
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6 pb-10">
            <div className="flex items-center gap-4">
                <Link to="/admin/programs" className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-50 border border-gray-100"><ArrowLeft size={20} /></Link>
                <h1 className="text-2xl font-bold text-gray-800">{isEdit ? 'Edit Program' : 'Tambah Program Baru'}</h1>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <form onSubmit={handleSubmit} className="space-y-6">
                    
                    <div className="mb-8">
                        <label className="block text-sm font-semibold text-gray-700 mb-3">Cover Program / Poster</label>
                        <div className="flex items-start gap-6">
                            <div className="w-48 h-48 rounded-xl bg-gray-50 border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden relative shrink-0">
                                {imagePreview ? (
                                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="text-center text-gray-400">
                                        <ImageIcon size={40} className="mx-auto mb-2 opacity-50" />
                                        <span className="text-xs font-medium">Belum ada gambar</span>
                                    </div>
                                )}
                            </div>
                            
                            <div className="flex-1">
                                <div className="relative group cursor-pointer">
                                    <input type="file" accept="image/*" onChange={handleImageChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                                    <div className="bg-khazanah-light/30 border border-khazanah-green/20 rounded-xl p-6 text-center group-hover:bg-khazanah-light transition">
                                        <UploadCloud size={32} className="mx-auto mb-2 text-khazanah-green" />
                                        <p className="text-sm font-bold text-khazanah-dark mb-1">Klik atau seret file ke sini</p>
                                        <p className="text-xs text-gray-500">Maksimal 5MB. Format JPG, PNG.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <hr className="border-gray-100" />

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Judul Program *</label>
                            <input type="text" name="title" value={formData.title} onChange={handleChange} required className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-khazanah-green outline-none bg-gray-50 focus:bg-white transition" placeholder="Contoh: Kelas Self Growth Muslimah" />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Pilar Kategori *</label>
                            <select name="category" value={formData.category} onChange={handleChange} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-khazanah-green outline-none bg-gray-50 focus:bg-white transition" required>
                                {categoriesList.map((cat) => (
                                    <option key={cat.id} value={cat.name}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Status Publikasi *</label>
                            <select name="status" value={formData.status} onChange={handleChange} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-khazanah-green outline-none bg-gray-50 focus:bg-white transition">
                                <option value="draft">Draft (Disembunyikan)</option>
                                <option value="active">Active (Buka Pendaftaran)</option>
                                <option value="full">Full (Kuota Penuh)</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Tanggal & Waktu *</label>
                            <input type="datetime-local" name="date" value={formData.date} onChange={handleChange} required className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-khazanah-green outline-none bg-gray-50 focus:bg-white transition" />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Lokasi *</label>
                                <input type="text" name="location" value={formData.location} onChange={handleChange} required className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-khazanah-green outline-none bg-gray-50 focus:bg-white transition" placeholder="Zoom / Markas" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Kuota</label>
                                <input type="number" name="quota" value={formData.quota} onChange={handleChange} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-khazanah-green outline-none bg-gray-50 focus:bg-white transition" placeholder="0 jika unlimited" />
                            </div>
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Deskripsi Program</label>
                            <textarea name="description" rows={5} value={formData.description} onChange={handleChange} className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-khazanah-green outline-none bg-gray-50 focus:bg-white transition resize-none" placeholder="Tuliskan detail tentang program ini..."></textarea>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-gray-100 flex justify-end gap-3 mt-8">
                        <Link to="/admin/programs" className="px-6 py-3 font-semibold text-gray-600 hover:bg-gray-100 rounded-xl transition">Batal</Link>
                        <button 
                            type="submit" 
                            disabled={isSubmitting}
                            className="bg-khazanah-green text-white px-8 py-3 rounded-xl font-bold hover:bg-khazanah-dark transition shadow-lg shadow-khazanah-green/20 flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? (
                                <><Loader2 size={20} className="animate-spin" /> Menyimpan...</>
                            ) : (
                                <><Save size={20} /> Simpan Program</>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProgramForm;