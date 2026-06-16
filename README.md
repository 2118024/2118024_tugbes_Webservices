# 📑 Tugas Besar Web Services - MontirGo API & Client Platform

Repositori ini merupakan implementasi proyek Tugas Besar untuk mata kuliah **Web Services**. Proyek ini membangun fondasi sistem untuk **MontirGo**, sebuah platform layanan penyedia montir panggilan (*on-call motorbike repair services*). 

Proyek ini mengimplementasikan arsitektur *Client-Server* menggunakan **RESTful API** berbasis Node.js di sisi *backend*, manajemen database relasional dengan **Prisma ORM**, serta antarmuka *client* berbasis **Vanilla JavaScript (Fetch API)**.

---

## 🛠️ Tech Stack & Spesifikasi Sistem

### 1. Backend Service (Server-Side)
* **Runtime Environment:** Node.js v18+ / v20+
* **Framework:** Express.js (REST API Architecture)
* **Object-Relational Mapping (ORM):** Prisma Client v5.x
* **Database Engine:** MySQL / PostgreSQL
* **Security:** JSON Web Token (JWT) untuk penanganan sesi & `bcryptjs` untuk enkripsi password.

### 2. Frontend Service (Client-Side)
* **Markup & Styling:** HTML5 & CSS3 (Custom Responsive Layout)
* **Scripting Engine:** Vanilla JavaScript (ES6+ / Event-Driven)
* **API Consumer:** Asynchronous Fetch API (AJAX)

---

## 📂 Strukturisasi Direktori Proyek

```text
Tugbes_Webservices/
├── config/
│   └── prisma.js             # Inisialisasi & Ekspor Prisma Client (Singleton Instance)
├── controllers/
│   └── authControllers.js    # Logika bisnis autentikasi MontirGo (Register & Login)
├── frontend/
│   ├── app.js                # Event listener client, validasi form, & konsumsi Fetch API
│   ├── index.html            # Antarmuka login & registrasi pelanggan/montir MontirGo
│   └── styles.css            # Desain antarmuka (Responsive UI layout)
├── prisma/
│   ├── migrations/           # Riwayat migrasi skema database MontirGo (DDL SQL)
│   └── schema.prisma         # Definisi model data pengguna, enkripsi, dan skema database
├── .gitignore                # Pengecualian file lokal (node_modules, .env) dari Git Tracking
├── index.js                  # Entry point utama, routing, middleware CORS & Express JSON
├── package-lock.json         # Mengunci versi dependensi secara spesifik
├── package.json              # Manifest proyek Node.js (Script runner & daftar dependensi)
└── TODO.md                   # Checklist progres pengerjaan fitur aplikasi
