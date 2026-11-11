require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Inisialisasi Supabase Client jika kredensial tersedia di Environment Variables
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || '';

let supabase = null;
if (supabaseUrl && supabaseKey) {
    try {
        supabase = createClient(supabaseUrl, supabaseKey);
        console.log("Database Supabase aktif & terhubung!");
    } catch (err) {
        console.error("Gagal inisialisasi Supabase Client:", err.message);
    }
} else {
    console.warn("Info: SUPABASE_URL atau SUPABASE_ANON_KEY belum diisi. Menjalankan fallback database in-memory.");
}

// Sajikan file frontend statis dari folder Public
app.use(express.static(path.join(__dirname, '../Public')));

// Helper konversi format data dari database Supabase (mendukung snake_case & camelCase)
function formatMenfessRow(row) {
    if (!row) return null;
    return {
        id: Number(row.id),
        to: row.to || '',
        from: row.from || 'Anonim',
        song: row.song || '',
        previewUrl: row.preview_url || row.previewUrl || '',
        artworkUrl: row.artwork_url || row.artworkUrl || '',
        message: row.message || '',
        createdAt: row.created_at || row.createdAt || new Date().toISOString(),
        likes: typeof row.likes === 'number' ? row.likes : 0
    };
}

// Database In-Memory Fallback dengan cuplikan lagu 30 detik asli
let menfessData = [
    {
        id: 1731309800001,
        to: "Kakak tingkat di perpus lantai 3",
        from: "Pengagum Rahasia",
        song: "Nadin Amizah - Semua Aku Dirayakan",
        previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/98/be/b2/98beb2bf-878a-0e2c-6167-fec0d2f4fc87/mzaf_13873619236384310046.plus.aac.p.m4a",
        artworkUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/c1/b0/f7/c1b0f7fa-f141-7c53-9531-0b248b06e96c/cover.jpg/100x100bb.jpg",
        message: "Setiap kali kamu fokus baca sambil benerin kacamata, rasanya duniaku berhenti sebentar. Semoga skripsimu lancar ya!",
        createdAt: new Date(Date.now() - 1000 * 60 * 35).toISOString(),
        likes: 18
    },
    {
        id: 1731309800002,
        to: "Seseorang berjaket denim di halte bus",
        from: "Gadis Payung Kuning",
        song: "Coldplay - Sparks",
        previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/47/db/ce/47dbce82-d89c-0897-0da7-26d06ae7e2f2/mzaf_14852507599380441353.plus.aac.p.m4a",
        artworkUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/f5/93/8c/f5938c49-964c-31d1-4b33-78b634f71fb7/190295978075.jpg/100x100bb.jpg",
        message: "Terima kasih sudah meminjamkan tempat berteduh kemarin sore. Senyummu bikin hujan terasa jauh lebih hangat.",
        createdAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
        likes: 24
    },
    {
        id: 1731309800003,
        to: "Sahabat terbaikku",
        from: "Teman Sebangkumu",
        song: "Sal Priadi - Gala Bunga Matahari",
        previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/f2/7c/a1/f27ca1f0-12a3-a7c4-4158-97491a2f1efd/mzaf_7079244332144273794.plus.aac.p.m4a",
        artworkUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/fa/a8/4c/faa84c4f-0f09-3730-6460-8c53e9dc159d/cover.jpg/100x100bb.jpg",
        message: "Jangan pernah merasa sendirian ya. Kalau hari-harimu lagi berat dan dunia lagi berisik, aku selalu ada di sini untuk dengerin ceritamu.",
        createdAt: new Date(Date.now() - 1000 * 60 * 360).toISOString(),
        likes: 31
    },
    {
        id: 1731309800004,
        to: "Dia yang pernah singgah",
        from: "Masa Lalu",
        song: "Bernadya - Satu Bulan",
        previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/12/9a/78/129a78bb-9c6f-75dc-fc5d-877a19e8c0bf/mzaf_8421330473577576783.plus.aac.p.m4a",
        artworkUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/d8/bb/8c/d8bb8c81-ddb9-e427-a18b-c385afae12c2/23UMGIM65225.rgb.jpg/100x100bb.jpg",
        message: "Aku sudah berdamai dengan semua yang telah berlalu. Terima kasih untuk tawa dan kenangan yang sempat kita bagi bersama.",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
        likes: 15
    },
    {
        id: 1731309800005,
        to: "Diriku Sendiri",
        from: "Aku yang sekarang",
        song: "Hindia - Evaluasi",
        previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/3f/76/8b/3f768b2d-8843-f368-9235-78b3e3fe9871/mzaf_10478617535469036592.plus.aac.p.m4a",
        artworkUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music123/v4/83/f6/8f/83f68f0a-8a30-9653-a3e2-dc37d9714946/cover.jpg/100x100bb.jpg",
        message: "Kamu sudah melangkah sejauh ini dan kamu hebat. Istirahat sejenak bila lelah, esok masih ada kesempatan baru.",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
        likes: 42
    }
];

// 1. GET: Mengambil semua data menfess
app.get('/api/menfess', async (req, res) => {
    try {
        if (supabase) {
            const { data, error } = await supabase
                .from('menfess')
                .select('*')
                .order('created_at', { ascending: false });

            if (!error && Array.isArray(data) && data.length > 0) {
                return res.status(200).json(data.map(formatMenfessRow));
            }
            if (error) {
                console.warn("Supabase query warning:", error.message);
            }
        }
        res.status(200).json(menfessData);
    } catch (err) {
        console.error("Error saat GET /api/menfess:", err);
        res.status(200).json(menfessData);
    }
});

