# TODO - Tugbes_Webservices

- [ ] Rapikan server: pakai `config/prisma.js` dan controller `controllers/authControllers.js` (login/register) di `index.js`. 
- [ ] Pastikan Prisma setup benar: `DATABASE_URL` tersedia, schema cocok dengan model `User`.
- [ ] Jalankan `npx prisma generate`.
- [ ] (Jika DB belum dibuat) jalankan `npx prisma migrate dev`.
- [ ] Jalankan server (`npm run dev`), test endpoint:
  - POST /api/auth/register
  - POST /api/auth/login
- [ ] Verifikasi frontend `/frontend/index.html` untuk login & menampilkan profile.
