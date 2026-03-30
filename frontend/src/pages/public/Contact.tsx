import React, { useState } from 'react';
import { 
    MessageCircle, 
    Mail, 
    MapPin, 
    Send, 
    HelpCircle, 
    Plus, 
    Minus, 
    Users,
    Map as MapIcon
} from 'lucide-react';

const Contact: React.FC = () => {
    const [activeFaq, setActiveFaq] = useState<number | null>(0);

    const toggleFaq = (index: number) => {
        setActiveFaq(activeFaq === index ? null : index);
    };

    const faqs = [
        {
            question: "Bagaimana cara bergabung dengan komunitas Khazanah?",
            answer: "Sangat mudah! Anda cukup mengisi form pendaftaran di website kami atau menghubungi admin melalui WhatsApp. Setelah itu, Anda akan diarahkan ke grup komunitas sesuai dengan domisili atau program yang diminati."
        },
        {
            question: "Apakah mengikuti kajian dan program ini berbayar?",
            answer: "Sebagian besar program rutin kami (seperti kajian online dan diskusi grup) 100% gratis. Namun, untuk beberapa kelas intensif atau event offline tertentu, mungkin ada biaya registrasi yang akan diinformasikan sebelumnya."
        },
        {
            question: "Bagaimana cara mengajukan kolaborasi atau media partner?",
            answer: "Kami sangat terbuka untuk kolaborasi! Silakan pilih opsi 'Kolaborasi' pada form kontak di atas, atau kirimkan proposal Anda langsung ke email kami di info@khazanah.id."
        }
    ];

    return (
        <div className="font-sans text-gray-800 bg-white selection:bg-khazanah-light selection:text-khazanah-dark">

            {/* 1. HERO SECTION */}
            <section className="bg-gradient-to-br from-khazanah-light via-white to-gray-50 pt-32 pb-16 text-center px-4">
                <div className="max-w-3xl mx-auto">
                    <div className="inline-flex items-center gap-2 bg-white border border-khazanah-green/20 text-khazanah-dark font-semibold px-4 py-1.5 rounded-full text-sm mb-6 shadow-sm">
                        <Users size={16} className="text-khazanah-green" /> 
                        <span>Mari Berkolaborasi</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
                        Mari Terhubung Bersama Kami
                    </h1>
                    <p className="text-lg text-gray-600 max-w-xl mx-auto leading-relaxed">
                        Punya pertanyaan, ide kolaborasi, atau ingin bergabung? Tim Khazanah siap mendengar dan membantu perjalanan Anda.
                    </p>
                </div>
            </section>

            {/* 2. INFORMASI KONTAK */}
            <section className="py-12 bg-white relative z-10 -mt-8">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-3 gap-6 text-center">
                        {/* WhatsApp Card */}
                        <div className="group bg-white p-8 rounded-3xl shadow-xl shadow-gray-100 border border-gray-50 hover:-translate-y-2 transition duration-300">
                            <div className="w-16 h-16 bg-khazanah-light text-khazanah-green rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                                <MessageCircle size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">WhatsApp</h3>
                            <p className="text-gray-500 text-sm mb-4">Fast response untuk chat ringan</p>
                            <p className="text-lg font-bold text-khazanah-gold">0896-6393-3263</p>
                        </div>
                        {/* Email Card */}
                        <div className="group bg-white p-8 rounded-3xl shadow-xl shadow-gray-100 border border-gray-50 hover:-translate-y-2 transition duration-300">
                            <div className="w-16 h-16 bg-khazanah-light text-khazanah-green rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                                <Mail size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Email</h3>
                            <p className="text-gray-500 text-sm mb-4">Untuk proposal & urusan formal</p>
                            <p className="text-lg font-bold text-khazanah-gold">info@khazanah.id</p>
                        </div>
                        {/* Location Card */}
                        <div className="group bg-white p-8 rounded-3xl shadow-xl shadow-gray-100 border border-gray-50 hover:-translate-y-2 transition duration-300">
                            <div className="w-16 h-16 bg-khazanah-light text-khazanah-green rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                                <MapPin size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Lokasi</h3>
                            <p className="text-gray-500 text-sm mb-4">Markas komunitas kami</p>
                            <p className="text-lg font-bold text-khazanah-gold">Cianjur, Indonesia</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. FORM CONTACT (CORE) */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900">Kirim Pesan Langsung</h2>
                        <p className="text-gray-600 mt-3">Isi form di bawah ini dan kami akan membalas secepatnya.</p>
                    </div>

                    <form className="bg-white shadow-2xl shadow-gray-200/50 p-8 md:p-12 rounded-[2.5rem] border border-gray-100">
                        <div className="grid md:grid-cols-2 gap-8 mb-8">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-3">Nama Lengkap</label>
                                <input type="text" placeholder="Masukkan nama Anda" className="w-full border border-gray-200 bg-gray-50 p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-khazanah-gold focus:bg-white transition" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-3">Alamat Email</label>
                                <input type="email" placeholder="contoh@email.com" className="w-full border border-gray-200 bg-gray-50 p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-khazanah-gold focus:bg-white transition" />
                            </div>
                        </div>

                        <div className="mb-8">
                            <label className="block text-sm font-bold text-gray-700 mb-3">Nomor WhatsApp</label>
                            <input type="tel" placeholder="08xx-xxxx-xxxx" className="w-full border border-gray-200 bg-gray-50 p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-khazanah-gold focus:bg-white transition" />
                        </div>

                        <div className="mb-8">
                            <label className="block text-sm font-bold text-gray-700 mb-3">Keperluan</label>
                            <div className="relative">
                                <select className="w-full border border-gray-200 bg-gray-50 p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-khazanah-gold focus:bg-white transition text-gray-700 appearance-none">
                                    <option value="" disabled selected>Pilih Keperluan Anda</option>
                                    <option value="pertanyaan">Tanya Program / Komunitas</option>
                                    <option value="kolaborasi">Pengajuan Kolaborasi / Partnership</option>
                                    <option value="donasi">Konfirmasi Donasi / Wakaf</option>
                                    <option value="lainnya">Lainnya</option>
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                    <Plus size={18} className="rotate-45" />
                                </div>
                            </div>
                        </div>

                        <div className="mb-10">
                            <label className="block text-sm font-bold text-gray-700 mb-3">Pesan Anda</label>
                            <textarea rows={5} placeholder="Tuliskan detail pesan atau pertanyaan Anda di sini..." className="w-full border border-gray-200 bg-gray-50 p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-khazanah-gold focus:bg-white transition resize-none"></textarea>
                        </div>

                        <button type="button" className="w-full bg-khazanah-green text-white font-bold text-lg px-6 py-5 rounded-2xl hover:bg-khazanah-dark transition shadow-xl shadow-khazanah-green/30 flex items-center justify-center gap-3">
                            <Send size={20} />
                            <span>Kirim Pesan Sekarang</span>
                        </button>
                    </form>
                </div>
            </section>

            {/* 4. MAPS / LOKASI */}
            <section className="py-20 bg-white">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-gray-100 w-full h-[450px] rounded-[2.5rem] overflow-hidden relative shadow-inner border border-gray-100">
                        {/* Placeholder Google Maps */}
                        <div className="absolute inset-0 flex items-center justify-center flex-col text-gray-400">
                            <div className="bg-white p-6 rounded-full shadow-lg mb-4">
                                <MapIcon size={48} className="text-khazanah-gold" />
                            </div>
                            <span className="font-bold text-gray-600">Google Maps Embed (Cianjur, Indonesia)</span>
                            <p className="text-sm">Lokasi Markas Khazanah Alwahda</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. FAQ SINGKAT */}
            <section className="py-24 bg-khazanah-light">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <div className="inline-flex p-3 bg-white rounded-2xl text-khazanah-gold shadow-sm mb-4">
                            <HelpCircle size={32} />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900">Pertanyaan Sering Diajukan</h2>
                        <p className="text-gray-600 mt-2 text-lg">Temukan jawaban cepat untuk pertanyaan umum di sini</p>
                    </div>

                    <div className="space-y-5">
                        {faqs.map((faq, index) => (
                            <div key={index} className="bg-white border border-gray-100 rounded-[1.25rem] overflow-hidden shadow-sm hover:shadow-md transition duration-300">
                                <button
                                    onClick={() => toggleFaq(index)}
                                    className="w-full text-left p-6 md:p-8 flex justify-between items-center focus:outline-none"
                                >
                                    <h3 className="font-bold text-gray-900 pr-8 md:text-lg">{faq.question}</h3>
                                    <span className={`text-khazanah-gold transition-transform duration-300 ${activeFaq === index ? 'rotate-180' : ''}`}>
                                        {activeFaq === index ? <Minus size={24} strokeWidth={3} /> : <Plus size={24} strokeWidth={3} />}
                                    </span>
                                </button>
                                <div className={`px-6 md:px-8 overflow-hidden transition-all duration-300 ease-in-out ${activeFaq === index ? 'max-h-60 pb-8 opacity-100' : 'max-h-0 opacity-0'}`}>
                                    <div className="pt-2 border-t border-gray-50">
                                        <p className="text-gray-600 leading-relaxed mt-4">
                                            {faq.answer}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 6. CTA PENUTUP */}
            <section className="py-24 bg-khazanah-green text-white text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl"></div>

                <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">
                        Jangan Ragu untuk Menghubungi Kami
                    </h2>
                    <p className="text-khazanah-light/80 text-lg mb-10 leading-relaxed">
                        Kami siap membantu perjalanan, menjawab pertanyaan, dan menyambut kolaborasi hebat bersama Anda.
                    </p>
                    <a 
                        href="https://wa.me/6289663933263" 
                        target="_blank" 
                        rel="noreferrer" 
                        className="inline-flex items-center gap-3 bg-white text-khazanah-green font-extrabold px-10 py-5 rounded-2xl text-xl hover:bg-gray-50 transition shadow-2xl shadow-black/20"
                    >
                        <MessageCircle size={24} /> 
                        <span>Chat via WhatsApp</span>
                    </a>
                </div>
            </section>

        </div>
    );
};

export default Contact;