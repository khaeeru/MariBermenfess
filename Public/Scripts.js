// Menentukan URL API yang adaptif (mendukung port 3000 maupun Live Server)
const API_URL = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') && window.location.port !== '3000' && window.location.port !== ''
    ? 'http://localhost:3000/api/menfess'
    : '/api/menfess';

// Versi cache untuk memastikan browser me-refresh URL audio yang valid
const CACHE_VERSION = 'v3_live_itunes_preview';
if (localStorage.getItem('menfess_cache_ver') !== CACHE_VERSION) {
    localStorage.removeItem('cached_menfess');
    localStorage.setItem('menfess_cache_ver', CACHE_VERSION);
}

// Daftar lagu populer kurasi awal dengan cuplikan resmi 30 detik ASLI (HTTP 200 OK)
const POPULAR_SONGS = [
    {
        title: "Semua Aku Dirayakan",
        artist: "Nadin Amizah",
        previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/98/be/b2/98beb2bf-878a-0e2c-6167-fec0d2f4fc87/mzaf_13873619236384310046.plus.aac.p.m4a",
        artworkUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/c1/b0/f7/c1b0f7fa-f141-7c53-9531-0b248b06e96c/cover.jpg/100x100bb.jpg"
    },
    {
        title: "Gala bunga matahari",
        artist: "Sal Priadi",
        previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/f2/7c/a1/f27ca1f0-12a3-a7c4-4158-97491a2f1efd/mzaf_7079244332144273794.plus.aac.p.m4a",
        artworkUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/fa/a8/4c/faa84c4f-0f09-3730-6460-8c53e9dc159d/cover.jpg/100x100bb.jpg"
    },
    {
        title: "Satu Bulan",
        artist: "Bernadya",
        previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/12/9a/78/129a78bb-9c6f-75dc-fc5d-877a19e8c0bf/mzaf_8421330473577576783.plus.aac.p.m4a",
        artworkUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/d8/bb/8c/d8bb8c81-ddb9-e427-a18b-c385afae12c2/23UMGIM65225.rgb.jpg/100x100bb.jpg"
    },
    {
        title: "Sparks",
        artist: "Coldplay",
        previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/47/db/ce/47dbce82-d89c-0897-0da7-26d06ae7e2f2/mzaf_14852507599380441353.plus.aac.p.m4a",
        artworkUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/f5/93/8c/f5938c49-964c-31d1-4b33-78b634f71fb7/190295978075.jpg/100x100bb.jpg"
    },
    {
        title: "Evaluasi",
        artist: "Hindia",
        previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/3f/76/8b/3f768b2d-8843-f368-9235-78b3e3fe9871/mzaf_10478617535469036592.plus.aac.p.m4a",
        artworkUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music123/v4/83/f6/8f/83f68f0a-8a30-9653-a3e2-dc37d9714946/cover.jpg/100x100bb.jpg"
    },
    {
        title: "Dan...",
        artist: "Sheila On 7",
        previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/98/08/f7/9808f7ad-8328-7780-5d22-aa52b878bd45/mzaf_13785359830703877395.plus.aac.p.m4a",
        artworkUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music/90/01/6d/mzi.ywjxtlbq.jpg/100x100bb.jpg"
    },
    {
        title: "Lantas",
        artist: "Juicy Luicy",
        previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/ad/5f/22/ad5f225d-eb9f-5707-ef3b-a38b42911483/mzaf_17135767829519964169.plus.aac.p.m4a",
        artworkUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/11/1d/3b/111d3be7-b957-98bf-69b8-49fedbfd74bc/192641542428_Cover.jpg/100x100bb.jpg"
    },
    {
        title: "Hati-Hati di Jalan",
        artist: "Tulus",
        previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/bb/50/cd/bb50cd11-dbbc-f84e-1244-f1b786af7ab4/mzaf_15441108959417505948.plus.aac.p.m4a",
        artworkUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/6f/18/10/6f1810e0-2d6a-a456-1362-de607c70408a/cover.jpg/100x100bb.jpg"
    },
    {
        title: "Lover",
        artist: "Taylor Swift",
        previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/e0/db/47/e0db47b0-7f70-0631-0414-cd4777d2fb3e/mzaf_6362891154838442638.plus.aac.p.m4a",
        artworkUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/49/3d/ab/493dab54-f920-9043-6181-80993b8116c9/19UMGIM53909.rgb.jpg/100x100bb.jpg"
    },
    {
        title: "Die With A Smile",
        artist: "Lady Gaga & Bruno Mars",
        previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/07/6a/99/076a99ed-b946-431b-6f1f-54fa187ca5bd/mzaf_8102882277995122875.plus.aac.p.m4a",
        artworkUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/11/ae/f2/11aef294-f57c-bab9-c9fc-529162984e62/24UMGIM85348.rgb.jpg/100x100bb.jpg"
    }
];

