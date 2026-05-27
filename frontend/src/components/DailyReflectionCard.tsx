import React, { useState } from 'react';
import { Copy, Share2, Check, Sparkles } from 'lucide-react';
import Swal from 'sweetalert2';

interface Reflection {
    ayah: string;
    translation: string;
    source: string;
}

const REFLECTIONS: Reflection[] = [
    {
        ayah: "إِنَّ مَعَ الْعُسْرِ يُسْرًا",
        translation: "Sesungguhnya beserta kesulitan itu ada kemudahan.",
        source: "QS. Al-Insyirah: 6"
    },
    {
        ayah: "وَتَوَكَّلْ عَلَى الْحَيِّ الَّذِي لَا يَمُوتُ",
        translation: "Dan bertawakallah kepada Allah Yang Hidup (Kekal) Yang tidak mati.",
        source: "QS. Al-Furqan: 58"
    },
    {
        ayah: "ادْعُونِي أَسْتَجِبْ لَكُمْ",
        translation: "Berdoalah kepada-Ku, niscaya akan Aku perkenankan bagimu.",
        source: "QS. Ghafir: 60"
    },
    {
        ayah: "لَا تُكَلِّفُ نَفْسٌ إِلَّا وُسْعَهَا",
        translation: "Seseorang tidak dibebani melainkan menurut kadar kesanggupannya.",
        source: "QS. Al-Baqarah: 233"
    },
    {
        ayah: "إِنَّ اللَّهَ لَا يُغَيِّرُ مَا بِقَوْمٍ حَتَّىٰ يُغَيِّرُوا مَا بِأَنْفُسِهِمْ",
        translation: "Sesungguhnya Allah tidak mengubah keadaan suatu kaum hingga mereka mengubah keadaan diri mereka sendiri.",
        source: "QS. Ar-Ra'd: 11"
    }
];

export const DailyReflectionCard: React.FC = () => {
    const [index, setIndex] = useState(() => Math.floor(Math.random() * REFLECTIONS.length));
    const [copied, setCopied] = useState(false);

    const current = REFLECTIONS[index];

    const handleNext = () => {
        setIndex((prev) => (prev + 1) % REFLECTIONS.length);
        setCopied(false);
    };

    const handleCopy = () => {
        const textToCopy = `"${current.ayah}"\n\nArtinya: ${current.translation}\n(${current.source})\n\nShared via Khazanah Alwahda Kreatif`;
        navigator.clipboard.writeText(textToCopy);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleShare = () => {
        const textToShare = `"${current.ayah}"\n\nArtinya: ${current.translation} (${current.source})`;
        if (navigator.share) {
            navigator.share({
                title: 'Daily Reflection - Khazanah',
                text: textToShare,
                url: window.location.href,
            }).catch(console.error);
        } else {
            Swal.fire({
                title: 'Bagikan Refleksi',
                html: `<p class="text-sm text-gray-600 mb-4">Salin teks di bawah ini untuk dibagikan:</p>
                       <textarea class="w-full p-3 border border-gray-200 rounded-xl text-xs bg-gray-50 focus:outline-none resize-none" rows="5" readonly>${textToShare}</textarea>`,
                confirmButtonText: 'Tutup',
                confirmButtonColor: '#0F5B30'
            });
        }
    };

    return (
        <div className="glass-card gold-glow p-8 max-w-2xl mx-auto border border-gold/15 relative overflow-hidden text-center bg-white/70">
            {/* Top icon and title */}
            <div className="flex justify-center items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center text-gold">
                    <Sparkles size={16} />
                </div>
                <span className="text-xs font-outfit font-bold text-gold uppercase tracking-widest">Daily Reflection</span>
            </div>

            {/* Arabic Text */}
            <div className="my-8">
                <p className="font-amiri text-3xl md:text-4xl text-emerald leading-loose tracking-wide">
                    {current.ayah}
                </p>
            </div>

            {/* Translation and Source */}
            <div className="max-w-lg mx-auto space-y-3 mb-8">
                <p className="font-outfit text-gray-700 font-medium text-base md:text-lg leading-relaxed">
                    "{current.translation}"
                </p>
                <p className="font-outfit text-xs font-bold text-gold uppercase tracking-wider">
                    — {current.source}
                </p>
            </div>

            {/* Controls */}
            <div className="flex justify-center items-center gap-4">
                <button
                    onClick={handleCopy}
                    className="p-3 rounded-xl bg-white/80 border border-gray-150 hover:bg-emerald-soft/50 hover:text-emerald text-gray-500 transition-all duration-300 flex items-center gap-2 text-xs font-semibold font-outfit"
                    title="Copy Verse"
                >
                    {copied ? (
                        <>
                            <Check size={14} className="text-emerald" />
                            <span>Tersalin!</span>
                        </>
                    ) : (
                        <>
                            <Copy size={14} />
                            <span>Salin</span>
                        </>
                    )}
                </button>

                <button
                    onClick={handleNext}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald to-gold hover:shadow-premium text-white font-outfit font-bold text-xs transition-all duration-300"
                >
                    Tadabbur Lainnya
                </button>

                <button
                    onClick={handleShare}
                    className="p-3 rounded-xl bg-white/80 border border-gray-150 hover:bg-emerald-soft/50 hover:text-emerald text-gray-500 transition-all duration-300"
                    title="Share Verse"
                >
                    <Share2 size={14} />
                </button>
            </div>
        </div>
    );
};
