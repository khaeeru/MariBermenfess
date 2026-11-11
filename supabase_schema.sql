-- ========================================================
-- SCHEMA DATABASE SUPABASE UNTUK MARIBERMENFESS
-- ========================================================
-- Panduan:
-- 1. Buka project Anda di dashboard Supabase (https://supabase.com/dashboard)
-- 2. Pilih menu "SQL Editor" di bilah samping kiri
-- 3. Klik "New Query", salin dan tempel semua kode SQL di bawah ini
-- 4. Klik tombol "Run" (atau Ctrl+Enter)
-- ========================================================

-- 1. Buat tabel 'menfess' untuk menampung pesan, penerima, pengirim, dan lagu
CREATE TABLE IF NOT EXISTS public.menfess (
    id BIGINT PRIMARY KEY,
    "to" TEXT NOT NULL,
    "from" TEXT DEFAULT 'Anonim',
    song TEXT DEFAULT '',
    preview_url TEXT DEFAULT '',
    artwork_url TEXT DEFAULT '',
    message TEXT NOT NULL,
    likes INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Aktifkan Row Level Security (RLS)
ALTER TABLE public.menfess ENABLE ROW LEVEL SECURITY;

-- 3. Hapus policy lama jika sebelumnya sudah ada (menghindari duplikasi)
DROP POLICY IF EXISTS "Public Read Access" ON public.menfess;
DROP POLICY IF EXISTS "Public Insert Access" ON public.menfess;
DROP POLICY IF EXISTS "Public Update Likes" ON public.menfess;

-- 4. Kebijakan (Policy) agar siapa saja bisa membaca (SELECT) data menfess
CREATE POLICY "Public Read Access"
ON public.menfess
FOR SELECT
USING (true);

-- 5. Kebijakan (Policy) agar siapa saja bisa mengirim (INSERT) menfess baru
CREATE POLICY "Public Insert Access"
ON public.menfess
FOR INSERT
WITH CHECK (true);

-- 6. Kebijakan (Policy) agar pengunjung bisa menyukai / like pesan (UPDATE)
CREATE POLICY "Public Update Likes"
ON public.menfess
FOR UPDATE
USING (true)
WITH CHECK (true);

-- 7. Masukkan starter data contoh dengan preview lagu 30 detik asli
INSERT INTO public.menfess (id, "to", "from", song, preview_url, artwork_url, message, likes, created_at)
VALUES 
(
    1731309800001,
    'Kakak tingkat di perpus lantai 3',
    'Pengagum Rahasia',
    'Nadin Amizah - Semua Aku Dirayakan',
    'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/98/be/b2/98beb2bf-878a-0e2c-6167-fec0d2f4fc87/mzaf_13873619236384310046.plus.aac.p.m4a',
    'https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/c1/b0/f7/c1b0f7fa-f141-7c53-9531-0b248b06e96c/cover.jpg/100x100bb.jpg',
    'Setiap kali kamu fokus baca sambil benerin kacamata, rasanya duniaku berhenti sebentar. Semoga skripsimu lancar ya!',
    18,
    NOW() - INTERVAL '35 minutes'
),
(
    1731309800002,
    'Seseorang berjaket denim di halte bus',
    'Gadis Payung Kuning',
    'Coldplay - Sparks',
    'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/47/db/ce/47dbce82-d89c-0897-0da7-26d06ae7e2f2/mzaf_14852507599380441353.plus.aac.p.m4a',
    'https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/f5/93/8c/f5938c49-964c-31d1-4b33-78b634f71fb7/190295978075.jpg/100x100bb.jpg',
    'Terima kasih sudah meminjamkan tempat berteduh kemarin sore. Senyummu bikin hujan terasa jauh lebih hangat.',
    24,
    NOW() - INTERVAL '2 hours'
),
(
    1731309800003,
    'Sahabat terbaikku',
    'Teman Sebangkumu',
    'Sal Priadi - Gala Bunga Matahari',
    'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/f2/7c/a1/f27ca1f0-12a3-a7c4-4158-97491a2f1efd/mzaf_7079244332144273794.plus.aac.p.m4a',
    'https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/fa/a8/4c/faa84c4f-0f09-3730-6460-8c53e9dc159d/cover.jpg/100x100bb.jpg',
    'Jangan pernah merasa sendirian ya. Kalau hari-harimu lagi berat dan dunia lagi berisik, aku selalu ada di sini untuk dengerin ceritamu.',
    31,
    NOW() - INTERVAL '6 hours'
),
(
    1731309800004,
    'Dia yang pernah singgah',
    'Masa Lalu',
    'Bernadya - Satu Bulan',
    'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/12/9a/78/129a78bb-9c6f-75dc-fc5d-877a19e8c0bf/mzaf_8421330473577576783.plus.aac.p.m4a',
    'https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/d8/bb/8c/d8bb8c81-ddb9-e427-a18b-c385afae12c2/23UMGIM65225.rgb.jpg/100x100bb.jpg',
    'Aku sudah berdamai dengan semua yang telah berlalu. Terima kasih untuk tawa dan kenangan yang sempat kita bagi bersama.',
    15,
    NOW() - INTERVAL '24 hours'
),
(
    1731309800005,
    'Diriku Sendiri',
    'Aku yang sekarang',
    'Hindia - Evaluasi',
    'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/3f/76/8b/3f768b2d-8843-f368-9235-78b3e3fe9871/mzaf_10478617535469036592.plus.aac.p.m4a',
    'https://is1-ssl.mzstatic.com/image/thumb/Music123/v4/83/f6/8f/83f68f0a-8a30-9653-a3e2-dc37d9714946/cover.jpg/100x100bb.jpg',
    'Kamu sudah melangkah sejauh ini dan kamu hebat. Istirahat sejenak bila lelah, esok masih ada kesempatan baru.',
    42,
    NOW() - INTERVAL '48 hours'
)
ON CONFLICT (id) DO NOTHING;
