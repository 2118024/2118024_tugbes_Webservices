const express = require('express');
const dotenv = require('dotenv');

const prisma = require('./config/prisma');
const { registerUser } = require('./controllers/authControllers');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// 1. Endpoint Testing Dasar
app.get('/', (req, res) => {
  res.json({ message: "Server MontirGo Web Services aktif dan stabil!" });
});

// 2. Endpoint Registrasi User
app.post('/api/auth/register', registerUser);

// 3. Endpoint Login User
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email dan password wajib diisi!" });
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: "Email atau password salah!" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Email atau password salah!" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || 'rahasia_super_secure',
      { expiresIn: '1d' }
    );

    return res.status(200).json({
      message: "Login berhasil!",
      token,
      user: { id: user.id, nama: user.nama, email: user.email }
    });
  } catch (error) {
    console.error('[LOGIN] error stack=', error?.stack || error);
    return res.status(500).json({ message: "Terjadi kesalahan pada server." });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server MontirGo berjalan lancar di http://localhost:${PORT}`);
});