// 2. GET: Mengambil satu pesan spesifik berdasarkan ID
app.get('/api/menfess/:id', async (req, res) => {
    try {
        const id = Number(req.params.id);
        if (supabase) {
            const { data, error } = await supabase
                .from('menfess')
                .select('*')
                .eq('id', id)
                .maybeSingle();

            if (!error && data) {
                return res.status(200).json(formatMenfessRow(data));
            }
        }

        const item = menfessData.find(m => m.id === id);
        if (!item) {
            return res.status(404).json({ error: "Pesan menfess tidak ditemukan" });
        }
        res.status(200).json(item);
    } catch (err) {
        console.error("Error saat GET /api/menfess/:id:", err);
        res.status(500).json({ error: "Terjadi kesalahan pada server" });
    }
});

// 3. GET: Proxy pencarian lagu iTunes (30-second audio preview)
app.get('/api/songs/search', async (req, res) => {
    try {
        const term = req.query.term || '';
        if (!term.trim()) return res.json([]);
        const apiRes = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(term)}&country=ID&entity=song&limit=8`);
        const data = await apiRes.json();
        const results = (data.results || []).map(r => ({
            title: r.trackName,
            artist: r.artistName,
            previewUrl: r.previewUrl,
            artworkUrl: r.artworkUrl100 || r.artworkUrl60
        })).filter(r => r.title && r.previewUrl);
        res.status(200).json(results);
    } catch (err) {
        console.error("Gagal proxy iTunes search:", err);
        res.status(200).json([]);
    }
});

// 4. POST: Menerima data menfess baru dari Frontend & Simpan ke Supabase
app.post('/api/menfess', async (req, res) => {
    try {
        const { to, from, song, previewUrl, artworkUrl, message } = req.body;

        if (!to || !to.trim() || !message || !message.trim()) {
            return res.status(400).json({ error: "Kolom 'To' dan 'Message' wajib diisi!" });
        }

        const newId = Date.now();
        const nowIso = new Date().toISOString();

        const itemFormatted = {
            id: newId,
            to: to.trim().slice(0, 60),
            from: from && from.trim() !== "" ? from.trim().slice(0, 60) : 'Anonim',
            song: song && song.trim() !== "" ? song.trim().slice(0, 80) : '',
            previewUrl: previewUrl && typeof previewUrl === 'string' ? previewUrl.slice(0, 500) : '',
            artworkUrl: artworkUrl && typeof artworkUrl === 'string' ? artworkUrl.slice(0, 500) : '',
            message: message.trim().slice(0, 1000),
            createdAt: nowIso,
            likes: 0
        };

        if (supabase) {
            const insertPayload = {
                id: itemFormatted.id,
                to: itemFormatted.to,
                from: itemFormatted.from,
                song: itemFormatted.song,
                preview_url: itemFormatted.previewUrl,
                artwork_url: itemFormatted.artworkUrl,
                message: itemFormatted.message,
                likes: 0,
                created_at: itemFormatted.createdAt
            };

            const { data, error } = await supabase
                .from('menfess')
                .insert([insertPayload])
                .select()
                .maybeSingle();

            if (!error && data) {
                console.log("Berhasil menyimpan menfess baru ke Supabase:", data);
                menfessData.unshift(formatMenfessRow(data));
                return res.status(201).json(formatMenfessRow(data));
            } else if (error) {
                console.warn("Gagal simpan ke Supabase (skema default), mencoba format camelCase:", error.message);
                const altPayload = {
                    id: itemFormatted.id,
                    to: itemFormatted.to,
                    from: itemFormatted.from,
                    song: itemFormatted.song,
                    previewUrl: itemFormatted.previewUrl,
                    artworkUrl: itemFormatted.artworkUrl,
                    message: itemFormatted.message,
                    likes: 0,
                    createdAt: itemFormatted.createdAt
                };
                const retry = await supabase.from('menfess').insert([altPayload]).select().maybeSingle();
                if (!retry.error && retry.data) {
                    menfessData.unshift(formatMenfessRow(retry.data));
                    return res.status(201).json(formatMenfessRow(retry.data));
                }
            }
        }

        // Fallback simpan ke memory
        menfessData.unshift(itemFormatted);
        console.log("Berhasil menyimpan menfess baru ke Memory:", itemFormatted);
        res.status(201).json(itemFormatted);
    } catch (err) {
        console.error("Error saat POST menfess:", err);
        res.status(500).json({ error: "Terjadi kesalahan pada server" });
    }
});

// 5. POST: Memberikan Like / Reaksi pada menfess & Update di Supabase
app.post('/api/menfess/:id/like', async (req, res) => {
    try {
        const id = Number(req.params.id);

        if (supabase) {
            const { data: current, error: fetchErr } = await supabase
                .from('menfess')
                .select('likes')
                .eq('id', id)
                .maybeSingle();

            if (!fetchErr && current) {
                const newLikes = (current.likes || 0) + 1;
                const { error: updateErr } = await supabase
                    .from('menfess')
                    .update({ likes: newLikes })
                    .eq('id', id);

                if (!updateErr) {
                    const localItem = menfessData.find(m => m.id === id);
                    if (localItem) localItem.likes = newLikes;
                    return res.status(200).json({ success: true, id, likes: newLikes });
                }
            }
        }

        const item = menfessData.find(m => m.id === id);
        if (!item) {
            return res.status(404).json({ error: "Pesan menfess tidak ditemukan" });
        }

        item.likes = (item.likes || 0) + 1;
        res.status(200).json({ success: true, id: item.id, likes: item.likes });
    } catch (err) {
        console.error("Error saat Like menfess:", err);
        res.status(500).json({ error: "Terjadi kesalahan pada server" });
    }
});

// Export untuk Vercel Serverless Function
module.exports = app;

// Untuk testing lokal di komputer (port 3000)
if (require.main === module) {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Server Express.js aktif di http://localhost:${PORT}`));
}