// Data bawaan awal dengan cuplikan audio
const DEFAULT_MENFESS = [
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
        song: "Sal Priadi - Gala bunga matahari",
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

let allData = [];
let currentSortMode = 'newest';
let currentActiveModalId = null;

// Audio elements
const modalAudioPlayer = document.getElementById('modalAudioPlayer');
const formAudioPlayer = document.getElementById('formAudioPlayer');

// Helper sanitasi teks untuk mencegah XSS
function escapeHtml(text) {
    if (!text) return '';
    return String(text)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// Format waktu relatif untuk preview card
function formatRelativeTime(dateString) {
    if (!dateString) return 'Baru saja';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Baru saja';

    const now = new Date();
    const diffSeconds = Math.floor((now - date) / 1000);

    if (diffSeconds < 60) return 'Baru saja';
    const diffMinutes = Math.floor(diffSeconds / 60);
    if (diffMinutes < 60) return `${diffMinutes} mnt lalu`;
    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `${diffHours} jam lalu`;
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays < 7) return `${diffDays} hari lalu`;

    return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
}

// Format tanggal lengkap untuk modal popup
function formatFullDate(dateString) {
    if (!dateString) return 'Baru saja';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Baru saja';
    return date.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    }) + ' WIB';
}

// Menampilkan Toast Notifikasi
function showToast(message, iconClass = 'fa-solid fa-heart') {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    const toastIcon = document.getElementById('toastIcon');

    if (!toast) return;
    toastMessage.textContent = message;
    if (toastIcon) toastIcon.className = iconClass;

    toast.classList.add('show');
    clearTimeout(toast.timer);
    toast.timer = setTimeout(() => {
        toast.classList.remove('show');
    }, 3200);
}

// 1. TABS NAVIGATION
function switchTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    const target = document.getElementById(tabId);
    if (target) {
        target.classList.add('active');
    }

    document.querySelectorAll('.nav-btn').forEach(btn => {
        if (btn.getAttribute('data-tab') === tabId) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    if (tabId === 'history') {
        renderHistoryFeed();
    } else if (tabId === 'browse') {
        renderBrowseFeed();
    }

    if (formAudioPlayer) formAudioPlayer.pause();

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 2. THEME CYCLE (LIGHT -> PINK -> DARK)
const themeBtn = document.getElementById('themeToggle');
const themeIcon = themeBtn ? themeBtn.querySelector('i') : null;
const root = document.documentElement;
const themes = ['light', 'pink', 'dark']; 

let currentThemeIndex = themes.indexOf(localStorage.getItem('theme') || 'light');
if (currentThemeIndex === -1) currentThemeIndex = 0; 
root.setAttribute('data-theme', themes[currentThemeIndex]);

if (themeBtn) {
    themeBtn.addEventListener('click', () => {
        currentThemeIndex = (currentThemeIndex + 1) % themes.length;
        const newTheme = themes[currentThemeIndex];
        
        root.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        if (themeIcon) {
            themeIcon.style.transform = 'scale(0.7)';
            setTimeout(() => { themeIcon.style.transform = 'scale(1)'; }, 150);
        }
    });
}

// 3. FETCH & RENDER DATA
async function loadData() {
    try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error('Gagal mengambil data dari server');
        const serverData = await res.json();
        
        if (Array.isArray(serverData) && serverData.length > 0) {
            allData = serverData;
        } else {
            allData = JSON.parse(localStorage.getItem('cached_menfess')) || DEFAULT_MENFESS;
        }
    } catch (err) {
        console.warn("Backend belum aktif, menggunakan penyimpanan lokal:", err);
        const cached = localStorage.getItem('cached_menfess');
        allData = cached ? JSON.parse(cached) : DEFAULT_MENFESS;
    }

    // Pastikan URL preview yang valid dari POPULAR_SONGS terpasang jika ada lagu yang cocok
    allData.forEach(item => {
        if (item.song) {
            const matched = POPULAR_SONGS.find(p => 
                (p.artist.toLowerCase() + ' - ' + p.title.toLowerCase()) === item.song.toLowerCase() ||
                item.song.toLowerCase().includes(p.title.toLowerCase())
            );
            if (matched && (!item.previewUrl || !item.previewUrl.includes('AudioPreview2'))) {
                item.previewUrl = matched.previewUrl;
                item.artworkUrl = matched.artworkUrl;
            }
        }
    });
    localStorage.setItem('cached_menfess', JSON.stringify(allData));

    renderMarquee(allData);
    renderBrowseFeed();
    renderQuickSongPills();
    checkUrlHashForMessage();
}

// Template komponen kartu Menfess
function createCardHTML(m) {
    const likedList = JSON.parse(localStorage.getItem('my_liked_ids') || '[]');
    const isLiked = likedList.includes(m.id);
    const dateFormatted = formatRelativeTime(m.createdAt);

    return `
        <div class="card" data-id="${m.id}" onclick="openMessageModal(${m.id})">
            <div class="card-header">
                <span class="card-to">Untuk: ${escapeHtml(m.to)} ↗</span>
                <span class="card-date">${dateFormatted}</span>
            </div>
            ${m.song ? `
                <div class="card-song" title="Lagu: ${escapeHtml(m.song)}">
                    <i class="fa-solid fa-play" style="font-size: 8px;"></i>
                    <span>${escapeHtml(m.song)}</span>
                </div>
            ` : ''}
            <div class="card-msg line-clamp">${escapeHtml(m.message)}</div>
            <div class="card-hint">
                <i class="fa-solid fa-headphones"></i> Klik untuk buka & putar cuplikan 30s
            </div>
            <div class="card-footer" onclick="event.stopPropagation()">
                <span class="card-from">Dari: ${escapeHtml(m.from || 'Anonim')}</span>
                <div class="card-actions">
                    <button class="card-action-btn like-btn ${isLiked ? 'liked' : ''}" onclick="handleLike(${m.id}, event)" title="Suka pesan ini">
                        <i class="${isLiked ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
                        <span class="like-count">${m.likes || 0}</span>
                    </button>
                    <button class="card-action-btn" onclick="handleDirectShare(${m.id}, event)" title="Bagikan tautan pesan">
                        <i class="fa-solid fa-share-nodes"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Render Card ke Animasi Berjalan (Marquee)
function renderMarquee(dataToRender) {
    const track = document.getElementById('marqueeTrack');
    if (!track) return;
    track.innerHTML = '';
    
    if (!dataToRender || dataToRender.length === 0) {
        dataToRender = DEFAULT_MENFESS;
    }

    let cardsHTML = '';
    dataToRender.forEach(m => {
        cardsHTML += createCardHTML(m);
    });
    
    let repeatCount = 2;
    if (dataToRender.length <= 2) repeatCount = 6;
    else if (dataToRender.length <= 4) repeatCount = 4;

    track.innerHTML = cardsHTML.repeat(repeatCount);
}

// Atur Mode Pengurutan di Browse
function setSortMode(mode) {
    currentSortMode = mode;
    document.querySelectorAll('.sort-btn').forEach(btn => btn.classList.remove('active'));
    if (mode === 'newest') {
        const el = document.getElementById('sortNewest');
        if (el) el.classList.add('active');
    } else {
        const el = document.getElementById('sortPopular');
        if (el) el.classList.add('active');
    }
    renderBrowseFeed();
}

// Render Card ke Tab Browse
function renderBrowseFeed() {
    const feed = document.getElementById('browseFeed');
    const countLabel = document.getElementById('browseCount');
    const searchInput = document.getElementById('searchInput');
    const keyword = searchInput ? searchInput.value.toLowerCase().trim() : '';

    if (!feed) return;
    feed.innerHTML = '';

    let list = allData.slice();
    if (keyword) {
        list = list.filter(m => 
            (m.to && m.to.toLowerCase().includes(keyword)) ||
            (m.from && m.from.toLowerCase().includes(keyword)) ||
            (m.song && m.song.toLowerCase().includes(keyword)) ||
            (m.message && m.message.toLowerCase().includes(keyword))
        );
    }

    if (currentSortMode === 'popular') {
        list.sort((a, b) => (b.likes || 0) - (a.likes || 0));
    } else {
        list.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    }

    if (countLabel) {
        countLabel.textContent = `${list.length} pesan ditemukan`;
    }

    if (list.length === 0) {
        feed.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon"><i class="fa-regular fa-envelope-open"></i></div>
                <h3>Tidak ada pesan ditemukan</h3>
                <p>${keyword ? `Tidak ada menfess yang cocok dengan kata kunci "${escapeHtml(keyword)}".` : 'Belum ada pesan yang dititipkan. Jadilah yang pertama!'}</p>
                ${keyword ? `<button class="btn-secondary" onclick="document.getElementById('searchInput').value=''; renderBrowseFeed();">Bersihkan Pencarian</button>` : `<button class="btn-primary" onclick="switchTab('submit')">Tulis Menfess ↗</button>`}
            </div>
        `;
        return;
    }

    let feedHTML = '';
    list.forEach(m => {
        feedHTML += createCardHTML(m);
    });
    feed.innerHTML = feedHTML;
}

