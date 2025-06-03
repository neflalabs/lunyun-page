# Lunyun Page

Halo! Om nefla disini.. 👋  
Ini adalah repo **Lunyun Page**, sebuah project kecil-kecilan dikala gabut. Lunyun-page make komponen web standar kayak **HTML, CSS, dan JavaScript**, jadi gampang banget buat diutak-atik. (ini juga jelek banget sih menurut saya hihihi..)

## Buat apa sih Lunyun Page?
Buat landing page yang simple, responsif. khususnya disini sebagai "sejenis" linktree buat kompulan Bot Om.

## Teknologi yang Dipakai
- **HTML**: Struktur dasar web.
- **CSS**: Styling biasa aja, glowing-glowing dikit biar alay.
- **JavaScript**: Dekorasi bunga sama eskrim.
- **Dockerfile**: Buat yang mau deploy pake Docker, gampang tinggal build aja.

## Cara Jalanin Project Ini

### 1. Clone Repo
```bash
git clone https://github.com/neflalabs/lunyun-page.git
cd lunyun-page
```

### 2. Jalankan Secara Lokal
Cukup buka file `index.html` di browser favorit kamu.  
Atau kalau mau pake live server (rekomendasi, biar auto-reload):

```bash
# Pastikan sudah install live-server (npm install -g live-server)
live-server
```

### 3. Deploy dengan Docker
Kalau kamu mau langsung deploy di server pakai Docker:
```bash
docker build -t lunyun-page .
docker run -p 8080:80 lunyun-page
```
Akses di `http://localhost:8080`

## Folder & Struktur File

- `index.html` — Halaman utama
- `assets/` — Gambar, icon, atau file statik lainnya. (gambar make aspek 1:1)
- `css/` — File stylesheet
- `js/` — Script JavaScript
- `Dockerfile` — Buat containerisasi

## Kontribusi

Punya ide atau mau bantuin?  
Silakan fork, pull request, atau buka issue ya!  
Diskusi santai juga boleh banget.

## License

Repo ini pakai **GNU GPLv3**.  
Bebas dipakai, diubah, dan disebarluaskan, asal tetap share source code perubahan kamu juga.  
Cek [LICENSE](LICENSE) buat detailnya.

---

2025 - @neflalabs