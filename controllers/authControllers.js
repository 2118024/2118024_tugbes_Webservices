const prisma = require('../config/prisma');
const bcrypt = require('bcrypt');

const registerUser = async (req, res) => {
  try {
    const { nama, email, password, no_hp } = req.body;

    // 1. Validasi input sederhana
    if (!nama || !email || !password || !no_hp) {
      return res.status(400).json({ message: "Semua field wajib diisi!" });
    }

    // 2. Cek apakah email sudah terdaftar di database
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return res.status(400).json({ message: "Email sudah terdaftar!" });
    }

    // 3. Hash/Acak password menggunakan bcrypt
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // 4. Simpan user baru ke database
    const newUser = await prisma.user.create({
      data: {
        nama,
        email,
        password: hashedPassword,
        no_hp
      }
    });

    // 5. Kirim respon sukses (jangan tampilkan password di respon)
    res.status(201).json({
      message: "Registrasi berhasil!",
      user: {
        id: newUser.id,
        nama: newUser.nama,
        email: newUser.email,
        no_hp: newUser.no_hp
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Terjadi kesalahan pada server." });
  }
};

module.exports = {registerUser};