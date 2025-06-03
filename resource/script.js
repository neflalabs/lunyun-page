// Mendapatkan referensi ke elemen container gambar
const lunaCardImageContainer = document.getElementById('luna-card-image-container');
const yunaCardImageContainer = document.getElementById('yuna-card-image-container');

// Mendapatkan referensi ke elemen gambar di dalam container
const lunaImage = document.getElementById('luna-image');
const yunaImage = document.getElementById('yuna-image');

// Daftar gambar untuk Luna dan Yuna
const lunaImages = ['resource/img/luna.jpg', 'resource/img/lunav2.png', 'resource/img/lunav3.png'];
const yunaImages = ['resource/img/yuna.jpg', 'resource/img/yunav2.png', 'resource/img/yunav3.png'];
let currentLunaImageIndex = 0;
let currentYunaImageIndex = 0;

// Fungsi untuk mengubah gambar Luna dengan transisi zoom dan fade
function changeLunaImage() {
    lunaImage.style.opacity = 0; // Mulai fade out
    lunaImage.style.transform = 'scale(0.9)'; // Mulai zoom out sedikit
        setTimeout(() => {
        currentLunaImageIndex = (currentLunaImageIndex + 1) % lunaImages.length;
        lunaImage.src = lunaImages[currentLunaImageIndex];

// Memaksa reflow untuk memastikan transisi dimulai dari skala 0.9
        lunaImage.offsetWidth;
        lunaImage.style.opacity = 1; // Mulai fade in
        lunaImage.style.transform = 'scale(1)'; // Zoom in ke ukuran normal
      }, 1000); // Durasi ini harus sama dengan durasi transisi CSS (1s)
  }

// Fungsi untuk mengubah gambar Yuna dengan transisi zoom dan fade
function changeYunaImage() {
    yunaImage.style.opacity = 0; // Mulai fade out
    yunaImage.style.transform = 'scale(0.9)'; // Mulai zoom out sedikit
        setTimeout(() => {
        currentYunaImageIndex = (currentYunaImageIndex + 1) % yunaImages.length;
        yunaImage.src = yunaImages[currentYunaImageIndex];

// Memaksa reflow untuk memastikan transisi dimulai dari skala 0.9
        yunaImage.offsetWidth;
        yunaImage.style.opacity = 1; // Mulai fade in
        yunaImage.style.transform = 'scale(1)'; // Zoom in ke ukuran normal
      }, 1000); // Durasi ini harus sama dengan durasi transisi CSS (1s)
  }

// Atur interval untuk mengubah gambar setiap 5 detik (5000 milidetik)
setInterval(changeLunaImage, 5000);
setInterval(changeYunaImage, 5000);

// Fungsi untuk mengaktifkan/menonaktifkan mode fullscreen
  function toggleFullscreen(containerElement) {

// Jika sudah ada overlay fullscreen, hapus dan keluar
    const existingFullscreen = document.querySelector('.fullscreen-image');
        if (existingFullscreen) {
            document.body.removeChild(existingFullscreen);
        return;
      }

// Membuat elemen div untuk overlay fullscreen
    const fullscreenOverlay = document.createElement('div');
    fullscreenOverlay.classList.add('fullscreen-image');
    
// Membuat elemen gambar baru untuk ditampilkan di overlay
    const fullImage = document.createElement('img');
    
// Dapatkan elemen img di dalam container yang diklik
    const originalImage = containerElement.querySelector('img');
    fullImage.src = originalImage.src; // Salin URL gambar dari elemen asli
    fullImage.alt = originalImage.alt; // Salin teks alt dari elemen asli
    
// Menambahkan gambar ke overlay
    fullscreenOverlay.appendChild(fullImage);

// Menambahkan overlay ke body
    document.body.appendChild(fullscreenOverlay);
    
// Menambahkan event listener untuk menutup fullscreen saat overlay diklik
    fullscreenOverlay.addEventListener('click', () => {
        document.body.removeChild(fullscreenOverlay);
      });
  }
  
// Menambahkan event listener ke container gambar Luna
    lunaCardImageContainer.addEventListener('click', () => {
        toggleFullscreen(lunaCardImageContainer);
  });