function searchMenfess() {
    renderBrowseFeed();
}

// Render Tab History
function renderHistoryFeed() {
    const feed = document.getElementById('historyFeed');
    if (!feed) return;
    feed.innerHTML = '';

    const mySentIds = JSON.parse(localStorage.getItem('my_sent_ids') || '[]');
    const myMessages = allData.filter(m => mySentIds.includes(m.id));

    if (myMessages.length === 0) {
        feed.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon"><i class="fa-solid fa-feather-pointed"></i></div>
                <h3>Belum Ada Riwayat Pesan</h3>
                <p>Kamu belum pernah menitipkan pesan dari browser ini. Semua perasaan dan lagu yang kamu kirimkan akan tersimpan di sini.</p>
                <button class="btn-primary" onclick="switchTab('submit')">Mulai Menulis ↗</button>
            </div>
        `;
        return;
    }

    myMessages.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));

    let historyHTML = '';
    myMessages.forEach(m => {
        historyHTML += createCardHTML(m);
    });
    feed.innerHTML = historyHTML;
}

// ================= MODAL POPUP & PEMUTAR AUDIO 30 DETIK =================

let isModalAudioPlaying = false;
let currentModalItem = null;

// Buka Modal Popup Detail Pesan
async function openMessageModal(id) {
    const item = allData.find(m => m.id === Number(id));
    if (!item) return;

    currentActiveModalId = item.id;
    currentModalItem = item;
    const modal = document.getElementById('messageModal');
    if (!modal) return;

    stopModalAudio();

    const toEl = document.getElementById('modalTo');
    const dateEl = document.getElementById('modalDate');
    const msgEl = document.getElementById('modalMessage');
    const fromEl = document.getElementById('modalFrom');
    const songWidget = document.getElementById('modalSongWidget');
    const songTitleEl = document.getElementById('modalSongTitle');
    const spotifyBtn = document.getElementById('modalSpotifyBtn');
    const likeBtn = document.getElementById('modalLikeBtn');
    const likeCountSpan = document.getElementById('modalLikeCount');

    if (toEl) toEl.textContent = `Dear ${item.to}`;
    if (dateEl) dateEl.textContent = `Dikirim pada ${formatFullDate(item.createdAt)}`;
    if (msgEl) msgEl.textContent = item.message;
    if (fromEl) fromEl.textContent = `— Dari: ${item.from || 'Anonim'}`;

    // Tampilkan / sembunyikan kotak lagu
    if (item.song && item.song.trim()) {
        songWidget.style.display = 'flex';
        songTitleEl.textContent = item.song;
        const spotifyQuery = encodeURIComponent(item.song);
        spotifyBtn.href = `https://open.spotify.com/search/${spotifyQuery}`;

        // Pasang preview audio jika ada
        if (item.previewUrl) {
            modalAudioPlayer.src = item.previewUrl;
            modalAudioPlayer.load();
        } else {
            resolveSongPreviewOnline(item).then(url => {
                if (url && currentActiveModalId === item.id) {
                    modalAudioPlayer.src = url;
                    modalAudioPlayer.load();
                }
            });
        }
    } else {
        songWidget.style.display = 'none';
    }

    // Status Like
    const likedList = JSON.parse(localStorage.getItem('my_liked_ids') || '[]');
    const isLiked = likedList.includes(item.id);
    if (likeBtn) {
        const heartIcon = likeBtn.querySelector('i');
        if (isLiked) {
            likeBtn.classList.add('liked');
            if (heartIcon) heartIcon.className = 'fa-solid fa-heart';
        } else {
            likeBtn.classList.remove('liked');
            if (heartIcon) heartIcon.className = 'fa-regular fa-heart';
        }
    }
    if (likeCountSpan) {
        likeCountSpan.textContent = item.likes || 0;
    }

    updateModalAudioUI(false);

    // Buka modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    history.replaceState(null, null, `#msg-${item.id}`);
}

