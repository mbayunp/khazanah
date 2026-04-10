import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PenTool, UploadCloud, Send, Loader2, ImageIcon } from 'lucide-react';
import Swal from 'sweetalert2';

const SubmitArticle: React.FC = () => {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);

    const [formData, setFormData] = useState({
        title: '',
        category: 'Self Growth',
        author_name: '',
        content: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                Swal.fire('File Terlalu Besar', 'Maksimal ukuran gambar adalah 2MB', 'error');
                e.target.value = '';
                return;
            }
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const data = new FormData();
        data.append('title', formData.title);
        data.append('category', formData.category);
        data.append('author_name', formData.author_name || 'Hamba Allah');
        data.append('content', formData.content);
        if (imageFile) {
            data.append('thumbnail', imageFile);
        }

        try {
            const res = await fetch('http://localhost:5000/api/articles', {
                method: 'POST',
                body: data
            });
            const result = await res.json();

            if (res.ok) {
                Swal.fire({
                    title: 'Berhasil!',
                    text: 'Karyamu telah dikirim dan sedang menunggu tinjauan Admin.',
                    icon: 'success',
                    confirmButtonColor: '#18703E'
                }).then(() => {
                    navigate('/'); // Arahkan kembali ke Home atau halaman list artikel nanti
                });
            } else {
                Swal.fire('Oops!', result.message, 'warning');
            }
        } catch (error) {
            Swal.fire('Error', 'Terjadi kesalahan pada server.', 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen pt-28 pb-20 font-sans">
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
                <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-khazanah-light text-khazanah-green text-xs font-bold uppercase tracking-widest mb-4">
                        <PenTool size={14} /> Ruang Penulis
                    </div>
                    <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">Kirimkan Karyamu</h1>
                    <p className="text-gray-600">Berbagi ilmu dan inspirasi untuk ribuan pemuda Muslim lainnya.</p>
                </div>

                <div className="bg-white p-8 md:p-10 rounded-[2rem] shadow-xl shadow-gray-200/50 border border-gray-100">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        
                        {/* Area Upload Thumbnail */}
                        <div className="mb-6">
                            <label className="block text-sm font-bold text-gray-700 mb-3">Thumbnail Artikel</label>
                            <div className="flex flex-col sm:flex-row items-center gap-6">
                                <div className="w-full sm:w-48 h-32 rounded-2xl bg-gray-50 border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden shrink-0">
                                    {imagePreview ? (
                                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="text-gray-400 flex flex-col items-center">
                                            <ImageIcon size={32} className="mb-2 opacity-50" />
                                            <span className="text-xs font-medium">16:9 Ratio</span>
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1 w-full relative group cursor-pointer">
                                    <input type="file" accept="image/*" onChange={handleImageChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                                    <div className="bg-khazanah-light/30 border border-khazanah-green/20 rounded-2xl p-6 text-center group-hover:bg-khazanah-light transition">
                                        <UploadCloud size={28} className="mx-auto mb-2 text-khazanah-green" />
                                        <p className="text-sm font-bold text-khazanah-dark mb-1">Pilih Gambar Thumbnail</p>
                                        <p className="text-xs text-gray-500">JPG, PNG maksimal 2MB</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-bold text-gray-700 mb-2">Judul Artikel *</label>
                                <input type="text" name="title" required value={formData.title} onChange={handleChange} className="w-full p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-khazanah-green outline-none bg-gray-50 focus:bg-white transition" placeholder="Contoh: Menjaga Konsistensi Ibadah di Era Digital" />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Kategori *</label>
                                <select name="category" value={formData.category} onChange={handleChange} className="w-full p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-khazanah-green outline-none bg-gray-50 focus:bg-white transition">
                                    <option value="Self Growth">Self Growth</option>
                                    <option value="Faith">Faith & Ibadah</option>
                                    <option value="Relationship">Relationship</option>
                                    <option value="Lifestyle">Muslim Lifestyle</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Nama Penulis</label>
                                <input type="text" name="author_name" value={formData.author_name} onChange={handleChange} className="w-full p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-khazanah-green outline-none bg-gray-50 focus:bg-white transition" placeholder="Nama asli atau nama pena" />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-bold text-gray-700 mb-2">Isi Artikel *</label>
                                <textarea name="content" required rows={12} value={formData.content} onChange={handleChange} className="w-full p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-khazanah-green outline-none bg-gray-50 focus:bg-white transition resize-none leading-relaxed" placeholder="Tuliskan isi artikelmu di sini. Gunakan enter (baris baru) untuk memisahkan paragraf..."></textarea>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-gray-100 flex justify-end">
                            <button type="submit" disabled={isSubmitting} className="bg-khazanah-green text-white px-10 py-4 rounded-2xl font-bold hover:bg-khazanah-dark transition shadow-lg shadow-khazanah-green/30 flex items-center gap-2 disabled:opacity-70">
                                {isSubmitting ? <><Loader2 size={20} className="animate-spin" /> Mengirim...</> : <><Send size={20} /> Kirim Artikel</>}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SubmitArticle;