// Ganti isi RuangAdmin.tsx kamu dengan ini:
import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Trash2, MessageSquare } from 'lucide-react';

interface CurhatanAdmin {
    id: number;
    sender_name: string;
    message: string;
    status: 'pending' | 'approved' | 'rejected';
    created_at: string;
}

const RuangAdmin: React.FC = () => {
    const [curhatans, setCurhatans] = useState<CurhatanAdmin[]>([]);

    const fetchCurhatan = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/ruang/admin');
            const data = await res.json();
            setCurhatans(data);
        } catch (error) { console.error(error); }
    };

    useEffect(() => { fetchCurhatan(); }, []);

    const handleRespond = async (id: number, status: 'approved' | 'rejected') => {
        try {
            await fetch(`http://localhost:5000/api/ruang/${id}/respond`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ admin_response: '', status }) // Respons dikosongkan
            });
            fetchCurhatan();
        } catch (error) { console.error(error); }
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm('Yakin ingin menghapus permanen?')) return;
        try {
            await fetch(`http://localhost:5000/api/ruang/${id}`, { method: 'DELETE' });
            fetchCurhatan();
        } catch (error) { console.error(error); }
    };

    return (
        <div className="p-8 max-w-6xl mx-auto min-h-screen">
            <h1 className="text-3xl font-bold mb-8 text-gray-900 flex items-center gap-3">
                <MessageSquare className="text-khazanah-green" /> Moderasi Ruang Cerita
            </h1>

            <div className="grid gap-6">
                {curhatans.map((c) => (
                    <div key={c.id} className={`bg-white p-6 rounded-2xl shadow-sm border-l-4 ${
                        c.status === 'pending' ? 'border-yellow-400' : 
                        c.status === 'approved' ? 'border-green-500' : 'border-red-500'
                    }`}>
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="font-bold text-lg text-gray-900">{c.sender_name}</h3>
                                <p className="text-sm text-gray-500">{new Date(c.created_at).toLocaleString('id-ID')}</p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                                c.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 
                                c.status === 'approved' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                            }`}>{c.status}</span>
                        </div>
                        
                        <div className="bg-gray-50 p-4 rounded-xl text-gray-700 mb-4 border border-gray-100">{c.message}</div>

                        <div className="flex gap-3 mt-4">
                            {c.status !== 'approved' && (
                                <button onClick={() => handleRespond(c.id, 'approved')} className="flex items-center gap-2 bg-khazanah-green text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-green-700 transition">
                                    <CheckCircle size={16} /> Tayangkan ke Publik
                                </button>
                            )}
                            {c.status !== 'rejected' && (
                                <button onClick={() => handleRespond(c.id, 'rejected')} className="flex items-center gap-2 bg-yellow-500 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-yellow-600 transition">
                                    <XCircle size={16} /> Sembunyikan
                                </button>
                            )}
                            <button onClick={() => handleDelete(c.id)} className="flex items-center gap-2 bg-red-100 text-red-600 px-4 py-2 rounded-lg text-sm font-bold hover:bg-red-200 transition ml-auto">
                                <Trash2 size={16} /> Hapus Permanen
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default RuangAdmin;