// Tutup Modal Popup
function closeMessageModal() {
    const modal = document.getElementById('messageModal');
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
    currentActiveModalId = null;
    currentModalItem = null;

    stopModalAudio();
    history.replaceState(null, null, ' ');
}

function closeMessageModalOnBackdrop(event) {
    if (event.target.id === 'messageModal') {
        closeMessageModal();
    }
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeMessageModal();
    }
});

function checkUrlHashForMessage() {
    const hash = window.location.hash;
    if (hash && hash.startsWith('#msg-')) {
        const targetId = Number(hash.replace('#msg-', ''));
        if (targetId) {
            setTimeout(() => {
                openMessageModal(targetId);
            }, 500);
        }
    }
}

// Putar / Jeda Audio Cuplikan 30 Detik
async function toggleModalAudioPlayback() {
    if (isModalAudioPlaying) {
        pauseModalAudio();
    } else {
        await playModalAudio();
    }
}

async function playModalAudio() {
    if (!currentModalItem || !currentModalItem.song) return;

    let audioSrc = currentModalItem.previewUrl;
    if (!audioSrc) {
        showToast("Mencari cuplikan audio...", "fa-solid fa-circle-notch fa-spin");
        audioSrc = await resolveSongPreviewOnline(currentModalItem);
    }

    if (!audioSrc) {
        showToast("Cuplikan lagu tidak dapat dimuat", "fa-solid fa-triangle-exclamation");
        return;
    }

    if (modalAudioPlayer.src !== audioSrc) {
        modalAudioPlayer.src = audioSrc;
        modalAudioPlayer.load();
    }

    try {
        await modalAudioPlayer.play();
        isModalAudioPlaying = true;
        updateModalAudioUI(true);
        showToast("Memutar cuplikan 30 detik 🎵", "fa-solid fa-music");
    } catch (err) {
        console.warn("Gagal memutar audio:", err);
        showToast("Klik tombol putar untuk memutar", "fa-solid fa-play");
        updateModalAudioUI(false);
    }
}

function pauseModalAudio() {
    if (modalAudioPlayer) {
        modalAudioPlayer.pause();
    }
    isModalAudioPlaying = false;
    updateModalAudioUI(false);
}

function stopModalAudio() {
    if (modalAudioPlayer) {
        modalAudioPlayer.pause();
        modalAudioPlayer.currentTime = 0;
    }
    isModalAudioPlaying = false;
    updateModalAudioUI(false);
    const progress = document.getElementById('modalAudioProgressBar');
    const timeLabel = document.getElementById('modalAudioTime');
    if (progress) progress.style.width = '0%';
    if (timeLabel) timeLabel.textContent = '0:00 / 0:30';
}

function updateModalAudioUI(isPlaying) {
    const vinyl = document.getElementById('modalVinylDisc');
    const vinylIcon = document.getElementById('modalVinylIcon');
    const playIcon = document.getElementById('modalPlayIcon');
    const playText = document.getElementById('modalPlayText');
    const playBtn = document.getElementById('modalPlayBtn');
    const wave = document.getElementById('modalAudioWave');

    if (isPlaying) {
        if (vinyl) vinyl.classList.add('playing');
        if (vinylIcon) vinylIcon.className = 'fa-solid fa-pause';
        if (playIcon) playIcon.className = 'fa-solid fa-pause';
        if (playText) playText.textContent = 'Jeda Cuplikan';
        if (playBtn) playBtn.classList.add('playing');
        if (wave) wave.classList.add('active');
    } else {
        if (vinyl) vinyl.classList.remove('playing');
        if (vinylIcon) vinylIcon.className = 'fa-solid fa-play';
        if (playIcon) playIcon.className = 'fa-solid fa-play';
        if (playText) playText.textContent = 'Putar Cuplikan (30s)';
        if (playBtn) playBtn.classList.remove('playing');
        if (wave) wave.classList.remove('active');
    }
}

