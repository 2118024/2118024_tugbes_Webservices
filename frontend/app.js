const API_BASE_DEFAULT = 'http://localhost:3000';
const API_BASE = window.__API_BASE__ || API_BASE_DEFAULT;

const $ = (sel) => document.querySelector(sel);
const setStatus = (el, message, type) => {
  el.textContent = message || '';
  el.classList.remove('ok', 'err');
  if (type) el.classList.add(type);
};

const setActiveTab = (tabName) => {
  document.querySelectorAll('.tab').forEach((b) => {
    b.classList.toggle('active', b.dataset.tab === tabName);
  });
  document.querySelectorAll('.tab-content').forEach((c) => {
    const id = c.id || '';
    const key = id.replace('tab-', '');
    c.classList.toggle('hidden', key !== tabName);
  });
};

const getToken = () => localStorage.getItem('token');
const saveSession = (payload) => {
  localStorage.setItem('token', payload.token);
  localStorage.setItem('user', JSON.stringify(payload.user || null));
};

const renderProfile = () => {
  const token = getToken();
  if (!token) return;

  let user = null;
  try {
    user = JSON.parse(localStorage.getItem('user'));
  } catch (_) {}

  if (!user) return;

  $('#profile-nama').textContent = user.nama || '-';
  $('#profile-email').textContent = user.email || '-';
  $('#profile-id').textContent = user.id ?? '-';

  $('#profile').style.display = 'block';
  document.querySelector('section.card:first-of-type').style.display = 'none';
};

const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  $('#profile').style.display = 'none';
  document.querySelector('section.card:first-of-type').style.display = 'block';
  setActiveTab('login');
};

// Tabs
document.querySelectorAll('.tab').forEach((btn) => {
  btn.addEventListener('click', () => setActiveTab(btn.dataset.tab));
});

// Login
$('#login-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const statusEl = $('#login-status');

  const form = e.target;
  const email = form.elements.email.value.trim();
  const password = form.elements.password.value;

  setStatus(statusEl, 'Mengirim...', null);

  try {
    const res = await fetch(`${API_BASE}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      setStatus(statusEl, data.message || 'Login gagal', 'err');
      return;
    }

    saveSession({ token: data.token, user: data.user });
    setStatus(statusEl, 'Login berhasil!', 'ok');
    renderProfile();
  } catch (err) {
    console.error(err);
    const msg = err?.message || String(err);
    setStatus(statusEl, `Gagal terhubung ke server: ${msg}`, 'err');
  }
});

// Register
$('#register-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const statusEl = $('#register-status');

  const form = e.target;
  const nama = form.elements.nama.value.trim();
  const email = form.elements.email.value.trim();
  const no_hp = form.elements.no_hp.value.trim();
  const password = form.elements.password.value;

  setStatus(statusEl, 'Mendaftar...', null);

  try {
    const res = await fetch(`${API_BASE}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nama, email, password, no_hp }),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      setStatus(statusEl, data.message || 'Registrasi gagal', 'err');
      return;
    }

    setStatus(statusEl, 'Registrasi berhasil. Silakan login.', 'ok');
    setTimeout(() => setActiveTab('login'), 700);
    form.reset();
  } catch (err) {
    console.error(err);
    setStatus(statusEl, 'Gagal terhubung ke server', 'err');
  }
});

$('#logout-btn').addEventListener('click', logout);

renderProfile();

