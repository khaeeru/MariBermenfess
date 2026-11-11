# MariBermenfess — Send The Untold Words & Songs 💌🎵

Website Menfess (Mention Confession) interaktif dengan fitur dedikasi lagu dan pemutar cuplikan audio 30 detik di dalam website, terinspirasi dari **sendthesong.xyz**, terintegrasi dengan database **Supabase**.

---

## ✨ Fitur Utama
- **Database Supabase Cloud:** Semua pesan dan lagu yang dibuat user otomatis tersimpan secara permanen di database Supabase.
- **Tulis & Kirim Pesan Menfess:** Kirim pesan anonim untuk seseorang dengan pilihan lagu favorit.
- **Pencarian Lagu Cepat & Real-Time:** Pilihan chip lagu populer instan dan pencarian real-time via iTunes API.
- **Pemutar Cuplikan Audio 30 Detik:** Putar cuplikan audio 30 detik langsung di popup modal dengan animasi piringan hitam (*vinyl turntable*).
- **Tautan Langsung Pesan (*Direct Link*):** Buka dan bagikan pesan langsung menggunakan URL hash (`#msg-ID`).
- **Jelajahi & Cari Pesan:** Cari pesan berdasarkan nama penerima, pengirim, judul lagu, atau isi pesan.
- **Riwayat Pengiriman (*History*):** Pantau kembali pesan-pesan yang pernah kamu kirimkan dari browser tersebut.
- **Tiga Pilihan Tema:** Light, Pink, dan Dark mode yang estetik.

---

## 🗄️ Setup Database Supabase

1. Buat akun / project baru secara gratis di [supabase.com](https://supabase.com).
2. Di dashboard project Supabase, buka menu **SQL Editor** di bilah samping kiri.
3. Buka file [`supabase_schema.sql`](./supabase_schema.sql), salin seluruh kodenya, lalu tempel ke **SQL Editor** Supabase.
4. Klik tombol **Run** (Ctrl+Enter) untuk membuat tabel `menfess` dan mengaktifkan izin (RLS).
5. Buka **Project Settings** -> **API**, lalu salin:
   - **Project URL** (contoh: `https://xxxx.supabase.co`)
   - **anon public Key** (contoh: `eyJhbGciOi...`)

---

## 🚀 Menjalankan Secara Lokal

1. **Buat file `.env`:**
   Salin `.env.example` menjadi `.env` lalu masukkan kredensial Supabase Anda:
   ```env
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_ANON_KEY=your-anon-key-here
   PORT=3000
   ```

2. **Jalankan server:**
   ```bash
   npm start
   ```

3. **Buka di browser:**
   Akses [http://localhost:3000](http://localhost:3000)

> **Catatan:** Jika belum memasukkan key Supabase, server akan otomatis menggunakan *In-Memory Fallback* sehingga aplikasi tetap dapat berjalan normal untuk testing.

---

## 🌐 Panduan Deploy ke Vercel

Proyek ini telah dikonfigurasi dengan file `vercel.json` dan siap di-deploy langsung ke **Vercel**:

### Opsi 1: Deploy via GitHub (Paling Direkomendasikan)
1. Push repository ini ke akun GitHub kamu:
   ```bash
   git add .
   git commit -m "feat: integrate Supabase database for menfess & songs"
   git branch -M main
   git remote add origin https://github.com/USERNAME/REPO_NAME.git
   git push -u origin main
   ```
2. Buka dashboard [Vercel](https://vercel.com) dan klik **Add New Project**.
3. Pilih repository GitHub kamu dan klik **Import**.
4. Di bagian **Environment Variables**, tambahkan:
   - `SUPABASE_URL` = (URL Supabase kamu)
   - `SUPABASE_ANON_KEY` = (Anon key Supabase kamu)
5. Klik **Deploy**! Website kamu langsung online dengan HTTPS gratis dan terhubung ke Supabase.

### Opsi 2: Deploy via Vercel CLI
```bash
npx vercel
```
Setelah deploy, atur environment variables di dashboard Vercel project Anda.
