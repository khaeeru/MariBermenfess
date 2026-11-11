# MariBermenfess — Send The Untold Words & Songs 💌🎵

Website Menfess (Mention Confession) interaktif dengan fitur dedikasi lagu dan pemutar cuplikan audio 30 detik di dalam website, terinspirasi dari **sendthesong.xyz**.

---

## ✨ Fitur Utama
- **Tulis & Kirim Pesan Menfess:** Kirim pesan anonim untuk seseorang dengan pilihan lagu favorit.
- **Pencarian Lagu Cepat & Real-Time:** Pilihan chip lagu populer instan dan pencarian real-time via iTunes API.
- **Pemutar Cuplikan Audio 30 Detik:** Putar cuplikan audio 30 detik langsung di popup modal dengan animasi piringan hitam (*vinyl turntable*).
- **Tautan Langsung Pesan (*Direct Link*):** Buka dan bagikan pesan langsung menggunakan URL hash (`#msg-ID`).
- **Jelajahi & Cari Pesan:** Cari pesan berdasarkan nama penerima, pengirim, judul lagu, atau isi pesan.
- **Riwayat Pengiriman (*History*):** Pantau kembali pesan-pesan yang pernah kamu kirimkan dari browser tersebut.
- **Tiga Pilihan Tema:** Light, Pink, dan Dark mode yang estetik.

---

## 🚀 Menjalankan Secara Lokal

1. **Install dependensi:**
   ```bash
   npm install
   ```

2. **Jalankan server:**
   ```bash
   npm start
   ```

3. **Buka di browser:**
   Akses [http://localhost:3000](http://localhost:3000)

---

## 🌐 Panduan Deploy ke Vercel

Proyek ini telah dikonfigurasi dengan file `vercel.json` dan siap di-deploy langsung ke **Vercel**:

### Opsi 1: Deploy via GitHub (Paling Mudah)
1. Push repository ini ke akun GitHub kamu:
   ```bash
   git add .
   git commit -m "feat: setup backend and deployment"
   git branch -M main
   git remote add origin https://github.com/USERNAME/REPO_NAME.git
   git push -u origin main
   ```
2. Buka dashboard [Vercel](https://vercel.com) dan klik **Add New Project**.
3. Pilih repository GitHub kamu dan klik **Import**.
4. *(Jika repositori berada di dalam folder `TASK 1`, atur **Root Directory** ke `TASK 1`)*.
5. Klik **Deploy**! Website kamu langsung online dengan HTTPS gratis.

### Opsi 2: Deploy via Vercel CLI
```bash
npm install -g vercel
vercel
```
Ikuti petunjuk di terminal untuk menghubungkan proyek ke akun Vercel kamu.