// Progress Bar & Time Tracker
if (modalAudioPlayer) {
    modalAudioPlayer.addEventListener('timeupdate', () => {
        const cur = modalAudioPlayer.currentTime;
        const dur = modalAudioPlayer.duration || 30;
        const pct = Math.min(100, (cur / dur) * 100);

        const progress = document.getElementById('modalAudioProgressBar');
        const timeLabel = document.getElementById('modalAudioTime');

        if (progress) progress.style.width = `${pct}%`;
        if (timeLabel) {
            const sec = Math.floor(cur);
            timeLabel.textContent = `0:${sec < 10 ? '0' : ''}${sec} / 0:30`;
        }
    });

    modalAudioPlayer.addEventListener('ended', () => {
        stopModalAudio();
    });
}

function seekModalAudio(e) {
    if (!modalAudioPlayer || !modalAudioPlayer.duration) return;
    const bar = e.currentTarget;
    const rect = bar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const pct = Math.max(0, Math.min(1, clickX / rect.width));
    modalAudioPlayer.currentTime = pct * (modalAudioPlayer.duration || 30);
}

// Cari previewUrl iTunes secara otomatis
async function resolveSongPreviewOnline(item) {
    try {
        const results = await searchSongsAPI(item.song);
        if (results && results.length > 0 && results[0].previewUrl) {
            item.previewUrl = results[0].previewUrl;
            item.artworkUrl = results[0].artworkUrl;
            localStorage.setItem('cached_menfess', JSON.stringify(allData));
            return item.previewUrl;
        }
    } catch (e) {}
    return null;
}

// Handler Like dari Modal
function handleModalLike() {
    if (!currentActiveModalId) return;
    handleLike(currentActiveModalId);

    const item = allData.find(m => m.id === currentActiveModalId);
    if (!item) return;

    const likedList = JSON.parse(localStorage.getItem('my_liked_ids') || '[]');
    const isLiked = likedList.includes(item.id);
    const likeBtn = document.getElementById('modalLikeBtn');
    const likeCountSpan = document.getElementById('modalLikeCount');

    if (likeBtn) {
        const heartIcon = likeBtn.querySelector('i');
        if (isLiked) {
            likeBtn.classList.add('liked');
            if (heartIcon) heartIcon.className = 'fa-solid fa-heart';
        } else {
            likeBtn.classList.remove('liked');
            if (heartIcon) heartIcon.className = 'fa-regular fa-heart';
        }
    }
    if (likeCountSpan) {
        likeCountSpan.textContent = item.likes || 0;
    }
}

// Handler Salin Pesan Modal
function handleModalCopy() {
    if (!currentActiveModalId) return;
    const item = allData.find(m => m.id === currentActiveModalId);
    if (!item) return;

    const copyText = `💌 Untuk: ${item.to}\n${item.song ? `🎵 Lagu: ${item.song}\n` : ''}\n"${item.message}"\n\n— Dari: ${item.from || 'Anonim'}\n(via MariBermenfess)`;

    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(copyText).then(() => {
            showToast("Pesan disalin ke clipboard! ✨", "fa-regular fa-copy");
        }).catch(() => {
            prompt("Salin pesan ini:", copyText);
        });
    } else {
        prompt("Salin pesan ini:", copyText);
    }
}

function handleModalShare() {
    if (!currentActiveModalId) return;
    handleDirectShare(currentActiveModalId);
}

function handleDirectShare(id, event) {
    if (event) event.stopPropagation();

    const item = allData.find(m => m.id === Number(id));
    if (!item) return;

    const directUrl = `${window.location.origin}${window.location.pathname}#msg-${item.id}`;
    const shareText = `Ada pesan dan lagu yang dititipkan untuk "${item.to}" di MariBermenfess 💌: ${directUrl}`;

    if (navigator.share) {
        navigator.share({
            title: `MariBermenfess — Untuk ${item.to}`,
            text: shareText,
            url: directUrl
        }).catch(() => {});
    } else if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(directUrl).then(() => {
            showToast("Tautan pesan disalin ke clipboard! 🔗", "fa-solid fa-link");
        });
    } else {
        prompt("Salin tautan pesan ini:", directUrl);
    }
}

