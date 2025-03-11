# tracker
Tracker adalah solusi yang dirancang untuk melacak user experiece daily. Dengan menggunakan API ini, Anda dapat mengumpulkan data seperti alamat IP, hostname, dan informasi browser pengguna yang mengakses website Anda. Penggunaan dapat dilakukan dengan mudah hanya dengan menjalankan script "https://cdn.jsdelivr.net/gh/domyid/tracker@1.0.2/index.js".

## Cara Kerja

1. Saat halaman dimuat (DOMContentLoaded), sistem akan mengambil alamat IP pengguna menggunakan layanan ipify.
2. Data yang dikumpulkan mencakup: Alamat IPv4 pengguna, Hostname dari website yang diakses, Informasi Browser
3. Data tersebut dikirimkan ke backend domyikado.

## Contoh implementasi index.html
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    
    <script src="https://cdn.jsdelivr.net/gh/domyid/tracker@1.0.2/index.js"></script>
</body>
</html>
```