// Menambahkan event listener ke container gambar Yuna
    yunaCardImageContainer.addEventListener('click', () => {
      toggleFullscreen(yunaCardImageContainer);
  });

// --- Fitur Pemutar Musik ---
const backgroundMusic = document.getElementById('background-music');
const muteToggleButton = document.getElementById('mute-toggle-button');
const muteIcon = document.getElementById('mute-icon');

// Set status awal musik: muted dan paused
backgroundMusic.muted = true;
backgroundMusic.pause(); // Pastikan paused di awal

// Fungsi untuk memulai musik (dipanggil saat interaksi pertama)
    function initializeMusicOnFirstInteraction() {
      if (backgroundMusic.paused && backgroundMusic.muted) {
          backgroundMusic.muted = false; // Unmute
          backgroundMusic.play().then(() => {
              console.log("Musik berhasil diputar setelah interaksi pengguna.");
              muteIcon.textContent = '🔊'; // Ganti ikon ke unmute
              muteToggleButton.style.backgroundColor = '#10b981'; // Warna hijau saat play
          }).catch(error => {
              console.log("Gagal memutar musik setelah interaksi pertama:", error);
              // Jika gagal play, kembalikan ke muted dan pause
              backgroundMusic.muted = true;
              backgroundMusic.pause();
              muteIcon.textContent = '🔇';
              muteToggleButton.style.backgroundColor = '#6b7280'; // Kembali ke abu-abu
          });
      }
// Hapus listener setelah interaksi pertama, agar tidak mengganggu klik lainnya
    document.body.removeEventListener('click', initializeMusicOnFirstInteraction);
  }
  
// Tambahkan event listener ke seluruh body untuk mendeteksi klik pertama
document.body.addEventListener('click', initializeMusicOnFirstInteraction);

// Event listener untuk tombol mute/unmute
muteToggleButton.addEventListener('click', () => {
    if (backgroundMusic.muted) {
    
// Jika muted, coba unmute dan play
        backgroundMusic.muted = false;
        backgroundMusic.play().then(() => {
            muteIcon.textContent = '🔊'; // Ikon unmute
            muteToggleButton.style.backgroundColor = '#10b981'; // Warna hijau saat play
          }).catch(error => {
            console.log("Gagal memutar musik setelah unmute:", error);

// Jika gagal play, kembalikan ke muted
            backgroundMusic.muted = true;
            muteIcon.textContent = '🔇';
            muteToggleButton.style.backgroundColor = '#6b7280'; // Kembali ke abu-abu
          });
      } else {

// Jika tidak muted, mute dan pause
            backgroundMusic.muted = true;
            backgroundMusic.pause();
            muteIcon.textContent = '🔇'; // Ikon mute
            muteToggleButton.style.backgroundColor = '#6b7280'; // Kembali ke abu-abu
      }
  });

// Update tombol jika musik selesai (misal jika loop tidak berfungsi atau dihentikan manual)
    backgroundMusic.addEventListener('ended', () => {
        muteIcon.textContent = '🔇'; // Kembali ke ikon mute
        muteToggleButton.style.backgroundColor = '#6b7280';
        backgroundMusic.muted = true; // Pastikan muted saat selesai
  });

// --- Animasi Item Berjatuhan (Bunga dan Es Krim) ---
  const fallingItemsContainer = document.getElementById('falling-items-container');
  const numItems = 50;
  const emojis = ['🌸', '🍦'];
  function createFallingItem() {
      const item = document.createElement('div');
      const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
      item.innerHTML = randomEmoji;
      item.classList.add('falling-item');
      item.style.left = Math.random() * 100 + 'vw';
      item.style.top = - (Math.random() * 20 + 5) + 'vh';
      const size = Math.random() * 20 + 20;
      item.style.fontSize = size + 'px';
      const duration = Math.random() * 7 + 8;
      item.style.animationDuration = duration + 's';
      const delay = Math.random() * - (duration / 2);
      item.style.animationDelay = delay + 's';
      const driftAmount = (Math.random() - 0.5) * 50;
      item.style.setProperty('--item-drift', driftAmount + 'vw');
      fallingItemsContainer.appendChild(item);
  }
  for (let i = 0; i < numItems; i++) {
      createFallingItem();
  }