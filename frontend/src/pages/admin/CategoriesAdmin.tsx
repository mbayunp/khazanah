import React, { useState, useEffect } from 'react';
import { FolderKanban, Plus, Edit, Trash2, Loader2, Save, X } from 'lucide-react';
import Swal from 'sweetalert2';
import { API_ENDPOINTS } from '../../config/api';

const CategoriesAdmin: React.FC = () => {
    const [categories, setCategories] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({ id: null, name: '', description: '' });
    const [isSaving, setIsSaving] = useState(false);

    // Endpoint fallback jika belum diatur di config
    const endpoint = API_ENDPOINTS.categories || 'http://localhost:5000/api/categories';

    const fetchCategories = async () => {
        setIsLoading(true);
        try {
            const res = await fetch(endpoint);
            const data = await res.json();
            if (Array.isArray(data)) setCategories(data);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        const method = formData.id ? 'PUT' : 'POST';
        const url = formData.id ? `${endpoint}/${formData.id}` : endpoint;

        try {
            const res = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (res.ok) {
                Swal.fire('Berhasil!', 'Kategori berhasil disimpan.', 'success');
                setIsModalOpen(false);
                fetchCategories();
            } else {
                const errorData = await res.json();
                Swal.fire('Error', errorData.message || 'Gagal menyimpan kategori', 'error');
            }
        } catch (error) {
            Swal.fire('Error', 'Gagal menyimpan kategori', 'error');
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async (id: number) => {
        const result = await Swal.fire({
            title: 'Hapus kategori ini?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Ya, Hapus',
            confirmButtonColor: '#d33'
        });

        if (result.isConfirmed) {
            try {
                await fetch(`${endpoint}/${id}`, { method: 'DELETE' });
                Swal.fire('Terhapus!', 'Kategori berhasil dihapus.', 'success');
                fetchCategories();
            } catch (error) {
                Swal.fire('Error', 'Gagal menghapus data', 'error');
            }
        }
    };

    return (
        <div className="p-4 lg:p-8 max-w-[100vw] mx-auto min-h-screen font-sans">
            <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-khazanah-light text-khazanah-green rounded-xl"><FolderKanban size={28} /></div>
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900">Kategori Program</h1>
                        <p className="text-gray-500 font-medium">Kelola label kegiatan (Jofisah, Sholehah, dll)</p>
                    </div>
                </div>
                <button
                    onClick={() => { setFormData({ id: null, name: '', description: '' }); setIsModalOpen(true); }}
                    className="bg-khazanah-green text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-khazanah-dark transition"
                >
                    <Plus size={20} /> Tambah
                </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-100 text-gray-500 font-bold text-sm">
                        <tr>
                            <th className="p-4">Nama Kategori</th>
                            <th className="p-4">Deskripsi</th>
                            <th className="p-4 text-center">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {isLoading ? (
                            <tr><td colSpan={3} className="text-center py-10"><Loader2 className="animate-spin mx-auto text-khazanah-green" /></td></tr>
                        ) : categories.length === 0 ? (
                            <tr><td colSpan={3} className="text-center py-10 text-gray-400">Belum ada kategori.</td></tr>
                        ) : categories.map((cat) => (
                            <tr key={cat.id} className="hover:bg-gray-50 transition">
                                <td className="p-4 font-bold text-gray-800">{cat.name}</td>
                                <td className="p-4 text-gray-600 text-sm">{cat.description || '-'}</td>
                                <td className="p-4 text-center flex justify-center gap-2">
                                    <button onClick={() => { setFormData(cat); setIsModalOpen(true); }} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg"><Edit size={18} /></button>
                                    <button onClick={() => handleDelete(cat.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={18} /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal Input Kategori */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl w-full max-w-md p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold">{formData.id ? 'Edit Kategori' : 'Kategori Baru'}</h2>
                            <button onClick={() => setIsModalOpen(false)}><X className="text-gray-400 hover:text-gray-800" /></button>
                        </div>
                        <form onSubmit={handleSave} className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Nama Kategori</label>
                                <input type="text" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-khazanah-green outline-none" placeholder="Contoh: Jofisah" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Deskripsi Singkat</label>
                                <textarea value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-khazanah-green outline-none" rows={3} placeholder="Opsional..." />
                            </div>
                            <button type="submit" disabled={isSaving} className="w-full bg-khazanah-green text-white py-3 rounded-xl font-bold flex justify-center gap-2 hover:bg-khazanah-dark transition">
                                {isSaving ? <Loader2 className="animate-spin" /> : <Save size={20} />} Simpan
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CategoriesAdmin;