import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Edit, Trash2, Plus, Search } from 'lucide-react';
import Swal from 'sweetalert2';

const ProgramList: React.FC = () => {
    const [programs, setPrograms] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchPrograms = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/programs');
            const data = await response.json();
            if (response.ok) {
                setPrograms(data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchPrograms();
    }, []);

    const handleDelete = (id: number) => {
        Swal.fire({
            title: 'Hapus Program?',
            text: "Data yang dihapus beserta pesertanya tidak dapat dikembalikan!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Ya, Hapus'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await fetch(`http://localhost:5000/api/programs/${id}`, { method: 'DELETE' });
                    Swal.fire('Terhapus!', 'Program berhasil dihapus.', 'success');
                    fetchPrograms();
                } catch (error) {
                    Swal.fire('Error!', 'Gagal menghapus program.', 'error');
                }
            }
        });
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Kelola Program</h1>
                    <p className="text-gray-500 text-sm mt-1">Daftar semua program, kajian, dan event Khazanah.</p>
                </div>
                <Link to="/admin/programs/create" className="bg-khazanah-green text-white px-6 py-3 rounded-xl font-bold hover:bg-khazanah-dark transition shadow-lg shadow-khazanah-green/20 flex items-center gap-2 w-full md:w-auto">
                    <Plus size={20} /> Tambah Program
                </Link>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex justify-end">
                    <div className="relative w-full md:w-64">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <input type="text" placeholder="Cari program..." className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-khazanah-green bg-gray-50" />
                    </div>
                </div>
                
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 text-gray-600 text-sm border-b border-gray-200">
                                <th className="p-4 font-semibold">Judul Program</th>
                                <th className="p-4 font-semibold">Kategori</th>
                                <th className="p-4 font-semibold">Tanggal</th>
                                <th className="p-4 font-semibold">Status</th>
                                <th className="p-4 font-semibold text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {isLoading ? (
                                <tr><td colSpan={5} className="text-center p-8 text-gray-500">Memuat data...</td></tr>
                            ) : programs.length === 0 ? (
                                <tr><td colSpan={5} className="text-center p-8 text-gray-500">Belum ada program. Silakan tambah baru.</td></tr>
                            ) : (
                                programs.map((prog) => (
                                    <tr key={prog.id} className="border-b border-gray-100 hover:bg-gray-50/50 transition">
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden shrink-0 border border-gray-200 flex items-center justify-center">
                                                    {prog.image ? (
                                                        <img src={`http://localhost:5000${prog.image}`} alt={prog.title} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <span className="text-gray-400 text-xs">No Img</span>
                                                    )}
                                                </div>
                                                <span className="font-bold text-gray-800 line-clamp-2">{prog.title}</span>
                                            </div>
                                        </td>
                                        <td className="p-4"><span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-semibold">{prog.category}</span></td>
                                        <td className="p-4 text-gray-600">{new Date(prog.date).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</td>
                                        <td className="p-4"><span className={`px-3 py-1 rounded-full text-xs font-bold ${prog.status === 'active' ? 'bg-green-100 text-green-700' : prog.status === 'full' ? 'bg-red-100 text-red-700' : 'bg-gray-200 text-gray-600'}`}>{prog.status.toUpperCase()}</span></td>
                                        <td className="p-4 flex justify-center gap-3">
                                            <Link to={`/admin/programs/edit/${prog.id}`} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition"><Edit size={18} /></Link>
                                            <button onClick={() => handleDelete(prog.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition"><Trash2 size={18} /></button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ProgramList;