async function handleLike(id, event) {
    if (event) event.stopPropagation();

    const likedList = JSON.parse(localStorage.getItem('my_liked_ids') || '[]');
    const isAlreadyLiked = likedList.includes(id);

    const targetItem = allData.find(m => m.id === id);
    if (!targetItem) return;

    if (isAlreadyLiked) {
        targetItem.likes = Math.max(0, (targetItem.likes || 1) - 1);
        const updatedList = likedList.filter(item => item !== id);
        localStorage.setItem('my_liked_ids', JSON.stringify(updatedList));
    } else {
        targetItem.likes = (targetItem.likes || 0) + 1;
        likedList.push(id);
        localStorage.setItem('my_liked_ids', JSON.stringify(likedList));
        showToast("Rasa relate kamu tersampaikan ❤️", "fa-solid fa-heart");

        try {
            await fetch(`${API_URL}/${id}/like`, { method: 'POST' });
        } catch (e) {}
    }

    localStorage.setItem('cached_menfess', JSON.stringify(allData));

    document.querySelectorAll(`.card[data-id="${id}"]`).forEach(cardEl => {
        const likeBtn = cardEl.querySelector('.like-btn');
        const countSpan = cardEl.querySelector('.like-count');
        const heartIcon = cardEl.querySelector('.like-btn i');

        if (countSpan) countSpan.textContent = targetItem.likes;
        if (likeBtn && heartIcon) {
            if (!isAlreadyLiked) {
                likeBtn.classList.add('liked');
                heartIcon.className = 'fa-solid fa-heart';
            } else {
                likeBtn.classList.remove('liked');
                heartIcon.className = 'fa-regular fa-heart';
            }
        }
    });
}

// ================= 4. PILIHAN LAGU CEPAT & PENCARIAN REAL-TIME =================

const songInput = document.getElementById('song');
const songDropdown = document.getElementById('songDropdown');
const songDropdownList = document.getElementById('songDropdownList');
const dropdownTitle = document.getElementById('dropdownHeaderTitle');
const dropdownLoading = document.getElementById('dropdownLoading');
const clearSongBtn = document.getElementById('clearSongBtn');
const songPreviewUrlInput = document.getElementById('songPreviewUrl');
const songArtworkUrlInput = document.getElementById('songArtworkUrl');
const quickSongsList = document.getElementById('quickSongsList');

const selectedSongBox = document.getElementById('selectedSongBox');
const selectedSongImg = document.getElementById('selectedSongImg');
const selectedSongTitle = document.getElementById('selectedSongTitle');
const formAudioPlayBtn = document.getElementById('formAudioPlayBtn');
const formAudioTime = document.getElementById('formAudioTime');

let isFormAudioPlaying = false;
let searchDebounceTimer = null;

// Tampilkan chip lagu pilihan cepat yang langsung terlihat di bawah box input
function renderQuickSongPills() {
    if (!quickSongsList) return;
    quickSongsList.innerHTML = '';

    POPULAR_SONGS.forEach(song => {
        const pill = document.createElement('div');
        pill.className = 'quick-song-pill';
        pill.innerHTML = `<i class="fa-solid fa-music"></i> <span>${escapeHtml(song.artist)} - ${escapeHtml(song.title)}</span>`;
        pill.addEventListener('click', () => {
            selectSong(song);
            document.querySelectorAll('.quick-song-pill').forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
        });
        quickSongsList.appendChild(pill);
    });
}

// Render daftar lagu ke dalam dropdown pencarian
function renderSongDropdownItems(songs) {
    if (!songDropdownList) return;
    songDropdownList.innerHTML = '';

    if (!songs || songs.length === 0) {
        songDropdownList.innerHTML = `
            <div style="padding: 18px; text-align: center; color: var(--text-muted); font-size: 13px;">
                <i class="fa-solid fa-circle-exclamation"></i> Lagu tidak ditemukan. Silakan ketik nama artis atau lagu lain.
            </div>
        `;
        return;
    }

    songs.forEach(item => {
        const itemEl = document.createElement('div');
        itemEl.className = 'dropdown-item';
        itemEl.innerHTML = `
            <img src="${item.artworkUrl || 'https://via.placeholder.com/60?text=Music'}" alt="Cover" class="dropdown-art">
            <div class="dropdown-info">
                <div class="dropdown-title">${escapeHtml(item.title)}</div>
                <div class="dropdown-artist">${escapeHtml(item.artist)}</div>
            </div>
            <span class="dropdown-tag"><i class="fa-solid fa-plus"></i> Pilih</span>
        `;
        itemEl.addEventListener('click', (e) => {
            e.stopPropagation();
            selectSong(item);
        });
        songDropdownList.appendChild(itemEl);
    });
}

