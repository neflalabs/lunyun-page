# Lunyun Page

Halo! Om nefla disini.. 👋  
Ini adalah repo **Lunyun Page**, sebuah project landing page sederhana yang dibuat dengan komponen web standar: **HTML, CSS, dan JavaScript**. Mudah diutak-atik dan cocok buat showcase link Bot Om.

## Tujuan Lunyun Page
Menyediakan landing page yang simpel dan responsif, mirip "linktree" untuk kumpulan bot atau profil.

## Teknologi yang Digunakan
- **HTML**: Struktur utama halaman (`index.html`)
- **CSS**: Styling di folder `css/`, efek glowing biar lebih menarik
- **JavaScript**: Interaksi dan dekorasi di folder `js/`
- **Dockerfile**: Untuk containerisasi dan deployment mudah

## Cara Menjalankan Project

### 1. Clone Repo
```bash
git clone https://github.com/neflalabs/lunyun-page.git
cd lunyun-page
```

### 2. Jalankan Secara Lokal
Buka file `index.html` langsung di browser untuk melihat halaman.  
Jika ingin auto-reload saat mengedit kode, gunakan live-server (hanya untuk pengembangan lokal):

```bash
# Install live-server jika belum ada (npm install -g live-server)
live-server .
```
Akses di `http://localhost:8080` (default live-server port)

### 3. Deploy dengan Docker
Untuk deployment, gunakan Docker untuk membangun dan menjalankan container:

```bash
docker build -t lunyun-page .
docker run -p 8080:80 lunyun-page
```
Akses di `http://localhost:8080`

## Struktur Folder & File

- `index.html` — Halaman utama landing page
- `assets/` — Gambar, ikon, dan file statis lain (gunakan aspek rasio 1:1)
- `css/` — File stylesheet utama (`style.css`)
- `js/` — Script JavaScript (`main.js`)
- `Dockerfile` — Konfigurasi container

## Kontribusi

Punya ide atau ingin bantu?  
Silakan fork, pull request, atau buka issue. Diskusi santai juga boleh!

## License

Repo ini menggunakan **GNU GPLv3**.  
Bebas dipakai, diubah, dan disebarluaskan, asal share juga perubahan source code kamu.  
Cek [LICENSE](LICENSE) untuk detail.

---

2025 - @neflalabsTrigger GitHub Actions workflow
