import React, { useState, useEffect } from 'react';
import { ListTodo, Edit, Loader2, Check, X, Save, Plus } from 'lucide-react';
import Swal from 'sweetalert2';

const TasksAdmin: React.FC = () => {
    const [masterData, setMasterData] = useState<any[]>([]);
    // State baru untuk menampung daftar pemateri dari database
    const [speakersList, setSpeakersList] = useState<{name: string}[]>([]); 
    
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    // Form State (Untuk Create & Edit)
    const [formData, setFormData] = useState({
        id: null,
        category: 'Jumanji',
        date: '',
        title: '',
        theme: '',
        pemateri: '', // Ini nanti akan terisi dari dropdown
        host: '',
        tilawah: '',
        poster: '',
        caption: '',
        diskusi: '',
        peserta: '',
        tor: false,
        fotoCv: false
    });

    // Fetch Master Data (Tasks) dan Data Pemateri sekaligus
    const fetchData = async () => {
        setIsLoading(true);
        try {
            // 1. Fetch Data Speakers untuk Dropdown
            const resSpeakers = await fetch('http://localhost:5000/api/speakers');
            if (resSpeakers.ok) {
                const speakers = await resSpeakers.json();
                setSpeakersList(speakers);
            }

            // 2. Fetch Data Master Tracker
            const resPrograms = await fetch('http://localhost:5000/api/programs');
            const programs = await resPrograms.json();

            const rows = await Promise.all(programs.map(async (prog: any) => {
                const resTasks = await fetch(`http://localhost:5000/api/tasks/program/${prog.id}`);
                const tasks = resTasks.ok ? await resTasks.json() : [];
                
                const getAssignee = (role: string) => tasks.find((t: any) => t.role === role)?.assigned_to || '';

                return {
                    ...prog,
                    pemateri: getAssignee('Pemateri'),
                    host: getAssignee('Host'),
                    tilawah: getAssignee('Tilawah'),
                    poster: getAssignee('Poster'),
                    caption: getAssignee('Caption'),
                    diskusi: getAssignee('Diskusi'),
                    peserta: 0,
                    tor: false,
                    fotoCv: false
                };
            }));
            setMasterData(rows);
        } catch (error) { 
            console.error(error); 
        } finally { 
            setIsLoading(false); 
        }
    };

    useEffect(() => { 
        fetchData(); 
    }, []);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        
        const url = formData.id 
            ? `http://localhost:5000/api/tasks/tracker/${formData.id}` 
            : `http://localhost:5000/api/tasks/full-event`;
        const method = formData.id ? 'PUT' : 'POST';

        try {
            const res = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                Swal.fire('Berhasil!', 'Data Tracker telah diperbarui.', 'success');
                setIsModalOpen(false);
                fetchData(); // Refresh semua data
            }
        } catch (error) { 
            Swal.fire('Error', 'Gagal menyimpan data', 'error'); 
        } finally { 
            setIsSaving(false); 
        }
    };

    return (
        <div className="p-4 lg:p-8 max-w-[100vw] mx-auto min-h-screen font-sans">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-khazanah-light text-khazanah-green rounded-xl"><ListTodo size={28} /></div>
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900">Master Tracker Operasional</h1>
                        <p className="text-gray-500 font-medium">Monitoring Penugasan & Output Event</p>
                    </div>
                </div>
                <button 
                    onClick={() => {
                        setFormData({ id: null, category: 'Jumanji', date: '', title: '', theme: '', pemateri: '', host: '', tilawah: '', poster: '', caption: '', diskusi: '', peserta: '', tor: false, fotoCv: false });
                        setIsModalOpen(true);
                    }}
                    className="bg-khazanah-green text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg hover:bg-khazanah-dark transition"
                >
                    <Plus size={20} /> Tambah Event Baru
                </button>
            </div>

            {/* TABEL SPREADSHEET */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto custom-scrollbar">
                    <table className="w-full text-sm whitespace-nowrap">
                        <thead>
                            <tr className="text-center font-bold bg-gray-50 border-b-2">
                                <th className="px-3 py-4 bg-[#e6f0cb]">No</th>
                                <th className="px-4 py-4 bg-[#d5ecd4]">Kegiatan</th>
                                <th className="px-4 py-4 bg-[#c9daf8]">Pelaksanaan</th>
                                <th className="px-4 py-4 bg-[#e2d5ec]">Judul</th>
                                <th className="px-4 py-4 bg-[#f9cb9c]">Pemateri</th>
                                <th className="px-4 py-4 bg-[#a4c2f4]">Host</th>
                                <th className="px-4 py-4 bg-[#ffe599]">Tilawah</th>
                                <th className="px-4 py-4 bg-[#b4a7d6]">Poster</th>
                                <th className="px-4 py-4 bg-[#9fc5e8]">Caption</th>
                                <th className="px-4 py-4 bg-gray-100">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? (
                                <tr>
                                    <td colSpan={10} className="text-center py-10 text-gray-400">
                                        <Loader2 className="animate-spin mx-auto mb-2" size={30}/> Memuat data...
                                    </td>
                                </tr>
                            ) : masterData.map((row, idx) => (
                                <tr key={row.id} className="border-b hover:bg-gray-50">
                                    <td className="px-3 py-3 text-center bg-[#fff2cc] font-bold">{idx + 1}</td>
                                    <td className="px-4 py-3 text-center">{row.category}</td>
                                    <td className="px-4 py-3">{new Date(row.date).toLocaleDateString('id-ID')}</td>
                                    <td className="px-4 py-3 font-medium text-blue-600 truncate max-w-[150px]">{row.title}</td>
                                    <td className="px-4 py-3 bg-[#fff3e0] font-semibold text-khazanah-dark">{row.pemateri || '-'}</td>
                                    <td className="px-4 py-3 bg-[#e3f2fd]">{row.host || '-'}</td>
                                    <td className="px-4 py-3 bg-[#fff8e1]">{row.tilawah || '-'}</td>
                                    <td className="px-4 py-3 bg-[#f3e5f5]">{row.poster || '-'}</td>
                                    <td className="px-4 py-3 bg-[#e3f2fd]">{row.caption || '-'}</td>
                                    <td className="px-4 py-3 text-center">
                                        <button onClick={() => { setFormData({...row, id: row.id}); setIsModalOpen(true); }} className="p-2 bg-khazanah-green text-white rounded-lg"><Edit size={14}/></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* MODAL FORM TERPADU */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-[2.5rem] w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl">
                        <div className="p-8">
                            <div className="flex justify-between items-center mb-8">
                                <h2 className="text-2xl font-black text-khazanah-dark">{formData.id ? 'Edit Event' : 'Input Event Baru'}</h2>
                                <button onClick={() => setIsModalOpen(false)} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200"><X /></button>
                            </div>

                            <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {/* Section 1: Info Acara */}
                                <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-4 gap-4 bg-khazanah-light/20 p-6 rounded-3xl">
                                    <div className="md:col-span-1">
                                        <label className="text-xs font-black uppercase text-khazanah-green mb-2 block">Kegiatan</label>
                                        <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full p-3 rounded-xl border-none ring-1 ring-gray-200 outline-none focus:ring-2 focus:ring-khazanah-green">
                                            <option>Jofisah</option><option>Sholehah</option><option>Jumanji</option><option>Lainnya</option>
                                        </select>
                                    </div>
                                    <div className="md:col-span-1">
                                        <label className="text-xs font-black uppercase text-khazanah-green mb-2 block">Pelaksanaan</label>
                                        <input type="date" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="w-full p-3 rounded-xl ring-1 ring-gray-200 outline-none focus:ring-2 focus:ring-khazanah-green" required />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="text-xs font-black uppercase text-khazanah-green mb-2 block">Judul Event</label>
                                        <input type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full p-3 rounded-xl ring-1 ring-gray-200 outline-none focus:ring-2 focus:ring-khazanah-green" placeholder="Masukkan judul..." required />
                                    </div>
                                </div>

                                {/* Section 2: Penugasan Tim */}
                                <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                                    
                                    {/* 🔴 INTEGRASI DATABASE PEMATERI (DROPDOWN) */}
                                    <div className="relative">
                                        <label className="text-[10px] font-bold text-gray-400 absolute -top-2 left-3 bg-white px-1">Pemateri</label>
                                        <select 
                                            value={formData.pemateri} 
                                            onChange={e => setFormData({...formData, pemateri: e.target.value})} 
                                            className="w-full p-3 pt-4 rounded-xl ring-1 ring-gray-200 outline-none focus:ring-2 focus:ring-khazanah-green appearance-none bg-white font-semibold text-khazanah-dark"
                                        >
                                            <option value="">-- Pilih Pemateri dari Database --</option>
                                            {speakersList.map((speaker, idx) => (
                                                <option key={idx} value={speaker.name}>{speaker.name}</option>
                                            ))}
                                            {/* Opsi manual jika pemateri belum diinput ke database */}
                                            {formData.pemateri && !speakersList.find(s => s.name === formData.pemateri) && (
                                                <option value={formData.pemateri}>{formData.pemateri} (Manual)</option>
                                            )}
                                        </select>
                                    </div>

                                    {/* Input penugasan lainnya tetap manual text */}
                                    <div className="relative">
                                        <label className="text-[10px] font-bold text-gray-400 absolute -top-2 left-3 bg-white px-1">Host</label>
                                        <input type="text" value={formData.host} onChange={e => setFormData({...formData, host: e.target.value})} className="w-full p-3 pt-4 rounded-xl ring-1 ring-gray-200 outline-none focus:ring-2 focus:ring-khazanah-green" />
                                    </div>
                                    <div className="relative">
                                        <label className="text-[10px] font-bold text-gray-400 absolute -top-2 left-3 bg-white px-1">Tilawah</label>
                                        <input type="text" value={formData.tilawah} onChange={e => setFormData({...formData, tilawah: e.target.value})} className="w-full p-3 pt-4 rounded-xl ring-1 ring-gray-200 outline-none focus:ring-2 focus:ring-khazanah-green" />
                                    </div>
                                    <div className="relative">
                                        <label className="text-[10px] font-bold text-gray-400 absolute -top-2 left-3 bg-white px-1">Poster Designer</label>
                                        <input type="text" value={formData.poster} onChange={e => setFormData({...formData, poster: e.target.value})} className="w-full p-3 pt-4 rounded-xl ring-1 ring-gray-200 outline-none focus:ring-2 focus:ring-khazanah-green" />
                                    </div>
                                    <div className="relative">
                                        <label className="text-[10px] font-bold text-gray-400 absolute -top-2 left-3 bg-white px-1">Caption Writer</label>
                                        <input type="text" value={formData.caption} onChange={e => setFormData({...formData, caption: e.target.value})} className="w-full p-3 pt-4 rounded-xl ring-1 ring-gray-200 outline-none focus:ring-2 focus:ring-khazanah-green" />
                                    </div>
                                    <div className="relative">
                                        <label className="text-[10px] font-bold text-gray-400 absolute -top-2 left-3 bg-white px-1">Moderator Diskusi</label>
                                        <input type="text" value={formData.diskusi} onChange={e => setFormData({...formData, diskusi: e.target.value})} className="w-full p-3 pt-4 rounded-xl ring-1 ring-gray-200 outline-none focus:ring-2 focus:ring-khazanah-green" />
                                    </div>
                                </div>

                                {/* Section 3: Output */}
                                <div className="bg-gray-50 p-6 rounded-3xl flex flex-col gap-4">
                                    <div className="relative">
                                        <label className="text-[10px] font-bold text-gray-400 absolute -top-2 left-3 bg-gray-50 px-1">Peserta Hadir</label>
                                        <input type="number" value={formData.peserta} onChange={e => setFormData({...formData, peserta: e.target.value})} className="w-full p-3 rounded-xl ring-1 ring-gray-200 outline-none focus:ring-2 focus:ring-khazanah-green bg-white" />
                                    </div>
                                    <label className="flex items-center gap-3 cursor-pointer mt-2">
                                        <input type="checkbox" checked={formData.tor} onChange={e => setFormData({...formData, tor: e.target.checked})} className="w-5 h-5 accent-khazanah-green rounded" />
                                        <span className="text-sm font-bold text-gray-700">ToR Diserahkan?</span>
                                    </label>
                                    <label className="flex items-center gap-3 cursor-pointer">
                                        <input type="checkbox" checked={formData.fotoCv} onChange={e => setFormData({...formData, fotoCv: e.target.checked})} className="w-5 h-5 accent-khazanah-green rounded" />
                                        <span className="text-sm font-bold text-gray-700">Dokumentasi Tersimpan?</span>
                                    </label>
                                </div>

                                <div className="md:col-span-3 flex justify-end gap-3 mt-4">
                                    <button type="button" onClick={() => setIsModalOpen(false)} className="px-8 py-3 font-bold text-gray-500 hover:bg-gray-100 rounded-xl transition">Batal</button>
                                    <button type="submit" disabled={isSaving} className="bg-khazanah-green text-white px-12 py-3 rounded-2xl font-bold shadow-lg hover:shadow-xl hover:bg-khazanah-dark transition flex items-center gap-2">
                                        {isSaving ? <Loader2 className="animate-spin" /> : <Save size={20} />} Simpan Data Event
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TasksAdmin;