// Buka dropdown saat input diklik atau fokus
if (songInput) {
    songInput.addEventListener('focus', () => {
        if (!songInput.value.trim()) {
            dropdownTitle.innerHTML = `<i class="fa-solid fa-fire"></i> Rekomendasi Lagu Populer`;
            renderSongDropdownItems(POPULAR_SONGS);
        }
        songDropdown.classList.add('active');
    });

    songInput.addEventListener('click', () => {
        if (!songDropdown.classList.contains('active')) {
            if (!songInput.value.trim()) {
                dropdownTitle.innerHTML = `<i class="fa-solid fa-fire"></i> Rekomendasi Lagu Populer`;
                renderSongDropdownItems(POPULAR_SONGS);
            }
            songDropdown.classList.add('active');
        }
    });

    // Real-time input pencarian
    songInput.addEventListener('input', () => {
        const query = songInput.value.trim();
        if (clearSongBtn) clearSongBtn.style.display = query ? 'block' : 'none';

        if (!query) {
            dropdownTitle.innerHTML = `<i class="fa-solid fa-fire"></i> Rekomendasi Lagu Populer`;
            renderSongDropdownItems(POPULAR_SONGS);
            songDropdown.classList.add('active');
            return;
        }

        dropdownTitle.innerHTML = `<i class="fa-solid fa-magnifying-glass"></i> Mencari "${escapeHtml(query)}"...`;
        dropdownLoading.style.display = 'inline-block';
        songDropdown.classList.add('active');

        clearTimeout(searchDebounceTimer);
        searchDebounceTimer = setTimeout(async () => {
            // Pencarian lokal dulu (instan)
            const localMatches = POPULAR_SONGS.filter(s => 
                s.title.toLowerCase().includes(query.toLowerCase()) || 
                s.artist.toLowerCase().includes(query.toLowerCase())
            );

            // Pencarian online via backend atau iTunes
            const onlineResults = await searchSongsAPI(query);
            dropdownLoading.style.display = 'none';
            dropdownTitle.innerHTML = `<i class="fa-solid fa-magnifying-glass"></i> Hasil untuk "${escapeHtml(query)}"`;

            const combined = [...localMatches];
            onlineResults.forEach(r => {
                const exists = combined.some(c => c.title.toLowerCase() === r.title.toLowerCase() && c.artist.toLowerCase() === r.artist.toLowerCase());
                if (!exists) combined.push(r);
            });

            renderSongDropdownItems(combined);
        }, 250);
    });
}

// Klik di luar dropdown untuk menutupnya
document.addEventListener('click', (e) => {
    if (songDropdown && !e.target.closest('.song-input-wrapper')) {
        songDropdown.classList.remove('active');
    }
});

// Pilih lagu
function selectSong(song) {
    const fullSongName = `${song.artist} - ${song.title}`;
    if (songInput) songInput.value = fullSongName;
    if (songPreviewUrlInput) songPreviewUrlInput.value = song.previewUrl || '';
    if (songArtworkUrlInput) songArtworkUrlInput.value = song.artworkUrl || '';

    // Tampilkan kotak lagu yang terpilih
    if (selectedSongTitle) selectedSongTitle.textContent = fullSongName;
    if (selectedSongImg) selectedSongImg.src = song.artworkUrl || 'https://via.placeholder.com/60?text=Music';
    if (selectedSongBox) selectedSongBox.style.display = 'flex';
    if (clearSongBtn) clearSongBtn.style.display = 'block';

    // Set audio preview player di form
    if (formAudioPlayer && song.previewUrl) {
        formAudioPlayer.src = song.previewUrl;
        formAudioPlayer.load();
    }
    isFormAudioPlaying = false;
    updateFormAudioUI(false);

    if (songDropdown) songDropdown.classList.remove('active');
    showToast(`Lagu dipilih: ${fullSongName} 🎵`, "fa-solid fa-circle-check");
}

// Hapus lagu yang dipilih
function clearSelectedSong() {
    if (formAudioPlayer) {
        formAudioPlayer.pause();
        formAudioPlayer.currentTime = 0;
    }
    isFormAudioPlaying = false;
    updateFormAudioUI(false);

    if (songInput) songInput.value = '';
    if (songPreviewUrlInput) songPreviewUrlInput.value = '';
    if (songArtworkUrlInput) songArtworkUrlInput.value = '';
    if (selectedSongBox) selectedSongBox.style.display = 'none';
    if (clearSongBtn) clearSongBtn.style.display = 'none';
    document.querySelectorAll('.quick-song-pill').forEach(p => p.classList.remove('active'));
}

// Toggle cuplikan audio di form submit
function toggleFormAudioPreview() {
    if (!formAudioPlayer || !songPreviewUrlInput.value) {
        showToast("Cuplikan lagu tidak tersedia", "fa-solid fa-triangle-exclamation");
        return;
    }

    if (isFormAudioPlaying) {
        formAudioPlayer.pause();
        isFormAudioPlaying = false;
        updateFormAudioUI(false);
    } else {
        formAudioPlayer.play().then(() => {
            isFormAudioPlaying = true;
            updateFormAudioUI(true);
        }).catch(() => {
            showToast("Gagal memutar audio cuplikan", "fa-solid fa-triangle-exclamation");
        });
    }
}

function updateFormAudioUI(isPlaying) {
    if (!formAudioPlayBtn) return;
    if (isPlaying) {
        formAudioPlayBtn.innerHTML = `<i class="fa-solid fa-pause"></i> <span>Jeda Cuplikan</span>`;
    } else {
        formAudioPlayBtn.innerHTML = `<i class="fa-solid fa-play"></i> <span>Dengar Cuplikan (30s)</span>`;
    }
}

if (formAudioPlayer) {
    formAudioPlayer.addEventListener('timeupdate', () => {
        const cur = Math.floor(formAudioPlayer.currentTime);
        if (formAudioTime) {
            formAudioTime.textContent = `0:${cur < 10 ? '0' : ''}${cur} / 0:30`;
        }
    });

    formAudioPlayer.addEventListener('ended', () => {
        isFormAudioPlaying = false;
        updateFormAudioUI(false);
        if (formAudioTime) formAudioTime.textContent = '0:00 / 0:30';
    });
}

// API Pencarian Lagu: Coba lewat backend Express, lalu fallback ke JSONP iTunes
async function searchSongsAPI(query) {
    try {
        const res = await fetch(`/api/songs/search?term=${encodeURIComponent(query)}`);
        if (res.ok) {
            const data = await res.json();
            if (Array.isArray(data) && data.length > 0) {
                return data;
            }
        }
    } catch (e) {}

    return new Promise((resolve) => {
        const callbackName = 'itunes_cb_' + Date.now() + '_' + Math.floor(Math.random() * 1000);
        const script = document.createElement('script');
        let isHandled = false;

        const timeout = setTimeout(() => {
            if (!isHandled) {
                isHandled = true;
                delete window[callbackName];
                script.remove();
                resolve([]);
            }
        }, 3000);

        window[callbackName] = function(data) {
            if (isHandled) return;
            isHandled = true;
            clearTimeout(timeout);
            delete window[callbackName];
            script.remove();

            if (data && data.results) {
                const formatted = data.results.map(r => ({
                    title: r.trackName,
                    artist: r.artistName,
                    previewUrl: r.previewUrl,
                    artworkUrl: r.artworkUrl100 || r.artworkUrl60
                })).filter(r => r.title && r.previewUrl);
                resolve(formatted);
            } else {
                resolve([]);
            }
        };

        script.onerror = function() {
            if (isHandled) return;
            isHandled = true;
            clearTimeout(timeout);
            delete window[callbackName];
            script.remove();
            resolve([]);
        };

        script.src = `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&country=ID&media=music&entity=song&limit=8&callback=${callbackName}`;
        document.body.appendChild(script);
    });
}

// 5. PENGHITUNG KARAKTER DI FORM
const messageTextarea = document.getElementById('message');
const charCountSpan = document.getElementById('charCount');

if (messageTextarea && charCountSpan) {
    messageTextarea.addEventListener('input', () => {
        charCountSpan.textContent = messageTextarea.value.length;
    });
}

// 6. SUBMIT FORM KE BACKEND DENGAN FALLBACK
const formMenfess = document.getElementById('formMenfess');
if (formMenfess) {
    formMenfess.addEventListener('submit', async (e) => {
        e.preventDefault();
        const submitBtn = formMenfess.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerText;
        submitBtn.disabled = true;
        submitBtn.innerText = "Mengirim pesan & lagu...";

        const toVal = document.getElementById('to').value.trim();
        const fromVal = document.getElementById('from').value.trim();
        let songVal = songInput ? songInput.value.trim() : '';
        let previewUrlVal = songPreviewUrlInput ? songPreviewUrlInput.value.trim() : '';
        let artworkUrlVal = songArtworkUrlInput ? songArtworkUrlInput.value.trim() : '';
        const messageVal = document.getElementById('message').value.trim();

        if (!toVal || !messageVal) {
            showToast("Nama penerima dan pesan wajib diisi!", "fa-solid fa-triangle-exclamation");
            submitBtn.disabled = false;
            submitBtn.innerText = originalText;
            return;
        }

        // Jika user mengetik lagu secara manual tanpa klik dari daftar, cari previewUrl-nya
        if (songVal && !previewUrlVal) {
            const matched = POPULAR_SONGS.find(s => 
                songVal.toLowerCase().includes(s.title.toLowerCase()) || 
                songVal.toLowerCase().includes(s.artist.toLowerCase())
            );
            if (matched) {
                previewUrlVal = matched.previewUrl;
                artworkUrlVal = matched.artworkUrl;
            } else {
                try {
                    const online = await searchSongsAPI(songVal);
                    if (online && online.length > 0 && online[0].previewUrl) {
                        previewUrlVal = online[0].previewUrl;
                        artworkUrlVal = online[0].artworkUrl;
                    }
                } catch(e) {}
            }
        }

        const payload = {
            to: toVal,
            from: fromVal || 'Anonim',
            song: songVal,
            previewUrl: previewUrlVal,
            artworkUrl: artworkUrlVal,
            message: messageVal
        };

        let createdItem = null;

        try {
            const res = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                createdItem = await res.json();
            } else {
                throw new Error("Gagal disimpan oleh backend");
            }
        } catch (err) {
            console.warn("Backend tidak merespons, menyimpan secara lokal:", err);
            createdItem = {
                id: Date.now(),
                to: payload.to,
                from: payload.from,
                song: payload.song,
                previewUrl: payload.previewUrl,
                artworkUrl: payload.artworkUrl,
                message: payload.message,
                createdAt: new Date().toISOString(),
                likes: 0
            };
        }

        if (createdItem) {
            clearSelectedSong();

            allData.unshift(createdItem);
            localStorage.setItem('cached_menfess', JSON.stringify(allData));

            const mySentIds = JSON.parse(localStorage.getItem('my_sent_ids') || '[]');
            mySentIds.unshift(createdItem.id);
            localStorage.setItem('my_sent_ids', JSON.stringify(mySentIds));

            formMenfess.reset();
            if (charCountSpan) charCountSpan.textContent = '0';

            renderMarquee(allData);
            renderBrowseFeed();

            showToast("Pesan & lagu berhasil dititipkan! 💌", "fa-solid fa-paper-plane");

            // Buka popup pesan yang baru dikirim lengkap dengan pemutar cuplikannya
            setTimeout(() => {
                switchTab('beranda');
                openMessageModal(createdItem.id);
            }, 600);
        }

        submitBtn.disabled = false;
        submitBtn.innerText = originalText;
    });
}

// Inisialisasi saat web pertama kali dimuat
loadData();
